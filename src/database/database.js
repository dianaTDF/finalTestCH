import { logger } from "../utils/logger.js";
import {connect as mongooseConection} from 'mongoose'
import { NODE_ENV, MONGODB_CNX_STR,PORT} from '../config/config.js'

export async function connect(){
    if(NODE_ENV ==='production'){
        await mongooseConection(MONGODB_CNX_STR)
        logger.info('conected to mongoDB')
    }else{
        logger.info('conected localy')
    }

}