import { productService } from "../service/index.js"

export async function getAllController(req,res,next){
    try {
        const products= await productService.getMany(req.params)
        res.result(products)
    } catch (error) {
        next(error)
    }
}
export async function getController(req,res,next){
    try {
        const products= await productService.get(req.params)
        res.result(products)
    } catch (error) {
        next(error)
    }
}
export async function postController(req,res,next){
    try {
        req.body.users= req.user._id
        const products= await productService.add(req.body)
        res.created(products)
    } catch (error) {
        next(error)
    }
}
export async function putController(req,res,next){
    try {
        const products= await productService.put(req.params,req.body)
        res.result(products)
    } catch (error) {
        next(error)
    }
}
export async function deleteController(req,res,next){
    try {
        const products= await productService.delete()
        res.deleted(products)
    } catch (error) {
        next(error)
    }
}