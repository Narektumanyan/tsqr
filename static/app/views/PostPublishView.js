var Marionette = require('backbone.marionette'),
    PostCategoriesCollection = require('../collections/PostCategoriesCollection.js'),
    PostCategoriesView = require('./PostCategoriesView.js'),
    PostCategoryView = require('./PostCategoryView.js'),
    PostCategory = require('../models/PostCategory.js');

var PostPublishView = Marionette.ItemView.extend({
    el: '.publish-block',
    //template: false,
    template: VideoEssenceApp.templates['post-publish'],
    events: {
        //'keyup .add-category input': 'testCategoryKeyUp',

        'click .cat-checkbox-wp .my-checked-on': 'checkboxChange',
        'click .cat-checkbox-wp .my-checked-off': 'checkboxChange',
        'submit #post-publish': 'submitPublishForm',
        'click .relations-popup': 'relatedModal',
        'click .post-add-category': 'postCategoryModal',
        'focusout .bootstrap-tagsinput .tt-input': 'tagFocusOut',
        'click .post-close': 'goToEditStep'
    },
    tagFocusOut: function(e){
        setTimeout(function () {
            $('.bootstrap-tagsinput .tt-input').val('');
        }, 1);
    },
    goToEditStep: function (e) {
        e.preventDefault();
        $('.publish-block-wp').slideUp('slow');
        $('.action-buttons-post').fadeIn('slow');
        var $editorContent = $("#editor").find(".section-inner");
        $editorContent
            .attr("contenteditable", true)
            .removeClass("no-user-select")
        ;
        $("#editor").parent().find(".inlineTooltip.is-active").css("display", "block");
        var postEditorTitle = $("#post-editor").find(".title-input");

        $("#editor").attr("contenteditable", true);

        postEditorTitle
            .attr("contenteditable", true)
            .removeAttr("readonly")
            .removeClass("no-user-select")
        ;
    },
    constructor: function (params, options) {
        Marionette.ItemView.prototype.constructor.apply(this, arguments);
        this.model = new Backbone.Model();

        this.model.set("additinonalInfo", options.additinonalInfo);
    },
    relatedModal: function(){
        var RelatedModal = require('../views/RelatedModal.js');
        $('.app').html(new RelatedModal().render().el);
    },
    postCategoryModal: function(){
        //var PostCategoryModal = require('../views/PostCategoryModal.js');
        //$('.app').html(new PostCategoryModal().render().el);
        VideoEssenceApp.PostCategoryModal = require('../views/PostCategoryModal.js');
        $('.app').html(new VideoEssenceApp.PostCategoryModal().render().el);
    },
    onRender: function(e){
        //console.log("onRender", this);
        //console.log("VideoEssenceApp.PostPublish", VideoEssenceApp.PostPublish.currentPostRelation);

        this.categories = new PostCategoriesCollection();

        this.categories.fetch({
            remove: false,
            add: true,
            merge: false,
            data: {"post_id": window.post_id}
        });

        //console.log("onRender", this.categories);

        this.postCategoriesView = new PostCategoriesView({
            collection: this.categories
        });

        this.postCategoriesRegion = new Backbone.Marionette.Region({
            el: '#tree'
        });

        this.postCategoriesRegion.show(this.postCategoriesView);
        
        if (VideoEssenceApp.PostPublish.postInformationShowRelated)
            this.$('input[name="switch-field-1"]').attr('checked', 'checked');

        //console.log("VideoEssenceApp.PostPublish", VideoEssenceApp.PostPublish);

        VideoEssenceApp.PostPublish.initTagInputs(VideoEssenceApp.PostPublish.additinonalInfo.tags);
    },
    onBeforeRender: function(){
        //console.log("onBeforeRender", this);
    },
    checkboxChange: function(e){
        //console.log("checkboxChange", event.target);
        //console.log("checkboxChange", e.target);

        var self = $(e.target);

        var checked = false;
        if (self.hasClass("my-checked-off"))
            checked = true;

        if (checked){
            self.parent().find(".my-checked-off").hide();
            self.parent().find(".my-checked-on").css("display", "inline-block");
            self.parent().find("input[type='checkbox']").prop("checked", true).val(1);

            VideoEssenceApp.checkedCategories.push(self.parents(".cat").data("id"));
        }
        else{
            self.parent().find(".my-checked-on").hide();
            self.parent().find(".my-checked-off").css("display", "inline-block");
            self.parent().find("input[type='checkbox']").prop("checked", false).val(0);

            VideoEssenceApp.checkedCategories.splice(VideoEssenceApp.checkedCategories.indexOf(self.parents(".cat").data("id")), 1)
        }

    },
    submitPublishForm: function(e){
        //e.preventDefault();

        var jsonRelations = JSON.stringify(
            _.pluck(
                VideoEssenceApp.PostPublish.linkPostsCollection.
                    where({linked: true}),
                'id'
            ));

        var checkedCategories = JSON.stringify(VideoEssenceApp.checkedCategories);

        if($('.customize-switcher input[type="checkbox"]')[0].checked){
            $('#post-publish-show_related').val(1);
        }
        $('#post-publish-relations').val(jsonRelations);
        $('#post-publish-tags').val($(".publish-block .input-post-tags").val());
        $('#post-publish-selected-categories').val(checkedCategories);

        var postContent = [];
        try {
            // destroy resizable before save
            $("#editor").find('img').resizable('destroy');
            $("#editor").find('.draggable').removeClass('draggable');
        } catch (e) {

        }

        $("#editor").find(".section-content").find(".section-inner").children().each(function(i){
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
                editorEl.content = {
                    width: self.find('.video-js-vimeo-dante').data('width'),
                    height: self.find('.video-js-vimeo-dante').data('height')
                };
                console.log("editorEl", editorEl);
            }

            //console.log('self.find(".videoessenceGooglePost, .videoessenceTwitterPost").length', self.find(".videoessenceGooglePost, .videoessenceTwitterPost").length);

            if (self.hasClass("is-ve-image") && self.find(".videoessenceGooglePost, .videoessenceTwitterPost").length == 0){
                editorEl.elType = "img";
            }

            if (self.find(".videoessenceGooglePost, .videoessenceTwitterPost").length > 0){
                editorEl.elType = "social";
            }

            //console.log("editorEl", editorEl);

            postContent.push(editorEl);
        });



        //var postContent = $("#editor").find(".section-content").find(".section-inner").html();
        //console.log("postContent p.graf--p", postContent);

        var postTitle = $("#post-editor").find(".title-input").val();
        var postImage = VideoEssenceApp.PostPublish.postData.videos[0].poster;
    
        $.ajax({
            url: $('#post-publish').attr("action"),
            method: 'POST',
            data: {
                tags: $(".publish-block .input-post-tags").val(),
                selectedCategories: checkedCategories,
                relations: jsonRelations,
                show_related: $('.customize-switcher input[type="checkbox"]')[0].checked ? 1 : 0,
                related_headline: "",
                content: postContent,
                title: postTitle,
                videoImage: postImage
            },
            dataType: 'html',
            success: function(response){
                if (response == "ok"){
                    window.location = "/post/index";
                }
                //console.log("html", html);
            },
            error: function(){
                alert('Some error on server');
            }
        });

        return false;
    }
});
module.exports = PostPublishView;