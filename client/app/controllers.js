angular.module('wrg')
  .controller('ServerController', ServerController)
  // .controller('ServerDetailController', ServerDetailController);

ServerController.$inject = ['$scope', 'ServerStatusService'];

function ServerController($scope, ServerStatusService) {
  console.log("Hello from Server Controller")
  ServerStatusService.getServers()
    .then(function(servers){
      $scope.servers = servers;
    });
}
