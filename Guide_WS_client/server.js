
// We need to use the express framework: have a real web servler that knows how to send mime types etc.
var express=require('express');

// Init globals variables for each module required
var app = express()
  , http = require('http')
  , server = http.createServer(app);

// launch the http server on given port
var ipaddr = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

server.listen(port,ipaddr);


app.use(express.json());    
app.use(express.urlencoded());
//app.use (express.multipart ());
// Indicate where static files are located. Without this, no external js file, no css...  
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






var request = require('request');


 app.post('/sparql_update',express.bodyParser(), function(req, res) {
	console.log("Unserialized request: " + req.body.updatequery);
	
	request.post({
	  headers: {'content-type' : 'application/x-www-form-urlencoded'},
	  url:     'http://localhost:3030/data/update',
	  body:    'update='+req.body.updatequery
	}, function(error, response, body){
	  console.log(body);
	});
	
   res.sendfile(__dirname + '/'+htmlDir+'/Acceuil.html');
});


app.post('/sparql_add_dependence',express.bodyParser(), function(req, res) {
	var query ="\
	 PREFIX User-Stories: <http://www.exemple.fr/usersstory.rdfs#>\
	 INSERT DATA\
	 { \
	  <http://www.exemple.fr/usersstory.rdfs-instances#"+req.body.selectUS1+"> \
	  User-Stories:"+req.body.dependence+ " <http://www.exemple.fr/usersstory.rdfs-instances#"+req.body.selectUS2+ ">;" 
	 +"}"; 
	console.log(query);
	request.post({
	  headers: {'content-type' : 'application/x-www-form-urlencoded'},
	  url:     'http://localhost:3030/data/update',
	  body:    'update='+query
	}, function(error, response, body){
	  console.log(body);
	});
	  res.sendfile(__dirname + '/'+htmlDir+'/Acceuil.html');
});

app.post('/sparql_add_decomposition',express.bodyParser(), function(req, res) {
	var query ="\
	 PREFIX User-Stories: <http://www.exemple.fr/usersstory.rdfs#>\
	 INSERT DATA\
	 { \
	  <http://www.exemple.fr/usersstory.rdfs-instances#"+req.body.selectUS1+"> \
	  User-Stories:"+req.body.decomposition+ " <http://www.exemple.fr/usersstory.rdfs-instances#"+req.body.selectUS2+ ">;" 
	 +"}"; 
	console.log(query);
	request.post({
	  headers: {'content-type' : 'application/x-www-form-urlencoded'},
	  url:     'http://localhost:3030/data/update',
	  body:    'update='+query
	}, function(error, response, body){
	  console.log(body);
	});
	  res.sendfile(__dirname + '/'+htmlDir+'/Acceuil.html');
});

app.post('/sparql_creation_epic',express.bodyParser(), function(req, res) {
	var query ="\
	  PREFIX User-Stories: <http://www.exemple.fr/usersstory.rdfs#>\
	  PREFIX Metier:<http://www.exemple.fr/university.rdfs#>\
	INSERT DATA\
	{ \
	<http://www.exemple.fr/usersstory.rdfs-instances#"+req.body.IDUS+"> \
	User-Stories:name'"+req.body.IDUS+"';\
	a User-Stories:EpicUserStory ;\
	}";
	console.log(query);
	request.post({
	  headers: {'content-type' : 'application/x-www-form-urlencoded'},
	  url:     'http://localhost:3030/data/update',
	  body:    'update='+query
	}, function(error, response, body){
	  console.log(body);
	});
	  res.sendfile(__dirname + '/'+htmlDir+'/Acceuil.html');
});


app.post('/sparql_creation_details',express.bodyParser(), function(req, res) {
console.log("create details");
var query ="\
  PREFIX User-Stories: <http://www.exemple.fr/usersstory.rdfs#>\
  PREFIX Metier:<http://www.exemple.fr/university.rdfs#>\
INSERT DATA\
{ \
<http://www.exemple.fr/usersstory.rdfs-instances#"+req.body.IDUS+"> \
User-Stories:name'"+req.body.IDUS+"';\
a User-Stories:DetailsUserStory ;\
User-Stories:hasDimension [ \
a User-Stories:WhoDimension;\
User-Stories:hasRole Metier:"+req.body.role+"];\
User-Stories:hasDimension [ \
a User-Stories:WhatDimension; \
User-Stories:hasWhatAction  [ \
a User-Stories:"+req.body.whatAction+";\
User-Stories:definedBy [\
	a User-Stories:Intention;\
	User-Stories:hasVerbe Metier:"+req.body.whatVerbe+" ; User-Stories:hasObject Metier:"+req.body.whatObject+" ; User-Stories:hasParameter '"+req.body.whatParam+"' ;\
	]\
]\
];\
User-Stories:hasDimension [  \
a User-Stories:WhyDimension; \
User-Stories:hasWhyAction [ a User-Stories:"+req.body.whyAction+";\
User-Stories:definedBy [\
	a User-Stories:Intention;\
	User-Stories:hasVerbe Metier:"+req.body.whyVerbe+" ; User-Stories:hasObject Metier:"+req.body.whyObject+" ; User-Stories:hasVerbe '"+req.body.whyParam +"';\
	]\
]\
];\
User-Stories:hasPriority "+req.body.priority+";\
User-Stories:hasState '"+req.body.state+"';\
User-Stories:hasEffort "+req.body.effort+";\
User-Stories:hasbussinessDomain Metier:"+req.body.Business_Domain+";\
}";
console.log(query);
request.post({
	  headers: {'content-type' : 'application/x-www-form-urlencoded'},
	  url:     'http://localhost:3030/data/update',
	  body:    'update='+query
	}, function(error, response, body){
	  console.log(body);
	});
	  res.sendfile(__dirname + '/'+htmlDir+'/Acceuil.html');
});


app.post('/sparql_update_details',express.bodyParser(), function(req, res) {
	var query ="\
  PREFIX User-Stories: <http://www.exemple.fr/usersstory.rdfs#>\
  PREFIX Metier:<http://www.exemple.fr/university.rdfs#>\
DELETE {\
?s ?p ?o\
}\
INSERT \
{ \
?s \
User-Stories:name'"+req.body.IDUS+"';\
a User-Stories:DetailsUserStory ;\
User-Stories:hasDimension [ \
a User-Stories:WhoDimension;\
User-Stories:hasRole Metier:"+req.body.role+"];\
User-Stories:hasDimension [ \
a User-Stories:WhatDimension; \
User-Stories:hasWhatAction  [ \
a User-Stories:"+req.body.whatAction+";\
User-Stories:definedBy [\
	a User-Stories:Intention;\
	User-Stories:hasVerbe Metier:"+req.body.whatVerbe+" ; User-Stories:hasObject Metier:"+req.body.whatObject+" ; User-Stories:hasParameter '"+req.body.whatParam+"' ;\
	]\
]\
];\
User-Stories:hasDimension [  \
a User-Stories:WhyDimension; \
User-Stories:hasWhyAction [ a User-Stories:"+req.body.whyAction+";\
User-Stories:definedBy [\
	a User-Stories:Intention;\
	User-Stories:hasVerbe Metier:"+req.body.whyVerbe+" ; User-Stories:hasObject Metier:"+req.body.whyObject+" ; User-Stories:hasVerbe '"+req.body.whyParam +"';\
	]\
]\
];\
User-Stories:hasPriority "+req.body.priority+";\
User-Stories:hasState '"+req.body.state+"';\
User-Stories:hasEffort "+req.body.effort+";\
User-Stories:hasbussinessDomain Metier:"+req.body.Business_Domain+";\
}\
WHERE  { ?s ?p ?o . \
         FILTER (?s = <http://www.exemple.fr/usersstory.rdfs-instances#"+req.body.IDUS+">) \
}";
console.log(query);
request.post({
	  headers: {'content-type' : 'application/x-www-form-urlencoded'},
	  url:     'http://localhost:3030/data/update',
	  body:    'update='+query
	}, function(error, response, body){
	  console.log(body);
	});
	  res.sendfile(__dirname + '/'+htmlDir+'/Acceuil.html');
});



app.delete('/sparql_delete_link/:us1;:linkname;:us2',express.bodyParser(), function(req, res) {
console.log('delete link');

var US1=req.params.us1;
var US2=req.params.us2;
var link=req.params.linkname;
console.log( US1 + US2 + link);
 
 //ou 
 var query ="\
PREFIX User-Stories: <http://www.exemple.fr/usersstory.rdfs#>\
DELETE DATA\
{\
<http://www.exemple.fr/usersstory.rdfs-instances#"+US1+"> \
	  User-Stories:"+ link + " <http://www.exemple.fr/usersstory.rdfs-instances#"+US2+ ">;\
 }";
 

console.log(query);
request.post({
	  headers: {'content-type' : 'application/x-www-form-urlencoded'},
	  url:     'http://localhost:3030/data/update',
	  body:    'update='+query
	}, function(error, response, body){
	  console.log(body);
	});
	  res.sendfile(__dirname + '/'+htmlDir+'/Acceuil.html');
});


app.delete('/sparql_delete/:id',express.bodyParser(), function(req, res) {
var USToDelete=req.params.id;
var query ="\
PREFIX User-Stories: <http://www.exemple.fr/usersstory.rdfs#>\
DELETE {?s ?p ?o}\
WHERE  {?s ?p ?o; User-Stories:name \""+ USToDelete+"\";\
 }";
console.log(query);
request.post({
	  headers: {'content-type' : 'application/x-www-form-urlencoded'},
	  url:     'http://localhost:3030/data/update',
	  body:    'update='+query
	}, function(error, response, body){
	  console.log(body);
	});
	  res.sendfile(__dirname + '/'+htmlDir+'/Acceuil.html');
});





