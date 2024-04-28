import { Cart } from "../model/cart.model.js"
import { Ticket } from "../model/ticket.model.js"
import {randomUUID} from 'node:crypto'
import { SampleService } from "./sample/sample.service.js"

export class CartService extends SampleService{
    constructor(dao, userDao, productDao,ticketDao){
        super(dao)
        this.userDao= userDao
        this.productDao= productDao
        this.ticketDao= ticketDao

    }

    async add(cartData){
        try {
            cartData['_id']=randomUUID()
            
            const cart = new Cart(cartData)
            const newCart= await this.dao.create(cart.toPojo())
    
            return cart.toPojo()
                
        } catch (error) {
            const typedError = new Error(error.message)
            typedError['type'] = 'INVALID_ARGUMENT'
            throw typedError
        }
    }

    async updateProducts(searchData,data){
        try {
            return  await this.dao.findOneAndUpdate(searchData,data)
        } catch (error) {
            const typedError = new Error(error.message)
            typedError['type'] = 'INVALID_ARGUMENT'
            throw typedError
        }

    }

    async updateProduct(searchData,pid,counter){
        try {
            if(counter<=0){
                //eliminar
                return  await this.dao.findProductAndDelete(searchData,pid,counter)
            }else{
                //actualizar
                return  await this.dao.findProductAndUpdate(searchData,pid,counter)
            }
        } catch (error) {
            const typedError = new Error(error.message)
            typedError['type'] = 'INVALID_ARGUMENT'
            throw typedError
        }

    }

    async purchase(searchData,products){    //tal vez deberia plantear este en Ticket service
        try {

            const productsList=[]//nueva lista del carrito
            const ticketProductsList=[]// lista de productos del ticket
            let totalPurchase=0
            //foreach
            for (let index = 0; index < products.length; index++) {
                let id = products[index].product;
                let counter = products[index].counter;
                //console.log(products.length)

                
                let product= await this.productDao.readOne({_id:id})
                //si la cuenta da positivo
                if (product.stock >= counter) {
                    //actualizar producto
                    let newStock= product.stock -counter 

                    let update= await this.productDao.updateOne({_id:id},{stock:newStock})
   
                    //agregar al total del ticket
                    totalPurchase= totalPurchase + (counter * Number(product.price))
                    //agregar a productos del ticket
                    ticketProductsList.push({ 
                        name:product.title,
                        counter:counter})

                }else{
                    //lista de productos no comprados que quedan al carrito
                    productsList.push({
                        product:id,
                        counter:counter
                    })
                }
            }
            //ya abiendo actualizado los productos, creamos el ticket
            const newTicket= new Ticket({
                _id :randomUUID(),
                users :searchData.users,
                amount :totalPurchase,
                products :ticketProductsList,
                created_at :Date.now()
            })
            
            //no estoy del todo segura por que no actualiza el carrito
            //PENDIENTE a VER
            const updatedCart= await this.updateProducts(searchData,productsList)
            

            //crear y mandar el correo
            //PENDIENTE a VER

            //return {carrito:productsList,ticket:newTicket.toPojo()} //lo use para probar los datos
            return await this.ticketDao.create(newTicket.toPojo())
        
        } catch (error) {
            const typedError = new Error(error.message)
            typedError['type'] = 'INVALID_ARGUMENT'
            throw typedError
        }

    }
    
}