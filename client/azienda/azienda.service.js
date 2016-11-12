(function(){
  'use strict';

  angular.module('App.azienda')
    .factory('AziendaService',AziendaService);

    AziendaService.$inject = ['$resource'];

    function AziendaService($resource){ //console.log('Service');

      var Azienda = $resource('/azienda/', {azienda:'@azienda'}, {'getAll':{method: 'GET', isArray: true}, 'save': {method: 'POST'}});
      var delAzienda = $resource('/azienda/:id', {id:'@id'}, {'delete': {method: 'DELETE'}});
      var edAzienda = $resource('/azienda/:id', {id:'@id'}, {'edit': {method: 'PUT'}, 'get': {method: 'GET'}});
      //var Dipendenti = $resource('/dipendenti/', null, {'getAll': {method: 'GET', isArray:true}});

      var aziendeFake = [
                          {"_id":1,"nome":"Purdy-O'Hara","tipo":"Prohaska Group","dipendenti":1,"fatturato":1,"commesse":1,"commesseTOT":1},
                          {"_id":2,"nome":"Frami Group","tipo":"Goldner-Kozey","dipendenti":2,"fatturato":2,"commesse":2,"commesseTOT":2},
                          {"_id":3,"nome":"Johns-Pollich","tipo":"Pouros LLC","dipendenti":3,"fatturato":3,"commesse":3,"commesseTOT":3},
                          {"_id":4,"nome":"Ruecker, Lynch and Leffler","tipo":"Spinka Group","dipendenti":4,"fatturato":4,"commesse":4,"commesseTOT":4},
                          {"_id":5,"nome":"Lemke Inc","tipo":"Roberts, Schowalter and Heidenreich","dipendenti":5,"fatturato":5,"commesse":5,"commesseTOT":5},
                          {"_id":6,"nome":"Feeney-Kilback","tipo":"Mohr-Boyle","dipendenti":6,"fatturato":6,"commesse":6,"commesseTOT":6},
                          {"_id":7,"nome":"Pagac, Lueilwitz and Feeney","tipo":"Altenwerth-Murazik","dipendenti":7,"fatturato":7,"commesse":7,"commesseTOT":7},
                          {"_id":8,"nome":"Waelchi, Schowalter and Walker","tipo":"King-Adams","dipendenti":8,"fatturato":8,"commesse":8,"commesseTOT":8},
                          {"_id":9,"nome":"Kilback-Larkin","tipo":"Harvey-Towne","dipendenti":9,"fatturato":9,"commesse":9,"commesseTOT":9},
                          {"_id":10,"nome":"Bauch and Sons","tipo":"Blanda-Vandervort","dipendenti":10,"fatturato":10,"commesse":10,"commesseTOT":10},
                          {"_id":11,"nome":"Franecki, Prosacco and Kohler","tipo":"Gottlieb-Abernathy","dipendenti":11,"fatturato":11,"commesse":11,"commesseTOT":11},
                          {"_id":12,"nome":"Fisher LLC","tipo":"Watsica, Hahn and White","dipendenti":12,"fatturato":12,"commesse":12,"commesseTOT":12},
                          {"_id":13,"nome":"Block-Bednar","tipo":"Beier and Sons","dipendenti":13,"fatturato":13,"commesse":13,"commesseTOT":13},
                          {"_id":14,"nome":"Rolfson, Predovic and Mann","tipo":"Corwin-Lemke","dipendenti":14,"fatturato":14,"commesse":14,"commesseTOT":14},
                          {"_id":15,"nome":"Reynolds Inc","tipo":"Koch, Gutkowski and Bernier","dipendenti":15,"fatturato":15,"commesse":15,"commesseTOT":15},
                          {"_id":16,"nome":"Mann and Sons","tipo":"Welch and Sons","dipendenti":16,"fatturato":16,"commesse":16,"commesseTOT":16},
                          {"_id":17,"nome":"Runolfsdottir Group","tipo":"Mann and Sons","dipendenti":17,"fatturato":17,"commesse":17,"commesseTOT":17},
                          {"_id":18,"nome":"Altenwerth, Champlin and Kutch","tipo":"Bergstrom, Kling and Nader","dipendenti":18,"fatturato":18,"commesse":18,"commesseTOT":18},
                          {"_id":19,"nome":"Mertz, Moen and Pollich","tipo":"Mueller and Sons","dipendenti":19,"fatturato":19,"commesse":19,"commesseTOT":19},
                          {"_id":20,"nome":"Kub, Ferry and Brakus","tipo":"Pfeffer LLC","dipendenti":20,"fatturato":20,"commesse":20,"commesseTOT":20},
                          {"_id":21,"nome":"VonRueden and Sons","tipo":"Koepp, Stehr and Botsford","dipendenti":21,"fatturato":21,"commesse":21,"commesseTOT":21},
                          {"_id":22,"nome":"Vandervort-Murray","tipo":"Rutherford LLC","dipendenti":22,"fatturato":22,"commesse":22,"commesseTOT":22},
                          {"_id":23,"nome":"Luettgen LLC","tipo":"Orn-Gislason","dipendenti":23,"fatturato":23,"commesse":23,"commesseTOT":23},
                          {"_id":24,"nome":"Cronin-Corkery","tipo":"Friesen and Sons","dipendenti":24,"fatturato":24,"commesse":24,"commesseTOT":24},
                          {"_id":25,"nome":"Heidenreich, Pacocha and Lynch","tipo":"Dach, Dooley and Jast","dipendenti":25,"fatturato":25,"commesse":25,"commesseTOT":25},
                          {"_id":26,"nome":"Romaguera-Daugherty","tipo":"Abbott, Kessler and Gulgowski","dipendenti":26,"fatturato":26,"commesse":26,"commesseTOT":26},
                          {"_id":27,"nome":"Lebsack, Hagenes and Nicolas","tipo":"Stehr, Stamm and Lind","dipendenti":27,"fatturato":27,"commesse":27,"commesseTOT":27},
                          {"_id":28,"nome":"Fritsch Inc","tipo":"Daugherty, Reinger and Lemke","dipendenti":28,"fatturato":28,"commesse":28,"commesseTOT":28},
                          {"_id":29,"nome":"Barton and Sons","tipo":"Koss Inc","dipendenti":29,"fatturato":29,"commesse":29,"commesseTOT":29},
                          {"_id":30,"nome":"Kassulke-Morar","tipo":"Goldner, Wiza and Nikolaus","dipendenti":30,"fatturato":30,"commesse":30,"commesseTOT":30},
                          {"_id":31,"nome":"Christiansen, Collier and O'Hara","tipo":"Zemlak Group","dipendenti":31,"fatturato":31,"commesse":31,"commesseTOT":31},
                          {"_id":32,"nome":"Casper-Stracke","tipo":"Ullrich LLC","dipendenti":32,"fatturato":32,"commesse":32,"commesseTOT":32},
                          {"_id":33,"nome":"Wilkinson, Mertz and Erdman","tipo":"Kerluke-Cormier","dipendenti":33,"fatturato":33,"commesse":33,"commesseTOT":33},
                          {"_id":34,"nome":"Friesen Inc","tipo":"Kutch-Tromp","dipendenti":34,"fatturato":34,"commesse":34,"commesseTOT":34},
                          {"_id":35,"nome":"Rowe, Jacobs and Welch","tipo":"Bahringer-Feil","dipendenti":35,"fatturato":35,"commesse":35,"commesseTOT":35},
                          {"_id":36,"nome":"Reinger, Baumbach and Mueller","tipo":"Jenkins-Wuckert","dipendenti":36,"fatturato":36,"commesse":36,"commesseTOT":36},
                          {"_id":37,"nome":"Vandervort, Cruickshank and Swift","tipo":"MacGyver Inc","dipendenti":37,"fatturato":37,"commesse":37,"commesseTOT":37},
                          {"_id":38,"nome":"Lang-Howell","tipo":"McDermott Group","dipendenti":38,"fatturato":38,"commesse":38,"commesseTOT":38},
                          {"_id":39,"nome":"Bernier Group","tipo":"Collins-Hermann","dipendenti":39,"fatturato":39,"commesse":39,"commesseTOT":39},
                          {"_id":40,"nome":"Gleichner-Metz","tipo":"Cummings-Lueilwitz","dipendenti":40,"fatturato":40,"commesse":40,"commesseTOT":40},
                          {"_id":41,"nome":"Goodwin and Sons","tipo":"O'Hara, Streich and Effertz","dipendenti":41,"fatturato":41,"commesse":41,"commesseTOT":41},
                          {"_id":42,"nome":"Greenfelder and Sons","tipo":"Bernhard-Kihn","dipendenti":42,"fatturato":42,"commesse":42,"commesseTOT":42},
                          {"_id":43,"nome":"Moore, Runolfsdottir and Leannon","tipo":"Lueilwitz, Runolfsson and Morissette","dipendenti":43,"fatturato":43,"commesse":43,"commesseTOT":43},
                          {"_id":44,"nome":"Sporer LLC","tipo":"Swift, Veum and Wilkinson","dipendenti":44,"fatturato":44,"commesse":44,"commesseTOT":44},
                          {"_id":45,"nome":"Casper LLC","tipo":"Herman, O'Hara and Wunsch","dipendenti":45,"fatturato":45,"commesse":45,"commesseTOT":45},
                          {"_id":46,"nome":"Christiansen and Sons","tipo":"Purdy Group","dipendenti":46,"fatturato":46,"commesse":46,"commesseTOT":46},
                          {"_id":47,"nome":"Schroeder LLC","tipo":"Boyle-Simonis","dipendenti":47,"fatturato":47,"commesse":47,"commesseTOT":47},
                          {"_id":48,"nome":"Ondricka Inc","tipo":"Schumm-Hodkiewicz","dipendenti":48,"fatturato":48,"commesse":48,"commesseTOT":48},
                          {"_id":49,"nome":"Leannon and Sons","tipo":"Koepp-Leannon","dipendenti":49,"fatturato":49,"commesse":49,"commesseTOT":49},
                          {"_id":50,"nome":"Sauer Group","tipo":"Wisoky-Johns","dipendenti":50,"fatturato":50,"commesse":50,"commesseTOT":50}
                        ];



      var dipendenti =[
                        {"_id":1,"nome":"Anne","qualifica":"Statistician I","mansioni":"Quality Engineer","inclinazione":"JDOM","indiceProduttivita":1,"concentrazione":true,"stress":true},
                        {"_id":2,"nome":"Carlos","qualifica":"Director of Sales","mansioni":"General Manager","inclinazione":"SBIR","indiceProduttivita":2,"concentrazione":true,"stress":true},
                        {"_id":3,"nome":"Gary","qualifica":"Accounting Assistant II","mansioni":"Analyst Programmer","inclinazione":"Mutual Funds","indiceProduttivita":3,"concentrazione":true,"stress":true},
                        {"_id":4,"nome":"Scott","qualifica":"Senior Cost Accountant","mansioni":"Junior Executive","inclinazione":"Combined Cycle","indiceProduttivita":4,"concentrazione":true,"stress":true},
                        {"_id":5,"nome":"Lawrence","qualifica":"Sales Representative","mansioni":"Account Coordinator","inclinazione":"SQL PL","indiceProduttivita":5,"concentrazione":false,"stress":true},
                        {"_id":6,"nome":"Louis","qualifica":"Quality Control Specialist","mansioni":"Health Coach III","inclinazione":"GHS","indiceProduttivita":6,"concentrazione":true,"stress":true},
                        {"_id":7,"nome":"Phyllis","qualifica":"Product Engineer","mansioni":"Web Designer III","inclinazione":"RTB","indiceProduttivita":7,"concentrazione":true,"stress":false},
                        {"_id":8,"nome":"Paul","qualifica":"Nuclear Power Engineer","mansioni":"Administrative Officer","inclinazione":"Aerial Cinematography","indiceProduttivita":8,"concentrazione":false,"stress":true},
                        {"_id":9,"nome":"Christina","qualifica":"Project Manager","mansioni":"Geologist IV","inclinazione":"Certified DDI Facilitator","indiceProduttivita":9,"concentrazione":false,"stress":false},
                        {"_id":10,"nome":"Randy","qualifica":"Account Executive","mansioni":"Senior Developer","inclinazione":"Experion PKS","indiceProduttivita":10,"concentrazione":false,"stress":true},
                        {"_id":11,"nome":"Jason","qualifica":"Assistant Manager","mansioni":"VP Product Management","inclinazione":"SBRT","indiceProduttivita":11,"concentrazione":true,"stress":false},
                        {"_id":12,"nome":"Willie","qualifica":"Design Engineer","mansioni":"Web Developer III","inclinazione":"Xbox One","indiceProduttivita":12,"concentrazione":false,"stress":true},
                        {"_id":13,"nome":"Jimmy","qualifica":"Senior Editor","mansioni":"Marketing Assistant","inclinazione":"Luxury","indiceProduttivita":13,"concentrazione":true,"stress":true},
                        {"_id":14,"nome":"Patricia","qualifica":"Junior Executive","mansioni":"Accountant IV","inclinazione":"Dog Training","indiceProduttivita":14,"concentrazione":true,"stress":false},
                        {"_id":15,"nome":"Terry","qualifica":"Research Associate","mansioni":"Research Assistant III","inclinazione":"LLQP","indiceProduttivita":15,"concentrazione":false,"stress":true},
                        {"_id":16,"nome":"Joyce","qualifica":"Structural Analysis Engineer","mansioni":"Electrical Engineer","inclinazione":"RMS","indiceProduttivita":16,"concentrazione":false,"stress":false},
                        {"_id":17,"nome":"Ann","qualifica":"Chemical Engineer","mansioni":"Accountant III","inclinazione":"TFF","indiceProduttivita":17,"concentrazione":true,"stress":false},
                        {"_id":18,"nome":"Laura","qualifica":"VP Accounting","mansioni":"Recruiter","inclinazione":"Rotating Equipment","indiceProduttivita":18,"concentrazione":false,"stress":true},
                        {"_id":19,"nome":"Keith","qualifica":"Senior Cost Accountant","mansioni":"Graphic Designer","inclinazione":"Myriad","indiceProduttivita":19,"concentrazione":false,"stress":true},
                        {"_id":20,"nome":"Phillip","qualifica":"Office Assistant III","mansioni":"Biostatistician II","inclinazione":"Waste","indiceProduttivita":20,"concentrazione":true,"stress":false},
                        {"_id":21,"nome":"Carol","qualifica":"Pharmacist","mansioni":"Geologist I","inclinazione":"DCS","indiceProduttivita":21,"concentrazione":true,"stress":true},
                        {"_id":22,"nome":"Matthew","qualifica":"Software Engineer I","mansioni":"Paralegal","inclinazione":"MPBGP","indiceProduttivita":22,"concentrazione":true,"stress":true},
                        {"_id":23,"nome":"Timothy","qualifica":"Clinical Specialist","mansioni":"Engineer I","inclinazione":"Broadcast Television","indiceProduttivita":23,"concentrazione":false,"stress":true},
                        {"_id":24,"nome":"Emily","qualifica":"Marketing Manager","mansioni":"Associate Professor","inclinazione":"Hospitals","indiceProduttivita":24,"concentrazione":true,"stress":true},
                        {"_id":25,"nome":"Christopher","qualifica":"Payment Adjustment Coordinator","mansioni":"Help Desk Operator","inclinazione":"RWD Info Pak","indiceProduttivita":25,"concentrazione":false,"stress":false},
                        {"_id":26,"nome":"Nicole","qualifica":"Biostatistician IV","mansioni":"Administrative Assistant I","inclinazione":"Glamour","indiceProduttivita":26,"concentrazione":false,"stress":false},
                        {"_id":27,"nome":"Mark","qualifica":"Occupational Therapist","mansioni":"Analog Circuit Design manager","inclinazione":"Judicial Review","indiceProduttivita":27,"concentrazione":true,"stress":true},
                        {"_id":28,"nome":"Barbara","qualifica":"Mechanical Systems Engineer","mansioni":"VP Accounting","inclinazione":"UCaaS","indiceProduttivita":28,"concentrazione":true,"stress":true},
                        {"_id":29,"nome":"Joseph","qualifica":"Pharmacist","mansioni":"Environmental Specialist","inclinazione":"Public Relations","indiceProduttivita":29,"concentrazione":false,"stress":false},
                        {"_id":30,"nome":"Paul","qualifica":"Financial Advisor","mansioni":"Human Resources Assistant III","inclinazione":"cGMP practices","indiceProduttivita":30,"concentrazione":true,"stress":false}
                      ];

      return{
        getAzienda: getAzienda,
        getAziendeFake: getAziendeFake,
        saveAzienda: saveAzienda,
        deleteAzienda: deleteAzienda,
        editAzienda: editAzienda,
        getMyAziendaDet: getMyAziendaDet,
        getDipendenti: getDipendenti
      };

      function getAzienda(callback){
        callback = callback || angular.noop;
        return Azienda.getAll(function(azienda){
          return callback(azienda);
        }, function(err){
          return callback(err);
        }).$promise;
      }

      function getAziendeFake() {
        return aziendeFake;
      }

      function getDipendenti() {
        return dipendenti;
      }

      // function getDipendenti(callback){
      //   callback = callback || angular.noop;
      //   return Dipendenti.getAll(function(dipendente){
      //     return callback(dipendente);
      //   }, function(err){
      //     return callback(err);
      //   }).$promise;
      // }

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

      function editAzienda(azienda, callback) { console.log(azienda);
        callback = callback || angular.noop;
        return edAzienda.edit(azienda, function(data){
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
