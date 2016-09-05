var Marionette = require('backbone.marionette');
var LinkPostView = Marionette.ItemView.extend({
	model: new Backbone.Model({
		linked: false,
		escape: false
	}),
	template:   VideoEssenceApp.templates['related-post'],
    className: "related-post",
	events: {
		'click .post-link': 'addLink'
	},
	addLink:function(){
		if (VideoEssenceApp.PostPublish.linkPostsCollection.where({linked: true}).length < 5)
		{
			this.model.set('linked', !this.model.get('linked'));
			this.render();
			VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);
		}
	}
});
module.exports = LinkPostView;