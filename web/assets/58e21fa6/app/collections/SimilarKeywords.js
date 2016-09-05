var SimilarKeyword = require('../models/SimilarKeyword.js');
var SimilarKeywords = Backbone.Collection.extend({
	model: SimilarKeyword
});
module.exports = SimilarKeywords;