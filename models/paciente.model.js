import mongoose from 'mongoose'

const pacienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    contrasena: {
        type: String,
        required: true,
        trim: true
    },
    imagen: {
        public_id: String,
        secure_url: String
    },
},{
    timestamps: true
}) 

export default mongoose.model('Pacientes',pacienteSchema)