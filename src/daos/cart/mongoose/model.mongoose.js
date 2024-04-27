import { Schema } from 'mongoose'

export const mongooseSchema = new Schema(
    {
        _id:{type:String,required:true},
        users:{
                    type:String,
                    required:true,
                    ref:'users',
                },
        products:{
                    type:[{
                            _id: false,
                            product:{type:String,
                                    ref:'products'},
                            counter:{type:Number,min:1}
                            }],
                    required:true,
                    default:[]
                },
    },{
        strict: 'throw',
        versionKey: false
    })

mongooseSchema.pre(['find', 'findOne', 'findById'], function (next) {
    this.populate({
        path: 'products.product',
        select: 'title price stock category thumbnails'})
    .populate({
        path: 'users',
        select: 'username email' 
    })
    next()
})
 
mongooseSchema.post(['findOneAndUpdate'], function (doc, next) {
    this.populate({
        path: 'products.product',
        select: 'title price stock category thumbnails'})
    next()
});