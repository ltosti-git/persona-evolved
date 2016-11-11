(function(){
  'use strict';

  angular.module('App.azienda')
    .factory('AziendaService',AziendaService);

    AziendaService.$inject = ['$resource'];

    function AziendaService($resource){ console.log('Service');

      var Azienda = $resource('/azienda/', {azienda:'@azienda'}, {'getAll':{method: 'GET', isArray: true}, 'save': {method: 'POST'}});
      var delAzienda = $resource('/azienda/:id', {id:'@id'}, {'delete': {method: 'DELETE'}});
      var edAzienda = $resource('/azienda/:id', {id:'@id'}, {'edit': {method: 'PUT'}, 'get': {method: 'GET'}});

      return{
        getAzienda: getAzienda,
        saveAzienda: saveAzienda,
        deleteAzienda: deleteAzienda,
        editAzienda: editAzienda,
        getMyAziendaDet: getMyAziendaDet
      };

      function getAzienda(callback){
        callback = callback || angular.noop;
        return Azienda.getAll(function(azienda){
          return callback(azienda);
        }, function(err){
          return callback(err);
        }).$promise;
      }

      function saveAzienda(newAzienda, callback){   //rifarla con la promise
        callback = callback || angular.noop;
        //console.log(newAzienda);
        return Azienda.save(newAzienda, function(data){
          return callback(data);
        }, function(err) {
          return callback(err);
        }).$promise;

      }

      function deleteAzienda(id, callback) { //console.log(id);
        callback = callback || angular.noop;
        return delAzienda.delete({'id':id}, function(){
          return callback('del ok');
        }, function(err){
          return callback(err);
        }).$promise;

      }

      function editAzienda(id, hero, callback) { //console.log(hero.weapons);
        callback = callback || angular.noop;
        return edAzienda.edit({'id':id}, hero, function(data){
          return callback(data);
        }, function(err) {
          return callback(err);
        }).$promise;
      }

      function getMyAziendaDet(id, callback) { //console.log(id);
        callback = callback || angular.noop;
        return edWeapons.get({'id': id}, function(data){
          return callback(data);
        }, function(err) {
          return callback(err);
        }).$promise;
      }


    }

})();
