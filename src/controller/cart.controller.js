import { cartService } from "../service/index.js"

export async function getController(req,res,next){
    try {
        const carts= await cartService.get(req.params)
        res.result(carts)
    } catch (error) {
        next(error)
    }
}
export async function postController(req,res,next){
    try {
        const carts= await cartService.add(req.body)
        res.created(carts)
    } catch (error) {
        next(error)
    }
}
export async function putController(req,res,next){
    try {
        const carts= await cartService.put(req.params,req.body)
        res.result(carts)
    } catch (error) {
        next(error)
    }
}

export async function putProductController(req,res,next){
    try {
        //TODO,logica para upgradear producto
        //ir al service
        const carts= await cartService.put(req.params,req.body)
        res.result(carts)
    } catch (error) {
        next(error)
    }
}
export async function cleanProductController(req,res,next){
    //TODO,logica para eliminar producto
    //ir al service
    try {
        const carts= await cartService.delete()
        res.deleted(carts)
    } catch (error) {
        next(error)
    }
}
export async function cleanController(req,res,next){
    try {
        const carts= await cartService.delete()
        res.deleted(carts)
    } catch (error) {
        next(error)
    }
}

/* ------------------------ cart del usuario loggeado ----------------------- */
export async function getUserCartController(req,res,next){
    try {
        const carts= await cartService.get({users:req.user._id})
        res.result(carts)
    } catch (error) {
        next(error)
    }
}

export async function putUserCartController(req,res,next){
    try {
       // console.log(req.body)
        const products=req.body
        const carts= await cartService.updateProducts({users:req.user._id},products)
      
       res.result(carts)
    } catch (error) {
        next(error)
    }
}


export async function purchaseController(req,res,next){
    try {
        const products=req.body
        const ticket= await cartService.purchase({users:req.user._id},products)
      console.log(ticket)
       res.result(ticket)
    } catch (error) {
        next(error)
    }
}

export async function putUserCartSingleProductController(req,res,next){
    try {
        const carts= await cartService.put({users:req.user._id},req.body)
        res.result(carts)
    } catch (error) {
        next(error)
    }
}
