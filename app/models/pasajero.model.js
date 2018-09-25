const mongoose = require('mongoose');
//const mongoosePaginate = require('mongoose-paginate');

const PasajeroSchema = mongoose.Schema({
    nombre: String,
    numeroViajes: Number,
    fechacreacion: { type: Date, default: Date.now },
    fechamodificacion: { type: Date, default: Date.now },
    estado: { type: String, default: 'A' },
});


// De esta manera definimos una accion a ejecutar cuando estamos
// guardando un documento dentro de nuestra coleccion
// https://mongoosejs.com/docs/middleware.html
PasajeroSchema.pre('save', function (next) {

    let ahora = new Date();

    this.fechamodificacion = ahora;

    if (!this.fechacreacion) {
        this.fechacreacion = ahora;
    }

    next();
});

//PasajeroSchema.plugin(mongoosePaginate);

var Pasajero = mongoose.model('Pasajero', PasajeroSchema);
module.exports = Pasajero;