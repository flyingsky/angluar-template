/**
 * Created by ramon on 9/16/15.
 */

angular.module('flyingsky.admin', ['ui.router']).
  config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('admin', {
      url: '/admin',
      templateUrl: 'admin/index.html',
      controller: 'AdminController'
    });
  }]).

  controller('AdminController', ['$scope', function($scope) {
    $scope.world = 'world';
  }]);