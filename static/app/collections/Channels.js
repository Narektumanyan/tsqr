var Backbone  =  require('backbone');
var Channel = require('../models/Channel.js');

var Channels = Backbone.Collection.extend({
	initialize: function (models, options) {
		options = options || {};
		this.category = options.category || '';
        this.youtubeNextPageToken = options.youtubeNextPageToken || '';
	},
	model: Channel,
    parse: function(response) {
        return response.channels;
    },
	url: function () {
		return '/site/category?type=json&name=' + this.category + '&youtubeNextPageToken=' + this.youtubeNextPageToken;
	}
});
module.exports = Channels;