import { Router } from "express"
import { sessionPost } from "../../controller/session.controller.js"
import { tokenInCookieDelete, tokenUserInCookie } from "../../middlewares/token.js"

export const router= Router()

router.post('/',
    sessionPost,
    tokenUserInCookie,
    (req,res)=>{res['created'](req['user'])}
)

router.delete('/current',
    tokenInCookieDelete,
    (req,res)=>{res['ok']()}
)