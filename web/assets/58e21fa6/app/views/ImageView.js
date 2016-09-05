var Marionette = require('backbone.marionette');
var ImageView = Marionette.ItemView.extend({
	tagName: "div",
	className: "image-gallery-item",
	template: VideoEssenceApp.templates['image-template'],

	events: {
		'click .close-button': 'deleteItem'
	},
	initialize: function () {

	},
	deleteItem: function () {
		this.model.destroy({url: "/image/delete/" + this.model.get('id')});
	}
});
module.exports = ImageView;