/**
 * Created by ramon on 9/16/15.
 */

angular.module('flyingsky', ['ui.router', 'flyingsky.admin']).
  config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise("/admin");
    //$httpProvider.interceptors.push('httpInterceptor');
  }]).
  run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {

    });
  }]);