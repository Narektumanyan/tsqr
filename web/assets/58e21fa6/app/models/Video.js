var VideoModel = Backbone.Model.extend({
	defaults: {
        saved: false,
        showButtonVideoHide:false
	},

	initialize : function(){
		this.set('saved', this.isVideoInPocket() );
        if(!_.isUndefined(VideoEssenceApp.FollowPanel)) {
            this.set('followed', VideoEssenceApp.FollowPanel.isHave(this.get('channel_id')));
        }
        this.bind("change:followed", this.followVideo);
	},
    followVideo:function(){
        console.log("VideoModel");
        var url = !(this.get('followed'))?"/site/unfollow-channel":"/site/follow-channel";

        var jqxhr = $.ajax(url, {

            method: 'post',
            data: {
                id:this.get('channel_id'),
                type:this.get('type'),
                subtype:this.get('channel_subtype'),
                name:this.get('channel_title')
            }

        })
    },
    hide:function(){
        var url = "/site/hide-video/?id="+ this.get('id')+'&type='+this.get('type');
        var jqxhr = $.ajax(url)
    },
    isVideoInPocket: function() {
        var videoModelsArr = JSON.parse(localStorage.getItem("pocketVideosCollection"));
        var resultVideos = _.where(videoModelsArr,{
            id:this.get('id')
        });
        return resultVideos.length;
    },
});
module.exports = VideoModel;