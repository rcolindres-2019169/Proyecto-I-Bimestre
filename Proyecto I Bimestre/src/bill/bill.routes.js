'use strict'

import { Router } from 'express'

import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js'
import { get, save, search, update } from './bill.controller.js'

const api = Router()

api.post('/save', [validateJwt],save)
api.put('/update/:id', [validateJwt],update)
api.get('/get', [validateJwt, isAdmin], get)
api.post('/search', [validateJwt, isAdmin], search)

export default api