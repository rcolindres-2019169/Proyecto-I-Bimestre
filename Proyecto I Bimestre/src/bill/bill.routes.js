'use strict'

import { Router } from 'express'

import {  validateJwt } from '../middlewares/validate-jwt.js'
import { pdfview,  save,  update } from './bill.controller.js'

const api = Router()

api.post('/save', [validateJwt],save)
api.put('/update/:id', [validateJwt],update)
api.get('/pdf/:id', [validateJwt],pdfview)

export default api