const Usuario = require('../../models/seguridad/usuario.model');

exports.create = (req, res) => {
    // Validate request
    if(!req.body.username) {
        return res.status(400).send({
            message: "Username no puede estar vacio"
        });
    }
    // Se crea el usuario
    const usuario = new Usuario(req.body);
    // Se guarda el usuario
    usuario.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrio un error al guardar usuario."
        });
    });
};

// Consulta de todos los usuarios
exports.findAll = (req, res) => {
    Usuario.find()
    .then(usuarios => {
        res.send(usuarios);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrio un error al obtener lista de usuarios."
        });
    });
};

// Consulta de usuarios paginada
exports.findAllPaginate = (req, res) => {
    var perPage = req.query.limit || 10;
    var page = req.query.page || 1;
    perPage=Number(perPage)
    Usuario
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then(usuarios => {
            Usuario.count()
            .then(count=>{
                res.send(
                    {
                        docs: usuarios,
                        page: page,
                        limit: perPage,
                        pages: Math.ceil(count / perPage),
                        totalDocs: count 
                    }
                    );
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Error contando usuarios."
                });
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error al obtener usuarios."
            });
        });
};

// Obtener usuario por id
exports.findOne = (req, res) => {
    Usuario.findById(req.params.usuarioId)
    .then(doc => {
        if(!doc) {
            return res.status(404).send({
                message: "Usuario no encontrado con id " + req.params.usuarioId
            });            
        }
        res.send(doc);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Usuario no encontrado con id " + req.params.usuarioId
            });                
        }
        return res.status(500).send({
            message: "Error buscando usuario con id " + req.params.usuarioId
        });
    });
};

// Actualizar usuario por id
exports.update = (req, res) => {
    // Find note and update it with the request body
    Usuario.findByIdAndUpdate(req.params.usuarioId, req.body)
    .then(doc => {
        if(!doc) {
            return res.status(404).send({
                message: "Usuario no encontrado con id  " + req.params.usuarioId
            });
        }
        res.send(doc);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Usuario no encontrado con id " + req.params.usuarioId
            });                
        }
        return res.status(500).send({
            message: "Error Actualizando Usuario con id " + req.params.usuarioId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Usuario.findByIdAndRemove(req.params.usuarioId)
    .then(doc => {
        if(!doc) {
            return res.status(404).send({
                message: "Usuario no encontrado con id " + req.params.usuarioId
            });
        }
        res.send({message: "Usuario eliminado satisfactoriamente!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Usuario no encontrado con id " + req.params.usuarioId
            });                
        }
        return res.status(500).send({
            message: "No se pudo eliminar usuario con id " + req.params.usuarioId
        });
    });
};