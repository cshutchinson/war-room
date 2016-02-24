var Express = require("express")
var Socket = require("socket.io")
var http = require("http")
var unirest = require('unirest')
var wr = require('./warroom-client')
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://war:1234@ds015508.mongolab.com:15508/heroku_wjjj2h76';

var app = Express()
var server = http.Server(app)
var io = Socket(server)

var collection = null;
var database = null;

app.use(Express.static("./client"))

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('connected to db');
    database = db;
    collection = db.collection('servers');
  }
})

wr((error, data) => {
  data.data.forEach(function(record){
    collection.insert(record);
  })
})

function findAverage(cb){
  var serverIndex = {};
  collection.aggregate([
    {$match: {}},
    {$group: {_id: "$id", avgRT: {$avg: "$responseTime"}}}
  ]).toArray(function(err, docs){
    docs.forEach(function(server){
      serverIndex[server._id]= {id: server._id, average: server.avgRT};
    })
    cb(serverIndex);
  })

}

io.on("connection", function (socket) {
  var average = [];
  setInterval(function () {
      findAverage(function(results){
        average = results;
      });
      socket.emit("servers", {
        body: [{name: 'WOPR', id: 1776}, {name: 'HAL', id: 2010}, {name: 'R2D2', id: 1977}],
        average: average
      })
    // })
  }, 500)
})



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
