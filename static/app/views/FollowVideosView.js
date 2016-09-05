var Marionette = require('backbone.marionette');
var FollowVideoView = require('./FollowVideoView.js');
var FollowVideosView = Marionette.CollectionView.extend({
	childView: FollowVideoView
});
module.exports = FollowVideosView;
