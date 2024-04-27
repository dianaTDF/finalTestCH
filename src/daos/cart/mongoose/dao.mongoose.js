import { MongooseDao as SampleMongooseDao } from "../../sample/mongoose.sample.js";

export class MongooseDao extends SampleMongooseDao{
    //ver si es necesario agregarle algo

    async findOneAndUpdate(query,data){ 
        return  await this.objectModel.findOneAndUpdate(query,
        { $set:{'products':data} }, 
        { new: true})
    }
}