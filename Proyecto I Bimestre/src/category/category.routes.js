'use strict'

import { Router } from 'express'
import { deleteU, get, save, search, update } from './category.controller.js';

const api = Router()

api.post('/save', save)
api.put('/update/:id', update)
api.delete('/delete/:id', deleteU)
api.get('/get', get)
api.post('/search', search)

export default api