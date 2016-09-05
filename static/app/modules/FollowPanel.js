var Marionette = require('backbone.marionette');
var FollowVideosView = require('../views/FollowVideosView.js');
var FollowedChannelCollection = require('../collections/FollowedChannel.js');

var FollowPanelModule = Marionette.Module.extend({
	initialize: function (moduleName, app, options) {


            console.log('initialize FollowPanelModule');
            //console.log($("#main-view .left-column .followed-panel-wrapper").height());

            $(".followed-more .followed-more-wrapper").on('mousewheel DOMMouseScroll', function (e) {
                var e0 = e.originalEvent,
                    delta = e0.wheelDelta || -e0.detail;

                this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
                e.preventDefault();
            });

            //$(document).on("click", ".followed-more .more", function(){
            //    if ($(".followed-more .more .followed-more-wrapper").css("display") == "none"){
            //        $(".followed-more .more .followed-more-wrapper").show();
            //        $(".followed-more .more").css("background-color", "#333333").css("color", "#ffffff");
            //    }
            //});

            $(document).on("mouseOut", ".followed-more .more .followed-more-wrapper", function () {
                $(".followed-more .more .followed-more-wrapper").hide();
                $(".followed-more .more").css("background-color", "transparent").css("color", "#393939");
            });

            $(window).resize(function (e) {
                //var followedHeight = window.innerHeight - 98 - 6 - 64 - 28 - 42 - 20;
                //var followedAdditionalHeight = window.innerHeight - 98 - 6;
                //var followedCount = Math.floor(followedHeight/42);

                var followedHeight = window.innerHeight - 98 - 6 - 64 - 28 - 42 - 20;
                var followedAdditionalHeight = window.innerHeight - 98 - 6 - 80;
                var followedCount = Math.floor(followedHeight / 42);

                if (window.innerWidth > 800) {
                    $(".left-column .followed-panel .followed-panel-wrapper").height(followedHeight);
                    $(".left-column .followed-panel .followed-more .followed-more-wrapper").height(followedAdditionalHeight);
                }
                else {
                    $("#mobile-view-menu").height(window.innerHeight);
                    $("#mobile-view-menu").on('mousewheel DOMMouseScroll', function (e) {
                        var e0 = e.originalEvent,
                            delta = e0.wheelDelta || -e0.detail;

                        this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
                        e.preventDefault();
                    });
                }

                var followedChannelCollectionFull = VideoEssenceApp.FollowPanel.followedChannelCollectionFull;
                var followedChannelCollectionLeft = VideoEssenceApp.FollowPanel.followedChannelCollectionLeft;
                var followedChannelCollectionAdditional = VideoEssenceApp.FollowPanel.followedChannelCollectionAdditional;

                var followPanelRegion = VideoEssenceApp.FollowPanel.followPanelRegion;
                var mobileFollowedPanelRegnon = VideoEssenceApp.FollowPanel.mobileFollowedPanelRegnon;
                var followPanelRegionAdditional = VideoEssenceApp.FollowPanel.followPanelRegionAdditional;


                var followVideosView = "";
                var followVideosAdditionalView = "";

                if (followedChannelCollectionFull.length > followedCount) {
                    $(".followed-panel .followed-more").show();

                    followedChannelCollectionLeft.reset();
                    followedChannelCollectionLeft.add(followedChannelCollectionFull.slice(0, followedCount));
                    followedChannelCollectionAdditional.reset();
                    followedChannelCollectionAdditional.add(followedChannelCollectionFull.slice(followedCount));

                    followVideosView = new FollowVideosView({
                        collection: followedChannelCollectionLeft
                    });
                    followPanelRegion.show(followVideosView);

                    followVideosAdditionalView = new FollowVideosView({
                        collection: followedChannelCollectionAdditional
                    });
                    followPanelRegionAdditional.show(followVideosAdditionalView);

                    var mobileFollowVideosView = new FollowVideosView({
                        collection: followedChannelCollectionFull
                    });
                    mobileFollowedPanelRegnon.show(mobileFollowVideosView);

                } else {
                    $(".followed-panel .followed-more").hide();

                    followedChannelCollectionLeft.reset();
                    followedChannelCollectionLeft.add(followedChannelCollectionFull.models);

                    followVideosView = new FollowVideosView({
                        collection: followedChannelCollectionLeft
                    });

                    var mobileFollowVideosView = new FollowVideosView({
                        collection: followedChannelCollectionLeft
                    });

                    followPanelRegion.show(followVideosView);
                    mobileFollowedPanelRegnon.show(mobileFollowVideosView);
                }
            });

            this.mobileFollowedPanelRegnon = new Marionette.Region({
                el: "#mobile-view-menu .followed-panel-wrapper"
            });

            this.followPanelRegion = new Marionette.Region({
                el: "#main-view .followed-panel-wrapper"
            });

            this.followPanelRegionAdditional = new Marionette.Region({
                el: "#main-view .followed-more-wrapper"
            });

            this.followedChannelCollectionLeft = new FollowedChannelCollection();
            this.followedChannelCollectionAdditional = new FollowedChannelCollection();
            this.followedChannelCollectionFull = new FollowedChannelCollection();

            this.followedChannelCollectionFull.on("add remove", function () {
                if (this.followedChannelCollectionFull.length == 0) {
                    $(".followed-panel .followed-header, .followed-panel .followed-panel-wrapper").hide();
                    $(".followed-panel .new-user-message").show();
                    $(".followed-panel .followed-more").hide();
                }
                if (this.followedChannelCollectionFull.length > 0) {
                    $(".followed-panel .followed-header, .followed-panel .followed-panel-wrapper").show();
                    $(".followed-panel .new-user-message").hide();
                }

                this.followedHeight = window.innerHeight - 98 - 6 - 64 - 28 - 42 - 20;
                this.followedAdditionalHeight = window.innerHeight - 98 - 6 - 80;
                this.followedCount = Math.floor(this.followedHeight / 42);

                $(".followed-panel .followed-header").find("span").text(this.followedChannelCollectionFull.length);
                //$("#mobile-view-menu .followed-header").find("span").text(this.followedChannelCollectionFull.length);

                if (window.innerWidth > 800) {
                    $(".left-column .followed-panel .followed-panel-wrapper").height(this.followedHeight);
                    $(".left-column .followed-panel .followed-more .followed-more-wrapper").height(this.followedAdditionalHeight);
                }
                else {
                    $("#mobile-view-menu").height(window.innerHeight);
                    $("#mobile-view-menu").on('mousewheel DOMMouseScroll', function (e) {
                        var e0 = e.originalEvent,
                            delta = e0.wheelDelta || -e0.detail;

                        this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
                        e.preventDefault();
                    });
                }

                var followVideosView = "";
                var followVideosAdditionalView = "";

                console.log(this.followedChannelCollectionFull.length, this.followedCount)
                if (this.followedChannelCollectionFull.length > this.followedCount) {
                    $(".followed-panel .followed-more").show();

                    this.followedChannelCollectionLeft.reset();
                    this.followedChannelCollectionLeft.add(this.followedChannelCollectionFull.slice(0, this.followedCount));
                    this.followedChannelCollectionAdditional.reset();
                    this.followedChannelCollectionAdditional.add(this.followedChannelCollectionFull.slice(this.followedCount));

                    followVideosView = new FollowVideosView({
                        collection: this.followedChannelCollectionLeft
                    });
                    this.followPanelRegion.show(followVideosView);

                    followVideosAdditionalView = new FollowVideosView({
                        collection: this.followedChannelCollectionAdditional
                    });
                    this.followPanelRegionAdditional.show(followVideosAdditionalView);
                    var mobileFollowVideosView = new FollowVideosView({
                        collection: this.followedChannelCollectionFull
                    });
                    this.mobileFollowedPanelRegnon.show(mobileFollowVideosView);

                } else {
                    $(".followed-panel .followed-more").hide();

                    this.followedChannelCollectionLeft.reset();
                    this.followedChannelCollectionLeft.add(this.followedChannelCollectionFull.models);

                    followVideosView = new FollowVideosView({
                        collection: this.followedChannelCollectionLeft
                    });

                    var mobileFollowVideosView = new FollowVideosView({
                        collection: this.followedChannelCollectionLeft
                    });

                    this.followPanelRegion.show(followVideosView);
                    this.mobileFollowedPanelRegnon.show(mobileFollowVideosView);
                }
            }, this);


            this.rerender = function () {
                console.log("this.rerender");
                //if ($(".followed-panel-wrapper").length) {
                //	var followVideosView = new FollowVideosView({
                //		collection: this.followedChannelCollectionLeft
                //	});
                //	this.followPanelRegion.show(followVideosView);
                //
                //   var mobileFollowVideosView = new FollowVideosView({
                //       collection: this.followedChannelCollectionLeft
                //   });
                //
                //	this.mobileFollowedPanelRegnon.show(mobileFollowVideosView);
                //}
            };

            this.isHave = function (videoId) {
                return this.followedChannelCollectionFull.get(videoId) != undefined;
            };

            this.add = function (channel) {
                this.followedChannelCollectionFull.add(channel);
            };

            this.remove = function (title) {
                var SearchModel = this.followedChannelCollectionFull.where({title: title});
                this.followedChannelCollectionFull.remove(SearchModel);
            };

            this.exist = function (channel_id) {
                var exist = this.followedChannelCollectionFull.where({title: channel_id});
                return exist.length > 0;
            };


		return false;
	},
	fillChannels: function (channels) {
        this.followedHeight = 0;
        this.followedCount = 0;

        if (window.innerWidth > 800){
            this.followedHeight = window.innerHeight - 98 - 6 - 64 - 28 - 42 - 20;
            this.followedAdditionalHeight = window.innerHeight - 98 - 6 - 80;
            this.followedCount = Math.floor(this.followedHeight/42);
            $(".left-column .followed-panel .followed-panel-wrapper").height(this.followedHeight);
            $(".left-column .followed-panel .followed-more .followed-more-wrapper").height(this.followedAdditionalHeight);
        }

        this.followedChannelCollectionFull.add(channels);
	}
});
module.exports = FollowPanelModule;