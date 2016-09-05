var SocialSearchModal = require('./SocialSearchModal.js');
var Twitters = require('../collections/Twitters.js');
var TwittersView = require('./TwittersView.js');
var TwitterView = require('./TwitterView.js');
var TwitterSearchModal = SocialSearchModal.extend({
	afterSearch: function (key) {
		this.collection = new Twitters();
		this.collection.fetch({
			data: {"keyword": key}
		});

		this.resultsRegion.show(new TwittersView({
			collection: this.collection
		}));

		if (!this.collectionEmbeded) {
			this.collectionEmbeded = new Twitters();
			var collectionViewEmbeded = new TwittersView({
				collection: this.collectionEmbeded
			});
			this.resultsRegionEmbeded.show(collectionViewEmbeded);
		}

		this.listenTo(this.collection, 'change:saved', this.addToEmbeded);
		this.listenTo(this.collection, 'change:saved', this.setCount);
	},
	insertSelectedItems: function () {
		if(!_.isUndefined(this.collection) && !!this.collection.length) {
			var selectedPosts = this.collection.where({saved: true});
			var html = '';
			for (var i in selectedPosts) {
				html += new TwitterView({
						model: selectedPosts[i],
						template: VideoEssenceApp.templates['twitter-editor-template']
					}
				).render().$el.html();
			}
			//VideoEssenceApp.PostCreate.editor.btnTwitter.insertHtml(html);
            if (VideoEssenceApp.PostPublish.editor != undefined)
			    VideoEssenceApp.PostPublish.editor.btnTwitter.insertHtml(html);
            if (VideoEssenceApp.PostPages.editor != undefined)
			    VideoEssenceApp.PostPages.editor.btnTwitter.insertHtml(html);


			this.initScrollbar($('#modal-social-posts-search .modal-social-search-result'));
			this.collection.reset();
		}
	},
	setCount: function () {
		this.$el.find('.tab-embedded-posts-social span').html(this.model.get('count_select'));
	},
	addToEmbeded: function(model, saved) {
		if (saved) 
			this.collectionEmbeded.add(model);
		else
			this.collectionEmbeded.remove(model);
		this.model.set('count_select',this.collectionEmbeded.length);
	}
});
module.exports = TwitterSearchModal;