'use strict'


import { Router } from "express"
import { deleteU, get, getSoldProductsMost, getStock, save, search, searchCategory, update } from "./product.controller.js"
import { validateJwt, isAdmin } from "../middlewares/validate-jwt.js"

const api = Router()

api.post('/save', [validateJwt, isAdmin], save)
api.put('/update/:id', [validateJwt, isAdmin], update)
api.delete('/delete/:id', [validateJwt, isAdmin],  deleteU)
api.get('/get',  get)
api.post('/search',  search)
api.get('/getStock', [validateJwt], getStock)
api.get('/getMost', [validateJwt], getSoldProductsMost)
api.post('/searchCategory',[validateJwt], searchCategory)
export default api