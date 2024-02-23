'use strict' //Modo estricto

import User from './user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import {generateJwt} from '../utils/jwt.js'

/*
export const defaultAdmin = async()=>{
    try{
        const userExist  = await User.findOne({username: 'admin'})
        if(userExist){
            console.log('"Admin" default is in use')
        }
        let data = {
            name: 'Admin',
            lastname: 'Admin',
            phone: '11111111',
            email: 'admin',
            username: 'admin',
            password: await encrypt ('admin'),
            role: 'ADMIN'
        }
        let user = new User (data)
        await user.save()
    }
    catch(err){
        console.error(err)
    }
}
*/

export const test = (req, res)=>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const register = async(req, res)=>{
    try{
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'CLIENT'
        let user = new User(data)
        await user.save() 
        return res.send({message: `Registered successfully, can be logged with username ${user.username}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering user', err: err})
    }
}

export const login = async(req, res)=>{
    try{
        let { username, password } = req.body
        let user = await User.findOne({username}) 
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${loggedUser.name}`, 
                    loggedUser,
                    token
                }
            )
        }
        return res.status(404).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to login'})
    }
}

export const update = async(req, res)=>{ 
    try{
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        let updatedUser = await User.findOneAndUpdate(
            {_id: id},
            data,
            {new: true} 
        )
        if(!updatedUser) return res.status(401).send({message: 'User not found and not updated'})
        return res.send({message: 'Updated user', updatedUser})
    }catch(err){
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message: `Username ${err.keyValue.username} is alredy taken`})
        return res.status(500).send({message: 'Error updating account'})
    }
}

export const deleteU = async(req, res)=>{
    try{
        let { id } = req.params
        let deletedUser = await User.findOneAndDelete({_id: id}) 
        if(!deletedUser) return res.status(404).send({message: 'Account not found and not deleted'})
        return res.send({message: `Account with username ${deletedUser.username} deleted successfully`}) 
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting account'})
    }
}

export const get = async (req,res ) =>{
    try{
        let users = await User.find()
        return res.send({users})
    }catch(err){
        console.error(err)
        return res.status(500).send({ message: 'Error getting users' })
    }
}


export const search = async(req,res)=>{
    try{
        let { search } = req.body
        let users = await User.find(
            {name: search}
        )
        if(!users) return res.status(404).send({message: 'Users not found'})
            return res.send({message: 'Users found', users})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error searching users'})
    }
}