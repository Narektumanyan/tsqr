var Marionette = require('backbone.marionette');
var SearchVideoView = require('./SearchVideoView.js');
var SearchVideosView = Marionette.CollectionView.extend({
	childView: SearchVideoView
});
module.exports = SearchVideosView;