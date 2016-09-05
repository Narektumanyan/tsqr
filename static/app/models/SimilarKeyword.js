var Channel = require('./Channel.js');
var SimilarKeyword = Channel.extend({
	defaults: {
		type: 'search',
		subtype: 'search'
	}
});
module.exports = SimilarKeyword;