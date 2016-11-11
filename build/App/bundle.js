(function(){
  'use strict';
console.log('App');
  var App = angular.module('App',[
    'ngRoute',
    'ngResource',

    'App.azienda',

  ]);



 })();

(function(){
  'use strict';

  angular.module('App.azienda', []);

})();

(function(){
  'use strict';
  angular.module('App.azienda')
    .config(config);

    function config($routeProvider){ console.log('Route');
      $routeProvider
        .when('/azienda', {
          templateUrl:'/App/view/azienda/template/azienda.template.html',
          controller:'aziendaController',
          controllerAs: 'vm'
        });
    }
})();

(function(){
  'use strict';

  angular.module('App.azienda')
    .controller('aziendaController', aziendaController);

    aziendaController.$inject = ['AziendaService', '$location'];

    function aziendaController(AziendaService, $location){ console.log('Controller');
      var vm = this;
      vm.newAzienda = {};

      vm.getMyAzienda = function(){
        return AziendaService.getAzienda()
        // then catch promise
        .then(function(data){
          vm.azienda = data;
          return
        }).catch(function(err){
          return err;
        });
      };

      vm.detailsAzienda = function(azienda) {
        //vm.newAzienda = angular.copy(azienda);
        vm.newAzienda.id = azienda._id;
        vm.newAzienda.nome = azienda.nome;
        vm.newAzienda.tipo = azienda.tipo;
        vm.newAzienda.dipendenti = azienda.dipendenti;
        vm.newAzienda.fatturato = azienda.fatturato;
        vm.newAzienda.commesse = azienda.commesse;
        vm.newAzienda.commesseTot = azienda.commesseTot;
        //$location.path('/azienda/details/' + vm.newAzienda.id);
      }

      vm.add = function() {
        $location.path('/azienda/details');
      }

      vm.saveMyAzienda = function() { console.log(vm.newAzienda.id);

        if(!vm.newAzienda.id) { console.log('save');
        return AziendaService.saveAzienda(vm.newAzienda)
          .then(function(){
            vm.getMyAzienda();
            return vm.newAzienda = {};
          }).catch(function(err){ console.log(err);
            return err;
          });
        } else { console.log('edit');
          return AziendaService.editAzienda(vm.newAzienda)
          .then(function() {
            vm.getMyAzienda();
            return vm.newAzienda = {};
          }).catch (function(err){
            return err;
          });

        }
      };

      vm.deleteMyAzienda = function(id) { //console.log(id);
        return AziendaService.deleteAzienda(id)
          .then(function(){
            vm.getMyAzienda();
            return vm.newAzienda = {};
          }).catch(function(err){
            return err;
          })
      }
    }
})();

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

//# sourceMappingURL=build/App/bundle.js.map
