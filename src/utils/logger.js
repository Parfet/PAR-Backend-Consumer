const winston = require('winston')

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transport: [
        new winston.transports.Console({
            format: winston.format.json()
        })
    ]
})

module.exports = logger;