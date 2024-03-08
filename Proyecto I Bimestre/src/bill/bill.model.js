import { Schema, model } from "mongoose";

const billSchema = Schema({
    
    totalPrice:{
        type:Number,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    date:{
        type: Date, 
        default: Date.now 
    },
    buy:{
        type: Schema.Types.ObjectId,
        ref: 'buy',
        required: true
    }
    
}, {
    versionKey: false
})

export default model('bill', billSchema)