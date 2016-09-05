var LinkPost = require('../models/LinkPost.js');
var LinkPosts = Backbone.Collection.extend({
	initialize: function(models, options){
		try {
		}catch(err){}
	},
	model: LinkPost
});
module.exports = LinkPosts;