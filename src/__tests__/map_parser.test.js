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

import * as zip from '@zip.js/zip.js/dist/zip-full.min.js'
import { MapParser } from '@/services/map_parser.js'

var targetFile = new Blob()
var mapParser
// Please refer to system_test.map for more details.
const systemMap = [
  '//system/apex/com.android.test1.apex',
  '//system/apex/com.android.test2.apex',
  '//system/apex/com.android.test2.apex',
  '//system/apex/com.android.test2.apex',
  '//system/apex/com.android.test3.apk',
  '//system/apex/com.android.test1.apex',
  '//system/apex/com.android.test1.apex',
  '//system/apex/com.android.test1.apex',
  '//system/apex/com.android.test1.apex',
  'unknown',
  '//init.environ.rc'
]

/**
 * Generate a virtual Android build which only contains a .map file
 */
beforeAll(async () => {
  // web worker is not supported by zip.js, turn it off
  zip.configure({
    useWebWorkers: false,
  })
  // Use system_test.map as a virtual map file
  const fs = require("fs")
  const path = require("path")
  const file = path.join(__dirname, "./", "system_test.map")
  const text = fs.readFileSync(file, 'utf-8', (err, data) => data)
  const blobWriter = new zip.BlobWriter("application/zip")
  const writer = new zip.ZipWriter(blobWriter)
  await writer.add("IMAGES/system_test.map", new zip.TextReader(text))
  await writer.close()
  targetFile = blobWriter.getData()
  mapParser = new MapParser(targetFile)
  await mapParser.init()
})

test('Initialize a map parser instance.', () => {
  expect(mapParser.mapFiles.keys().next().value).toEqual('system_test')
})

test('Establish a map of system file.', async () => {
  await mapParser.add('system_test', 11)
  expect(mapParser.maps.get('system_test')).toEqual(systemMap)
})

test('Query the map of system file.', async () => {
  await mapParser.add('system_test', 11)
  var queryExtents = []
  for (let i = 0; i < 11; i++)
    queryExtents.push(new Object({
      startBlock: i,
      // The number of blocks does not matter, because we only query the
      // starting block.
      numBlocks: 0
    }))
  expect(mapParser.query('system_test', queryExtents)).toEqual(systemMap)
})