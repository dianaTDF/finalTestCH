import { encrypt } from "../utils/cryptography.js"
import { COOKIEOPTS } from "../config/config.js"

export async function tokenUserInCookie(req,res,next){
    try {
        const token= await encrypt(req.user)
        res.cookie('auth',token,COOKIEOPTS)
        //res.cookie('rol',req.user.rol,{maxAge: 1000 * 60 * 60 * 24 /* 1 dia */ })
        //res.cookie('id',req.user._id,{maxAge: 1000 * 60 * 60 * 24 /* 1 dia */})
        next()
    } catch (err) {
        next(err)        
    }
}

export async function tokenInCookieDelete(req,res,next){
    res.clearCookie('auth',COOKIEOPTS)
    next()
}