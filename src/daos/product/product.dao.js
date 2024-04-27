import { DB, fileDatabaseRoute } from "../../config/config.js"
import { logger } from "../../utils/logger.js"

import { model } from 'mongoose'

import { FileDao } from "./file/dao.file.js"
import { MongooseDao } from "./mongoose/dao.mongoose.js"
import { mongooseSchema } from "./mongoose/model.mongoose.js"

//const ROUTE= 'ruta de archivo para file Dao'

//considerar hacer una funcion que use daoName como parametro de una fn
//que lo inserte en una ruta donde esten todos los archivos .json
//exp: fn([ruta caroetas json],[daoName]) return "[ruta caroetas json]+'/'+[daoName]+'.json'"

const daoName= 'products'

let dao

if (DB == "mongoose"){
    if (!dao){
        const classModel = model(daoName, mongooseSchema)
        dao = new MongooseDao(classModel)
        logger.info(`${daoName} works in : mongoDB`)
    }
}else{
    dao= new FileDao(fileDatabaseRoute(daoName))
    logger.info(`${daoName} works in : json file system`)
}

export function getDao(){
    return dao
}