const mongoose = require('mongoose');

const PersonaSchema = mongoose.Schema({
    identificacion: { type: String},
    nombres: { type: String},
    apellidos: { type: String},
    fechaNacimiento: { type: Date},
    
    enable: { type: Boolean, default: true },
},
{
    timestamps: true
});

var Persona = mongoose.model('Persona', PersonaSchema);
module.exports = Persona;