import { Router } from 'express'

import {getPacientes, getPaciente, getPacienteUsuario, postPaciente, putPaciente, deletePaciente} from '../controllers/pacientes_controller.js'

import fileUpload from 'express-fileupload'

const router = Router()

router.get('/pacientes', getPacientes)

router.get('/paciente/:id', getPaciente)

router.get('/pacienteUsuario', getPacienteUsuario)

router.post('/pacientes', fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}),postPaciente)

router.put('/paciente/:id', putPaciente)

router.delete('/pacientes/:id', deletePaciente)

export default router