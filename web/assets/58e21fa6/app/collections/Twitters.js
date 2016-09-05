var Twitter = require('../models/Twitter.js');
var Twitters = Backbone.Collection.extend({
	model: Twitter,
	url: function () {
		return '/post/twitters';
	}
});
module.exports = Twitters;