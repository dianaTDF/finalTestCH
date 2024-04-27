import { Ticket } from "../model/ticket.model.js"
import {randomUUID} from 'node:crypto'
import { SampleService } from "./sample/sample.service.js"

export class TicketService extends SampleService{
    constructor(dao, userDao,emailService){
        super(dao)
        this.userDao= userDao
        this.emailService= emailService
    }

    async add(ticketData){
        try {
            ticketData['_id']=randomUUID()
            ticketData['created_at']=Date.now()
        
            const ticket = new Ticket(ticketData)
            const newTicket= await this.dao.create(ticket.toPojo())
    
            await this.emailService.send({ to: newTicket.users.email , subject: 'compra realizada', html: `${newTicket.users.username}, se ha realizado exitosamente su compra` })

            return newTicket

        } catch (error) {
            const typedError = new Error(error.message)
            typedError['type'] = 'INVALID_ARGUMENT'
            throw typedError
        }
    }


}