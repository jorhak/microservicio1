import { Router } from 'express'

import {getEnfermeros, getEnfermero, getEnfermeroUsuario, postEnfermero, putEnfermero, deleteEnfermero} from '../controllers/enfermeros_controller.js'

import fileUpload from 'express-fileupload'

const router = Router()

router.get('/enfermeros', getEnfermeros)

router.get('/enfermero/:id', getEnfermero)

router.get('/enfermeroUsuario', getEnfermeroUsuario)

router.post('/enfermeros', fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}),postEnfermero)

router.put('/enfermero/:id', putEnfermero)

router.delete('/enfermeros/:id', deleteEnfermero)

export default router