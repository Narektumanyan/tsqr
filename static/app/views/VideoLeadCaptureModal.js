VideoEssenceApp.VideoLeadCaptureModal = VideoEssenceApp.ModalHandelbars.extend({
	prefix: 'vlc',
	template: VideoEssenceApp.templates['modal-video-lead'],
	events: {
		"click .button-color .color-picking": "selectButtonColor",
		"click .background-color .color-picking": "selectBackgroundColor"
	},
	initialize: function() {
		this.model = new VideoEssenceApp.VideoLead();
		this.previewView = new VideoEssenceApp.VideoLeadPreview({
			model: this.model
		});
		this.listenTo(this.model, 'change', this.renderPreview);
	},
	onShow: function () {
		this.previewRegion = new Backbone.Marionette.Region({
			el: this.$el.find(".preview-wrapper")
		});

		//this.$el.find(".colorSelector").ColorPicker({
		//	color: "#000000",
		//	onShow: function (colpkr) {
		//		$(this).parent().parent().parent().find('.tick').removeClass('tick');
		//		$(this).parent().find('.color-holder').addClass("tick");
		//		$(colpkr).fadeIn(500);
		//		return false;
		//	},
		//	onHide: function (colpkr) {
		//		$(colpkr).fadeOut(500);
		//		return false;
		//	},
		//	onChange: function (hsb, hex, rgb) {
		//		var controlBar, html, sub;
		//		sub = $(".color-picking-right-now");
		//		if (sub.hasClass("no-color-holder")) {
		//			sub = sub.parent().find('.color-holder');
		//		}
		//		sub.css({
		//			'background-color': "#" + hex
		//		});
		//		controlBar = $('.vjs-control-bar');
		//		$(controlBar).css({
		//			'background': '#' + hex
		//		});
		//		$('#embedStyling').html("");
		//		html = '<style type="text/css">.vjs-control-bar, .vjs-big-play-button:before{background-color: #';
		//		html += hex;
		//		html += ' !important }</style>';
		//		$('#embedStyling').append(html);
		//		sub.addClass("active");
		//		sub.parent().find(".no-color-holder").html("#" + hex);
		//		sub.parent().parent().parent().find('.colorHolder').attr('value', '#' + hex);
		//	}
		//});
		//this.$el.find(".slider-range-min").each(function () {
		//	var $this;
		//	$this = $(this);
		//	return $($this).slider({
		//		range: "min",
		//		min: parseInt($this.attr('min-value')),
		//		max: parseInt($this.attr('max-value')),
		//		step: parseInt($this.attr('step')),
		//		value: parseInt($this.attr('value')),
		//		slide: function (e, ui) {
		//			var idToChange, minutes, seconds;
		//			if ($this.hasClass('select_time_mode')) {
		//				minutes = Math.floor(ui.value / 60);
		//				seconds = ui.value - (minutes * 60);
		//				if (minutes.length === 1) {
		//					minutes = "0" + minutes;
		//				}
		//				if (seconds.length === 1) {
		//					seconds = "0" + seconds;
		//				}
		//				$($this).parent().parent().find('.select_value').val(minutes + ":" + seconds);
		//				$($this).parent().parent().find('.select_value').attr('in_seconds', ui.value);
		//			}
		//			if ($($this).hasClass('opacitySlider')) {
		//				$($this).parent().parent().find('.opacity_value').html(Math.round(ui.value));
		//				idToChange = $($this).attr("changeBgOfThisId");
		//				if (idToChange !== void 0) {
		//					$('#' + idToChange).css({
		//						opacity: Math.round(ui.value) / 100
		//					});
		//				}
		//			}
		//		}
		//	});
		//});

		this.renderPreview();
	},
	renderPreview: function () {
		this.previewRegion.show(this.previewView)
	},
	selectButtonColor: function (evt) {

		var $this = $(evt.currentTarget);

		this.model.set('buttonColor', $this.attr('value'));
		this.$el.find('.button-color .tick').removeClass('tick');
		$this.addClass('tick');

		//$('.color-picking').click(function() {
		//	if ($('.color-picking-right-now').length > 0) {
		//		$('.color-picking-right-now').removeClass('color-picking-right-now');
		//	}
		//	return $(this).addClass('color-picking-right-now');
		//});
		//$(".color-picking").click(function() {
		//	var controlBar, html, oldActive;
		//	$(this).parent().parent().parent().find('.tick').removeClass('tick');
		//	$(this).addClass('tick');
		//	controlBar = $('.vjs-control-bar');
		//	$(controlBar).css({
		//		'background': $(this).css("background-color")
		//	});
		//	$('#embedStyling').html("");
		//	html = '<style type="text/css">.vjs-control-bar, .vjs-big-play-button:before{background-color: ';
		//	html += $(this).css("background-color");
		//	html += ' !important }</style>';
		//	$('#embedStyling').append(html);
		//	oldActive = $(this).parent().parent().parent().find(".active");
		//	$(this).parent().parent().find('.colorHolder').attr('value', $(this).css("background-color"));
		//	oldActive.removeClass("active");
		//	oldActive.css({
		//		"border-color": "#ffffff"
		//	});
		//	if (!$(this).hasClass("no-color-holder")) {
		//		$(this).addClass("active");
		//	}
		//});
	},
	selectBackgroundColor: function (evt) {
		var $this = $(evt.currentTarget);

		this.model.set('backgroundColor', $this.attr('value'));
		this.$el.find('.button-color .tick').removeClass('tick');
		$this.addClass('tick');
	}
});