import { toPojo } from "../../../utils/dao.js"
import { MongooseDao as SampleMongooseDao } from "../../sample/mongoose.sample.js";

export class MongooseDao extends SampleMongooseDao{
    //ver si es necesario agregarle algo
    async readMany(query,limit=null) {
        if(!limit){
            return toPojo(await this.objectModel.find(query).sort({ created_at: -1 }).lean())
        }
        return toPojo(await this.objectModel.find(query).limit(limit).sort({ created_at: -1 }).lean())
    }
}
