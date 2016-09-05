var Marionette = require('backbone.marionette');
var ImagesGallery = require('../collections/ImagesGallery.js');
var GalleryManager = require('../views/GalleryManager.js');

var GalleryModule = Marionette.Module.extend({
	startWithParent: false,
	initialize: function () {
		
	},
	onStart: function(options) {
		this.imagesGalleryCollection = new ImagesGallery(options.images_gallery);
		this.imagesPostsCollection = new ImagesGallery(options.images_posts);
		this.show();
	},
	show: function () {
		var $regionGallery = $(".page-content");
		this.galleryRegion = new Marionette.Region({
			el: $regionGallery[0]
		});
		this.Gallery = new GalleryManager();
		this.galleryRegion.show(this.Gallery);
	}
});

module.exports = GalleryModule;