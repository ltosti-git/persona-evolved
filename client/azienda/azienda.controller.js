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
          vm.azienda = data;
           //console.log(vm.azienda);
           detailsAzienda(data);
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

      google.charts.load('current', {'packages':['corechart']});
      vm.draw = function() {
              google.charts.setOnLoadCallback(drawChart);
      }

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Mesi',  'Nym Corp', 'Aziende limitrofe'],
          ['Gennaio',  100,      40],
          ['Febbraio',  117,      46],
          ['Marzo',  66,       112],
          ['Aprile',  103,      54],
          ['Maggio', 80, 91],
          ["Giugno", 21, 103],
          ['Luglio', 100, 60],
          ['Agosto', 51, 52],
          ['Settembre', 98, 81],
          ['Ottobre', 30, 40],
          ['Novembre', 50, 79],
          ['Dicembre', 52, 103]
        ]);

        var options = {
          title: 'Volume di vendita',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);

      }


      var detailsAzienda = function(azienda) {
        //vm.newAzienda = angular.copy(azienda);
        vm.newAzienda._id = azienda._id;
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
            //$location.path('/map');
            return vm.newAzienda = {};
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
