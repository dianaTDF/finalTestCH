import nodemailer from 'nodemailer'

export class  EmailService{
    constructor(opt){
        this.origin= opt.auth.user
        this.transporter= nodemailer.createTransport(opt)
    }

    async send({to,subject,html}){
        await this.transporter.sendMail({
            from: this.origin,
            to,
            subject,
            html
        })
    }
}