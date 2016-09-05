var GooglePost = require('../models/GooglePost.js');
var GooglePostCollection = Backbone.Collection.extend({
	model: GooglePost,
	url : '/post/search-google-posts'
});
module.exports = GooglePostCollection;