var Marionette = require('backbone.marionette')
    //PostCategoriesCollection = require('../collections/PostCategoriesCollection.js'),
    //PostCategoriesView = require('./PostCategoriesView.js'),
    //PostCategoryView = require('./PostCategoryView.js'),
    //PostCategory = require('../models/PostCategory.js')
    ;

var VideoROI = require('../models/VideoROI.js');
var ModalVideoCustomSelect = require('../views/ModalVideoCustomSelect.js');

var PostPublishModule = Marionette.Module.extend({
    startWithParent: false,
    postVideo: null,
    onStart: function(options){
        //console.log("PostPublishModule onStart options");
// --------------------------------------------  Publish  --------------------------------------------------------------
        this.additinonalInfo = options.additinonalInfo;
        this.postInformationShowRelated = options.postInformationShowRelated;
        this.postInformationTags = options.postInformationTags;

        var PostPublishView = require('../views/PostPublishView.js');

        this.publishView = new PostPublishView({}, {
            additinonalInfo: this.additinonalInfo
        });
        this.publishView.render();


        this.currentPostRelation = new Backbone.Collection();
        this.postRelation = new Backbone.Collection();

        //this.initTagInputs();

        var LinkPosts = require('../collections/LinkPosts.js');
        this.linkPostsCollection = new LinkPosts();

        var LinkPostsView = require('../views/LinkPostView.js');
        this.linkPostsView = new LinkPostsView({
            collection: this.linkPostsCollection
        });
        var RelatedModal = require('../views/RelatedModal.js');
        $(".relations-popup").click(function () {
            $('.app').html(new RelatedModal().render().el);
        });

        //var PostCategoryModal = require('../views/PostCategoryModal.js');
        //$(".post-add-category").click(function () {
        //    $('.app').html(new PostCategoryModal().render().el);
        //});

        $('.search-post').bind("enterKey",function(e){
            VideoEssenceApp.RelatedModal.search();
        });
        $('.search-post').keydown(function(e){
            if(e.keyCode == 13)
            {
                $(this).trigger("enterKey");
            }
        });
// ---------------------------------------------  Edit Post  -----------------------------------------------------------
        this.postData = options.postData;

        //console.log("options", options);
        //console.log("this.postData", this.postData);

        this.initRegions();

        this.showEditor();
// ----------------------------------------  end Edit Post  ------------------------------------------------------------
    },
	initialize: function (moduleName, app, options) {
        console.log("PostPublishModule initialized");
	},
	initTagInputs: function (opt) {

		var postTags = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
			queryTokenizer: Bloodhound.tokenizers.whitespace
		});
		postTags.initialize();
        postTags.add([{val: 'dog'}]);

        //console.log("initTagInputs postTags", postTags);

		this.tagsBlock = $('.input-post-tags');
		this.tagsBlock.tagsinput({
			typeaheadjs: {
				name: 'posttags',
				displayKey: 'name',
				valueKey: 'name',
				source: postTags.ttAdapter()
			},
            value: "Amsterdam,Washington,Sydney,Beijing,Cairo"
		});
        for (val in opt){
            if (!opt.hasOwnProperty(val)) continue;
            this.tagsBlock.tagsinput('add', opt[val]);
        }
	},

// editor --------------------------------------------------------------------------------------------------------------

    initRegions: function() {
        this.editorRegion = new Backbone.Marionette.Region({
            el: '#post-editor'
        });
        this.modalRegion = new Backbone.Marionette.Region({
            el: '.app'
        });
    },
    showEditor: function() {
        var Post = require('../models/Post.js');

        //console.log("PostPublishModule showEditor");

        //console.log("showEditor", this.postData);
        this.postData.content = decodeURIComponent(this.postData.content);
        //console.log("showEditor this.postData.content", this.postData.content);

        this.post = new Post(this.postData);

        var PostEditorView = require('../views/PostEditorView.js');

        //console.log("PostPublishModule this.post", this.post);

        this.editor = new PostEditorView({model: this.post});
        this.listenTo(this.editor, 'video:custom:click', this.showCustomize);

        this.editorRegion.show(this.editor);
    },
    showCustomize: function(video, nodeId) {
        //console.log("PostPublishModule showCustomize", video);

        var roi = new VideoROI({}, {video: video});
        this.customView = new ModalVideoCustomSelect({model: roi});
        var callback = this.applyCustomize.bind(this, nodeId);
        this.listenTo(this.customView, 'video:custom:apply', callback);
        this.modalRegion.show(this.customView);
    },
    applyCustomize: function(nodeId, roi) {
        var customs = roi.video.customs;
        customs.push(roi.toJSON());
        this.editor.trigger('video:custom:update', nodeId, customs);
    }
});
module.exports = PostPublishModule;
