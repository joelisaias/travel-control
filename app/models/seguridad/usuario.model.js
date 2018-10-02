const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    username: { type: String, uppercase: true},
    password: String,
    enable: { type: Boolean, default: true },
},
{
    timestamps: true
});

var Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;