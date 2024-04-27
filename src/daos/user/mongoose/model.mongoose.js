import { Schema } from 'mongoose'
import { randomUUID } from 'node:crypto'

export const mongooseSchema = new Schema(
    {
        _id:{type:String, default:randomUUID},
        username:{type:String,required:true},
        first_name:{type:String,required:true},
        last_name:{type:String,required:true},
        age:{type:Number,required:true},
        rol:{
            type: String,
            enum: ['ADMIN','USER-FREE','USER-PREMIUM','SUPORT'],
            required:true
          },
/*         cart_id:{type:String,
                ref:'carts'
        }, */
        documents:{
            type:[{
                    name:{type:String},
                    route:{type:String},
                    }],
            default:[]
            },
        email:{type:String,unique:true,required:true},
        password:{type:String,required:true},
        picture:{type:String,default:''},
        created_at:{type:Date,required:true,default:Date.now()},
        last_login:{type:Date,required:true,default:Date.now()},
    },{
        strict: 'throw',
        versionKey: false
    })

