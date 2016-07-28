var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var dboper = require('./operations');

// Connection URL
var url = 'mongodb://localhost:27017/leaderdata';

//For hosting
// var url = 'mongodb://admin:ybDjUjVbrnAM@127.3.31.130:27017/application';


var hostname = 'localhost';
var port = 3000;

var result;

var app = express();

//For hosting
//app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3002);
//app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(morgan('dev'));

var leaderRouter = express.Router();
leaderRouter.route('/')
.get(function(req,res,next){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        dboper.findDocuments(db, "leader", function (docs) {
            console.log(docs);
            result=docs;
             result.sort(function(val1,val2){
            return parseInt(val2.sorts)-parseInt(val1.sorts);
             });
            res.end(JSON.stringify(result));

            db.close();
            });

        });


})
.post(function(req,res,next){
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        console.log(req.body);

        MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        dboper.insertDocument(db, req.body, "leader", function (docs) {
            console.log(docs);
            result=docs;
            res.send();
            db.close();
            });

        });

});


app.use('/leaderboard',leaderRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});

//For hosting
/*app.listen(app.get('port'), app.get('ip'), function(){
 // console.log(`Server running at http://${hostname}:${port}/`);
});*/
