/***********************************************************
 *                        Server.js
 * *********************************************************
 * @author: Joel Alvarado Torres
 * @description: Archivo de configuracion de App Nodejs + Express
 * @version: 1.0
 * 
 * 
 ************************************************************/
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
// Midlewares para configuracion de MongoDB
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');
//midleware para implementacion de HATOEAS en api Rest
const hateoasLinker = require('express-hateoas-links');
//Importacion de rutas
const pasajeroRoute = require('./app/routes/pasajero.routes');

// se crea App Express
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use('/api', pasajeroRoute);

app.use(hateoasLinker);


mongoose.Promise = global.Promise;

// Coneccion a base de datos
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("conectado satisfactoriamente");    
}).catch(err => {
    console.log('No se pudo conectar a la base de datos', err);
    process.exit();
});


// ruta default
app.get('/', (req, res) => {
    res.json({"message": "Bienvenido a control de viajes"});
});

// Definimos y configuramos el puerto de escucha de nuestro servidor
const port = process.env.PORT || '9000';
app.set('port', port);

// creamos nuestro servidor
const server = http.createServer(app);

// y lo ponemos a escuchar las peticiones
server.listen(port, () => console.log(`Servidor iniciado en puerto:${port}`));