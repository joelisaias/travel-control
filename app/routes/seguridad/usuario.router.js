const express = require('express');
const router = express.Router();

const Usuario = require('../../controllers/seguridad/usuario.controller');

// Crear nuevo
router.post('/seg/usuario', Usuario.create);

// Objetener lista
router.get('/seg/usuario', Usuario.findAll);

// Objetenr lista paginada
router.get('/seg/usuarioPage', Usuario.findAllPaginate);

// Buscar por id
router.get('/seg/usuario/:usuarioId', Usuario.findOne);

// Actualizar por id
router.put('/seg/usuario/:usuarioId', Usuario.update);

// Eliminar por id
router.delete('/seg/usuario/:usuarioId', Usuario.delete);

module.exports = router;