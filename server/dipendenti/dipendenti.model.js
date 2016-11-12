var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// console.log('model-server');
var dipendentiSchema = new Schema({
	nome: String,
	qualifica: String,
	mansioni: String,
	inclinazione: String,
	indiceProduttivita: Number,
	concentrazione: Boolean,
	stress: Boolean
});

dipendentiSchema.methods.getName = function(){
	return name;
};

var Dipendenti = mongoose.model('Dipendenti',dipendentiSchema);
module.exports = Dipendenti;
