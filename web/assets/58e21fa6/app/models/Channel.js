var Channel = Backbone.Model.extend({
	defaults: {
	},
	initialize : function(){
		this.bind("change:followed", this.followChannel)
	},
	followChannel:function(){
        console.log("Channel");
		var url = !(this.get('followed'))?"/site/unfollow-channel":"/site/follow-channel";

        var isFollowed = !this.get('followed');

        var channelImg = this.get('image') != undefined ? this.get('image') :
            this.get('channelInfo') != undefined ? this.get('channelInfo').snippet.thumbnails.default : "";

        VideoEssenceApp.FollowPanel.followedChannelCollectionFull.channelProcess(isFollowed, {
            id:  encodeURIComponent(this.get('id')),
            title:  this.get('title'),
            type:  this.get('type'),
            url: this.get('url'),
            image: channelImg
        });

		var jqxhr = $.ajax(url, {

			method: 'post',
			data: {
				id: encodeURIComponent(this.get('id')),
				type:this.get('type'),
				subtype:this.get('subtype'),
				name:this.get('title'),
                image: channelImg
			}
		});
	}
});
module.exports = Channel;