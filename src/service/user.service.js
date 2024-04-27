import { User } from "../model/user.model.js"
import {randomUUID} from 'node:crypto'
import { hash, sameHash } from "../utils/cryptography.js"

export class UserService{
    constructor(userDao,emailService,cartDao){
        this.userDao= userDao
        this.emailService= emailService
        this.cartDao= cartDao
    }

    async addUser(userData){
        try {
            userData['_id']=randomUUID()

            userData['created_at']=Date.now()
            userData['last_login']=Date.now()
            
            if (userData.password) {
                userData.password = await hash(userData.password)
            }
            const user = new User(userData)
            const newUser= await this.userDao.create(user.toPojo())

            await this.cartDao.create({_id:randomUUID(),users:newUser._id}) 
            //es valido plantearse si todos deberian tener carts, o si deberia evitar los usuarios gratuitos, en este caso seran todos 
            await this.emailService.send({ to: newUser.email , subject: 'Registro exitoso', html: `${newUser.username}, se ha registrado exitosamente en la plataforma` })

            return user.toPojo()
        } catch (error) {
            const typedError = new Error(error.message)
            typedError['type'] = 'INVALID_ARGUMENT'
            throw typedError
        }
    }

    async getUser(searchData){
        return await this.userDao.readOne(searchData)
    }

    async getUsers(searchData){
        //todo: solo traer nombre, correo y rol
        return await this.userDao.readMany(searchData)
    }
    async getUsersFilter(searchData,attributes){
        //todo: solo traer nombre, correo y rol
        return await this.userDao.readManySafe(searchData,attributes)
    }

    async putUser(searchData,userData){
        return await this.userDao.updateOne(searchData,userData)
    }

    async deleteUser(searchData){
        const user = await this.userDao.deleteOne(searchData)
        if (user){
            await this.emailService.send({ to: user.email , subject: 'Eliminacion de cuenta, vuelva pronto', html: `${user.email} Se ha eliminado su cuenta` })
            return user
        }
    }

    async cleanUsersByLastLogin(){
        //const limitTime= 2*24*60*60*1000 
        const limitTime= 2*60*60*1000 //2 horas 
        return await this.userDao.deleteByLastLogin(limitTime)
    }

    async deleteUsers(searchData){
        return await this.userDao.deleteMany(searchData)
    }

    async register(userData){
        try {
            userData['_id']=randomUUID()

            userData['created_at']=Date.now()
            userData['last_login']=Date.now()    

            if (userData.password) {
                userData.password = await hash(userData.password)
            }

            const user = new User(userData)
            const newUser= await this.userDao.create(user.toPojo())
            await this.emailService.send({ to: newUser.email , subject: 'Registro exitoso', html: `${newUser.email} Se ha registrado exitosamente en la plataforma` })

            return user.toPojo()

        } catch (err) {
            const typedError= new Error(err.messsage)
            typedError['type'] = 'INVALID_ARGUMENT'
            throw typedError
        }
    }

    async authenticate({username,password}){
        const user = await this.userDao.readOne({username})
        if(!user){
            const typedError= new Error('Error: no user finded')
            typedError['type']= 'FAILED_AUTHENTICATION'
            throw typedError
        }
        if(!sameHash(password,user.password)){
            const typedError= new Error('Error: authentication failed')
            typedError['type']= 'FAILED_AUTHENTICATION'
            throw typedError
        }

        //actualizar ultimo logeo
        this.putUser(user,{last_login: Date.now()}) 

        return user
    }
}