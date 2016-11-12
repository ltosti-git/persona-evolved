var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// console.log('model-server');
var aziendaSchema = new Schema({
	nome: String,
	tipo: String,
	dipendenti: String,
	fatturato: String,
	commesse: Number,
	commesseTot: Number,
	reparti: [String]
});

aziendaSchema.methods.getName = function(){
	return name;
};

var Azienda = mongoose.model('Azienda',aziendaSchema);
module.exports = Azienda;
