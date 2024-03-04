'use strict'

import Category from '../category/category.model.js'
import Product from './product.model.js'
import { checkUpdate } from '../utils/validator.js'

export const save = async(req, res)=>{
    try{
        let data = req.body
        const existingCategory = await Category.findById( data.category );
        if (!existingCategory) {
            return res.status(400).send({ message: 'The category does not exist' });
        }
        const existingProduct = await Product.findOne({name: data.name})
        if(existingProduct){
            return res.status(400).send({ message: 'Product with the same name already exists' });
        }
        let product = new Product(data)
        await product.save()
        return res.send({message: `Registered successfully,  ${product.name}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering product', err: err})
    }

}

export const update = async (req,res) =>{
    try{
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        const existingCategory = await Category.findById( data.category );
        if (!existingCategory) {
            return res.status(400).send({ message: 'The category does not exist' });
        }
        const existingProduct = await Product.findOne({name: data.name})
        if(existingProduct){
            return res.status(400).send({ message: 'Product with the same name already exists' });
        }
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        let updatedPoduct = await Product.findOneAndUpdate(
            {_id: id},
            data, 
            {new: true}
        ).populate('category',['name'])
        if(!updatedPoduct) return res.status(401).send({message: 'Product not found and not updated'})
        return res.send({message: 'Updated product', updatedPoduct})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating product'})
    }
}

export const deleteU = async (req,res)=>{
    try{
        let { id } = req.params
        let deletedProduct = await Product.findOneAndDelete({_id: id})
        if(!deletedProduct) return res.status(404).send({message: 'Product not found and not deleted'})
        return res.send({message: `Product with name ${deletedProduct.name} deleted successfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting product'})
    }
}

export const get = async (req,res ) =>{
    try{
        let products = await Product.find().populate({path: 'category', select: 'name'})
        return res.send({products})
    }catch(err){
        console.error(err)
        return res.status(500).send({ message: 'Error getting categories' })
    }
}


export const search = async(req,res)=>{
    try{
        let { search } = req.body
        let products = await Product.find(
            {name: { $regex: new RegExp(search, 'i') } }
        )
        if (products.length === 0) {
            return res.status(404).send({ message: 'Products not found' });
        }
        if(!products) return res.status(404).send({message: 'products not found'})
            return res.send({message: 'Products found', products})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error searching products'})
    }
}

export const getStock = async(req,res) =>{
    try{
        let num = 0
        let product = await Product.find({stock: num}).populate('category', ['name'])
         return res.send({product})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error getting products'})
    }
}