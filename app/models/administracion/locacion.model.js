const mongoose = require('mongoose');

const LocacionSchema = mongoose.Schema({
    ciudad: { type: String},
    direccion: { type: String},
    
    enable: { type: Boolean, default: true },
},
{
    timestamps: true
});

var Locacion = mongoose.model('Locacion', LocacionSchema);
module.exports = Locacion;