import {randomUUID} from 'node:crypto'

export class SampleService{
    constructor(dao){
        this.dao= dao
    }

    async add(data){
        data['_id']=randomUUID()
        const newItem= await this.dao.create(data)
        return newItem
    }

    async get(searchData){
        return await this.dao.readOne(searchData)
    }

    async getMany(searchData){
        return await this.dao.readMany(searchData)
    }

    async put(searchData,data){
        return await this.dao.updateOne(searchData,data)
    }

    async delete(searchData){
        const item = await this.dao.deleteOne(searchData)
        if (item){
            return item
        }
    }

    async deleteMany(searchData){
        return await this.dao.deleteMany(searchData)
    }
}