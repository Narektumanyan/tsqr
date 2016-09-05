var Marionette = require('backbone.marionette');
var ModalHandelbars = require('./ModalHandlebars.js');

var LinkPostsView = require('./LinkPostsView.js');
var LinkPosts = require('../collections/LinkPosts.js');
var LinkRelatedPostsView =  require('./LinkRelatedPostsView.js');

var RelatedModal = ModalHandelbars.extend({
	model: new Backbone.Model({
		listType: 'all'
	}),
	template:  VideoEssenceApp.templates['modal-template-related-posts'],
	cancelEl: '.bbm-button, .modal-related-posts-controls-cancel, .modal-related-posts-controls-add',
	events: {
		"click #post-search" : "search",
		'keyup .search-post': 'searchFromInput',
		"click .post-btn" : "addRelations",
		"click .all-posts" : "showAll",
		"click .related-posts" : "showRelated"
	},
	beforeCancel: function(){
		this.model.set('headline', $("#headline").text());
		$('input[name=related_headline]').val($("#headline").text());
        //console.log("VideoEssenceApp.PostPublish.editor", VideoEssenceApp.PostPublish.editor);

        //VideoEssenceApp.PostPublish.editor.linkPostsView = new LinkPostsView({
        //    collection: new LinkPosts(VideoEssenceApp.PostPublish.linkPostsCollection.where({linked: true}))
        //});

        //VideoEssenceApp.PostPublish.editor.linkRelatedPosts.show(VideoEssenceApp.PostPublish.editor.linkPostsView);
	},
	beforeSubmit: function(){
		this.model.set('headline', $("#headline").text());
		$('input[name=related_headline]').val($("#headline").text());
	},
	showAll: function() {
		this.model.set({
			listType: 'all',
			keyword: ''
		});
		this.render();
		VideoEssenceApp.linkPostsView = new LinkPostsView({
			collection: VideoEssenceApp.PostPublish.linkPostsCollection
		});

		VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);
	},
	showRelated: function() {
		this.model.set({
			listType: 'related',
			keyword: ''
		});
		this.render();
		VideoEssenceApp.linkPostsView = new LinkRelatedPostsView({
			collection:
				new LinkPosts(VideoEssenceApp.PostPublish.linkPostsCollection.where({linked: true}))
		});
		VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);
	},
	beforeRender : function(){
		this.model.set({
			headline: $('input[name=related_headline]').val()
		});
	},
	onShow : function(){
		VideoEssenceApp.linkPostsRegion = new Marionette.Region({
			el: this.$el.find('.post-container')
		});
		VideoEssenceApp.linkPostsView = new LinkPostsView({
			collection: VideoEssenceApp.PostPublish.linkPostsCollection
		});

		VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);

		$("#headline").keypress(function(e){ return e.which != 13; });
	},
	searchFromInput: function(event) {
		if(event.keyCode == 13){
			this.search();
		}
	},
	search: function(){
		var keyword = this.$(".search-post").val();
		this.model.set({
			listType: 'all',
			keyword: keyword
		});
		this.render();
		findResult = new Backbone.Collection();
		VideoEssenceApp.PostPublish.linkPostsCollection.each(function(post) {
			postTitle = post.get('title');
			if(postTitle.indexOf(keyword) > -1){
				findResult.add(post);
			}
		});
		VideoEssenceApp.linkPostsView = new LinkPostsView({
			collection: findResult
		});

		VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);

	},
	addRelations:function(){
		this.model.set('listType', 'all');
		$(this.el).hide();
	}
});
module.exports = RelatedModal;