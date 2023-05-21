export default {
    host: process.env.HOST ?? '0.0.0.0',
    port: parseInt(process.env.PORT ?? '14514'),
    filePath: process.env.FILE_PATH ?? '',
    bzip: Boolean(parseInt(process.env.BZIP ?? '1')),
    verbose: Boolean(parseInt(process.env.VERBOSE ?? '0')),
    log: process.env.LOG ?? './logs/log.log',
    errorLog: process.env.ERROR_LOG ?? './logs/error.log',
}