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

import { TextWriter, ZipReader } from '@zip.js/zip.js/dist/zip.js'
import { chromeos_update_engine } from './update_metadata_pb.js'

/**
 * Parse the non-A/B OTA package and return it as a DeltaArchiveManifest
 * @param {ZipReader} packedFile
 */
export class PayloadNonAB extends chromeos_update_engine.DeltaArchiveManifest {
  nonAB: boolean = true
  Blocksize: number = 4096
  packedFile: ZipReader
  constructor(packedFile: ZipReader) {
    super()
    this.packedFile = packedFile
  }

  async init() {
    this.Blocksize = 4096
    this.partialUpdate = false
    this.dynamicPartitionMetadata = new chromeos_update_engine.DynamicPartitionMetadata(
      { snapshotEnabled: false, vabcEnabled: false }
    )
    this.partitions = []

    const /** RegExp*/ regexName = /[\w_]+(?=\.transfer.list)/g
    const /** Array<Entry> */ entries = await this.packedFile.getEntries()
    for (const entry of entries) {
      if (entry.filename.match(regexName)) {
        const match = entry.filename.match(regexName)![0]
        let newPartition = new chromeos_update_engine.PartitionUpdate({
          partitionName: match
        })
        newPartition.rawText = await entry.getData!(new TextWriter())
        await this.parseTransferList(newPartition)
        this.partitions.push(newPartition)
      }
    }
  }

  async parseTransferList(partition: chromeos_update_engine.PartitionUpdate) {
    let /** Array<String> */ lines = partition.rawText.split('\n')
    // First four line in header: version, total blocks,
    // number of stashed entries, maximum used memory for stash
    if (lines.length < 4) {
      throw 'At least 4 lines in header should be provided.'
    }
    partition.version = lines[0]
    partition.totalBlocks = parseInt(lines[1])
    partition.entryStashed = parseInt(lines[2])
    partition.maxStashed = parseInt(lines[3])
    partition.newPartitionInfo = new chromeos_update_engine.PartitionInfo()
    partition.newPartitionInfo.hash = new Uint8Array()
    partition.newPartitionInfo.size = 'unknown'
    /**
     * The main body have 8 different ops:
     * zero [rangeset] : fill zeros
     * new [rangeset] : fill with new data from <partitionName.new.data>
     * erase [rangeset] : mark given blocks as empty
     * move <src_hash> <...>
     * bsdiff <patchstart> <patchlen> <src_hash> <tgt_hash> <...>
     * imgdiff <patchstart> <patchlen> <src_hash> <tgt_hash> <...> :
     * Read the source blocks and apply (not for move op) to the target blocks
     * stash <stash_id> <src_range> : load the given source range to memory
     * free <stash_id> : free the given <stash_id>
     * format:
     * [rangeset]: <# of pairs>, <pair A start>, <pair A end>, ...
     * <stash_id>: a hex number with length of 40
     * <...>: We expect to parse the remainder of the parameter tokens as one of:
     *   <tgt_range> <src_block_count> <src_range> (loads data from source image only)
     *   <tgt_range> <src_block_count> - <[stash_id:stash_range] ...> (loads data from stashes only)
     *   <tgt_range> <src_block_count> <src_range> <src_loc> <[stash_id:stash_range] ...>
     *   (loads data from both source image and stashes)
     */
    partition.operations = new Array()
    let newDataSize = await this.sizeNewData(partition.partitionName)
    for (const line of lines.slice(4)) {
      let op = new chromeos_update_engine.InstallOperation()
      let elements = line.split(' ')
      op.type = elements[0]
      switch ((op.type as unknown) as string) {
        case 'zero':
          op.dstExtents = elements.slice(1).reduce(parseRange, [])
          break
        case 'new':
          // unlike an A/B OTA, the payload only exists in the payload.bin,
          // in an non-A/B OTA, the payload exists in both .new.data and .patch.data.
          // The new ops do not have any information about data length.
          // what we do here is: read in the size of .new.data, assume the first new
          // op have the data length of the size of .new.data.
          op.dataLength = newDataSize
          newDataSize = 0
          op.dstExtents = elements.slice(1).reduce(parseRange, [])
          break
        case 'erase':
          op.dstExtents = elements.slice(1).reduce(parseRange, [])
          break
        case 'move':
          op.dstExtents = parseRange([], elements[2])
          break
        case 'bsdiff':
          op.dataOffset = parseInt(elements[1])
          op.dataLength = parseInt(elements[2])
          op.dstExtents = parseRange([], elements[5])
          break
        case 'imgdiff':
          op.dataOffset = parseInt(elements[1])
          op.dataLength = parseInt(elements[2])
          op.dstExtents = parseRange([], elements[5])
          break
        case 'stash':
          break
        case 'free':
          break
      }
      partition.operations.push(op)
    }
  }

  /**
   * Return the size of <partitionName>.new.data.*
   * @param {String} partitionName
   * @return {Number}
   */
  async sizeNewData(partitionName: string) {
    const /** Array<Entry> */ entries = await this.packedFile.getEntries()
    const /** RegExp */ regexName = new RegExp(partitionName + '.new.dat.*')
    for (const entry of entries) {
      if (entry.filename.match(regexName)) {
        return entry.uncompressedSize
      }
    }
  }
}

/**
 * Parse the range string and return it as an array of extents
 * @param {extents} Array<extents>
 * @param {String} rangeset
 * @return Array<extents>
 */
function parseRange(extents: Object[], rangeset: string) {
  const regexRange = new RegExp('[d,]+')
  if (rangeset.match(regexRange)) {
    let elements = rangeset.split(',')
    for (let i = 1; i < elements.length; i = i + 2) {
      let extent = new Object({
        startBlock: parseInt(elements[i]),
        numBlocks: parseInt(elements[i + 1]) - parseInt(elements[i])
      })
      extents.push(extent)
    }
  }
  return extents
}
