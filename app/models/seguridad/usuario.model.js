const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    username: { type: String, uppercase: true},
    password: String,
    estado: { type: String, default: 'A' },
},
{
    timestamps: true
});



var Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;