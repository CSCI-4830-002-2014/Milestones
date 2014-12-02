
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

function clone(object) {
	return JSON.parse(JSON.stringify(object));
}

app.get("/audio", function(request, response) {

	dataAccess.getAllWords( function (error, docs) {

			
		if(error != null)
		{
			response.send( "bad request" );
			return;
		}

		var result = new linq(docs).Select(function(x) {
			var model = clone(x);
			delete model._id;
			return model;
		} ).ToArray();

		response.send(result);

	});

});

app.get("/audio/:word", function(request, response) {

	dataAccess.getWordInfo(request.param("word"), function(error, doc) {

		if(doc == null) {
			response.status(404).send({"msg":"Not Found"});
			return;
		}
		
		var model = clone(doc);
		delete model._id;
		response.send( model );

	});

});

app.post("/audio", function(request, response) {

	dataAccess.addWords( [ {word:"peyman", count: 1}, {word:"kate",count:2} ] );
	response.send(request.body);

});