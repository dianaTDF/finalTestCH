import { hashSync, compareSync, genSaltSync, compare } from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_PRIVATE_KEY } from "../config/config.js"

export function hash(phrase){
    if(!phrase) throw new Error(`cannot hash invalid parameter:`)
    return hashSync(phrase,genSaltSync(10))
}

export function sameHash(recibed,inMemory){
    if(!recibed) throw new Error(`cannot hash invalid parameter: ${recibed}`)
    return compareSync(recibed,inMemory)
}

export function encrypt(data){
    return new Promise((res,rej)=>{
        if(!data){
            return rej(new Error(`Nothing to jwt encode`))
        }
        jwt.sign(data,JWT_PRIVATE_KEY,{expiresIn:`24h`},(err,encoded)=>{
            if(err){
                const typedError= new Error(err.message)
                typedError['type']=  'INTERNAL_ERROR'
                rej(err)
            }else{
                res(encoded)
            }
        })
    })
}

export function decript(token){
    return new Promise((res,rej)=>{
        if(!token){
            return rej(new Error(`No token to decode`))
        }
        jwt.verify(token, JWT_PRIVATE_KEY,(err,decoded)=>{
            if(err){
                rej(err)
            }else{
                res(decoded)
            }
        })
    })
}