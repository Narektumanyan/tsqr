var Marionette = require('backbone.marionette');
var MediaManagerModule = Marionette.Module.extend({
	startWithParent: false,
	initialize: function () {
		//this.imagesGalleyCollection = new VideoEssenceApp.ImagesGalley();
	},
	onStart: function(options) {
		var ImagesGallery = require('../collections/ImagesGallery.js')
		VideoEssenceApp.Gallery.imagesGalleryCollection = new ImagesGallery();
		VideoEssenceApp.Gallery.imagesGalleryCollection.set(options.images_gallery);
	},
	show: function (options) {
		var ModalMediaManager = require('../views/ModalMediaManager.js');

		this.modalView = new ModalMediaManager(options);

		$('.app').html(this.modalView.render().el);
	},
	hide: function () {
		this.modalView.destroy();
	}
});
module.exports = MediaManagerModule;