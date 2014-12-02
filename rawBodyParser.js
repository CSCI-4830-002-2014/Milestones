exports.RawParser = RawParser

function RawParser(request, response, next) {

	request.setEncoding('utf8');
	request.body = '';
	request.on('data', function(chunk) {

		request.body += chunk;

	});

	request.on('end', function () {

		next();
		
	});

}