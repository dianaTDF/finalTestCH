import { toPojo } from "../../../utils/dao.js"
import { MongooseDao as SampleMongooseDao } from "../../sample/mongoose.sample.js";

export class MongooseDao extends SampleMongooseDao{
    //ver si es necesario agregarle algo

    async deleteByLastLogin(limitTime){
        const limit= Date.now()-limitTime
        const deleted=  toPojo(await this.objectModel.find({last_login: { $lt: limit }},{username:1}).lean())
        const users= toPojo(await this.objectModel.deleteMany({last_login: { $lt: limit }}).lean())
        return deleted
    }

    async updateOne(query, data) {
        const edited= toPojo(await this.objectModel.updateOne(query,data).lean())
        return toPojo(await this.objectModel.findOne(query,{username:1}).lean())
        //throw new Error('NOT IMPLEMENTED')
    }
}