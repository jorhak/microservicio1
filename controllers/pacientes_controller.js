import Paciente from '../models/paciente.model.js'
import {uploadImage, deleteImage} from '../utils/cloudinary.js'
import fs from 'fs-extra'

export const getPacientes = async (req,res) => {
    try {
        const pacientes = await Paciente.find()
        res.json(pacientes)
    } catch (error) {
        return res.status(500).json({message: error.message})   
    }
}

export const getPaciente = async (req,res) => {
    try {
        const paciente = await Paciente.findById(req.params.id)
        if (!paciente) return res.status(404).json({message: 'Paciente no existe'})
    
        return res.json(paciente)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getPacienteUsuario = async (req,res) => {
    try {
        const usuarioABuscar = req.body.usuario
        const paciente = await Paciente.findOne({usuario:usuarioABuscar})
        if (!paciente) return res.status(404).json({message: 'Paciente no encontrado'})

        return res.json(paciente?.imagen.secure_url)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const postPaciente = async (req,res) => {
    try {

        console.log(req.files)

        const {nombre, email, usuario, tipo} = req.body
        const paciente = new Paciente({
            nombre,
            email,
            usuario,
            tipo,
        })

        if (req.files?.foto){
            const result = await uploadImage(req.files.foto.tempFilePath)
            paciente.imagen = {
                public_id : result.public_id,
                secure_url: result.secure_url
            }
            await fs.unlink(req.files.foto.tempFilePath)
        }

        await paciente.save()
        res.json(paciente)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const putPaciente = async (req,res) => {
    try {
        const {id} = req.params
        const pacienteUpdate = await Paciente.findByIdAndUpdate(id, req.body, {new: true})
        return res.json(pacienteUpdate)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deletePaciente = async (req,res) => {
    try {
        const paciente = await Paciente.findByIdAndDelete(req.params.id)
        if (!paciente) return res.status(404).json({message: 'Paciente no existe'})
        
        if (paciente.imagen?.public_id){
            await deleteImage(paciente.imagen.public_id)
        }


        return res.json(paciente)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
}