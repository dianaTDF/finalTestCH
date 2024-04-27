import fs from 'fs/promises'
import { matches } from '../../utils/dao.js'
//TODO: analizar a detalle la clase
export class FileDao {

    constructor(path) {
      this.path = path
    }
  
    async #read() {
      return JSON.parse(await fs.readFile(this.path, 'utf-8'))
    }
  
    async #write(daoObject) {
      await fs.writeFile(this.path, JSON.stringify(daoObject, null, 2))
    }
  
    async create(userPojo) {
      const daoObject = await this.#read()
      daoObject.push(userPojo)
      await this.#write(daoObject)
      return userPojo
    }
  
    async readOne(query) {
      const daoObject = await this.#read()
      const buscado = daoObject.find(matches(query))
      return buscado
    }
  
    async readMany(query) {
      const daoObject = await this.#read()
      const buscados = daoObject.filter(matches(query))
      return buscados
    }
    async readManySafe(query,attributes) {
      throw new Error('NOT IMPLEMENTED')
    }
  
    async updateOne(query, data) {
      throw new Error('NOT IMPLEMENTED')
    }
  
    async updateMany(query, data) {
      throw new Error('NOT IMPLEMENTED')
    }
  
    async deleteOne(query) {
      const daoObject = await this.#read()
      const indexBuscado = daoObject.findIndex(matches(query))
      if (indexBuscado !== -1) {
        const [buscado] = daoObject.splice(indexBuscado, 1)
        await this.#write(daoObject)
        return buscado
      }
      return null
    }
  
    async deleteMany(query) {
      throw new Error('NOT IMPLEMENTED')
    }
  }