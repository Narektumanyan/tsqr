var Marionette = require('backbone.marionette');
var FacebookPostView = require('./FacebookPostView.js');
var FacebookPostsView = Marionette.CollectionView.extend({
	className: 'image-search-result-inner',
	childView: FacebookPostView
});
module.exports = FacebookPostsView;