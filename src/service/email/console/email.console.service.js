import { logger } from "../../../utils/logger.js"

export class  EmailService{
    constructor(){}

    async send({to,subject,html}){
        //despues quitar la linea de abajo
        logger.info(`para: ${to} \n tema: ${subject} \n mensaje: ${html}`)
        logger.debug(`para: ${to} \n tema: ${subject} \n mensaje: ${html}`)
    }
}