import mongoose from 'mongoose'

const fichaSchema = mongoose.Schema({
    nombrePaciente: {
        type: String,
        required: true,
        trim: true,
    },
    nombreDoctor: {
        type: String,
        required: true,
        trim: true
    },
    numero: {
        type: Number,
        required: true,
        trim: true
    },
    fecha: {
        type: String,
        required: true,
        trim: true
    },
    hora: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Fichas', fichaSchema)