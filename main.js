
var express = require('express');
var bodyParser = require('./rawBodyParser.js');
var dataAccess = require('./dataAccess.js');
var linq = require('node-linq').LINQ;

var app = express();

function startServer() 
{

	app.set('port', (process.env.PORT || 5000));
	app.use(bodyParser.RawParser)
	app.use(express.static(__dirname + '/'))

	app.listen(app.get('port'), function() 
	{
	  console.log("Listening on port " + app.get('port') + " ...")
	});

}

startServer()

app.get("/audio", function(request, response) {

	response.send( [ { word: "hi", count: 1}, { word: "good bye", count: 5 } ] );

});

app.post("/audio", function(request, response) {

	response.send( request.body );

});