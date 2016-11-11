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