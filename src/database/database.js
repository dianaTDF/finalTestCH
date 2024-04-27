import { logger } from "../utils/logger.js";
import {connect as mongooseConection} from 'mongoose'
import { NODE_ENV, MONGODB_CNX_STR} from '../config/config.js'

export async function connect(){
    if(true){
        await mongooseConection(MONGODB_CNX_STR)
        logger.info('conected to mongoDB')
    }else{
        logger.info('conected localy')
    }

}