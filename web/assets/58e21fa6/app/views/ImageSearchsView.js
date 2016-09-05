var Marionette = require('backbone.marionette');
var ImageView = require('./ImageView.js');
var ImageSearchsView = Marionette.CollectionView.extend({
	tagName: "div",
	className: "image-search-result-inner",
	childView: ImageView
});
module.exports = ImageSearchsView;