import { Request, Response } from "express";
import { Dict } from "@O/TDict";
import { getFileRange } from "@U/pipe";
import stream from 'stream'
import fs from "node:fs";

export function getRealIpAddress(req: Request) {
  const ip: Dict = {
    xRealIp: req.headers['x-real-ip'],
    xForwardedFor: req.headers['x-forwarded-for'],
    xForwarded: req.headers['x-forwarded'],
    forwardedFor: req.headers['forwarded-for'],
    forwarded: req.headers['forwarded'],
    clientIp: req.headers['client-ip'],
    remoteAddress: req.socket.remoteAddress
  }

  return ip.xRealIp
  ?? ip.xForwardedFor?.split(/, */).shift() 
  ?? ip.xForwarded?.split(/, */).shift() 
  ?? ip.forwardedFor?.split(/, */).shift()
  ?? ip.forwarded?.split(/, */).shift()
  ?? ip.clientIp
  ?? ip.remoteAddress
  ?? '0.0.0.0:0'
}

export async function streamData(req: Request, res: Response, data: Buffer, mimeType: string = 'application/octet-stream') {
  res.setHeader('Content-Type', mimeType)
  res.setHeader('Cache-Control', 'no-cache')

  const chunkSize = 5 * 1024 * 1024 //5MB
  let size = data.byteLength

  const range = req.headers['range'] ?? ''
  if (!range) {
    res.end(data)
    return
  }

  const { start, end } = await getFileRange(range, chunkSize)
  const contentLength = end - start + 1
  if (start >= size || end >= size) {
      res.statusCode = 416
      res.setHeader('Content-Range', `bytes */${size}`)
      res.end()
      return 
  }
  res.statusCode = 206
  res.setHeader('Content-Range', `bytes ${start}-${end || size - 1}/${size}`)

  res.setHeader('Accept-Ranges', 'bytes')
  res.setHeader('Content-Length', contentLength)
  res.setHeader("Access-Control-Expose-Headers", "Content-Disposition")

  // const stream = fs.createReadStream(data, {start, end})
  // stream.pipe(res)
  res.end(data.subarray(start, end))
}