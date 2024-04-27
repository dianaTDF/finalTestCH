import {app} from './app/app.js' 
import {PORT} from './config/config.js'
import { logger } from './utils/logger.js'
import { connect } from './database/database.js'


await connect()
app.listen(PORT,()=>{
    logger.info(`conected to port ${PORT} `)
})