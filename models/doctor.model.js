import mongoose from 'mongoose'

const doctorSchema = mongoose.Schema({
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
    usuario: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    tipo:{
        type: String,
        required: true,
        trim: true
    },
    especialidad:{
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

export default mongoose.model('Doctores',doctorSchema)