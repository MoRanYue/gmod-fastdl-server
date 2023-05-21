import { Router } from "express";
import Logger from "@U/log4node.js";
import config from "@C/config"
import path from 'node:path'
import fs from 'node:fs'
import { getRealIpAddress, streamData } from "@U/utils";

const logger = Logger.getLogger()
const router = Router()

router.get('*', async (req, res) => {
  const pathname = req.path
  if (config.verbose) {
    logger.info("\n====================\n客户端连接：%s\n访问路由：%s", getRealIpAddress(req), pathname)
  }

  const file = path.resolve(config.filePath, pathname.trim().replace(/^[\/\\]|[\/\\]$/, ''))
  if (!fs.existsSync(file)) {
    logger.error("文件“%s”未找到", file)
    res.end("FILE NOT FOUND")
    return
  }

  fs.readFile(file, (err, data: Buffer) => {
    if (err) {
        throw err
    }

    streamData(req, res, data)
  })
});

export default router