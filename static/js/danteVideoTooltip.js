var VideoTooltip = Dante.View.TooltipWidget.extend({
	initialize: function (opts) {
		if (opts == null) {
			opts = {};
		}
		this.icon = opts.icon || "icon-video";
		this.title = opts.title || "Add a video";
		this.action = opts.action || "custom-embed-simple";
        this.afterPaste = opts.afterPaste || undefined;
		return this.current_editor = opts.current_editor;
	},
	handleClick: function (ev) {
		return this.VideoSelect(ev);
	},
	VideoSelect: function (ev) {
		var ph;
		ph = '<br>';
		this.node = this.current_editor.getNode();
		this.current_editor.setRangeAt(this.node);
		var VideoSearchModal = require('../app/views/VideoSearchModal.js');
		var searchModal = new VideoSearchModal({
			model: new Backbone.Model({
				video_count: JSON.parse(localStorage.getItem("pocketVideosCollection")).length
			})
		});
		$('.app').html(searchModal.render().el);
		this.hide();
	},
	handleEnterKey: function (ev, $node) {
		if ($node.hasClass("is-ve-video")) {
			return this.getEmbedFromNode($node);
		}
	},
	getVimeoId: function (url) {
		var regExp = /http(s)*:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;

		var match = url.match(regExp);

		return match ? match[3] : false;
	},
	getEmbedFromNode: function (node) {
		var $node = $(node);
		var url =$node.text();
		this.embedVideoFromUrl(url, $node)
	},
	embedVideoFromUrl: function (url, node) {
		this.node = node;
		this.node_name = this.node.attr("name");
		this.node.addClass("spinner");

		var _this = this;
        $.get('/post/video-info', {video_url: url}, function(data){
            _this.node.addClass("done");
            _this.node.removeClass("spinner");
            _this.pasteVideo(data, _this.node);
        });
	},
    pasteVideo: function (video, node) {

        if (!node) {
            node = this.current_editor.$el.find('.graf--p').first();
            $(node).attr("data-video-id", video.id).attr("data-video-type", video.type)
            console.log(node);
        }
        //$(node).remove();

        console.log('pasteVideo dante', video, video.width, video.height);

        var nodeId = window.Dante.utils.generateUniqueName();
        var cls = video.class ? video.class : '';
        var html = this.embededHtml(video.type, video.embeded_url, nodeId, cls, video.width, video.height);
        if (!html) return;
        var player = this.embededVideo(node, html, nodeId, video);
        if (_.isFunction(this.afterPaste)) {
            this.afterPaste(video, nodeId, player);
        }
    },
    embededHtml: function(type, url, node_name, cls, videoWidth, videoHeight) {
    	var width = 640,
    		height = 360;
    	if (cls == 'mini-frame') {
    		width = 420;
    		height = 240;
    	}
        switch(type) {
            case 'vimeo':
                return "<video contenteditable='false' frameborder='0' id='" + node_name + "' data-width='" + videoWidth + "' " +
                    "data-height='" + videoHeight + "' class='video-js video-js-vimeo-dante video-js-vimeo vjs-default-skin " +
                    cls + "' webkitallowfullscreen mozallowfullscreen allowfullscreen controls autoplay preload='auto'" +
                    " width='" + width + "' height='" + height + "' ></video>";
            case 'youtube':
                return "<video contenteditable='false' id='" + node_name + "' src='' class='video-js vjs-default-skin " + cls + "' controls autoplay preload='auto' width='" + width + "' height='" + height + "' data-setup='{ \"techOrder\": [\"youtube\"], \"src\": \"" + url + "\"}'></video>";
        }
        return null;
    },
    embededVideo: function (node, html, node_name, videoModel) {
	    var video;
	    node.addClass("is-ve-video").addClass("done");
        node.html(html);

        //console.log("embededVideo", node, html, node_name, videoModel);
        //console.log('videoModel', videoModel);
        //console.log('node_name', node_name);

	    if(videoModel.type == 'vimeo') {
            video = videojs(node_name, {
                //techOrder: ["html5", "youtube", "flash"],
                techOrder: ["vimeo"],
                //example_option: true,
                autoplay: false,
                controls: true,
                preload: "auto",
                src: videoModel.url,
                poster: videoModel.poster,
                callFrom: 'danteVideoTooltip'
            }).ready(function(){
                //console.log('this', this);

                //console.log('options.callFrom', player, options, ready,
                //    $(this.player_el_).hasClass('.video-js-vimeo-dante'),
                //    $player.find('.video-js-vimeo-dante').length,
                //    $(player.el_).hasClass('.video-js-vimeo-dante'),
                //    $(player.el_).find('.video-js-vimeo-dante').length
                //);

                //var self = $(this);
                //console.log('vimeo ready', this, video, self.hasClass('video-js-vimeo-dante'));

                //var videoJsVimeo = $('.video-js-vimeo');

                video.load();

                video.on('fullscreenchange', function(e){
                    var self = $(e.target);
                    console.log('fullscreenchange', e, window.innerHeight, self.height(), self.width(), self.parent().height(),
                        self.data('width'),
                        self.data('height')
                    );
                    //width: 100%;
                    //height: 120%;
                    //margin:-10% auto 0;

                    var normalizeWidth = VideoEssenceApp.VideoExplore.normalizeSizeVideo('height', self.parent().height(),
                        self.data('width'),
                        self.data('height')
                    );

                    if (window.innerHeight == self.height()) {
                        console.log('left 0:', (self.parent().width() - normalizeWidth) / 2 );
                        normalizeWidth = VideoEssenceApp.VideoExplore.normalizeSizeVideo('height', window.innerHeight);

                        $('.vjs-fullscreen .vjs-tech-vimeo')
                            .css('height', window.innerHeight + 400 + 'px')
                            .css('margin', '-200px auto 0')
                            .css('width', normalizeWidth + 'px')
                            .css('left', (window.innerWidth - normalizeWidth) / 2 )
                        ;

                    }else{
                        normalizeWidth = VideoEssenceApp.VideoExplore.normalizeSizeVideo('height', self.parent().height(),
                            self.data('width'),
                            self.data('height')
                        );
                        console.log('left 0:', (self.parent().width() - normalizeWidth) / 2 );
                        $('.vjs-tech-vimeo')
                            .css('height', self.parent().height() + 400 +'px')
                            .css('margin', '-200px auto 0')
                            .css('width', normalizeWidth + 'px')
                            .css('left', (self.parent().width() - normalizeWidth - 60) / 2 )
                        ;
                    }

                });
                //console.log('iframe', $('.video-frame-popup .vjs-default-skin iframe').contents().find("#player .controls"));
            });

        //console.log($('.video-frame-popup .vjs-default-skin iframe').contents().find("#player .controls"));
	    } else {
		    video = videojs(node_name, {controls: true, usingNativeControls: false}).on("ended", function () {
                this.play();
            });
	    }

	    return video;
    }
});
module.exports = VideoTooltip;
