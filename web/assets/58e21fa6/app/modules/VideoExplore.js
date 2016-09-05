var Marionette = require('backbone.marionette');
var VideosCollection = require('../collections/Videos.js');

var VideoExplore = Marionette.Module.extend({
	startWithParent: false,
	initialize: function (moduleName, app, options) {
		console.log('initialize VideoExplore');
		this.videosCollection = new VideosCollection([]);
		this.videoRegion = new Marionette.Region({
            el: ".explore-video-wrapper"
        });
		var self = this;
		VideoEssenceApp.vent.on("pocket:videoRemove", function (model) {
			var videoInCanvas = self.videosCollection.get(model);
			if (!_.isUndefined(videoInCanvas)) {
				videoInCanvas.set('saved', false);
			}
		});
	},
	onStart: function (options) {
		this.videosCollection = new VideosCollection([], options.collectionOptions);
        console.log("options.videos", options.videos);
		this.videosCollection.set(options.videos);

		var VideosView = require('../views/VideosView.js');
		this.videosView = new VideosView({
			collection: this.videosCollection
		}, {
            channelInfo: options.channelInfo,
            followChannels: options.followChannels,
            categoryName: (parseInt(options.categoryName) != 0 ) ? options.categoryName : "Categories",
            isSearch: options.isSearch != undefined ? options.isSearch : false
        });
		this.videoRegion.show(this.videosView);

		if (options.stopPaging) {
			this.videosView.stopGetting();
		} else {
			this.videosView.getItems(true);
		}
	},

    embededHtml: function(type, url, node_name, cls, videoWidth, videoHeight) {
        var width = 840,
            height = this.normalizeSizeVideo('width', width);

        console.log('embededHtml', type, url, node_name, cls );

    	try {
    		videojs(node_name).dispose();
    	} catch (e) {
    		
    	}

        if (cls == 'mini-frame') {
            width = 420;
            height = 237;
        } else if (cls == 'full-width') {
            width = '100%';
            height = 'auto';
            //width = 840;
            //height = 468;
        }
        switch(type) {
            case 'vimeo':
                return "<video contenteditable='false' frameborder='0' id='" + node_name + "' data-width='" + videoWidth + "' " +
                    "data-height='" + videoHeight + "' class='video-js video-js-vimeo vjs-default-skin " +
                    cls + "' webkitallowfullscreen mozallowfullscreen allowfullscreen controls autoplay preload='auto' " +
                    "width='" + width + "' height='" + height + "' ></video>";
            case 'youtube':
                return "<video contenteditable='false' id='" + node_name + "' src='' class='video-js vjs-default-skin " + cls + "' controls autoplay preload='auto' width='" + width + "' height='" + height + "' data-setup='{ \"techOrder\": [\"youtube\"], \"src\": \"" + url + "\"}'></video>";
        }
        return null;
    },
    embededVideo: function (node, html, node_name, videoModel) {
        var video, videoNode;
        node.addClass("is-ve-video").addClass("done");
        node.html(html);

        console.log('embededVideo', node, html, node_name, videoModel);

        videoNode = node.find('video');

        if (videoNode.hasClass('full-width')) {
        	var height = this.normalizeSizeVideo('width', videoNode.width(), videoModel.get('width'), videoModel.get('height'));
        	//console.log(height);
        	//console.log(videoNode.width());
        	videoNode.attr('height', height);
        	//console.log(videoNode.height());
        }

        if(videoModel.get('type') == 'vimeo') {
            video = videojs(node_name, {
                //techOrder: ["html5", "youtube", "flash"],
                techOrder: ["vimeo"],
                //example_option: true,
                autoplay: false,
                controls: true,
                preload: "auto",
                src: videoModel.get('url'),
                poster: videoModel.get('poster')
            }).ready(function(){
                //console.log('this', this);

                var videoJsVimeo = $('.video-js-vimeo');

                video.load();
                video.on('fullscreenchange', function(e){
                    var self = $(e.target);

                    var normalizeWidth = VideoEssenceApp.VideoExplore.normalizeSizeVideo(
                        'height',
                        self.parent().height(),
                        videoModel.get('width'),
                        videoModel.get('height')
                    );

                    var bigView = 0;
                    if (VideoEssenceApp.VideoExplore.videosView != undefined)
                        bigView = VideoEssenceApp.VideoExplore.videosView.model.get('bigView');

                    if (window.innerHeight == self.height()) {
                        normalizeWidth = VideoEssenceApp.VideoExplore.normalizeSizeVideo(
                            'height',
                            window.innerHeight,
                            videoModel.get('width'),
                            videoModel.get('height')
                        );
                        $('.vjs-fullscreen .vjs-tech-vimeo')
                            .css('height', window.innerHeight + 400 + 'px')
                            .css('margin', '-200px auto 0')
                            .css('width', normalizeWidth + 'px')
                            .css('left', (bigView) ? 0 : (window.innerWidth - normalizeWidth) / 2 )
                        ;
                    }else{
                        normalizeWidth = VideoEssenceApp.VideoExplore.normalizeSizeVideo(
                            'height',
                            self.parent().height(),
                            videoModel.get('width'),
                            videoModel.get('height')
                        );
                        $('.vjs-tech-vimeo')
                            .css('height', self.parent().height() + 400 +'px')
                            .css('margin', '-200px auto 0')
                            .css('width', normalizeWidth + 'px')
                            .css('left', 0 )
                        ;
                    }
                });
            });
        } else {
            video = videojs(node_name).on("ended", function () {
                this.play();
            });
        }

        return video;
    },
    showModal: function (e, m) {
        e.preventDefault();
        var model = new Backbone.Model({
            id : m.get("id"),
            type : m.get("type"),
            title : m.get("title")
        });

        var ModalHandelbars = require('../views/ModalHandlebars.js');
        var TabModal = ModalHandelbars.extend({
            template: VideoEssenceApp.templates['modal-template'],
            cancelEl: '.modal-close',
            model:model
        });
        var tabModal = new TabModal();

        $('.app').html(tabModal.render().el);

        var node = $('.video-frame-popup');
        var content = this.embededHtml(m.get('type'), m.get('url'), m.id, 'full-width', m.get('width'), m.get('height'));
        this.embededVideo(node, content, m.id, m);
    },

    normalizeSizeVideo: function (param, value, width, height) {
        var w = 12, h = 9;
        console.log(height / width != .75, height / width, width, height)
        if (height / width != .75){
            w = 16;
        }
    	switch (param) {
    		case 'width':
    			//return (value / 16) * 9;
    			return (value / w) * h;
    		case 'height':
    			//return (value / 9) * 16;
    			return (value / h) * w;
    	}
    	return null;
    }
});
module.exports = VideoExplore;