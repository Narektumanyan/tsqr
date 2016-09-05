var Marionette = require('backbone.marionette');
var FollowSearchChannel = Marionette.ItemView.extend({
	template: VideoEssenceApp.templates['followed-video-template'],
	events: {
		'click .url': 'showChannelVideos'
	},
	showChannelVideos: function(){
		VideoEssenceApp.VideoExplore.videosCollection.channelVideos(this.model.get('type'), this.model.get('id'));
		VideoEssenceApp.VideoExplore.videosView.getItems();
		return false;
	}
});
module.exports = FollowSearchChannel;
