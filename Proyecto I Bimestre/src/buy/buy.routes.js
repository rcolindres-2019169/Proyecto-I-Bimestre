'use strict'

import { Router } from "express"
import { validateJwt } from "../middlewares/validate-jwt.js"
import { deleteU,  save  } from "./buy.controller.js"

const api = Router()

api.post('/save', [validateJwt],save)
api.delete('/delete/:id', [validateJwt], deleteU)

export default api