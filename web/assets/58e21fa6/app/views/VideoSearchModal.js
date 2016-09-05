var Marionette = require('backbone.marionette');
var ModalHandelbars = require('./ModalHandlebars.js');
var VideosView = require('./ModalVideoPocket.js');
var VideoView = require('./ModalVideoPocketView.js');
var VideoModel = require('../models/Video.js');
var Videos = require('../collections/PocketVideos.js');

var $ = require('jquery');
	require('perfect-scrollbar/jquery')($);

var SocialSearchModal = ModalHandelbars.extend({
	events: {
		"click .search-video-button": "searchVideos",
		'keyup .post-search-field': 'searchVideosInput',
		'click .tab-video-pocket': 'showVideoPocket',
		'click .tab-video-search': 'showVideoSearch',
		'click .action-add': 'insertSelectedItems'
	},
	template: VideoEssenceApp.templates['modal-video-search'],
	cancelEl: '.modal-close, .action-cancel',
	submitEl: '.action-add',
	currentTab: '',
	currentNode: '',

	onRender: function () {
		//this.currentNode = $(VideoEssenceApp.PostCreate.editor.editor.getNode());
        if (VideoEssenceApp.PostPublish.editor != undefined)
		    this.currentNode = $(VideoEssenceApp.PostPublish.editor.editor.getNode());

        if (VideoEssenceApp.PostPages.editor != undefined)
		    this.currentNode = $(VideoEssenceApp.PostPages.editor.editor.getNode());

		var $result_el = this.$el.find(".modal-video-pocket-result");
		var $result_el_embeded = this.$el.find(".modal-video-search-result");
		this.resultsRegion = new Marionette.Region({
			el: $result_el[0]
		});
		this.resultsRegionEmbeded = new Marionette.Region({
			el: $result_el_embeded[0]
		});
		this.showVideoPocket();
	},
	changeTab: function (tab, content) {
		this.hideAllBeforeSelect();
		this.$(tab).addClass('selected');
		this.currentTab = this.$(content);
		this.currentTab.show();
		this.updateScrollbar($('.result-wrapper-scroll'));
	},
	hideAllBeforeSelect: function () {
		this.currentTab = '';
		this.$('.ve-tab').removeClass('selected');
		this.$('.modal-social-tab').hide();
	},
	selectVideo: function (model, selected) {
		if (!this.videosSelectedCollection) {
			this.videosSelectedCollection = new Videos();
		}
		if (selected) 
			this.videosSelectedCollection.add(model);
		else
			this.videosSelectedCollection.remove(model);
	},
	insertSelectedItems: function () {
		if(!_.isUndefined(this.videosSelectedCollection) && !!this.videosSelectedCollection.length) {
			var selectedVideos = this.videosSelectedCollection.where({selected: true});
            console.log("!@# selectedVideos", selectedVideos);
            var sendVideosUrls = {videos: []};
            var recivedVideosUrls = [];
            for(var i in selectedVideos) {
                sendVideosUrls.videos.push({
                    video_id: selectedVideos[i].attributes.id,
                    video_type: selectedVideos[i].attributes.type
                });
            }

            var curentNode = this.currentNode;

            $.ajax({
                url: "/post/video-url",
                method: 'POST',
                data: {
                    sendVideosUrls: sendVideosUrls
                },
                dataType: 'json',
                success: function(responseVideoUrls){
                    if (VideoEssenceApp.PostPublish.editor != undefined)
                        var currentNode = $(VideoEssenceApp.PostPublish.editor.editor.getNode());
                    if (VideoEssenceApp.PostPages.editor != undefined)
                        var currentNode = $(VideoEssenceApp.PostPages.editor.editor.getNode());

                    console.log("success currentNode", currentNode);

                    for(var i in selectedVideos) {
                        var graf = $('<p class="graf graf--p graf--empty" data-video-id="'+selectedVideos[i].attributes.id+
                        '" data-video-type="'+selectedVideos[i].attributes.type+'"><br></p>');

                        //console.log("i currentNode", currentNode);

                        if (currentNode.hasClass('graf--last'))
                            currentNode.before(graf);
                        else
                            currentNode.after(graf);

                        selectedVideos[i].set({
                            url: responseVideoUrls[i].url,
                            poster: responseVideoUrls[i].poster
                        });

                        if (VideoEssenceApp.PostPublish.editor != undefined)
                            VideoEssenceApp.PostPublish.editor.btnVideo.pasteVideo(selectedVideos[i].attributes, graf);
                        if (VideoEssenceApp.PostPages.editor != undefined)
                            VideoEssenceApp.PostPages.editor.btnVideo.pasteVideo(selectedVideos[i].attributes, graf);
                    }

                },
                error: function(){
                    alert('Some error on server');
                }
            });




			this.videosSelectedCollection.reset();
		}
	},
	showVideoPocket: function () {
		var self = this;
		if (!this.pocketVideosCollection) {
			this.pocketVideosCollection = new Videos();
			var videoModelsArr = JSON.parse(localStorage.getItem("pocketVideosCollection"));
			var videoModels = [];
			for (var i in videoModelsArr) {
				var model_video = videoModelsArr[i];
				videoModelsArr[i]['published_at'] = moment(videoModelsArr[i]['published_at']).fromNow();
				videoModels.push(new VideoModel(model_video));
			}
			this.pocketVideosCollection.set(videoModels);
			this.listenTo(this.pocketVideosCollection, 'change:selected', this.selectVideo);
		}
		this.resultsRegion.show(new VideosView({
			collection: this.pocketVideosCollection
		}));
		setTimeout(function() {
			self.initScrollbar($('.modal-video-pocket-result'));
		}, 1);
		this.changeTab('.tab-video-pocket', '#modal-video-pocket');
	},
	showVideoSearch: function() {
		this.initScrollbar($('.modal-video-search-result'));
		this.changeTab('.tab-video-search', '#modal-video-search');
	},
	searchVideosInput: function (event) {
		if(event.keyCode == 13){
			this.searchVideos();
		}
	},
	searchVideos:  function () {
		var self = this;
		self.showVideoSearch();
		if (!self.videosCollectionSearch) {
			var VideosCollection = Backbone.Collection.extend({
				model: VideoModel
			});
			self.videosCollectionSearch = new VideosCollection();
			this.listenTo(this.videosCollectionSearch, 'change:selected', this.selectVideo);
		} else {
			self.videosCollectionSearch.reset();
			self.updateScrollbar($('.result-wrapper-scroll'));
		}
		var jqxhr = $.ajax({
			url: "/site/videosearch?textToSearch=" + encodeURIComponent(self.$('.post-search-field').val()),
			beforeSend: function () {
				$('.modal-video-search-result').append(self.getLoader());
			}
		})
		.done(function (data) {
			var data = JSON.parse(data);
			$('.modal-video-search-result .loader-big').remove();
			if (data.videos.length) {
				for (var i in data.videos) {
					var model_video = data.videos[i];
					model_video['published_at'] = moment(model_video['published_at']).fromNow();
					self.videosCollectionSearch.push(new VideoModel(model_video));
				}
				self.resultsRegionEmbeded.show(new VideosView({
					collection: self.videosCollectionSearch
				}));
				self.updateScrollbar($('.result-wrapper-scroll'));
			} else {
				$('.modal-video-search-result').text('No results');
			}
		});
	},
	initScrollbar: function (elem) {
		elem.perfectScrollbar();
	},
	updateScrollbar: function (elem) {
		elem.perfectScrollbar('update');
	},
	getLoader: function () {
		return '<div class="loader-big"></div>';
	}
});
module.exports = SocialSearchModal;