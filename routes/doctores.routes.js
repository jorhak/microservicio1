import { Router } from 'express'

import {getDoctores, getDoctor, getDoctorUsuario, postDoctor, putDoctor, deleteDoctor} from '../controllers/doctores_controller.js'

import fileUpload from 'express-fileupload'

const router = Router()

router.get('/doctores', getDoctores)

router.get('/doctor/:id', getDoctor)

router.get('/doctorUsuario', getDoctorUsuario)

router.post('/doctores', fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}),postDoctor)

router.put('/doctor/:id', putDoctor)

router.delete('/doctores/:id', deleteDoctor)

export default router