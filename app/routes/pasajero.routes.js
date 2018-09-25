const express = require('express');
const router = express.Router();

const pasajeros = require('../controllers/pasajero.controller.js');

// Crear nuevo pasajero
router.post('/pasajeros', pasajeros.create);

// Objetenr lista de pasajeros
router.get('/pasajeros/', pasajeros.findAll);

// Objetenr lista de pasajeros paginada
router.get('/pasajeros/page/:page', pasajeros.findAllPaginate);

// Buscar pasajero por id
router.get('/pasajeros/:pasajeroId', pasajeros.findOne);

// Actualizar pasajero por id
router.put('/pasajeros/:pasajeroId', pasajeros.update);

// Eliminar pasajero por id
router.delete('/pasajeros/:pasajeroId', pasajeros.delete);

module.exports = router;