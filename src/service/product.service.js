import { Product } from "../model/product.model.js"
import { SampleService } from "./sample/sample.service.js"
import {randomUUID} from 'node:crypto'

export class ProductService extends SampleService{
    constructor(dao, userDao, emailService){
        super(dao)
        this.userDao= userDao
        this.emailService= emailService
    }

    async add(productData){
        try {
            productData['_id']=randomUUID()
            const product = new Product(productData)
            const newProduct= await this.dao.create(product.toPojo())
    
            return product.toPojo()
                
        } catch (error) {
            const typedError = new Error(error.message)
            typedError['type'] = 'INVALID_ARGUMENT'
            throw typedError
        }
    }

    async put(searchData,data){
        const updatedProduct= await this.dao.updateOne(searchData,data)
        if(!updatedProduct){
            return {message:'Producto no encontrado'}
        }
        //TODO: logica para notificar usuario
    }

    async getMany(){
        //todo: solo traer nombre, correo y rol
        return await this.dao.readMany()
    }
    
}