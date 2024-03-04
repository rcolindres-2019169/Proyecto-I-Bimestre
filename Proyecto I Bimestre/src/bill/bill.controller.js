'use strict'

import { checkUpdate } from '../utils/validator.js'
import Bill from './bill.model.js'

export const save = async(req,res)=>{
    try{
        let data = req.body
        let bill = new Bill(data)
        await bill.save()
        return res.send({message: `Bill registered`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering bill', err: err})
    }
}

export const update = async (req,res) =>{
    try{
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        let updatedBill = await Bill.findOneAndUpdate(
            {_id: id},
            data, 
            {new: true}
        )
        if(!updatedBill) return res.status(401).send({message: 'Bill not found and not updated'})
        return res.send({message: 'Updated bill', updatedBill})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating bill'})
    }
}

export const get = async (req,res ) =>{
    try{
        let bills = await Bill.find()
        return res.send({bills})
    }catch(err){
        console.error(err)
        return res.status(500).send({ message: 'Error getting bills' })
    }
}


export const search = async(req,res)=>{
    try{
        let { search } = req.body
        let bill = await Bill.find(
            {_id: search}
        )
        if(!bill) return res.status(404).send({message: 'Bill not found'})
            return res.send({message: 'Bill found', bill})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error searching bill'})
    }
}