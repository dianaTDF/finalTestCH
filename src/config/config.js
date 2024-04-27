import { config } from 'dotenv'
// import dotenv from 'dotenv'

export const ONLINE_MODE= process.env.ONLINE_MODE || false
export const NODE_ENV= process.env.NODE_ENV || 'development'
if(NODE_ENV=== 'development'){
  config() 
}
//despues ver lo de hacer config opcional


export const PORT = process.env.PORT || 8080
export const MONGODB_CNX_STR= process.env.MONGODB_CNX_STR || "mongodb://localhost/asdasd"


export const JWT_PRIVATE_KEY= process.env.JWT_PRIVATE_KEY  || ""
export const DB= process.env.DB || "mongoose" 
export function fileDatabaseRoute(file){
  if(!process.env.FILE_DB) return "./fileDb/"+file+'.json'
  return process.env.FILE_DB+'/'+file+'.json'
}

export const NODEMAILER_GMAIL_OPTIONS = {
    service: 'gmail',
    port: process.env.EMAIL_PORT || 587,
    auth: {
      user: process.env.EMAIL_USER || "",
      pass: process.env.EMAIL_PASS || ""
    }
  }

  
export const COOKIE_SECRET= process.env.COOKIE_SECRET || ""
export const COOKIEOPTS = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 /* 1 dia */,
  signed: true
}
