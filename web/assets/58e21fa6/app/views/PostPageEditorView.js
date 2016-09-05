var Marionette = require('backbone.marionette');

require('../../js/dragManager.js');

var PostPageEditorView = Marionette.ItemView.extend({
    tagName: "form",
    template: VideoEssenceApp.templates['page-editor'],
    events: {
        //'click #page-submit': 'savePage'
        'click #page-submit': 'publishPage',
        'click #page-cancel': 'cancelPage',
        'click #editor .section-inner': 'clearPlaceholder',
        'focus #editor .section-inner': 'clearPlaceholder'
    },
    editor: null,
    initialize: function(){
        var ImageTooltip = require('../../js/danteImageTooltip.js');
        this.btnImage = new ImageTooltip();

        var VideoTooltip = require('../../js/danteVideoTooltip.js');
        this.btnVideo = new VideoTooltip();

        var GooglePTooltip = require('../../js/danteGooglePTooltip.js');
        this.btnGoogleP = new GooglePTooltip();

        var TwitterTooltip = require('../../js/danteTwitterTooltip.js');
        this.btnTwitter = new TwitterTooltip;

        //console.log('PostPageEditorView initialized');
    },
    //modelEvents: {
    //    "change": "modelChanged"
    //},
    //modelChanged: function(){
    //    console.log('editor modelChanged', this.model);
    //},
    onShow: function(){
        var self = this;

        //console.log('PostPageEditorView onShow');

        this.editor = new Dante.Editor({
            el: this.$el.find('#editor'),
            debugMode: true,
            upload_url: "/images.json",
            extra_tooltip_widgets: [this.btnVideo, this.btnImage, this.btnGoogleP, this.btnTwitter],
            base_widgets: ["embed_extract"],
            disable_title: true,
            body_placeholder: 'About new page',
            //debug: true,
            //
            //store_url: "/post/test-store",
            //store_method: "POST",
            //store_interval: 1000,

            afterInit: function() {
                //console.log('VideoEssenceApp.PostPages.editor.model.id', VideoEssenceApp.PostPages.editor.model.id);

                VideoEssenceApp.PostPages.editor.model.fetch({
                    method: 'POST',
                    data: {
                        id: VideoEssenceApp.PostPages.editor.model.id,
                        action: 'open'
                    },
                    success: function(){
                        self.initResizable();
                        self.initDraggable();

                        self.initContent();
                        self.initVideo();
                        //self.initEditVideo();
                    }
                });
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

        this.autosave = setInterval(function(){
            VideoEssenceApp.PostPages.editor.model.set('status', 1);
            VideoEssenceApp.PostPages.editor.savePage();
        }, 15000);
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
                        aspectRatio: image.width() / image.height(),
                    });
                }, 111);
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
    initVideo: function() { // теперь не нужно, работает по-другому
        var videos = this.model.get('videos');
        var self = this;

        console.log("initVideo", videos);

        for (index in videos) {
            //console.log(videos, videos[index]['id']);
            if (videos.hasOwnProperty(index) && videos[index]['id']) {

                if (videos[index].type == "youtube")
                    videos[index].embeded_url = "https://www.youtube.com/embed/" + videos[index].id + "?autoplay=1";



                self.btnVideo.pasteVideo(videos[index]);
            }
        }
    },
    initContent: function() {
        //console.log('initContent', VideoEssenceApp.PostPages.PostPagesLayoutView.model, this.$el, this);


        var allPages = VideoEssenceApp.PostPages.PostPagesLayoutView.model.get('pages');
        //console.log('allPages', allPages);

        var pagesMiniListView = require('../views/PostPageMiniListView.js');

        var draggablePagesView = Backbone.View.extend( {
            template : _.template( "<%= title %>" ),
            events: {
                'dblclick': 'showPage',
                'mouseover': 'showBars',
                'mouseleave': 'hideBars'
            },
            showBars: function(e){
                var self = $(e.target);
                //console.log('showBars self', self, self.parent().find('.fa-bars').length);
                if (self.parent().find('.fa-bars').length == 0)
                    self.after('<i class="fa fa-bars"></i>')
            },
            hideBars: function(e){
                var self = $(e.target);
                //console.log('hideBars self', self, self.find('i'));
                self.parent().find('i').remove();
            },
            showPage: function(e){
                var self = $(e.target);
                //console.log('showPage self', self);

                var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;
                postPagesLayoutView.model.set('pageForEdit', this.$el.data('page-id'));

                VideoEssenceApp.PostPages.goToEditPage();
            },
            render : function() {
                var emp = this.model.toJSON();
                if (emp.id == VideoEssenceApp.PostPages.PostPagesLayoutView.model.get('pageForEdit')){
                    this.$el.addClass('active');
                }

                this.$el.attr('data-page-id', emp.id);

                var html = this.template( emp );
                this.$el.append( html );
            }
        });

        var draggablePage = Backbone.Model.extend( {} );
        var draggablePages = Backbone.Collection.extend( {
            model : draggablePage
        } );

        function createACollection () {
            return new draggablePages(
                _.map(_.sortBy(allPages, function(page){
                    return page.order
                }), function (page) {
                    return new draggablePage(page)
                })
            );
        }

        this.pagesDraggableList  = new Backbone.CollectionView( {
            el : VideoEssenceApp.PostPages.editorWpRegion.$el.find('.pages-order-list'),
            //el : $('.pages-order-list'),
            selectable : true,
            sortable : true,
            collection : createACollection(),
            modelView : draggablePagesView
        });

        this.pagesDraggableList.render();

        if (this.model.get('title')) {
            this.$el.find('.title-input').val(this.model.get('title'));
        }
        var $editor = this.$el.find('#editor');
        if (!_.isEmpty(this.model.get('content'))) {
            var pageContent = JSON.parse(this.model.get('content'));

            //console.log('pageContent', pageContent);

            //console.log("pageContent", pageContent, pageContent != [], pageContent.length == 0);

            if (pageContent.length > 0) {
                $editor.find(".section-inner").html('<p class="graf graf--p graf--last is-selected" ><br></p>');
            }

            var contentHtml = "";

            //console.log("pageContent", pageContent);

            for (var i in pageContent) {
                if (!pageContent.hasOwnProperty(i)) continue;

                //console.log("pageContent[prop].elType", pageContent[i].elType, pageContent[i]);

                var currentNode = "";

                if (pageContent[i].elType != "video" && pageContent[i].elType != "social" &&
                    (pageContent[i].tagName == 'p' ||
                    pageContent[i].tagName == 'blockquote')
                ) {
                    var nodeId = window.Dante.utils.generateUniqueName();
                    contentHtml = "<"+pageContent[i].tagName+" class='graf graf--"+pageContent[i].tagName+"' name='"+nodeId+"'>"+
                    pageContent[i].content +
                    "</"+pageContent[i].tagName+">";

                    currentNode = $($editor.find(".section-inner").find(".graf:last"));
                    currentNode.before(contentHtml);

                    // init resizable after render
                    if ($($editor.find('.graf--' + pageContent[i].tagName).get(i)).find('img').length > 0)
                        $('#editor').trigger('imageAdd', $($editor.find('.graf--' + pageContent[i].tagName).get(i)).children('img'));
                }
                if (pageContent[i].elType == "social"){
                    var nodeId = window.Dante.utils.generateUniqueName()
                    var nodeHtml = "<"+pageContent[i].tagName+" class='graf graf--"+pageContent[i].tagName+"' name='"+nodeId+"'>"+
                        "</"+pageContent[i].tagName+">";

                    var lastGraf = $($editor.find(".section-inner").find(".graf:last"));
                    if (lastGraf.hasClass("graf--last") && $.trim(lastGraf.text()) == "")
                        lastGraf.remove();

                    $editor.find(".section-inner").append(nodeHtml);

                    currentNode = $($editor.find(".section-inner").find(".graf:last"));

                    contentHtml = pageContent[i].content;
                    currentNode.append(contentHtml);

                    if (!$editor.find(".section-inner").find(".graf:last").hasClass("graf--last"))
                        $editor.find(".section-inner").append('<p class="graf graf--p graf--last is-selected" name="'+window.Dante.utils.generateUniqueName()+'" ><br></p>');
                }
                if (pageContent[i].elType == "video") {
                    var graf = $('<p class="graf graf--p" data-video-id="' + pageContent[i].videoId +
                    '" data-video-type="' + pageContent[i].videoType + '"><br></p>');

                    var video = {
                        id: pageContent[i].videoId,
                        type: pageContent[i].videoType,
                        url: pageContent[i].videoUrl,
                        poster: pageContent[i].videoPoster
                    };

                    if (pageContent[i].videoType == "youtube")
                        video.embeded_url = "https://www.youtube.com/embed/" + pageContent[i].videoId + "?autoplay=1";

                    currentNode = $($editor.find(".section-inner").find(".graf:last"));

                    currentNode.before(graf);

                    VideoEssenceApp.PostPages.editor.btnVideo.pasteVideo(video, graf);
                }
            }

            //console.log('test', $editor.find('.section-inner .graf').length, $editor.find('.section-inner .graf').html().trim(),
            //    _.reduce(_.map($editor.find('.section-inner .graf'), function(el){
            //        return $(el).html() == '<br>';
            //
            //    }), function(n, m){
            //        return n*m;
            //    })
            //);

            //console.log('ourPlaceholder', $editor.find('.section-inner .graf .ourPlaceholder'));

            //if (
            //    ( $editor.find('.section-inner .graf').length == 1 &&
            //    $editor.find('.section-inner .graf').html().trim() == '<br>') ||
            //    (_.reduce(_.map($editor.find('.section-inner .graf'), function(el){
            //        console.log($(el).html(), $(el).html() == '<br>', parseInt($(el).html() == '<br>'));
            //        return ($(el).html() == '<br>' || $(el).html().trim() == '');
            //
            //    }), function(n, m){
            //        return n*m;
            //    }) && $editor.find('.section-inner .graf .ourPlaceholder').length == 0)
            //){
            //    $($editor.find('.section-inner .graf')[0]).html('<div class="ourPlaceholder">About new page</div>');
            //    //$($editor.find('.section-inner .graf')[0]).attr('placeholder', 'About new page');
            //}

            //console.log('pageContent2',
            //    pageContent,
            //    !$editor.find(".section-inner").find(".graf:last").hasClass("graf--last") && pageContent != [],
            //    pageContent != '[]'
            //);

            if (!$editor.find(".section-inner").find(".graf:last").hasClass("graf--last") && pageContent.length > 0) {
                $editor.find(".section-inner").append('<p class="graf graf--p graf--last is-selected" ><br></p>');
            }
        }

        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;
        postPagesLayoutView.model.get('pageForView') == 1

        if (postPagesLayoutView.model.get('pageForView') == 1){
            var $editorContent = $("#editor").find(".section-inner");
            $editorContent.attr("contenteditable", false);
            $("#editor").attr("contenteditable", false);
            $editorContent.addClass("no-user-select");
            $("#editor").parent().find(".inlineTooltip.is-active").css("display", "none");
            $(".action-buttons-page").hide();
            $(".page-editor-left").hide();
            $("#header, .gray-space").hide();
            $(".pocket").hide();


            var postEditorTitle = $("#post-editor").find(".title-input");

            postEditorTitle
                .attr("contenteditable", false)
                .attr("readonly", "readonly")
                .addClass("no-user-select")
            ;
        }
    },
    publishPage: function(e){
        e.preventDefault();

        this.model.set('status', 2);
        //this.model.set('goToList', 1);
        this.savePage();

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;
        postPagesLayoutView.model.set('pageForEdit', 0);

        VideoEssenceApp.PostPages.goToPagesList();

        return false;
    },
    cancelPage: function(e){
        e.preventDefault();

        this.savePage();

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;
        postPagesLayoutView.model.set('pageForEdit', 0);

        VideoEssenceApp.PostPages.goToPagesList();

        return false;
    },
    savePage: function(){
        //e.preventDefault();

        var $editor = this.$el.find('#editor');

        if ($editor.find('.ourPlaceholder')){
            $editor.find('.ourPlaceholder').remove();
        }

        var pageContent = [];

        $editor.find(".section-content").find(".section-inner .defaultValue").remove();

        $editor.find(".section-content").find(".section-inner").children().each(function(i){
            var self = $(this);

            var tagName = self.prop("tagName").toLowerCase();

            var editorEl = {
                tagName : tagName,
                content : self.html(),
                elType  : tagName
            };

            if (self.children("div") > 0){
                editorEl.elType = "other";
            }

            if (self.hasClass("is-ve-video")){
                editorEl.elType = "video";
                editorEl.videoId = self.data("video-id");
                editorEl.videoType = self.data("video-type");
            }

            //console.log('self.find(".videoessenceGooglePost, .videoessenceTwitterPost").length', self.find(".videoessenceGooglePost, .videoessenceTwitterPost").length);

            if (self.hasClass("is-ve-image") && self.find(".videoessenceGooglePost, .videoessenceTwitterPost").length == 0){
                editorEl.elType = "img";
            }

            if (self.find(".videoessenceGooglePost, .videoessenceTwitterPost").length > 0){
                editorEl.elType = "social";
            }

            //console.log("editorEl", editorEl);

            pageContent.push(editorEl);
        });

        //var pageImage = VideoEssenceApp.PostPublish.postData.videos[0].poster;
        //var pageContent = $("#editor").find(".section-content").find(".section-inner").html();

        var pageTitle = $("#page-editor").find(".title-input").val();

        //console.log('pages-order-list', $('.pages-order-list'),
        //_.map($('.pages-order-list').find('li div'), function(el){
        //    return  $(el).attr('data-page-id')
        //}));
        //
        ////_.map($('.pages-order-list').find('li div'), function(el){
        ////    console.log(el);
        ////   return  el;
        ////});

        var pageOrder = _.map($('.pages-order-list').find('li div'), function(el){
            return  $(el).attr('data-page-id')
        });

        //console.log("pageContent", pageContent);

        this.model.fetch({
            method: 'POST',
            data: {
                action: 'save',
                id: this.model.get('id'),
                status: this.model.get('status'),
                content: pageContent,
                title: pageTitle,
                order: pageOrder
            },
            success: function(){
               $('.pageDraftSaved').css('display', 'inline-block');
                setTimeout(function(){
                    $('.pageDraftSaved').fadeOut();
                }, 1000);
            }
        });

        return false;
    },
    clearPlaceholder: function(e){
        var self = $(e.target);
        var $editor = this.$el.find('#editor');
        //console.log('clearPlaceholder', e.target, $editor.find('.ourPlaceholder'));
        if ($editor.find('.ourPlaceholder')){
            $editor.find('.ourPlaceholder').parent().html('<br>');
            //$editor.find('.ourPlaceholder').remove();
        }
    }
});
module.exports = PostPageEditorView;