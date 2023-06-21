import Ficha from '../models/ficha.model.js'

export const getFichas = async (req,res) => {
    try {
        const fichas = await Ficha.find()
        res.json(fichas)
    } catch (error) {
        return res.status(500).json({message: error.message})   
    }
}

export const getFicha = async (req,res) => {
    try {
        const ficha = await Ficha.findById(req.params.id)
        if (!ficha) return res.status(404).json({message: 'Ficha no existe:getFicha'})
    
        return res.json(ficha)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getFichaFecha = async (req,res) => {
    try {
        const fechaABuscar = req.body.fecha
        const ficha = await Ficha.find({fecha: fechaABuscar})
        if (ficha[0] == null) return res.status(404).json({message: 'No se encontraror fichas para la fecha especificada'})
    
        return res.json(ficha)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const postFicha = async (req,res) => {
    try {

        console.log(req.files)

        const {nombrePaciente, nombreDoctor, numero, fecha, hora} = req.body
        const ficha = new Ficha({
            nombrePaciente,
            nombreDoctor,
            numero,
            fecha,
            hora
        })

        await ficha.save()
        res.json(ficha)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const putFicha = async (req,res) => {
    try {
        const {id} = req.params
        const fichaUpdate = await Ficha.findByIdAndUpdate(id, req.body, {new: true})
        return res.json(fichaUpdate)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteFicha = async (req,res) => {
    try {
        const ficha = await Ficha.findByIdAndDelete(req.params.id)
        if (!ficha) return res.status(404).json({message: 'Ficha no existe'})
        
        return res.json(ficha)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
}