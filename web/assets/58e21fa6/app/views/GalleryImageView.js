var Marionette = require('backbone.marionette');
var ModalImageDetails = require('./ModalImageDetails');

var ImageView = Marionette.ItemView.extend({
	tagName: "div",
	className: "col-xs-12 col-sm-6 col-md-4 col-lg-3",
	template: VideoEssenceApp.templates['gallery-image-template'],
	events: {
		'click .checkbox': 'toggleItem',
		'click .delete-image': 'deleteItem',
		'click .cancel-upload': 'cancelUpload',
		'click .open-image-details': 'imageDetails'
	},
	initialize: function () {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'change:uploaded', this.render);
		this.listenTo(this.model, 'change:progress', this.render);
		this.listenTo(this.model, 'change:error', this.render);
	},
	onRender: function () {
		$(this.$el.find('.image-actions')).popover({
			content: '<span class="open-image-details">Details</span><span class="delete-image">Delete</span>',
			html: true,
			placement: 'bottom'
		});

		var date = moment.unix(this.model.get('timestamp')),
			diffd = date.diff(moment(), 'days'),
			diffy = date.diff(moment(), 'years'),
			date_text;

		if (Math.abs(diffy) > 0)
			date_text = date.format("MMMM, D, YYYY");
		else if (Math.abs(diffd) > 2)
			date_text = date.format("MMMM, D");
		else
			date_text = date.fromNow();

		this.model.set('date_text', date_text);
	},

	imageDetails: function () {
		var self = this,
			image;
		self.model.set('size_str', self.bytesToSize(self.model.get('filesize')))
		var modal = new ModalImageDetails({
			model: self.model
		});

		modal.show();
	},

	bytesToSize: function (bytes) {
	    var sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb'];
	    if (bytes == 0) return '0 Byte';
	    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
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