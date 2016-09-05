var Marionette = require('backbone.marionette');
var LinkPostsView = require('./LinkPostsView.js');
var LinkPosts = require('../collections/LinkPosts.js');
var LinkRelatedPostsView = require('./LinkRelatedPostsView.js');

require('../../js/dragManager.js');

var PostEditorView = Marionette.ItemView.extend({
    tagName: "form",
    template: VideoEssenceApp.templates['post-editor'],

    events: {
        'click #post-submit': 'goToPublishStep',
        'click .close-button': 'closeTweet',
        'click .is-ve-video-b': 'clickCustomButton'
    },

    editor: null,
    videoInPost: {},

    initialize: function() {
        var ImageTooltip = require('../../js/danteImageTooltip.js');
        this.btnImage = new ImageTooltip();

        var VideoTooltip = require('../../js/danteVideoTooltip.js');
        this.btnVideo = new VideoTooltip();

        //var FacebookTooltip = require('../../js/danteFacebookTooltip.js');
        //this.btnFаcebook = new FacebookTooltip();

        var GooglePTooltip = require('../../js/danteGooglePTooltip.js');
        this.btnGoogleP = new GooglePTooltip();

        var TwitterTooltip = require('../../js/danteTwitterTooltip.js');
        this.btnTwitter = new TwitterTooltip;

        this.listenTo(this, 'video:custom:update', this.updateVideo);
    },
    onShow: function() {
        var self = this;

        this.editor = new Dante.Editor({
            el: this.$el.find('#editor'),
            debugMode: true,
            upload_url: "/images.json",
            extra_tooltip_widgets: [this.btnVideo, this.btnImage, /*this.btnFаcebook,*/ this.btnGoogleP, this.btnTwitter],
            base_widgets: ["embed_extract"],
            disable_title: true,
            body_placeholder: 'Tell your story',
            //debug: true,
            //
            //store_url: "/post/test-store",
            //store_method: "POST",
            //store_interval: 1000,

            afterInit: function() {
                self.initResizable();
                self.initDraggable();

                self.initContent();
                self.initVideo();
                //self.initEditVideo();
            }
        });

        this.editor.getNode = function() {
            var node, range, root;
            node = void 0;
            root = $(this.el).find(".section-inner")[0];
            if (this.selection().rangeCount < 1) {
                return;
            }
            range = this.selection().getRangeAt(0);
            node = range.commonAncestorContainer;
            if (!node || node === root) {
                return null;
            }
            while (node && (node.nodeType !== 1 || !$(node).hasClass("graf")) && (node.parentNode !== root)) {
                node = node.parentNode;
            }
            if (!$(node).hasClass("graf--li")) {
                while (node && (node.parentNode !== root)) {
                    node = node.parentNode;
                }
            }
            if (root) {
                if (root.contains(node))
                    return node;
                else if ($(root).find('.graf.is-selected').size() == 1) {
                    return $(root).find('.graf.is-selected')[0];
                } else {
                    return null;
                }
            } else {
                return null;
            }
        };

        this.btnImage.current_editor = this.editor;
        this.btnVideo.current_editor = this.editor;
        //this.btnFаcebook.current_editor = this.editor;
        this.btnGoogleP.current_editor = this.editor;
        this.btnTwitter.current_editor = this.editor;
        this.editor.start();

        this.$el.find('#editor').on('click', '.close-button', function() {
            $(this).parent().remove();
            return false;
        });

        this.$el.find('#editor').on('click', '.close-button-socials', function() {
            $(this).closest('.edit-wrap').remove();
            return false;
        });

        this.linkRelatedPosts = new Marionette.Region({
            el: this.$el.find('#postsRelatedShow')
        });

        this.linkPostsView = new LinkPostsView({
            collection: new LinkPosts(VideoEssenceApp.PostPublish.linkPostsCollection.where({
                linked: true
            }))
        });

        this.linkRelatedPosts.show(this.linkPostsView);

    },
    initVideo: function() { // теперь не нужно, работает по-другому ?
        var videos = this.model.get('videos');
        var self = this;

        //console.log("initVideo", videos);

        for (index in videos) {
            //console.log(videos, videos[index]['id']);
            if (videos.hasOwnProperty(index) && videos[index]['id']) {

                if (videos[index].type == "youtube")
                    videos[index].embeded_url = "https://www.youtube.com/embed/" + videos[index].id + "?autoplay=1";
                if (videos[index].type == "vimeo")
                    videos[index].url = "https://vimeo.com/" + videos[index].id;

                self.btnVideo.pasteVideo(videos[index]);
            }
        }
    },

    //todo нужна initEditVideo?
    initEditVideo: function() {
        var self = this;
        this.editor.$el.find('.video-with-custom').each(function() {
            var video = $(this).data('video');
            self.btnVideo.pasteVideo(video, $(this).parent());
        });
    },

    // add event listener resizable
    initResizable: function () {
        if ($('#post-editor').hasClass('post-view-content'))
            return true;

        $('#editor').on('imageAdd', function (event, images) {
            var images = $(images);
            images.each(function (index) {
                var image = $(images[index]);
                setTimeout(function () {
                    image.resizable({
                        maxWidth: $('#editor').width(),
                        aspectRatio: image.width() / image.height()
                    });
                }, 300);
            });
        });
    },

    // add event listener draggable
    initDraggable: function () {
        if ($('#post-editor').hasClass('post-view-content'))
            return true;

        $('#editor').DragManager({
            drag: ['sp', 'ui-wrapper', 'video-js'],
            zIndex: 90
        });
    },

    initContent: function() {
        if (this.model.get('title')) {
            this.$el.find('.title-input').val(this.model.get('title'));
        }
        var $editor = this.$el.find('#editor');
        if (!_.isEmpty(this.model.get('content'))) {
            var postContent = JSON.parse(this.model.get('content'));
            $editor.find(".section-inner").html('<p class="graf graf--p graf--last is-selected" ><br></p>');

            var contentHtml = "";

            //console.log("postContent", postContent);

            for (var i in postContent) {
                if (!postContent.hasOwnProperty(i)) continue;

                //console.log("postContent[prop].elType", postContent[i].elType, postContent[i]);

                var currentNode = "";

                if (postContent[i].elType != "video" && postContent[i].elType != "social" &&
                    (postContent[i].tagName == 'p' ||
                        postContent[i].tagName == 'blockquote')
                ) {
                    var nodeId = window.Dante.utils.generateUniqueName();
                    contentHtml = "<"+postContent[i].tagName+" class='graf graf--"+postContent[i].tagName+"' name='"+nodeId+"'>"+
                    postContent[i].content +
                    "</"+postContent[i].tagName+">";

                    currentNode = $($editor.find(".section-inner").find(".graf:last"));
                    currentNode.before(contentHtml);

                }
                if (postContent[i].elType == "social"){
                    var nodeId = window.Dante.utils.generateUniqueName()
                    var nodeHtml = "<"+postContent[i].tagName+" class='graf graf--"+postContent[i].tagName+"' name='"+nodeId+"'>"+
                    "</"+postContent[i].tagName+">";

                    var lastGraf = $($editor.find(".section-inner").find(".graf:last"));
                    if (lastGraf.hasClass("graf--last") && $.trim(lastGraf.text()) == "")
                        lastGraf.remove();

                    $editor.find(".section-inner").append(nodeHtml);

                    currentNode = $($editor.find(".section-inner").find(".graf:last"));

                    contentHtml = postContent[i].content;
                    currentNode.append(contentHtml);

                    if (!$editor.find(".section-inner").find(".graf:last").hasClass("graf--last"))
                        $editor.find(".section-inner").append('<p class="graf graf--p graf--last is-selected" name="'+window.Dante.utils.generateUniqueName()+'" ><br></p>');
                }
                if (postContent[i].elType == "video") {
                    var graf = $('<p class="graf graf--p" data-video-id="' + postContent[i].videoId +
                        '" data-video-type="' + postContent[i].videoType + '"><br></p>');

                    var video = {
                        id: postContent[i].videoId,
                        type: postContent[i].videoType,
                        url: postContent[i].videoUrl,
                        poster: postContent[i].videoPoster,
                        width: postContent[i].content.width,
                        height: postContent[i].content.height
                    };

                    //console.log('pasteVideo video', postContent[i], " | ", video, JSON.parse(postContent[i].content));
                    console.log('pasteVideo video', video);

                    if (postContent[i].videoType == "youtube")
                        video.embeded_url = "https://www.youtube.com/embed/" + postContent[i].videoId + "?autoplay=1";
                    else
                        video.embeded_url = "https://vimeo.com/" + postContent[i].videoId;

                    currentNode = $($editor.find(".section-inner").find(".graf:last"));

                    currentNode.before(graf);

                    VideoEssenceApp.PostPublish.editor.btnVideo.pasteVideo(video, graf);
                }
            }
            if (!$editor.find(".section-inner").find(".graf:last").hasClass("graf--last"))
                $editor.find(".section-inner").append('<p class="graf graf--p graf--last is-selected" ><br></p>');
        }

        // init resizable after render
        $($editor.find('.graf--p')).each(function(i){
            if ($($editor.find('.graf--p').get(i)).find('img').length > 0) {
                $($editor.find('.graf--p').get(i)).find('img').load(function(){
                    $('#editor').trigger('imageAdd', $($editor.find('.graf--p').get(i)).children('img'));
                });
            }
        });

        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

        if (getParameterByName("isView") == "Y"){
            var $editorContent = $("#editor").find(".section-inner");
            $editorContent.attr("contenteditable", false);
            $("#editor").attr("contenteditable", false);
            $editorContent.addClass("no-user-select");
            $("#editor").parent().find(".inlineTooltip.is-active").css("display", "none");
            $(".action-buttons-post").hide();
            $("#header, .gray-space").hide();

            var postEditorTitle = $("#post-editor").find(".title-input");

            postEditorTitle
                .attr("contenteditable", false)
                .attr("readonly", "readonly")
                .addClass("no-user-select")
            ;
        }
    },

    //todo нужна pasteVideo?
    //pasteVideo: function(video) {
    //    //console.log('video', video);
    //    //console.log("pasteVideo", video);
    //    //console.log(this.btnVideo);
    //    //this.btnVideo.pasteVideo(video);
    //
    //    //this.afterPasteVideo(video);
    //},
    //todo нужна afterPasteVideo?
    afterPasteVideo: function(video, nodeId, player) {
        var VideoROICollection = require('../collections/VideoROICollection.js');
        this.videoInPost[nodeId] = {
            video: video,
            player: player,
            views: {},
            customs: new VideoROICollection(video.customs)
        };
        var self = this;
        this.initVideoCustom(nodeId);
        player.on('play', function() {
            // self.initVideoCustom(nodeId);
        }).on('ended', function() {
            self.destroyVideoCustom(nodeId);
        }).on('pause', function() {
            self.onVideoPause(nodeId);
        }).on('timeupdate', function() {
            self.onVideoPlaying(nodeId, player.currentTime());
        });
    },
    closeTweet: function(event) {
        event.preventDefault();
        $(event.currentTarget).parent().remove();
    },
    preparePostVideo: function() {
        var content = this.editor.$el.find('.section-inner').clone();
        for (var nodeId in this.videoInPost) {
            if (this.videoInPost.hasOwnProperty(nodeId) && this.videoInPost[nodeId].video) {
                var video = this.videoInPost[nodeId].video;
                var data = JSON.stringify(video);
                var html = this.btnVideo.embededHtml(video.type, video.url, nodeId);
                var field = content.find('#' + nodeId);
                var roi = field.find('.custom-rois');
                roi.children().hide();
                var html = "<span class=\"video-with-custom\" data-video='" + data + "' data-roi='" + JSON.stringify(roi.html()) + "'></span>";
                field.replaceWith(html);
            }
        }
        return content.html();
    },
    savePost: function(e) {
        e.preventDefault();

        var content = this.preparePostVideo(),
            firstVideo = this.prepareFirstVideo(),
            images = this.prepareImages(content);
        this.model.set('video_id', firstVideo.id);
        this.model.set('video_type', firstVideo.type);
        this.model.set('images', images);
        this.model.set('content', JSON.stringify(content));
        this.model.set('title', this.$el.find('.title-input').val());
        this.model.validate();
        this.model.save();

        return false;
    },
    goToPublishStep: function (e) {
        e.preventDefault();
        $('.publish-block-wp').addClass('show-publish').slideDown("slow");
        $('.action-buttons-post').fadeOut('slow');
        var $editorContent = $("#editor").find(".section-inner");
        $editorContent
            .attr("contenteditable", false)
            .addClass("no-user-select")
        ;
        $("#editor").parent().find(".inlineTooltip.is-active").css("display", "none");

        $("#editor").attr("contenteditable", false);

        var postEditorTitle = $("#post-editor").find(".title-input");

        postEditorTitle
            .attr("contenteditable", false)
            .attr("readonly", "readonly")
            .addClass("no-user-select")
        ;
    },

    prepareFirstVideo: function() {
        var nodeId = this.$el.find('.video-js')[0].id;
        if (_.isUndefined(nodeId)) {
            return {};
        }
        var video = this.videoInPost[nodeId];
        if (_.isUndefined(video)) {
            return {};
        }
        return {
            id: video.video.id,
            type: video.video.type
        };
    },
    prepareVideos: function() {

    },

    prepareImages: function(content) {
        var jqHtml = $('<div/>').html(content),
            imgCollection = jqHtml.find('img'),
            imgArray = [];

        imgCollection.each(function(i, el) {
            imgArray[i] = $(el).attr('src');
        });
        return imgArray;
    },

    showCustomizeButton: function(event) {
        $(event.currentTarget).prepend('<a contenteditable="false" href="#" class="is-ve-video-b">Customize</a>');
    },
    hideCustomizeButton: function(event) {
        $(event.currentTarget).find('.is-ve-video-b').remove();
    },
    clickCustomButton: function(event) {
        var nodeId = $(event.currentTarget).siblings('.video-js').attr('id');

        var node = this.videoInPost[nodeId];
        if (!node) return;

        var video = node.video;
        node.player.pause();
        this.trigger('video:custom:click', video, nodeId);
    },
    updateVideo: function(nodeId, customs) {
        this.videoInPost[nodeId].customs.reset(customs);
    },
    initVideoCustom: function(nodeId) {
        var node = this.videoInPost[nodeId];
        if (!node || node.views.isRendered || !node.customs) return;

        var container = this.$el.find('#' + nodeId);
        var el = $('<div class="custom-rois"></div>').appendTo(container);

        var VideoROIView = require('./VideoROIView.js');
        var VideoROICollectionView = require('./VideoROICollectionView.js');
        node.views = new VideoROICollectionView({
            childView: VideoROIView,
            collection: node.customs,
            el: el
        });
        node.views.render();
    },
    destroyVideoCustom: function(nodeId) {
        var node = this.videoInPost[nodeId];
        if (!node || !node.views.isRendered) return;

        node.views.destroy();
        this.$el.find('#' + nodeId).find('.custom-rois').detach();
    },
    onVideoPlaying: function(nodeId, time) {
        var node = this.videoInPost[nodeId];
        if (!node || !node.views.isRendered) return;

        node.views.showForTime(time);
    },
    onVideoPause: function(nodeId) {
        var node = this.videoInPost[nodeId];
        if (!node || !node.views.isRendered) return;

        node.views.showPause();
    }
});
module.exports = PostEditorView;