var Marionette = require('backbone.marionette');
var GalleryImageView = require('./GalleryImageView.js');

var GalleryImagesView = Marionette.CollectionView.extend({
	tagName: "div",
	className: "image-gallery-wrapper",
	childView: GalleryImageView
});

module.exports = GalleryImagesView;
