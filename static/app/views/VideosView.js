var Marionette = require('backbone.marionette');
var Channel = require('../models/Channel.js');

var VideoView = require('./VideoView.js');
var VideosView = Marionette.CompositeView.extend({
    offset: 20,
    limit: 20,
    works: false,
    childView: VideoView,
    template: VideoEssenceApp.templates['videos-template'],
    childViewContainer: '.list',
    events: {
        'click .video-list-controls .do-big': 'toBigSizeList',
        'click .video-list-controls .do-small': 'toSmallSizeList',

        'mouseover  .channel .title .following': 'hoverFollowIn',
        'mouseout  .channel .title .following': 'hoverFollowOut',
        'click  .channel .title .following': 'clickedButton'

    },
    initViewModeFromLocalStorage: function() {
        var videosViewMode = (localStorage.getItem("videosViewMode") === 'true');
        if (!_.isNull(videosViewMode)) {
            this.model.set({
                bigView: videosViewMode
            });
        }
    },
    resetOffset: function() {
        this.collection.reset();
        this.offset = 0;
        this.model.set('gettingIsStop', false);
        this.render();
    },
    constructor: function(params, options) {
        Marionette.CompositeView.prototype.constructor.apply(this, arguments);

        var channelInfoJson = {
            gettingIsStop: false,
            bigView: false
        };

        if (options.channelInfo != undefined && options.channelInfo != 0) {
            //console.log("options.followChannels", options.followChannels, options.channelInfo.id);

            var followed = false;
            for (var iter in options.followChannels) {
                if (!options.followChannels.hasOwnProperty(iter)) continue;

                //console.log("constructor", options.followChannels[iter].id.trim(), encodeURIComponent(options.channelInfo.id).trim());

                if (options.followChannels[iter].id.trim() == encodeURIComponent(options.channelInfo.id).trim())
                    followed = true;
            }

            var channelTypeLink = "#channelType";
            if (options.channelInfo.type != undefined && options.channelInfo.type.toLowerCase() == "youtube") {
                channelTypeLink = "http://www.youtube.com/channel/" + options.channelInfo.id;
            }
            if (options.channelInfo.type != undefined && options.channelInfo.type.toLowerCase() == "vimeo") {
                channelTypeLink = "https://vimeo.com/channels/" + options.channelInfo.id;
            }

            channelInfoJson = {
                followed: followed,
                channelTypeLink: channelTypeLink,

                id: options.channelInfo.id,
                title: options.channelInfo.snippet.title,
                type: options.channelInfo.type.toLowerCase(),
                subtype: (options.channelInfo.type.toLowerCase() != "search") ? "channel" : "search",

                smallBanner: options.channelInfo.banners['690'],
                normalBanner: options.channelInfo.banners['1138'],
                bigBanner: options.channelInfo.banners['2278'],

                channelInfo: options.channelInfo
            };
        }

        channelInfoJson.gettingIsStop = false;
        channelInfoJson.bigView = false;

        this.model = new Channel(channelInfoJson);
        this.initViewModeFromLocalStorage();

        //this.model.set("categoryName", '<i class="fa fa-long-arrow-left"></i>&nbsp;&nbsp;' + options.categoryName);
        this.model.set("categoryName", '<span class="arrow-back"></span>' + options.categoryName);
        if (options.categoryName != "Categories")
            this.model.set("categoryLink", '/site/category?name=' + encodeURIComponent(options.categoryName));
        else
            this.model.set("categoryLink", '/site/explore');

        this.model.set("isSearch", options.isSearch);
        if (options.channelInfo == undefined ||
            (options.channelInfo.type != undefined && options.channelInfo.type.toLowerCase() == "search") ||
            channelInfoJson.normalBanner == null ||
            channelInfoJson.bigBanner == null
        ) {
            this.model.set("noBanner", true);
        }
        this.model.set("showLink", true);
        if (options.channelInfo == undefined ||
            (options.channelInfo.type != undefined && options.channelInfo.type.toLowerCase() == "search")) {
            this.model.set("showLink", false);
        }

        this.model.set('retina', window.devicePixelRatio > 1);
    },
    onBeforeRender: function() {
        this.collection.invoke('set', {
            bigView: this.model.get('bigView')
        });
    },
    onRender: function() {
        var self = this;
        $(window).scroll(function() {
            self.loadItems();
        });
    },
    loadItems: function() {
        //console.log("scrollTop height works", $(window).scrollTop() >= this.$el.height() - $(window).height() - 200, this.works)

        if ($(window).scrollTop() >= this.$el.height() - $(window).height() - 200 && !this.works) {
            this.getItems();
        }
    },
    getItems: function(without_adding_results) {
        //console.log("getItems");
        var self = this;
        without_adding_results = without_adding_results || false;
        //console.log("getItems this.offset", this.offset);

        if (without_adding_results) {
            this.collection.fetch({
                remove: false,
                add: false, //TODO здесь возникают ошибки id
                merge: false,
                data: {
                    "offset": this.offset,
                    "limit": this.limit
                }
                //success: function(resp){
                //    //console.log('resp', resp);
                //}
            });
        } else {
            this.works = true;
            console.log("getItems this", this, this.works);
            var length = this.collection.length;

            this.collection.fetch({
                remove: false,
                add: true,
                merge: false,
                data: {
                    offset: this.offset,
                    limit: this.limit,
                    youtubeNextPageToken:  this.youtubeNextPageToken
                },
                success: _.bind(function(model, response, length, options) {
                    //console.log(response);
                    //console.log('response youtubeNextPageToken this',  this.youtubeNextPageToken, 'response',
                    //    response.youtubeNextPageToken, 'global',
                    //    VideoEssenceApp.VideoExplore.videosCollection.youtubeNextPageToken);

                    this.works = false;
                    this.youtubeNextPageToken = response.youtubeNextPageToken;
                    if (response.videos.length > 0)
                        this.offset += 20;
                    VideoEssenceApp.VideoExplore.videosCollection.youtubeNextPageToken = response.youtubeNextPageToken;
                    if (response.channelInfo) {
                        self.prepareVideosChannel(model, response, length, options);
                            //this.youtubeNextPageToken = response.youtubeNextPageToken;
                            //this.works = false;
                            //console.log("getItems this", this, this.works, response);
                    } else {
                        self.prepareVideosSearch(model, response, length, options);
                    }
                    //console.log('youtubeNextPageToken', this.youtubeNextPageToken, VideoEssenceApp.VideoExplore.videosCollection.youtubeNextPageToken);

                }, this),
                error: _.bind(function() {
                    this.stopGetting();
                }, this)
            });
        }
    },

    prepareVideosChannel: function(model, response, length, options) {
        var channelInfo = response.channelInfo;

        var channelTypeLink = "#channelType";
        if (channelInfo.type != undefined && channelInfo.type.toLowerCase() == "youtube") {
            channelTypeLink = "http://www.youtube.com/channel/" + channelInfo.id;
        }
        if (channelInfo.type != undefined && channelInfo.type.toLowerCase() == "vimeo") {
            channelTypeLink = "https://vimeo.com/channels/" + channelInfo.id;
        }

        var channelInfoJson = {
            gettingIsStop: false,
            bigView: true,

            followed: true,
            channelTypeLink: channelTypeLink,

            id: channelInfo.id,
            title: channelInfo.snippet.title,
            type: channelInfo.type.toLowerCase(),
            subtype: (channelInfo.type.toLowerCase() != "search") ? "channel" : "search",

            smallBanner: channelInfo.banners['690'],
            normalBanner: channelInfo.banners['1138'],
            bigBanner: channelInfo.banners['2278'],

            channelInfo: channelInfo
        };

        this.model = new Channel(channelInfoJson);

        this.model.set("categoryName", '<span class="arrow-back"></span>' + "Categories");
        this.model.set("categoryLink", '/site/explore');

        if (channelInfo == undefined ||
            (channelInfo.type != undefined && channelInfo.type.toLowerCase() == "search") ||
            channelInfoJson.normalBanner == null ||
            channelInfoJson.bigBanner == null
        ) {
            this.model.set("noBanner", true);
        }
        this.model.set("showLink", true);
        if (channelInfo == undefined ||
            (channelInfo.type != undefined && channelInfo.type.toLowerCase() == "search")) {
            this.model.set("showLink", false);
        }

        this.model.set('retina', window.devicePixelRatio > 1);
        this.initViewModeFromLocalStorage();

        this.render();

        if (this.collection.length > length) {
            this.works = false;
            this.offset += this.limit;
            this.collection.youtubeNextPageToken = response.youtubeNextPageToken;
            this.loadItems();
            this.getItems(true);
        } else {
            this.stopGetting();
        }
    },

    prepareVideosSearch: function(model, response, length, options) {
        var responseVideos = response.videos;

        if (!responseVideos || !responseVideos.length)
            return true;

        for (var i = 0; i < responseVideos.length; i++) {
            var channelTypeLink = "http://www.youtube.com/channel/" + responseVideos[i].channel_id;

            var channelInfoJson = {
                gettingIsStop: false,
                bigView: true,

                followed: true,
                channelTypeLink: channelTypeLink,

                id: responseVideos[i].id,
                title: responseVideos[i].channel_title,
                type: responseVideos[i].type.toLowerCase(),
                subtype: "search",

                smallBanner: null,
                normalBanner: null,
                bigBanner: null,

                channelInfo: null
            };

            this.model = new Channel(channelInfoJson);

            this.model.set("categoryName", '<span class="arrow-back"></span>' + "Categories");
            this.model.set("categoryLink", '/site/explore');
            this.model.set("noBanner", true);
            this.model.set("showLink", false);

            this.model.set('retina', window.devicePixelRatio > 1);
            this.initViewModeFromLocalStorage();

            this.render();

        };

        if (this.collection.length > length) {
            this.works = false;
            this.offset += this.limit;
            this.collection.youtubeNextPageToken = response.youtubeNextPageToken;
            this.loadItems();
            this.getItems(true);
        } else {
            this.stopGetting();
        }
    },

    stopGetting: function() {
        this.model.set('gettingIsStop', true);
        this.render();
    },
    checkFollowedByChannel: function(isFollowed, channel_id) {
        var followedVideo = this.collection.where({
            channel_id: channel_id
        });
        for (var i = 0; followedVideo.length > i; i++) {
            followedVideo[i].set('followed', !isFollowed);
        }

        this.render();
    },
    toBigSizeList: function() {
        this.setSizeList(true);
    },
    toSmallSizeList: function() {
        this.setSizeList(false);
    },
    setSizeList: function(result) {
        this.model.set({
            bigView: result
        });
        localStorage.setItem('videosViewMode', result);
        this.render();
    },
    hoverFollowIn: function(e) {
        //console.log("in", this.model.attributes);
        var self = $(e.target);
        if (self.hasClass("followed")) {
            self.text("Unfollow");
        } else {
            self.text("Follow");
        }
    },
    hoverFollowOut: function(e) {
        //console.log("out", e.target);
        var self = $(e.target);
        if (self.hasClass("followed")) {
            self.text("Following");
        } else {
            self.text("Follow");
        }
    },
    clickedButton: function() {
        var isSaved = this.model.get('followed');

        this.model.set('followed', !isSaved);

        this.render();
    }
});
module.exports = VideosView;