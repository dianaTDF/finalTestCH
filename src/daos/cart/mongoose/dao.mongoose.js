import { toPojo } from "../../../utils/dao.js"
import { MongooseDao as SampleMongooseDao } from "../../sample/mongoose.sample.js";

export class MongooseDao extends SampleMongooseDao{
    //ver si es necesario agregarle algo

    async findOneAndUpdate(query,data){ 
        return  await this.objectModel.findOneAndUpdate(query,
        { $set:{'products':data} }, 
        { new: true})
    }







    async findProductAndUpdate(query,pid,counter){
        const cart =toPojo(await this.objectModel.findOne(query).lean())
        const newProducts = []
        let existAlready= false

        if(cart.products!=[]){
            cart.products.forEach(p => {
                if(p.product._id== pid){
                    existAlready=true
                    
                    newProducts.push({
                        product:pid,
                        counter:counter
                    })
                }else{
                    newProducts.push(p)
                }
            });    
        }

        if(cart.products==[] || !existAlready )
            newProducts.push({
                product:pid,
                counter:counter
        })

        return await this.findOneAndUpdate(query,newProducts)
    }
    


    
    async findProductAndDelete(query,pid,counter){ 
        const cart =toPojo(await this.objectModel.findOne(query).lean())
        const newProducts = []

        cart.products.forEach(p => {
            if(p.product._id!= pid){
                newProducts.push(p)
            }
        });

        return await this.findOneAndUpdate(query,newProducts)

    }
}