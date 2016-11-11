var mongoose = require('mongoose');
var Azienda = require('./azienda.model');
// console.log('controller-server');
module.exports = function() {

    //LISTA DI TUTTI GLI EROI
    var list = function(req, res) {
        Azienda.find().exec()
            .then(function(data) {
                res.json(data);
            });
    };

    //DETTAGLIO DI UN SINGOLO EROE
    var detail = function(req, res) {
        var id = req.params.id;
        Azienda.findById(id)
            .exec()
            .then(function(data) {
                res.status(200).send(data);
            },function(data) {
                res.status(404).send({'error':'Azienda non trovato nel database'});
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    };

    //CREAZIONE DI UN NUOVO EROE
    var create = function(req, res) {
        var newAzienda = new Azienda(req.body);
        newAzienda.save()
            .then(function(data) {
                res.status(200).send(data);
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    };

    //AGGIORNAMENTO DI UN EROE
    var update = function(req, res) { console.log(req.body);
        var id = req.params.id;
        Azienda.findByIdAndUpdate(id, req.body, {new: true})
            .then(function(data) {
                res.status(200).send(data);
            },function() {
                res.status(404).send({'error':'Azienda non trovato nel database'});
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    };

    var remove = function(req, res) {
        var id = req.params.id;
        Azienda.findById(id).exec()
            .then(function(azienda) {
                return azienda.remove();
            })
            .then(function() {
                res.status(200).send('Azienda rimosso dal database');
            }, function() {
                res.status(404).send({'error':'Azienda non trovato nel database'});
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    };

    return {
        list: list,
        detail: detail,
        create: create,
        remove: remove,
        update: update
    }
};
