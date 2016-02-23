var Express = require("express")
var Socket = require("socket.io")
var http = require("http")
var unirest = require('unirest')
// var db = require('monk')('localhost/realState')

var app = Express()
var server = http.Server(app)
var io = Socket(server)


app.use(Express.static("./client"))

server.listen(process.env.PORT || 8080, function () {
  if (process.env.PORT) {
    console.log("listening on: ", process.env.PORT);
  } else {
    console.log("listening on port 8080");
  }
})
