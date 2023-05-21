import { config as processConfig } from "dotenv";
processConfig({
  path: './.env',
  encoding: 'utf-8'
})

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import fs from 'node:fs'
import Logger from '@U/log4node'
import config from '@C/config'
import router from '@R/router'

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(router);

const logger = Logger.getLogger(config.log, config.errorLog)

async function init() {
  if (!fs.existsSync(config.filePath)) {
    throw new Error("“.env”文件中的“FILE_PATH”对应文件夹无法访问")
  }
  logger.info("MOD所在文件夹在“%s”", config.filePath)

  app.listen(config.port, config.host, () => logger.info("服务器已监听“%s:%d”", config.host, config.port));

  process.on('uncaughtException', (err: Error) => {
    logger.error("发生错误：%s\n错误原因：%s\n堆栈回溯：\n%s", err.name, err.cause, err.stack)
  })
}
init().then(() => {
  logger.success("服务器启动完成 <3")
})
