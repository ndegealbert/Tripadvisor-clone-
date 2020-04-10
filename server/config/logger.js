const {createLogger,transports,format} = require('winston')

const logger =  createLogger({
    transports:[
        /**new transports.file({
            file;filename
        })*/
        new transports.Console({
            level:'info',
            format:format.combine(format.timestamp(),format.json()) //format can also  be simple json
        })
    ]
})
module.exports = logger