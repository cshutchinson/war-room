angular.module('wrg')
  .factory('ServerStatusService', ServerStatusService)
  .factory('TimeService', TimeService)

ServerStatusService.$inject = ['$http']

function ServerStatusService($http) {
  console.log("Hello from ServerStatus Service")
  return {
    getServers: function() {
      return $http.get('/api/servers')
        .then((response) => response.data);
    },
    getServer: function (id) {
      return this.getServers()
        .then((servers) => servers.find((server) => parseInt(server.id) === parseInt(id)))
    }
  }
}

TimeService.$inject = ['$stateParams']

function TimeService ($stateParams) {
  var socket = io()
  var callbacks = []
  socket.on('servers', function (data) {
    var average, body;
    body = data.body;
    // console.log('body', data);
    callbacks.forEach(function (callback) {
      data.body.forEach(function (server, index) {
        if (server.id == $stateParams.id) {
          average = data.average[server.id].average;
        }
      })
      callback({
        average: average,
        body: body})
    })
  })

  return {
    on: function (callback) {
      callbacks.push(callback)
    }
  }
}
