var Marionette = require('backbone.marionette'),
	ModalHandelbars = require('./ModalHandlebars.js');

var ModalImageDetails = ModalHandelbars.extend({
	prefix: 'bbm',
	template: VideoEssenceApp.templates['modal-image-details-template'],
	cancelEl: '.modal-close',
	events: {
		'click .action-update': 'updateImage'
	},

	onRender: function() {
		
	},

	show: function (options) {
		$('.app').html(this.render().el);
	},

	updateImage: function () {
		var self = this,
			name = self.$el.find('[name="image-details-name"]').val(),
			description = self.$el.find('[name="image-details-description"]').val();
			
		self.model.set('name', $.trim(name));
		self.model.set('description', $.trim(description));

		$.ajax({
			url: '/gallery/update',
			type: 'POST',
			data: {
				id : self.model.get('id'),
				name : self.model.get('name'),
				description : self.model.get('description')
			},
			success: function(data) {
				self.hide();
			}
		})
	},

	hide: function () {
		this.destroy();
	}
});
module.exports = ModalImageDetails;