import { logger } from "../../utils/logger.js"

import { ONLINE_MODE, NODEMAILER_GMAIL_OPTIONS } from "../../config/config.js"
import { EmailService as NodemailerService } from "./nodemailer/email.nodemailer.service.js"
import { EmailService as ConsoleService } from "./console/email.console.service.js"

let emailService

//if(NODE_ENV ==='production'){  //aun no tengo configurado el nodemailer, asi que de momento mandamo consola 
if(false){
    if(!emailService){
        emailService= new NodemailerService(NODEMAILER_GMAIL_OPTIONS)
        logger.info('email service: gmail')
    }
}else{
    emailService= new ConsoleService()
    logger.info('email service: console')
}

export function emailServiceFn(){
    return emailService
}
