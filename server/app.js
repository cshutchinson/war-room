var Express = require("express")
var Socket = require("socket.io")
var http = require("http")
var unirest = require('unirest')
// var db = require('monk')('localhost/realState')
var wr = require('./warroom-client')

var app = Express()
var server = http.Server(app)
var io = Socket(server)


app.use(Express.static("./client"))

// wr((error, data) => console.log(data.data))

io.on("connection", function (socket) {
  setInterval(function () {
    wr((error, data) => {
      socket.emit("server", {
        body: data.data
      })
    });
  })
}, 500)

app.get('/api/servers', function (req, res) {
  wr((error,data)=>{
    res.json(data.data)
  })
})


server.listen(process.env.PORT || 8080, function () {
  if (process.env.PORT) {
    console.log("listening on: ", process.env.PORT);
  } else {
    console.log("listening on port 8080");
  }
})
