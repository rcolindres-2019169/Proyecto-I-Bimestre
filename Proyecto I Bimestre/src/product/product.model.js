import {Schema, model} from "mongoose";

const productSchema = Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    mark:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
    
})

export default model('product', productSchema)