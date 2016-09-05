var Marionette = require('backbone.marionette');

var ImageView = Marionette.ItemView.extend({
	tagName: "div",
	className: "col-xs-6 col-md-4",
	template: VideoEssenceApp.templates['upload-image-template'],
	events: {
		'click .checkbox': 'toggleItem',
		'click .delete-image': 'deleteItem',
		'click .cancel-upload': 'cancelUpload'
	},
	initialize: function () {
		this.listenTo(this.model, 'change:uploaded', this.render);
		this.listenTo(this.model, 'change:progress', this.render);
		this.listenTo(this.model, 'change:error', this.render);
	},
	toggleItem: function () {
		if (this.$el.hasClass('selected-item-gallery')) {
			this.model.set('selected', false);
			this.$el.removeClass('selected-item-gallery');
		} else {
			this.model.set('selected', true);
			this.$el.addClass('selected-item-gallery');
		}
		this.render();
	},
	deleteItem: function () {
		this.model.destroy({url: "/image/delete/" + this.model.get('id')});
	},
	cancelUpload: function () {
		this.model.set({'canceled': true});
	}
});

module.exports = ImageView;