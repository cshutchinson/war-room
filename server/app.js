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
      serverIndex[server._id]= {id: server._id, average: server.avgRT*1000};
    })
    cb(serverIndex);
  })
}

function getServers(cb){
  collection.distinct("name", function(err, docs){
    cb(docs);
  })
}

function getLast(cb){
  collection.find().limit(3).toArray(function(err,docs){
    cb(docs);
  })
}

io.on("connection", function (socket) {
  var average = [];
  var body = [];
  setInterval(function () {
      findAverage(function(results){
        average = results;
      });
      getLast(function(results){
        // console.log(results);
        body = results;
      })
      socket.emit("servers", {
        body: body,
        average: average
      })
  }, 500)
})



app.get('/api/servers', function (req, res) {
  getLast(function(results){
    // console.log(results);
    res.json(results);
  })
})


server.listen(process.env.PORT || 8080, function () {
  if (process.env.PORT) {
    console.log("listening on: ", process.env.PORT);
  } else {
    console.log("listening on port 8080");
  }
})
