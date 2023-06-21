import { Router } from 'express'

import {getFichas, getFicha, postFicha, putFicha, deleteFicha, getFichaFecha} from '../controllers/fichas_controller.js'


const router = Router()

router.get('/fichas', getFichas)

router.get('/ficha/:id', getFicha)

router.get('/ficha', getFichaFecha)

router.post('/fichas', postFicha)

router.put('/ficha/:id', putFicha)

router.delete('/fichas/:id', deleteFicha)

export default router