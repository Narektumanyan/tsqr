var Marionette = require('backbone.marionette');
var LinkRelatedPostView = require('./LinkRelatedPostView.js');
var LinkRelatedPostsView = Marionette.CollectionView.extend({
	childView: LinkRelatedPostView
});
module.exports = LinkRelatedPostsView;