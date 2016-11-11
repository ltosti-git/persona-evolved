var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
//CONNESSION DATABASE MONGOLAB
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@ds151127.mlab.com:51127/persona-evolved', function(err){
  if(err){
    throw err;
  }
  console.info("database connesso");
});

//SETUP DEL SERVER EXPRESS
var app = express();

//MIDDLEWARE BODY PARSER
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//FAVICON
app.use(require('serve-favicon')(path.join(__dirname,"..","client","favicon.ico")));

//SERVE I FILE STATICI
app.use('/', express.static(path.join(__dirname, '..', ' client')));

//SERVE GLI SCRIPT DENTRO NODE MODULES, PER IL CLIENT
app.use('/scripts', express.static(path.join(__dirname, '..', 'node_modules')));
app.use('/bundle', express.static(path.join(__dirname, '..', 'build', 'App')));
app.use('/vendor', express.static(path.join(__dirname, '..', 'build','vendors')));
app.use('/App', express.static(path.join(__dirname, '..', 'build')));


/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
//LE NOSTRE API
app.use('/azienda',require('./azienda'));
//app.use('/aziende',require('./aziende'));

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
//SERVE SEMPRE L'INDEX.HTML IN QUALSIASI ALTRO CASO FUORI DALLE API
app.get('/',function(req, res){
  res.sendFile(path.join(__dirname,"..","build","index.html"));
});

/////////////////////////////////////////////////////////////////////////////////
//START SERVER
app.listen(3000, function(){
  console.log('server express start on: http://localhost:' + 3000);
})

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
//LIVERLOAD
livereload = require('livereload');
server = livereload.createServer();
server.watch(path.join(__dirname, '..', 'client', '**', '*'));
