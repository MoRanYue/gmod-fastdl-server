import { config as c } from "dotenv";
c({
  path: `./.env`,
  encoding: 'utf-8'
})

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import fs from 'node:fs'
import Logger from '@U/log4node'
import config from '@C/config'
import router from '@R/router'
import path from "node:path";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(router);

const logger = Logger.getLogger(config.log, config.errorLog)

async function init() {
  if (!fs.existsSync(config.filePath)) {
    throw new Error("“.env”文件中的“FILE_PATH”的路径无法访问")
  }
  logger.info("MOD所在文件夹在“%s”", config.filePath)

  if (config.generateScript) {
    logger.info("开始生成Lua脚本")

    fs.readdir(config.filePath, (err, files) => {
      if (err) {
        throw new Error("无法生成“FILE_PATH”的路径的Lua脚本")
      }

      const script = fs.createWriteStream('./fastdl.lua', {
        encoding: 'utf-8',
        flags: 'w',
        autoClose: true
      })

      script.on('error', () => {
        throw new Error("Lua脚本文件无法写入")
      })

      script.write("if SERVER then")

      files.forEach(filename => {
        const fp = path.join(config.filePath, filename)

        fs.stat(fp, (err, stats) => {
          if (err) {
            throw new Error("“FILE_PATH”的路径的文件访问失败")
          }

          if (stats.isDirectory()) {
            if (filename == 'maps') {
              fs.readdir(fp, (err, files_) => {
                files_.forEach(filename_ => {
                  const fp_ = path.join(fp, filename_)

                  fs.stat(fp_, (err, stats_) => {
                    console.log('fsmaoifnjsaoignsaoignsaoipgnsaoignsaoignsafoigsnaoi')
                    console.log(filename_)

                    if (stats_.isFile() && ['bsp', 'bz2'].includes(<string>filename_.split('.').pop()?.trim().toLowerCase())) {
                      script.write(`\n  resource.AddFile("maps/${filename_}")`)
                    }
                  })
                });
              })
            }
          }
        })
      });
    })
  }
  else {
    app.listen(config.port, config.host, () => logger.info("服务器已监听“%s:%d”", config.host, config.port));

    process.on('uncaughtException', (err: Error) => {
      logger.error("发生错误：%s\n错误原因：%s\n堆栈回溯：\n%s", err.name, err.cause, err.stack)
    })
  }
}
init().then(() => {
  if (config.generateScript) {
    logger.success("Lua脚本生成完成，请将当前目录的“fastdl.lua”文件放置到“服务端/garrysmod/lua/autorun”中")
    script.write('\nend')
    return
  }
  logger.success("服务器启动完成 <3")
})
