var request = require('request');

pong = function(params, response) {
	request(params.query.server, function(error, remoteResponse, body) {
		if (error != null) {
			response.writeHead(404);
		}
		if (body != null) {
			response.write(body);
		}
		response.end();
	});
};

module.exports = pong;