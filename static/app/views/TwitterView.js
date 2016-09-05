var Marionette = require('backbone.marionette');
var TwitterView = Marionette.ItemView.extend({
	template: VideoEssenceApp.templates['twitter-template'],
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
		this.listenTo(VideoEssenceApp, 'tick', this.tick);
	},
	tick: function () {
		if(!_.isUndefined(this.model) ){
			this.$el.find('.time-ago').html(moment(this.model.get('created_at')).fromNow());
		}
	},
	onDestroy: function(){
		this.stopListening();
	},
	onShow: function () {
		this.$el.find('a').attr('target', '_blank');
	}
});
module.exports = TwitterView;