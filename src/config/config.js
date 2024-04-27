import dotenv from 'dotenv'

dotenv.config()
//despues ver lo de hacer config opcional


export const PORT = process.env.PORT
export const MONGODB_CNX_STR= process.env.MONGODB_CNX_STR


export const JWT_PRIVATE_KEY= process.env.JWT_PRIVATE_KEY
export const ONLINE_MODE= process.env.ONLINE_MODE
export const DB= process.env.DB //la db elegida
export function fileDatabaseRoute(file){
  return process.env.FILE_DB+'/'+file+'.json'
}

export const NODEMAILER_GMAIL_OPTIONS = {
    service: 'gmail',
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  }

  
export const COOKIE_SECRET= process.env.COOKIE_SECRET
export const COOKIEOPTS = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 /* 1 dia */,
  signed: true
}