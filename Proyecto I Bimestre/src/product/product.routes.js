'use strict'


import { Router } from "express"
import { deleteU, get, getStock, save, search, update } from "./product.controller.js"
import { validateJwt, isAdmin } from "../middlewares/validate-jwt.js"

const api = Router()

api.post('/save', [validateJwt, isAdmin], save)
api.put('/update/:id', [validateJwt, isAdmin], update)
api.delete('/delete/:id', [validateJwt, isAdmin],  deleteU)
api.get('/get',  get)
api.post('/search',  search)
api.get('/getStock', getStock)
export default api