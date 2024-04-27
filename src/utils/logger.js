import winston from 'winston'

export const logger= winston.createLogger({
    transport:[
        new winston.transports.Console({level: 'http'}),
        new winston.transports.File({level: 'error', filename: './logs/log.txt'})
    ]
})