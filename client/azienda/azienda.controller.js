(function(){
  'use strict';

  angular.module('App.azienda')
    .controller('aziendaController', aziendaController);

    aziendaController.$inject = ['AziendaService', '$location'];

    function aziendaController(AziendaService, $location){ console.log('Controller');
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

    vm.selection = [];

    vm.toggleSelection = function toggleSelection(reparto) {console.log(reparto);
      var idx = vm.reparti.indexOf(reparto);console.log(idx);
      if (idx > -1) {
        vm.selection.push(reparto);console.log(vm.selection);
      }
      else {
        vm.selection.splice(idx, 1);
      }
    };


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
      //
      // vm.google.charts.load('current', {'packages':['line']});
      // vm.google.charts.setOnLoadCallback(vm.drawChart);

vm.drawChart = function() {

         vm.data = new google.visualization.DataTable();
         vm.data.addColumn('string', 'Month');
         vm.data.addColumn('number', vm.newAzienda.nome);
         vm.data.addColumn('number', 'Produttività media imprese circostanti');

         vm.data.addRows([
           ['Gennaio',  70, 60],
           ['Febbraio',  75, 63],
           ['Marzo',  41, 57],
           ['Aprile',  32, 21],
           ['Maggio',  61, 80],
           ['Giugno',   59, 84],
           ['Luglio',   71, 81],
           ['Agosto',  62, 90],
           ['Settembre',  13, 42],
           ['Ottobre', 50, 30],
           ['Novembre',  61,  79],
           ['Dicembre',  66,  84]
         ]);

         vm.options = {
           chart: {
             title: 'Volume di vendita su scala mensile',
             subtitle: 'rispetto alla media dei volumi di vendita delle aziende circostanti'
           },
           width: 900,
           height: 500
         };

         vm.chart = new google.charts.Line(document.getElementById('linechart_material'));

         vm.chart.draw(vm.data, vm.options);
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
        vm.newAzienda.reparti = azienda.selection;
        //$location.path('/azienda/details/' + vm.newAzienda.id);
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
