import { ticketService } from "../service/index.js"


export async function getAllController(req,res,next){
    try {
    const users= await ticketService.getMany(req.params)
        res.result(users)
    } catch (error) {
        next(error)
    }
}

export async function postController(req,res,next){
    try {
        req.body.users= req.user._id
        const tickets= await ticketService.add(req.body)
        res.created(tickets)
    } catch (error) {
        next(error)
    }
}

export async function getLastTicketUserController(req,res,next){
    try {
        const tickets= await ticketService.get({users:req.user._id})
        res.result(tickets)
    } catch (error) {
        next(error)
    }
} 

export async function getTicketsUserController(req,res,next){
    try {
        const tickets= await ticketService.getMany({users:req.user._id})
        res.result(tickets)
    } catch (error) {
        next(error)
    }
}