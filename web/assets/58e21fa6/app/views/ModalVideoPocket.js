var Marionette = require('backbone.marionette');
var VideoPocketView = require('./ModalVideoPocketView.js');
var VideosView = Marionette.CollectionView.extend({
	className: 'video-pocket-inner',
	childView: VideoPocketView
});
module.exports = VideosView;