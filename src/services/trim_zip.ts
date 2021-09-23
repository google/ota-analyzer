import * as zip from '@zip.js/zip.js/dist/zip.js'
import { Payload } from './payload'

export async function trimZip(
  file: File,
  p: (entry: zip.Entry) => boolean
): Promise<zip.ZipWriter> {
  const reader = new zip.ZipReader(new zip.BlobReader(file))
  const writer = new zip.ZipWriter(new zip.BlobWriter())
  const entries = await reader.getEntries()
  for (const entry of entries.filter(entry => !!entry && p(entry))) {
    const blobWriter = new zip.BlobWriter()
    const data = (await entry.getData!(blobWriter)) as Blob
    console.log(`Adding ${entry.filename}, ${data.size}`)
    writer.add(entry.filename, new zip.BlobReader(blobWriter.getData()), {
      level: 0 // no compression
    })
  }
  return writer
}

export async function trimTargetFiles(file: File): Promise<Blob> {
  const writer = await trimZip(file, entry => {
    return entry.filename.startsWith('META/') || entry.filename.endsWith('.map')
  })
  return await writer.close()
}

export async function trimOTAPackage(payload: Payload): Promise<Blob> {
  const writer = await trimZip(payload.file, entry => {
    return entry.filename != 'payload.bin'
  })
  await writer.add(
    'payload.bin',
    new zip.BlobReader(payload.buffer!.slice(0, payload.getMetadataLength()))
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
