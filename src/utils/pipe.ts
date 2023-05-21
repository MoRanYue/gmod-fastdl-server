export async function getFileRange(range: string, chunkSize: number) {
  const match = /bytes=([0-9]*)-([0-9]*)/.exec(range)
  const requestRange = {
    start: 0,
    end: 0
  }
  if (match) {
    if (match[1]) {
      requestRange.start = parseInt(match[1])
    } else {
      requestRange.start = 0
    }
    if (match[2]) {
      requestRange.end = parseInt(match[2])
    } else {
      requestRange.end = requestRange.start + chunkSize
    }
  }
  return requestRange
}