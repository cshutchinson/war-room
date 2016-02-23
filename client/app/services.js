angular.module('wrg')
  .factory('ServerStatusService', ServerStatusService)

ServerStatusService.$inject = ['$http']

function ServerStatusService($http) {
  console.log("Hello from ServerStatus Service")
  return {
    getServers: function() {
      return $http.get('/api/servers')
        .then((response) => response.data);
    },
    getServer: function (id) {
      // return this.getServers()
      //   .then((homes) => homes.find((home) => parseInt(home.id) === parseInt(id)))
    }
  }
}
