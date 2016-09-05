var SocialSearchModal = require('./SocialSearchModal.js');
var GooglePostCollection =  require('../collections/GooglePosts.js');
var GooglePostsView = require('./GooglePostsView.js');
var GooglePostView = require('./GooglePostView.js');
var GoogleSearchModal = SocialSearchModal.extend({
	afterSearch: function (key) {
		this.collection = new GooglePostCollection();

		this.collection.fetch({
			data: {"keyword": key}
		});
		var GooglePostsView = require('./GooglePostsView.js');
		var collectionView = new GooglePostsView({
			collection: this.collection
		});
		this.resultsRegion.show(collectionView);

		if (!this.collectionEmbeded) {
			this.collectionEmbeded = new GooglePostCollection();
			var collectionViewEmbeded = new GooglePostsView({
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
			for(var i in selectedPosts) {
				console.log(selectedPosts[i]);
				html += new GooglePostView ({
						model: selectedPosts[i],
						template: VideoEssenceApp.templates['post-editor-google']
					}
				).render().$el.html();
			}
			//VideoEssenceApp.PostCreate.editor.btnGoogleP.insertHtml(html);
            if (VideoEssenceApp.PostPublish.editor != undefined)
			    VideoEssenceApp.PostPublish.editor.btnGoogleP.insertHtml(html);
            if (VideoEssenceApp.PostPages.editor != undefined)
                VideoEssenceApp.PostPages.editor.btnGoogleP.insertHtml(html);
		}
	},
	setCount: function() {
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
module.exports = GoogleSearchModal;