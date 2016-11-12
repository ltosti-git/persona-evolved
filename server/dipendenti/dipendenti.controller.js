var mongoose = require('mongoose');
var Dipendenti = require('./dipendenti.model.js');
// console.log('controller-server');
module.exports = function() {

    //LISTA DI TUTTI GLI EROI
    var list = function(req, res) {
        Dipendenti.find().exec()
            .then(function(data) {
                res.json(data);
            });
    };

    //DETTAGLIO DI UN SINGOLO EROE
    var detail = function(req, res) {
        var id = req.params.id;
        Dipendenti.findById(id)
            .exec()
            .then(function(data) {
                res.status(200).send(data);
            },function(data) {
                res.status(404).send({'error':'Dipendenti non trovato nel database'});
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    };

    //CREAZIONE DI UN NUOVO EROE
    var create = function(req, res) {
        var newDipendenti = new Dipendenti(req.body);
        newDipendenti.save()
            .then(function(data) {
                res.status(200).send(data);
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    };

    //AGGIORNAMENTO DI UN EROE
    var update = function(req, res) { //console.log(req.params.id);
        var id = req.params.id;
        Dipendenti.findByIdAndUpdate(id, req.body, {new: true})
            .then(function(data) {
                res.status(200).send(data);
            },function() {
                res.status(404).send({'error':'Dipendenti non trovato nel database'});
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    };

    var remove = function(req, res) {
        var id = req.params.id;
        Dipendenti.findById(id).exec()
            .then(function(dipendenti) {
                return dipendenti.remove();
            })
            .then(function() {
                res.status(200).send('Dipendenti rimosso dal database');
            }, function() {
                res.status(404).send({'error':'Dipendenti non trovato nel database'});
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
