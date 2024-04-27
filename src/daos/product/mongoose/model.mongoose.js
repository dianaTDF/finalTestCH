import { Schema } from 'mongoose'

export const mongooseSchema = new Schema(
    {
        _id:{type:String,required:true},
        users:{type:String,
                required:true,
                ref:'users'},
        title:{type:String,required:true},
        description:{type:String,required:true},
        code:{type:String,required:true},
        price:{type:Number,required:true},
        status:{type:String,required:true},
        stock:{type:Number,required:true},
        category:{type:String,required:true},
        thumbnails:{type:[String], default:[]},
    },{
        strict: 'throw',
        versionKey: false
    })

mongooseSchema.pre(['find', 'findOne', 'findById'], function (next) {
    this.populate('users', 'username')
    next()
})