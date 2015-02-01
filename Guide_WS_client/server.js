var express=require('express');
var app = express()
  , http = require('http')
  , server = http.createServer(app),
  request = require('request');

var ipaddr = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8081;
server.listen(port,ipaddr);


app.use(express.json());    
app.use(express.urlencoded());

app.configure(function () {    
    app.use(express.static(__dirname + '/'));    
});

var itemData;
var jsonDir="database/";
var htmlDir="pages/";

// routing
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/'+htmlDir+'/Acceuil.html');
});


app.get('/:ville', function (req, res) {
	res.sendfile(__dirname + '/'+htmlDir+'/Acceuil.html');
	
});

app.get('/:ville/:TypeBatiment', function (req, res) {
	res.sendfile(__dirname + '/'+htmlDir+'/Acceuil.html');
	
});

app.get('/page/Monuments/B', function (req, res) {
	res.sendfile(__dirname + '/'+htmlDir+'/Monuments.html');
	
});

app.get('/page/Monuments/B/:ville', function (req, res) {
	res.sendfile(__dirname + '/'+htmlDir+'/Monuments.html');
	
});

app.get('/page/Hotels/B/:ville', function (req, res) {
	res.sendfile(__dirname + '/'+htmlDir+'/Hotels.html');
	
});

app.get('/page/Hotels/B', function (req, res) {
	res.sendfile(__dirname + '/'+htmlDir+'/Hotels.html');
	
});


app.get('/page/Restaurants/B', function (req, res) {
	res.sendfile(__dirname + '/'+htmlDir+'/Restaurants.html');
	
});

app.get('/page/Restaurants/B/:ville', function (req, res) {
	res.sendfile(__dirname + '/'+htmlDir+'/Restaurants.html');
	
});


app.get('/page/Villes/get', function (req, res) {
	res.sendfile(__dirname + '/'+htmlDir+'/Villes.html');
	
});


app.get('/page/Vols/get', function (req, res) {
	res.sendfile(__dirname + '/'+htmlDir+'/Vols.html');
	
});

