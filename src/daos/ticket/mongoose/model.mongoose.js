import { Schema } from 'mongoose'
import { randomUUID } from 'node:crypto'

export const mongooseSchema = new Schema(
    {
        _id:{type:String, default:randomUUID},
        users:{
            type:String,
            required:true,
            ref:'users',
        },
        amount:{type:Number,required:true},
        products:{
            type:[{
                    name:{type:String},
                    counter:{type:Number,min:1}
                    }],
            required:true,
            default:[]
        },
        created_at:{type:Date,required:true,default:Date.now()},
    },
    {
        strict: 'throw',
        versionKey: false
    })

    mongooseSchema.pre(['find', 'findOne', 'findById'], function (next) {
        this.populate({
            path: 'users',
            select: 'username email' 
        })
        next()
    })
     
    mongooseSchema.post(['add'], function (doc, next) {
        this.populate({
            path: 'users',
            select: 'username email'})
        next()
    });