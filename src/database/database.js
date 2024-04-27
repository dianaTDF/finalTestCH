import { logger } from "../utils/logger.js";
import {connect as mongooseConection} from 'mongoose'
import { ONLINE_MODE, MONGODB_CNX_STR,PORT} from '../config/config.js'

export async function connect(){
    if(ONLINE_MODE){
        await mongooseConection(MONGODB_CNX_STR)
        logger.info('conected to mongoDB')
    }else{
        logger.info('conected localy')
    }

}