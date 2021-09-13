/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Offer functions that can be used to parse the partitionUpdate
 * and then do statistics over it. One can use analysePartitions to specify the
 * partitions been analysed and metrics.
 */

import { OpType, MergeOpType } from './payload'
import { EchartsData } from './echarts_data'
import { MapParser } from './map_parser'
import { chromeos_update_engine } from './update_metadata_pb'

/**
 * Add a <value> to a element associated to <key>. If the element dose not
 * exists than its value will be initialized to zero.
 * @param {Map} map
 * @param {String} key
 * @param {Number} value
 */
function addNumberToMap(map: Map<String, number>, key: String, value: number) {
  if (!map.get(key)) {
    map.set(key, 0)
  }
  map.set(key, map.get(key)! + value)
}

/**
 * Return a statistics over the numbers of blocks (in destination) that are
 * being operated by different installation operation (e.g. REPLACE, BSDIFF).
 * Only partitions that are being passed in will be included.
 * @param {Array<PartitionUpdate>} partitions
 * @return {Map}
 */
export function operatedBlockStatistics(
  partitions: Array<chromeos_update_engine.IPartitionUpdate>
) {
  let /** Map */ operatedBlocks = new Map()
  let /** OpType */ opType = new OpType()
  for (let partition of partitions) {
    for (let operation of partition.operations!) {
      let operationType = opType.mapType.getWithDefault(operation.type)
      addNumberToMap(
        operatedBlocks,
        operationType,
        numBlocks(operation.dstExtents)
      )
    }
  }
  return operatedBlocks
}

export function mergeOperationStatistics(
  partitions: Array<chromeos_update_engine.IPartitionUpdate>,
  blockSize: number
) {
  let /** Map */ mergeOperations = new Map()
  let /** MergeOpType */ opType = new MergeOpType()
  let /** Number */ totalBlocks = 0
  for (let partition of partitions) {
    for (let operation of partition.mergeOperations!) {
      let operationType = opType.mapType.getWithDefault(operation.type)
      addNumberToMap(
        mergeOperations,
        operationType,
        operation.dstExtent!.numBlocks
      )
    }
    // The total blocks number should be rounded up
    if (partition.newPartitionInfo == null) {
      throw new Error(
        `Partition ${partition.partitionName} doesn't have new_partition_info field.`
      )
    }
    totalBlocks += Math.ceil(partition.newPartitionInfo.size / blockSize)
  }
  // The COW merge operation is default to be COW_replace and not shown in
  // the manifest info. We have to mannually add that part of operations,
  // by subtracting the total blocks with other blocks.
  mergeOperations.forEach((value, key) => (totalBlocks -= value))
  mergeOperations.set('COW_REPLACE', totalBlocks)
  return mergeOperations
}

/**
 * Return a statistics over the disk usage of payload.bin, based on the type of
 * installation operations. Only partitions that are being passed in will be
 * included.
 * @param {Array<PartitionUpdate>} partitions
 * @return {Map}
 */
export function operatedPayloadStatistics(
  partitions: Array<chromeos_update_engine.IPartitionUpdate>
) {
  let /** Map */ operatedBlocks = new Map()
  let /** OpType */ opType = new OpType()
  for (let partition of partitions) {
    for (let operation of partition.operations!) {
      let operationType = opType.mapType.getWithDefault(operation.type)
      addNumberToMap(operatedBlocks, operationType, operation.dataLength)
    }
  }
  return operatedBlocks
}
/**
 * Return a statistics over the disk usage of each file types in a OTA package.
 * A target file has to be provided and address-filename maps will be built.
 * Only partitions that are being passed in will be included.
 * @param {Array<PartitionUpdate>} partitions
 * @param {Number} blockSize
 * @param {File} targetFile
 * @return {Map}
 */
export async function operatedFileExtensionsStatistics(
  partitions: Array<chromeos_update_engine.IPartitionUpdate>,
  blockSize: number,
  targetFile: File
): Promise<Map<string, number>> {
  let filenameStats = await operatedFilenamesStatistics(
    partitions,
    blockSize,
    targetFile
  )
  const fileExtenstionStats = new Map<string, number>()
  filenameStats.forEach((size, filename) => {
    addNumberToMap(fileExtenstionStats, name2Extension(filename), size)
  })
  return fileExtenstionStats
}

/**
 * Return a statistics over the disk usage of each file name in a OTA package.
 * A target file has to be provided and address-filename maps will be built.
 * Only partitions that are being passed in will be included.
 * @param {Array<PartitionUpdate>} partitions
 * @param {Number} blockSize
 * @param {File} targetFile
 * @return {Map}
 */
export async function operatedFilenamesStatistics(
  partitions: Array<chromeos_update_engine.IPartitionUpdate>,
  blockSize: number,
  targetFile: File
): Promise<Map<string, number>> {
  let /** Map */ operatedFilenames = new Map()
  if (!targetFile) {
    return operatedFilenames
  }
  let buildMap = new MapParser(targetFile)
  await buildMap.init()
  for (let partition of partitions) {
    await buildMap.add(
      partition.partitionName,
      Math.ceil(partition.newPartitionInfo!.size / blockSize)
    )
    for (let operation of partition.operations!) {
      if (!operation.hasOwnProperty('dataLength')) continue
      let operatedFileNames = buildMap.query(
        partition.partitionName,
        operation.dstExtents!
      )
      let extentDataLength = distributeFilenames(
        operatedFileNames,
        operation.dstExtents!,
        operation.dataLength
      )
      extentDataLength!.forEach((value, key) => {
        addNumberToMap(operatedFilenames, key, value)
      })
    }
  }
  return operatedFilenames
}

/**
 * Analyse the given partitions using the given metrics.
 * @param {String} metrics
 * @param {Array<PartitionUpdate>} partitions
 * @return {EchartsData}
 */
export async function analysePartitions(
  metrics: String,
  partitions: Array<chromeos_update_engine.IPartitionUpdate>,
  blockSize = 4096,
  targetFile: File | null = null
) {
  let /** Map */ statisticsData
  let /** Echartsdata */ echartsData
  switch (metrics) {
    case 'blocks':
      statisticsData = operatedBlockStatistics(partitions)
      echartsData = new EchartsData(
        statisticsData,
        'Operated blocks in target build',
        'blocks'
      )
      break
    case 'payload':
      statisticsData = operatedPayloadStatistics(partitions)
      echartsData = new EchartsData(
        statisticsData,
        'Payload disk usage',
        'bytes'
      )
      break
    case 'COWmerge':
      statisticsData = mergeOperationStatistics(partitions, blockSize)
      echartsData = new EchartsData(
        statisticsData,
        'COW merge operations',
        'blocks'
      )
      break
    case 'filenames':
      if (targetFile == null) {
        throw new Error('Target file is required for filenames analysis')
      }
      statisticsData = await operatedFilenamesStatistics(
        partitions,
        blockSize,
        targetFile
      )
      echartsData = new EchartsData(
        statisticsData,
        'Size of operated filenames',
        'bytes'
      )
      break
    case 'extensions':
      if (targetFile == null) {
        throw new Error('Target file is required for filenames analysis')
      }
      statisticsData = await operatedFileExtensionsStatistics(
        partitions,
        blockSize,
        targetFile
      )
      echartsData = new EchartsData(
        statisticsData,
        'Size of operated extensions',
        'bytes'
      )
      break
  }
  if (echartsData) {
    return echartsData
  } else {
    throw 'Please double check if this is a proper AB OTA package.'
  }
}

/**
 * Calculate the number of blocks being operated
 * @param {Array<InstallOperations>} exts
 * @return {number}
 */
export function numBlocks(
  exts: Array<chromeos_update_engine.IExtent> | null | undefined
) {
  if (!exts) {
    return 0
  }
  const accumulator = (total: number, ext: chromeos_update_engine.IExtent) =>
    total + ext.numBlocks
  return exts.reduce(accumulator, 0)
}

/**
 * Return a string that indicates the blocks being operated
 * in the manner of (start_block, block_length)
 * @param {Array<InstallOperations>} exts
 * @return {string}
 */
export function displayBlocks(exts: Array<chromeos_update_engine.Extent>) {
  const accumulator = (total: string, ext: chromeos_update_engine.Extent) =>
    total + '(' + ext.startBlock + ',' + ext.numBlocks + ')'
  return exts.reduce(accumulator, '')
}

/**
 * Return a map with pairs of (file extension, data length used by this
 * extension). The total data length will be distributed by the blocks ratio
 * of each extent.
 * @param {Array<String>} filenames
 * @param {Array<InstallOperations>} exts
 * @param {Number} length
 * @return {Map}
 */
export function distributeFilenames(
  filenames: Array<string>,
  exts: Array<chromeos_update_engine.IExtent>,
  length: number
): Map<string, number> {
  let totalBlocks = numBlocks(exts)
  let distributedLengths = new Map()
  for (let i = 0; i < filenames.length; i++) {
    addNumberToMap(
      distributedLengths,
      filenames[i],
      Math.round((length * exts[i].numBlocks) / totalBlocks)
    )
  }
  return distributedLengths
}

/**
 * convert a filename into extension, for example:
 * '//system/apex/com.android.adbd.apex' => 'apex'
 * @param {String} filename
 * @return {String}
 */
export function name2Extension(filename: string) {
  let elements = filename.split('.')
  if (elements.length > 1) {
    return elements[elements.length - 1]
  } else if (elements[0] === 'unknown') {
    return 'unknown'
  } else {
    return 'no-extension'
  }
}
