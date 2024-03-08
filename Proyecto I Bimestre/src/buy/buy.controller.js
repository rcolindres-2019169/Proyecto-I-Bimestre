'use strict'

import Buy from './buy.model.js'
import Product from '../product/product.model.js'

export const save = async(req, res)=>{  
    try{

        let{ products, amount} = req.body 
        let product = await Product.findById(products);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        let totalPrice = product.price * amount;
        product.stock -= amount;
        await product.save();

        let buy = new Buy({ ...req.body, totalPrice })
        buy.items.push({ products: product._id, amount: amount});
        await buy.save()
        return res.send({message: `Registered successfully,`})
        
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering buy', err: err})
    }

}



export const deleteU = async(req,res)=>{
    try{
        let { id } = req.params
        let deletedBuy = await Buy.findOneAndDelete({_id: id})
        if(!deletedBuy) return res.status(404).send({message: 'Buy not found and not deleted'})
        for (const item of deletedBuy.items) {
            const product = await Product.findById(item.products);
            if (!product) {
                console.error(`Producto con ID ${item.products} no encontrado`);
                continue;
            }

            product.stock += item.amount;
            await product.save();
        }
        return res.send({message: `Buy deleted successfully`})
    }catch(err){
    console.error(err)
    return res.status(500).send({message: 'Error deleting buy'})
    }
}

