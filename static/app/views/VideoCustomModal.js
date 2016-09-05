VideoEssenceApp.VideoCustomModal = VideoEssenceApp.ModalHandelbars.extend({
	prefix: 'vcm',
	template: VideoEssenceApp.templates['modal-video-custom'],
	events: {
		"click .tab_label": "tabClick",
		"click .menu-tabs .customize_button": "startCampaign"
	},
	tabClick: function (evt) {
		var $this = $(evt.currentTarget);
		var $content = $this.attr('content_div');
		this.$el.find('.popup-tabs').find('.active').removeClass("active");
		$this.addClass("active");
		this.$el.find('.campaign_content.active').removeClass("active");
		this.$el.find('#' + $content).addClass("active");
	},
	startCampaign: function (evt) {
		var select_campaing = this.$el.find('input[name=tab]:checked').val();
		switch (select_campaing) {
			case 'campaign_1':
				this.startLeadCampaign();
				break;
			case 'campaign_3':
				this.startAnnotationCampaign();
				break;
			case 'campaign_4':
				this.startCallToActionCampaign();
				break;
		}
	},
	startLeadCampaign: function() {
		this.destroy();
		var videoLeadCaptureModal = new VideoEssenceApp.VideoLeadCaptureModal();
		$('.app').html(videoLeadCaptureModal.render().el);
	},
	startAnnotationCampaign: function() {

	},
	startCallToActionCampaign: function() {

	}
});