var VideoModel = require('../models/Video.js');
var VideosCollection = Backbone.Collection.extend({
	initialize: function(models, options){
		try {
		//	options || (options = {});
			this.urlSearch = options.urlSearch || '';
			this.urlForChannelVideos = options.urlForChannelVideos || '';
			this.youtubeNextPageToken = options.youtubeNextPageToken || '';
		}catch(err){}
	},
	model: VideoModel,
    parse: function(response) {
        return response.videos;
    },
    channelVideos: function(channel_type, channel_id){
        this.urlSearch = this.urlForChannelVideos + '?channel_type=' + channel_type + '&channel_id=' + channel_id;
        this.youtubeNextPageToken = '';
        VideoEssenceApp.VideoExplore.videosView.resetOffset();
    },
	url:function(){
		if(this.urlSearch.indexOf('?') == -1){
			return this.urlSearch + '?youtubeNextPageToken=' + this.youtubeNextPageToken;
		}
		else {
			return this.urlSearch + '&youtubeNextPageToken=' + this.youtubeNextPageToken;
		}
	}
});
module.exports = VideosCollection;