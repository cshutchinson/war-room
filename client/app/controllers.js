angular.module('wrg')
  .controller('ServerController', ServerController)
  .controller('ServerDetailController', ServerDetailController);

ServerController.$inject = ['$scope', 'ServerStatusService', 'TimeService'];

function ServerController($scope, ServerStatusService, TimeService) {
  console.log("Hello from Server Controller")
  ServerStatusService.getServers()
    .then(function(servers){
      $scope.servers = servers;
    });
  TimeService.on(function (data) {
    $scope.averages = data.averages
    $scope.$apply()
  })
}

ServerDetailController.$inject = ['$scope', 'ServerStatusService', '$stateParams', 'TimeService']

function ServerDetailController($scope, ServerStatusService, $stateParams, TimeService) {
  ServerStatusService.getServer($stateParams.id)
    .then((server) => {
      $scope.server = server
    })
  TimeService.on(function (data) {
    $scope.average = data.average
    $scope.$apply()
  })
}
