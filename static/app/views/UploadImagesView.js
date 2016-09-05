var Marionette = require('backbone.marionette');
var UploadImageView = require('./UploadImageView.js');

var UploadImagesView = Marionette.CollectionView.extend({
	tagName: "div",
	className: "image-gallery-wrapper",
	childView: UploadImageView
});

module.exports = UploadImagesView;
