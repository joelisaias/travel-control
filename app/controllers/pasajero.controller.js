const Pasajero = require('../models/pasajero.model');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.nombre) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const pasajero = new Pasajero(req.body);

    // Save Note in the database
    pasajero.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Pasajero."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Pasajero.find()
    .then(pasajeros => {
/*
        res.json(pasajeros, [
            { rel: "self", method: "GET", href: 'http://localhost:9000/pasajeros/' },
            { rel: "create", method: "POST", title: 'Crear Pasajero', href: 'http://localhost:9000/pasajeros' }
        ]);
       */ 
        res.send(pasajeros);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving pasajeros."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAllPaginate = (req, res) => {
    /*
    Pasajero.paginate({}, { page:req.params.page||1,limit:req.params.limit||3 })
    .then(pasajeros => {
        res.send(pasajeros);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving pasajeros."
        });
    });
    */
   var perPage = 3
    var page = req.params.page || 1

    Pasajero
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then(pasajeros => {
            Pasajero.count()
            .then(count=>{
                res.send(
                    {
                        docs: pasajeros,
                        page: page,
                        limit: perPage,
                        pages: Math.ceil(count / perPage)
                    }
                    );
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Error contando pasajeros."
                });
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error al obtener pasajeros."
            });
        });
        /*
        .exec(function(err, products) {
            console.log(1);
            Pasajero.count().exec(function(err, count) {
                console.log(2);
                if (err){
                    return next(err);
                } else{
                    return next();
                }
                
            })
        })*/


};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Pasajero.findById(req.params.pasajeroId)
    .then(pasajero => {
        if(!pasajero) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.pasajeroId
            });            
        }
        res.send(pasajero);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.pasajeroId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.pasajeroId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.nombre) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Pasajero.findByIdAndUpdate(req.params.pasajeroId, {
        nombre: req.body.nombre,
        numeroViajes: req.body.numeroViajes
    })
    .then(pasajero => {
        if(!pasajero) {
            return res.status(404).send({
                message: "Pasajero no encontrado con id  " + req.params.pasajeroId
            });
        }
        res.send(pasajero);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.pasajeroId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.pasajeroId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Pasajero.findByIdAndRemove(req.params.pasajeroId)
    .then(pasajero => {
        if(!pasajero) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.pasajeroId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.pasajeroId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.pasajeroId
        });
    });
};