var Marionette = require('backbone.marionette');
var FollowVideoView = Marionette.ItemView.extend({
	template:  VideoEssenceApp.templates['followed-video-template'],
	events: {
		'click .url': 'showChannelVideos'
	},
	showChannelVideos: function (e) {
        e.preventDefault();
        if (window.location.href.match(/\/site\/channelvideos/gi) == null || window.location.href.match(/\/site\/channelvideos/gi).length == 0){
            window.location.href = '/site/channelvideos?channel_type='+this.model.attributes.type+'&channel_id='+this.model.attributes.id;
        }
        else {
            VideoEssenceApp.VideoExplore.videosCollection.urlForChannelVideos = '/site/channelvideos';
            VideoEssenceApp.VideoExplore.videosCollection.channelVideos(this.model.get('type'), this.model.get('id'));
            VideoEssenceApp.VideoExplore.videosView.getItems();
        }
		return false;
	}
});
module.exports = FollowVideoView;