import { Schema, model } from "mongoose";

const billSchema = Schema({
    amount: {
        type: Number,
        required: true
    },
    totalPrice:{
        type:Number,
        required: true
    },
    product:{
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    }
})

export default model('bill', billSchema)