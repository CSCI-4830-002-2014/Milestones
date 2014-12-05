
var express = require('express');
//var bodyParser = require('./rawBodyParser.js');
var bodyParser = require('body-parser');
var dataAccess = require('./dataAccess.js');
var linq = require('node-linq').LINQ;
var urlHelper = require('url');

var app = express();

function startServer() 
{

	app.set('port', (process.env.PORT || 5000));
	//app.use(bodyParser.RawParser)
	app.use(bodyParser.json());
	app.use(express.static(__dirname + '/'))

	app.listen(app.get('port'), function() 
	{
	  console.log("Listening on port " + app.get('port') + " ...")
	});

}

startServer()

function clone(object) {
	return JSON.parse(JSON.stringify(object));
}

function toModel(object) {

	var model = clone(object);
	delete model._id;
	return model;
}

app.get('/words/top', function(request, response) {

	var query = urlHelper.parse(request.url, true).query;

	dataAccess.getTopWords( parseInt(query.max), function (error, docs) {
			
		if(error != null)
		{
			response.send( "bad request" );
			return;
		}

		var result = new linq(docs).Select(toModel).ToArray();

		response.send(result);

	});

});

app.get('/words/recent', function(request, response) {

	var query = urlHelper.parse(request.url, true).query;

	dataAccess.getRecentWords( parseInt(query.max), parseInt(query.period), function (error, docs) {
			
		if(error != null)
		{
			response.send( "bad request" );
			return;
		}

		var result = new linq(docs).Select(toModel).ToArray();

		response.send(result);

	});

});

app.post("/words", function(request, response) {

	dataAccess.addWords( request.body );
	response.send("");

});