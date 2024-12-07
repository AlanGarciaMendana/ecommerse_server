import winston from "winston";


const customValues = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'magenta',
        debug: 'blue'
    }
};
const logger = winston.createLogger({

    
    levels: customValues.levels,

    transports:[
        
        new winston.transports.Console ({level: "http", format: winston.format.combine(
            winston.format.colorize ({colors: customValues.colors}),
            winston.format.simple()
        )}),
        new winston.transports.File({level: "warn", filename:"./errorLogs.log"})
       
    ]
})

const addLogger = (req,res,next) => {
    req.logger = logger
    req.logger.http(`${req.method} en ${req.url} `)
    next() 
}



export default addLogger