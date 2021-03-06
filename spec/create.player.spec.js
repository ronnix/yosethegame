var Browser = require("zombie");
var router = require('../app/lib/router');
var Server = require('../app/lib/server');
var InMemoryDatabase = require('../app/support/database.with.levels');

describe('Creating a player', function() {

	var server = new Server(router);
	
	beforeEach(function() {
		database = new InMemoryDatabase();
		database.players = [];
		server.useDatabase(database);
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
	
	it('makes the dashboard of this player available', function(done) {
		var browser = new Browser();
		browser.visit('http://localhost:5000/create-new-player').
			then(function () {
				return browser.fill('#login', 'eric')
							  .fill('#avatar', 'this-url')
							  .pressButton('#create');
			}).
			then(function() {
				expect(browser.text('#message')).toEqual('Done');
			}).
			then(function() {
				return browser.visit('http://localhost:5000/players/eric');
			}).
			then(function() {
				expect(browser.text("#world-1 .world-ellipse")).toContain(database.worlds[0].name);
				done();
			}).
			fail(function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});
});