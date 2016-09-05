var Marionette = require('backbone.marionette');
var GooglePostView = Marionette.ItemView.extend({
	template: VideoEssenceApp.templates['post-google'],
	className: 'col-md-6 col-xs-12',
	events: {
		'click .embed-btn': 'embed',
		'click .remove-btn': 'removeSelect'
	},
	initialize: function () {
		this.listenTo(this.model, 'change:saved', this.renderItem);
	},
	embed: function(){
		var self = this;
		self.model.set('onhover', false);
		this.model.set('saved', true);
		this.$el.find('.remove-btn').mouseleave(function() {
			self.model.set('onhover', true);
			self.renderItem();
		});
	},
	removeSelect: function(){
		this.model.set('onhover', true);
		this.model.set('saved', false);
	},
	renderItem: function () {
		this.render();
	},
	onRender: function () {
		VideoEssenceApp.on('tick', _.bind(this.tick, this));
	},
	tick: function () {
		this.$el.find('.time-ago').html(moment(this.model.get('published')).fromNow());
	},
	onShow: function () {
		this.$el.find('a').attr('target', '_blank');
	}
});
module.exports = GooglePostView;