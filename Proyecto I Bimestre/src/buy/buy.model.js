import {Schema, model } from 'mongoose';

const buySchema = Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    totalPrice:{
        type:Number,
    },
    items: [{
        
        products:{
            type: Schema.Types.ObjectId,
            ref: 'product',
            required: true
        },
        amount: {
            type: Number,
            required: true,
            default: 1
        },
    }]
}, {
    versionKey: false
})

export default model('buy', buySchema)