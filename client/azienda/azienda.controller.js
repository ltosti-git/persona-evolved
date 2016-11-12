(function(){
  'use strict';

  angular.module('App.azienda')
    .controller('aziendaController', aziendaController);

    aziendaController.$inject = ['AziendaService', '$location'];

    function aziendaController(AziendaService, $location){ //console.log('Controller');
      var vm = this;
      vm.newAzienda = {};

      vm.reparti = [
      'modelleria',
      'taglio',
      'tranceria',
      'giunteria',
      'montaggio',
      'fondo',
      'finissaggio',
      'guarnitura',
      'magazzino',
      'manutenzione'
    ];

      vm.getMyAzienda = function(){
        return AziendaService.getAzienda()
        // then catch promise
        .then(function(data){
          vm.azienda = data; //console.log(vm.azienda);
          return
        }).catch(function(err){
          return err;
        });
      };

      vm.getMyAziendeFake = function() {
        vm.aziendeFake = AziendaService.getAziendeFake();
        return;
      };

      vm.getMyDipendenti = function(){
        vm.dipendenti = AziendaService.getDipendenti();
        return;

        // .then(function(data){
        //   vm.dipendenti = data; console.log(data);
        //   return
        // }).catch(function(err){
        //   return err;
        // });
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
        vm.newAzienda.reparti = azienda.tipo;
        //$location.path('/azienda/details/' + vm.newAzienda.id);
      }

      vm.saveMyAzienda = function() { //console.log(vm.newAzienda);
        if(!vm.newAzienda.id) { //console.log('save');
        return AziendaService.saveAzienda(vm.newAzienda)
          .then(function(){
            //vm.getMyAzienda();
            $location.path('/map');
            //return vm.newAzienda = {};
          }).catch(function(err){ console.log(err);
            return err;
          });
        } else { //console.log('edit');
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
