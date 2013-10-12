beforeEach(function() {

	var toBePlayableBy = function(login) {
		var actual = this.actual.html;
		var expected = '<a href="/players/' + login + '/play/world/' + this.actual.worldNumber + '">level ' + this.actual.worldNumber + '.' + this.actual.levelNumber + ' : ' + this.actual.levelTitle + '</a>';
		this.message = function() {
			return "Expected '" + actual + "' to equal '" + expected + "'";
		}
		return actual == expected;
	};
	
	var toBeDone = function() {
		var actual = this.actual.html;
		var expected = 'level ' + this.actual.worldNumber + '.' + this.actual.levelNumber + ' : ' + this.actual.levelTitle;
		this.message = function() {
			return "Expected '" + actual + "' to equal '" + expected + "'";
		}
		return actual == expected;
	};

	this.addMatchers({ toBePlayableBy: toBePlayableBy, toBeDone: toBeDone });
});

function DashboardLevelMatcherData(page, database) {
	this.database = database;
	this.page = page;
};
DashboardLevelMatcherData.prototype.number = function(world, level) {
	var selector = 'table#worlds tr:nth-child(' + world + ') td:nth-child(2) ul.levels li:nth-child(' + level + ')';
	return {
		worldNumber: world,
		levelNumber: level,
		levelTitle : this.database.worlds[world - 1].levels[level - 1].title,
		selector: selector,
		html: this.page(selector).html()
	}
};

module.exports = DashboardLevelMatcherData;


