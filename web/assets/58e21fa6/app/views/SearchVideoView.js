var Marionette = require('backbone.marionette');
var SearchVideoView = Marionette.ItemView.extend({
	template: VideoEssenceApp.templates['found-channel-template'],
    events: {
        'click .url': 'showChannelVideos',
        'click .found-channel-like': 'clickFollow',
        'mouseover .found-channel-like a' : 'onFollowHoverIn',
        'mouseout .found-channel-like a' : 'onFollowHoverOut'
    },

    initialize: function () {
        //todo: подумать как без silient
        this.model.set('followed', VideoEssenceApp.FollowPanel.isHave(encodeURIComponent(this.model.get('id'))), {silent: true});
        this.model.set('ourUrl', "/site/channelvideos?channel_type=" + this.model.get("type") + "&channel_id=" + this.model.get("id"));

    },

    showChannelVideos: function(){
        VideoEssenceApp.VideoExplore.videosCollection.channelVideos(this.model.get('type'), this.model.get('id'));
        VideoEssenceApp.VideoExplore.videosView.getItems();
        return false;
    },

    clickFollow: function(e) {
        e.preventDefault();
        //console.log("clickFollow", e);
        var isFollowed = this.model.get('followed');

        //console.log({
        //    id:   encodeURIComponent(this.model.get('id')),
        //    title:  this.model.get('title'),
        //    type:  this.model.get('type'),
        //    url: this.model.get('url')
        //});

        VideoEssenceApp.FollowPanel.followedChannelCollectionFull.channelProcess(isFollowed, {
            id:   encodeURIComponent(this.model.get('id')),
            title:  this.model.get('title'),
            type:  this.model.get('type'),
            url: this.model.get('url'),
            image: this.model.get('image')
        });
        this.model.set('followed', !isFollowed);
        this.render();
    },

    onFollowHoverIn: function(e){
        //console.log("onFollowHoverIn", e);
        //var followLink = $(".found-channel-like a");
        var followLink = $(e.target);
        if (followLink.hasClass("followed")){
            followLink.text("Unfollow");
        }
        else{
            followLink.text("Follow");
        }
    },
    onFollowHoverOut: function(e){
        //console.log("onFollowHoverOut", e);
        var followLink = $(".found-channel-like a");
        var followLink = $(e.target);
        if (followLink.hasClass("followed")){
            followLink.text("Following");
        }
        else{
            followLink.text("Follow");
        }
    }
});
module.exports = SearchVideoView;