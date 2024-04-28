import { toPojo } from "../../utils/dao.js"

export class MongooseDao {
  constructor(objectModel) {
    this.objectModel = objectModel
  }

  async create(data) {
    const newObj = await this.objectModel.create(data)
    return toPojo(newObj)
  }

  async readOne(query) {
    return toPojo(await this.objectModel.findOne(query).lean())
  }

  async readMany(query) {
    return toPojo(await this.objectModel.find(query).lean())
  }

  async readManySafe(query,attributes) {
    const filter={}
    attributes.forEach(item => {
      filter[item]=1
    });
    return toPojo(await this.objectModel.find(query,filter).lean())
  }

  async updateOne(query, data) {
    return toPojo(await this.objectModel.updateOne(query,data).lean())
}

async updateMany(query, data) {
    return toPojo(await this.objectModel.updateMany(query,data).lean())
  }

  async deleteOne(query) {
    return toPojo(await this.objectModel.findOneAndDelete(query).lean())
  }

  async deleteMany(query) {
    return  toPojo(await this.objectModel.deleteMany(query).lean())
  }
}
