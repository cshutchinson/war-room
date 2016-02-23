var Express = require("express")
var Socket = require("socket.io")
var http = require("http")
var unirest = require('unirest')
// var db = require('monk')('localhost/realState')

var app = Express()
var server = http.Server(app)
var io = Socket(server)


app.use(Express.static("./client"))

server.listen(8080, function () {
  console.log("listening on 8080")
})
