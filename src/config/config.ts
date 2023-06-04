import path from "node:path"

export default {
    host: process.env.HOST ?? '0.0.0.0',
    port: parseInt(process.env.PORT ?? '14514'),
    filePath: path.resolve(process.env.FILE_PATH ?? ''),
    bzip: Boolean(parseInt(process.env.BZIP ?? '1')),
    generateScript: Boolean(parseInt(process.env.GENERATE_SCRIPT ?? '0')),
    verbose: Boolean(parseInt(process.env.VERBOSE ?? '0')),
    log: process.env.LOG ?? './logs/log.log',
    errorLog: process.env.ERROR_LOG ?? './logs/error.log',
}