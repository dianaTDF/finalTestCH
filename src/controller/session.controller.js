import { userService } from "../service/index.js"

export const sessionPost = async (req,res,next)=>{
    try {
        const user = await userService.authenticate(req.body)
        req.user = user
        next()
    } catch (err) {
        next(err)
    }
}