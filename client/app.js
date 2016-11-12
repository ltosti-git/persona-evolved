(function(){
  'use strict';

  var App = angular.module('App',[
    'ngRoute',
    'ngResource',
    'ngMaterial',
    'App.azienda'

  ]).value('googleChartApiConfig', {
    version: '1.1',
    optionalSettings: {packages: ['line', 'bar'], language: 'en'}
    });


 })();
