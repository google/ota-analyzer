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
 * @fileoverview Class paypload is used to read in and
 * parse the payload.bin file from a OTA.zip file.
 * Class OpType creates a Map that can resolve the
 * operation type.
 * @package zip.js
 * @package protobufjs
 */

import {
  BlobReader,
  TextWriter,
  Writer,
  ZipReader,
  HttpReader
} from '@zip.js/zip.js/dist/zip.js'

// import '@zip.js/zip.js'
import { chromeos_update_engine as update_metadata_pb } from './update_metadata_pb'
import { PayloadNonAB } from './payload_nonab'
import { ZipFile } from './trim_zip'
// import { Zip_js } from 'zip.js'

const /** String */ _MAGIC = 'CrAU'
const /** Number */ _VERSION_SIZE = 8
const /** Number */ _MANIFEST_LEN_SIZE = 8
const /** Number */ _METADATA_SIGNATURE_LEN_SIZE = 4

const /** Number */ _PAYLOAD_HEADER_SIZE =
    _MAGIC.length +
    _VERSION_SIZE +
    _MANIFEST_LEN_SIZE +
    _METADATA_SIGNATURE_LEN_SIZE

const /** Number */ _BRILLO_MAJOR_PAYLOAD_VERSION = 2
export const /** Array<Object> */ MetadataFormat = [
    {
      prefix: 'pre-build',
      key: 'preBuild',
      name: 'Pre-build'
    },
    {
      prefix: 'pre-build-incremental',
      key: 'preBuildVersion',
      name: 'Pre-build version'
    },
    {
      prefix: 'post-build',
      key: 'postBuild',
      name: 'Post-build'
    },
    {
      prefix: 'post-build-incremental',
      key: 'postBuildVersion',
      name: 'Post-build version'
    },
    {
      prefix: 'post-security-patch-level',
      key: 'postSecurityPatchLevel',
      name: 'Post-build SPL'
    },
    {
      prefix: 'post-timestamp',
      key: 'postTimestamp',
      name: 'Post-build timestamp'
    },
  ]

class StopIteration extends Error {}

class AbPayloadHeader {
  constructor(
    public magic: string,
    public version: number,
    public manifest_len: number,
    public metadata_signature_len: number
  ) {}
}

/**
 * Read in an integer from binary bufferArray.
 * @param {Int} size the size of a integer being read in
 * @return {Int} an integer.
 */
async function readIntAt(buffer: Blob, position: number, size: number) {
  let /** DataView */ view = new DataView(
      await buffer!.slice(position, position + size).arrayBuffer()
    )
  if (typeof view.getBigUint64 !== 'function') {
    view.getBigUint64 = function(offset) {
      const a = BigInt(view.getUint32(offset))
      const b = BigInt(view.getUint32(offset + 4))
      const bigNumber = a * 4294967296n + b
      return bigNumber
    }
  }
  switch (size) {
    case 2:
      return view.getUint16(0)
    case 4:
      return view.getUint32(0)
    case 8:
      return Number(view.getBigUint64(0))
    default:
      throw 'Cannot read this integer with size ' + size
  }
}

class OTAPayloadBlobWriter extends Writer {
  offset: number
  contentType: string
  blob: Blob
  prefixLength: number

  header?: AbPayloadHeader

  async readHeader(blob: Blob) {
    let cursor = 0
    const readInt = (size: number) => {
      const ret = readIntAt(blob, cursor, size)
      cursor += size
      return ret
    }
    let buffer = await blob.slice(0, _PAYLOAD_HEADER_SIZE).arrayBuffer()
    let /** TextDecoder */ decoder = new TextDecoder()
    let magicBytes = buffer.slice(0, _MAGIC.length)
    const magic = decoder.decode(magicBytes)
    if (magic != _MAGIC) {
      throw new Error(
        `MAGIC is not correct, expected: ${_MAGIC} actual: ${magic}`
      )
    }
    cursor += _MAGIC.length
    const header_version = await readInt(_VERSION_SIZE)
    const manifest_len = await readInt(_MANIFEST_LEN_SIZE)
    if (header_version != _BRILLO_MAJOR_PAYLOAD_VERSION) {
      throw new Error(`Unexpected major version number: ${header_version}`)
    }
    const metadata_signature_len = await readInt(_METADATA_SIGNATURE_LEN_SIZE)
    this.header = new AbPayloadHeader(
      magic,
      header_version,
      manifest_len,
      metadata_signature_len
    )
  }
  /**
   * A zip.Writer that is tailored for OTA payload.bin read-in.
   * Instead of reading in all the contents in payload.bin, this writer will
   * throw an 'StopIteration' error when the header is read in.
   * The header will be stored into the <payload>.
   * @param {Payload} payload
   * @param {String} contentType
   */
  constructor(contentType = '') {
    super()
    this.offset = 0
    this.contentType = contentType
    this.blob = new Blob([], { type: contentType })
    this.prefixLength = 0
  }

  async writeUint8Array(array: Uint8Array) {
    super.writeUint8Array(array)
    this.blob = new Blob([this.blob, array.buffer], { type: this.contentType })
    this.offset = this.blob.size
    // Once the prefixLength is non-zero, the address of manifest and signature
    // become known and can be read in. Otherwise the header needs to be read
    // in first to determine the prefixLength.
    if (this.offset >= _PAYLOAD_HEADER_SIZE && this.prefixLength == 0) {
      console.log('Parsing header!')
      await this.readHeader(this.blob)
      this.prefixLength =
        _PAYLOAD_HEADER_SIZE +
        this.header!.manifest_len +
        this.header!.metadata_signature_len
      console.log(`Computed metadata length: ${this.prefixLength}`)
    }
    if (this.prefixLength > 0) {
      console.log(`${this.offset}/${this.prefixLength}`)
      if (this.offset >= this.prefixLength) {
        // The prefix has everything we need (header, manifest, signature). Once
        // the offset is beyond the prefix, no need to move on.
        this.blob = this.blob.slice(0, this.prefixLength)
        throw new StopIteration()
      }
    }
  }

  getData() {
    return this.blob
  }
}

export class Payload {
  zipreader: ZipReader
  buffer: Blob | undefined
  private metadata: any
  manifest: update_metadata_pb.DeltaArchiveManifest | undefined
  metadata_signature!: update_metadata_pb.Signatures

  header?: AbPayloadHeader

  /**
   * This class parses the metadata of a OTA package.
   * @param {File} file A OTA.zip file read from user's machine.
   */
  constructor(file: File | URL | ZipFile) {
    if (file instanceof File) {
      this.zipreader = new ZipReader(new BlobReader(file))
    } else if (file instanceof URL) {
      this.zipreader = new ZipReader(new HttpReader(file.href))
    } else {
      this.zipreader = file.reader
    }
  }

  getMetadataLength(): number {
    return (
      _PAYLOAD_HEADER_SIZE +
      this.header!.manifest_len +
      this.header!.metadata_signature_len
    )
  }

  /**
   * Unzip the OTA package, get payload.bin and metadata
   */
  async unzip() {
    let entries = await this.zipreader.getEntries()
    for (let entry of entries) {
      if (entry.filename == 'payload.bin') {
        let writer = new OTAPayloadBlobWriter('')
        try {
          await entry.getData!(writer)
        } catch (e) {
          if (e instanceof StopIteration) {
            // Exception used as a hack to stop reading from zip. NO need to do anything
            // Ideally zip.js would provide an API to partialll read a zip
            // entry, but they don't. So this is what we get
          } else {
            console.log(e)
            throw e
          }
        }
        this.buffer = writer.getData()
        await this.readManifest(this.buffer, writer.header!)
        console.log('AB OTA manifest parsed')
      } else if (entry.filename == 'META-INF/com/android/metadata') {
        this.metadata = await entry.getData!(new TextWriter())
        console.log('OTA Package metadata parsed')
      }
    }
    if (!this.manifest) {
      console.log('Failed to parse AB OTA package, falling back to non-AB')
      try {
        // The temporary variable manifest has to be used here, to prevent the html page
        // being rendered before everything is read in properly
        let manifest = new PayloadNonAB(this.zipreader)
        await manifest.init()
        manifest.nonAB = true
        this.manifest = manifest
      } catch (error) {
        alert('Please select a legit OTA package')
        return
      }
    }
  }

  /**
   * Read the header of payload.bin, including the magic, header_version,
   * manifest_len, metadata_signature_len.
   */
  /**
   * Read in the manifest in an OTA.zip file.
   * The structure of the manifest can be found in:
   * aosp/system/update_engine/update_metadata.proto
   */
  async readManifest(buffer: Blob, header: AbPayloadHeader) {
    this.header = header
    let cursor = _PAYLOAD_HEADER_SIZE
    let manifestBlob = await buffer
      .slice(cursor, cursor + header.manifest_len)
      .arrayBuffer()
    cursor += header.manifest_len
    this.manifest = update_metadata_pb.DeltaArchiveManifest.decode(
      new Uint8Array(manifestBlob)
    )
    let signatureBlob = await buffer
      .slice(cursor, cursor + header.metadata_signature_len)
      .arrayBuffer()
    cursor += header.metadata_signature_len
    this.metadata_signature = update_metadata_pb.Signatures.decode(
      new Uint8Array(signatureBlob)
    );
    (this.manifest! as any).nonAB = false
  }

  parseMetadata() {
    for (let formatter of MetadataFormat) {
      let regex = new RegExp(formatter.prefix + '.+')
      if (this.metadata.match(regex)) {
        ;(this as any)[formatter.key] = trimEntry(
          this.metadata.match(regex)[0],
          formatter.prefix
        )
      } else {
        ;(this as any)[formatter.key] = ''
      }
    }
  }

  async init() {
    await this.unzip()
    this.parseMetadata()
  }
}

export class DefaultMap extends Map {
  /** Reload the original get method. Return the original key value if
   * the key does not exist.
   * @param {Any} key
   */
  getWithDefault(key: any) {
    if (!this.has(key)) return key
    return this.get(key)
  }
}

export class OpType {
  mapType: DefaultMap
  /**
   * OpType.mapType create a map that could resolve the operation
   * types. The operation types are encoded as numbers in
   * update_metadata.proto and must be decoded before any usage.
   */
  constructor() {
    let types = update_metadata_pb.InstallOperation.Type
    this.mapType = new DefaultMap()
    for (let key of Object.keys(types)) {
      this.mapType.set(types[key as any], key)
    }
  }
}

export class MergeOpType {
  mapType: DefaultMap
  /**
   * MergeOpType create a map that could resolve the COW merge operation
   * types. This is very similar to OpType class except that one is for
   * installation operations.
   */
  constructor() {
    let /** Array<{String: Number}>*/ types =
        update_metadata_pb.CowMergeOperation.Type
    this.mapType = new DefaultMap()
    for (let key of Object.keys(types)) {
      this.mapType.set(types[key as any], key)
    }
  }
}

export function octToHex(bufferArray: Uint8Array, space = true, maxLine = 16) {
  let hex_table = ''
  for (let i = 0; i < bufferArray.length; i++) {
    const hex /** String **/ = bufferArray[i].toString(16).toUpperCase()
    if (hex.length === 2) {
      hex_table += hex + (space ? ' ' : '')
    } else {
      hex_table += '0' + hex + (space ? ' ' : '')
    }
    if ((i + 1) % maxLine == 0 && space) {
      hex_table += '\n'
    }
  }
  return hex_table
}

/**
 * Trim the prefix in an entry. This is required because the lookbehind
 * regular expression is not supported in safari yet.
 * @param {String} entry
 * @param {String} prefix
 * @return String
 */
function trimEntry(entry: string, prefix: string) {
  return entry.slice(prefix.length + 1, entry.length)
}
