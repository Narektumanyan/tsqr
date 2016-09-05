var Facebook = require('../models/Facebook.js');
var FacebookCollection = Backbone.Collection.extend({
	model: Facebook,
	url : '/post/search-facebook-posts'
});
module.exports = FacebookCollection;