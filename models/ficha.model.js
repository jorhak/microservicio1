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
    },
}, {
    timestamps: true
})

// Middleware pre-save para convertir la fecha de cadena a objeto Date
/* fichaSchema.pre('save', function (next) {
    const dateTimeParts = this.fecha.split(' ');
    const dateParts = dateTimeParts[0].split('-');
    const timeParts = dateTimeParts[1].split(':');

    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Los meses en JavaScript son base 0 (enero = 0)
    const year = parseInt(dateParts[2]);
    const hour = parseInt(timeParts[0]);
    const minute = parseInt(timeParts[1]);
    const second = parseInt(timeParts[2]);

    this.fecha = new Date(year, month, day, hour, minute, second);
    next();
}); */



  
  

export default mongoose.model('Fichas', fichaSchema)