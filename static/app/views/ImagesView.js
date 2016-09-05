var Marionette = require('backbone.marionette');
var ImageView = require('./ImageView.js');
var ImagesView = Marionette.CollectionView.extend({
	tagName: "div",
	className: "image-gallery-wrapper",
	childView: ImageView
});
module.exports = ImagesView;
