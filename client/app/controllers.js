angular.module('wrg')
  .controller('ServerController', ServerController)
  .controller('ServerDetailController', ServerDetailController);

ServerController.$inject = ['$scope', 'ServerStatusService'];

function ServerController($scope, ServerStatusService) {
  console.log("Hello from Server Controller")
  ServerStatusService.getServers()
    .then(function(servers){
      $scope.servers = servers;
    });
}

ServerDetailController.$inject = ['$scope', 'ServerStatusService', '$stateParams']

function ServerDetailController($scope, ServerStatusService, $stateParams) {
  ServerStatusService.getServer($stateParams.id)
    .then((server) => {
      $scope.server = server
    })
}
