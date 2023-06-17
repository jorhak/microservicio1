import Enfermero from '../models/enfermero.model.js'
import {uploadImage, deleteImage} from '../utils/cloudinary.js'
import fs from 'fs-extra'

export const getEnfermeros = async (req,res) => {
    try {
        const enfermeros = await Enfermero.find()
        res.json(enfermeros)
    } catch (error) {
        return res.status(500).json({message: error.message})   
    }
}

export const getEnfermero = async (req,res) => {
    try {
        const enfermero = await Enfermero.findById(req.params.id)
        if (!enfermero) return res.status(404).json({message: 'Enfermero no existe'})
    
        return res.json(enfermero)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getEnfermeroUsuario = async (req,res) => {
    try {
        const usuarioABuscar = req.body.usuario
        const enfermero = await Enfermero.findOne({usuario:usuarioABuscar})
        if (!enfermero) return res.status(404).json({message: 'Enfermero no encontrado'})

        return res.json(enfermero?.imagen.secure_url)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const postEnfermero = async (req,res) => {
    try {

        console.log(req.files)

        const {nombre, email, usuario, tipo} = req.body
        const enfermero = new Enfermero({
            nombre,
            email,
            usuario,
            tipo,

        })

        if (req.files?.foto){
            const result = await uploadImage(req.files.foto.tempFilePath)
            enfermero.imagen = {
                public_id : result.public_id,
                secure_url: result.secure_url
            }
            await fs.unlink(req.files.foto.tempFilePath)
        }

        await enfermero.save()
        res.json(enfermero)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const putEnfermero = async (req,res) => {
    try {
        const {id} = req.params
        const enfermeroUpdate = await Enfermero.findByIdAndUpdate(id, req.body, {new: true})
        return res.json(enfermeroUpdate)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteEnfermero = async (req,res) => {
    try {
        const enfemero = await Enfermero.findByIdAndDelete(req.params.id)
        if (!enfemero) return res.status(404).json({message: 'Enfermero no existe'})
        
        if (enfemero.imagen?.public_id){
            await deleteImage(enfemero.imagen.public_id)
        }


        return res.json(enfemero)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
}