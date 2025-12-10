import { ZipReader, ZipWriter, Entry, BlobWriter,BlobReader, FileEntry, HttpReader } from '@zip.js/zip.js'
import { Payload } from './payload'

export class ZipFile {
  public reader: ZipReader<unknown>

  constructor(private file: File | URL) {
    this.reader = getZipReader(file)
  }
  getFileName() {
    return getFileName(this.file)
  }
  getFileSize() {
    if (this.file instanceof File) {
      return this.file.size
    } else {
      // TODO(zhangkelvin) Support getting file size from URL
      return 0
    }
  }
}

export async function trimZip(
  file: ZipReader<Blob>,
  p: (entry: Entry) => boolean
): Promise<ZipWriter<Blob>> {
  const reader = file
  const writer = new ZipWriter(new BlobWriter('application/zip'))
  const entries = await reader.getEntries()
  for (const entry of entries.filter(entry => !!entry && p(entry))) {
    if (entry.directory) {
      continue;
    }
    const blobWriter = new BlobWriter()
    const data = (await (entry as FileEntry).getData!(blobWriter)) as Blob
    console.log(`Adding ${entry.filename}, ${data.size}`)
    writer.add(entry.filename, new BlobReader(await blobWriter.getData()), {
      level: 0 // no compression
    })
  }
  return writer
}

function getZipReader(file: File | URL) {
  if (file instanceof File) {
    return new ZipReader(new BlobReader(file))
  } else {
    return new ZipReader(new HttpReader(file.href))
  }
}

export function getFileName(file: File | URL) {
  if (file instanceof File) {
    return file.name
  } else {
    return file.pathname
  }
}

export async function trimTargetFiles(file: File | URL): Promise<Blob> {
  const writer = await trimZip(getZipReader(file), entry => {
    return entry.filename.startsWith('META/') || entry.filename.endsWith('.map') || entry.filename.endsWith(".prop") || entry.filename == "prop.default"
  })
  return await writer.close()
}

export async function trimOTAPackage(payload: Payload): Promise<Blob> {
  const writer = await trimZip(payload.zipreader, entry => {
    return entry.filename != 'payload.bin'
  })
  await writer.add(
    'payload.bin',
    new BlobReader(payload.buffer!.slice(0, payload.getMetadataLength())),
    // Most toolings assume that payload.bin and other entries are not
    // compressed, so use level 0
    {
      level: 0
    }
  )
  const blob: Blob = await writer.close()
  return blob
}

export function downloadFile(
  blob: Blob,
  downloadNode: HTMLAnchorElement,
  filename: string
) {
  const url = window.URL.createObjectURL(blob)
  downloadNode.href = url
  downloadNode.download = filename
  downloadNode.click()
  window.URL.revokeObjectURL(url)
}

export function ensureSuffix(str: string, suffix: string) {
  if (str.endsWith(suffix)) {
    return str
  } else {
    return str + suffix
  }
}
