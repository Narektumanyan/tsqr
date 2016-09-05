var Marionette = require('backbone.marionette');
var LinkPostView = require('./LinkPostView.js');
var LinkPostsView = Marionette.CollectionView.extend({
	childView: LinkPostView
});
module.exports = LinkPostsView;