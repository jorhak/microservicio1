import Doctor from '../models/doctor.model.js'
import {uploadImage, deleteImage} from '../utils/cloudinary.js'
import fs from 'fs-extra'

export const getDoctores = async (req,res) => {
    try {
        const doctores = await Doctor.find()
        res.json(doctores)
    } catch (error) {
        return res.status(500).json({message: error.message})   
    }
}

export const getDoctor = async (req,res) => {
    try {
        const doctor = await Doctor.findById(req.params.id)
        if (!doctor) return res.status(404).json({message: 'Doctor no existe'})
    
        return res.json(doctor)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getDoctorUsuario = async (req,res) => {
    try {
        const usuarioABuscar = req.body.usuario
        const doctor = await Doctor.findOne({usuario:usuarioABuscar})
        if (!doctor) return res.status(404).json({message: 'Doctor no encontrado'})

        return res.json(doctor?.imagen.secure_url)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const postDoctor = async (req,res) => {
    try {

        console.log(req.files)

        const {nombre, email, usuario, tipo, especialidad} = req.body
        const doctor = new Doctor({
            nombre,
            email,
            usuario,
            tipo,
            especialidad,
        })

        if (req.files?.foto){
            const result = await uploadImage(req.files.foto.tempFilePath)
            doctor.imagen = {
                public_id : result.public_id,
                secure_url: result.secure_url
            }
            await fs.unlink(req.files.foto.tempFilePath)
        }

        await doctor.save()
        res.json(doctor)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const putDoctor = async (req,res) => {
    try {
        const {id} = req.params
        const doctorUpdate = await Doctor.findByIdAndUpdate(id, req.body, {new: true})
        return res.json(doctorUpdate)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteDoctor = async (req,res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id)
        if (!doctor) return res.status(404).json({message: 'Doctor no existe'})
        
        if (doctor.imagen?.public_id){
            await deleteImage(doctor.imagen.public_id)
        }


        return res.json(doctor)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
}