var VideoTooltip = require('../../js/danteVideoTooltip.js');
var VideoView = Backbone.Marionette.ItemView.extend({
	template: VideoEssenceApp.templates['video-template'],
	className: "video-container-wrapper",

	events: {
		//'click .fa-plus-circle': 'clickedButton',
		'click .to-add-video': 'clickedButton',
		'click .button-like': 'clickFollow',
		'click .popover-content': 'hideVideo',
		'click .thumbnail-wrapper .image-view': 'imageClickProceed',
		'click .thumbnail-wrapper .icon-play': 'imageClickProceed',
		'click .video-description .lockup-title a': 'showModal'
	},

	initialize: function () {
		// this.listenTo(this.model, 'change:saved', this.render);
		if (this.model.get('type') == 'youtube') {
			this.model.set({'embeded_url': 'https://www.youtube.com/embed/' + this.model.get('id') + '?autoplay=1'});
		} else {
			this.model.set({'embeded_url': 'https://player.vimeo.com/video/' + this.model.get('id') + '?autoplay=1'});
		}
	},
	imageClickProceed: function (evt) {
		var node = this.$el.find('.video-frame');
		var content = VideoEssenceApp.VideoExplore.embededHtml(this.model.get('type'), this.model.get('url'), this.model.id, 'mini-frame');

		if(this.model.get('bigView')) {
			VideoEssenceApp.VideoExplore.embededVideo(node, content, this.model.id, this.model);
		} else {
			this.showModal(evt);
		}
		evt.preventDefault();
	},

	showModal: function (e) {
        e.preventDefault();
        VideoEssenceApp.VideoExplore.showModal(e, this.model);
        //console.log('showModal', this.model);
	},
	hideVideo: function () {
		this.model.hide();
		this.destroy();
	},
	hideVideoButton: function () {
		this.model.set('showButtonVideoHide', !this.model.get('showButtonVideoHide'));
		this.render();
	},
	clickedButton: function (e) {
		var isSaved = this.model.get('saved');
		if (isSaved) {
			VideoEssenceApp.vent.trigger("pocket:videoRemove", this.model);
			$(e.currentTarget).removeClass('added');
		} else {
			VideoEssenceApp.vent.trigger("pocket:videoAdd",this.model);
			$(e.currentTarget).addClass('added');
		}
		this.model.set('saved', !isSaved, {silent: true});
	},
	clickFollow: function () {
		var isFollowed = this.model.get('followed');

		var channelOptions = {
			id: encodeURIComponent(this.model.get('channel_id')),
			title: this.model.get('channel_title'),
			type: this.model.get('type'),
			url: this.model.get('channel_url'),
			subtype: this.model.get('channel_subtype')
		};
        VideoEssenceApp.FollowPanel.followedChannelCollectionFull.channelProcess(isFollowed, channelOptions);

		VideoEssenceApp.VideoExplore.videosView.checkFollowedByChannel(isFollowed, this.model.get('channel_id'));
		if(!_.isUndefined(VideoEssenceApp.SearchPanel)){
			VideoEssenceApp.SearchPanel.fillChannels([]); //update list of search channels If channel was followed
		}

        VideoEssenceApp.FollowPanel.rerender();
	},
	onRender: function() {
		this.$el.find('.fa-ellipsis-v').popover({
			content:"Don’t show me this",
			html:true,
			placement:"bottom"
		});
	}
});
module.exports = VideoView;