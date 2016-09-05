var Marionette = require('backbone.marionette');
var FacebookPostView = Marionette.ItemView.extend({
	tagName: "div",
	className: "videoessenceGooglePost",
	template: VideoEssenceApp.templates['facebook-template'],
	events: {
		'click .embed-btn': 'embed',
		'click .remove-btn': 'removeSelect'
	},
	embed: function(){
		this.model.set('saved', true);
		this.render();
	},
	removeSelect: function(){
		this.model.set('saved', false);
		this.render();
	},
	onRender: function () {
		VideoEssenceApp.on('tick', _.bind(this.tick, this));
	},
	tick: function () {
		this.$el.find('.time-ago').html(moment(this.model.get('published')).fromNow());
	}
});
module.exports = FacebookPostView;