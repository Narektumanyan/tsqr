var SocialSearchModal = require('./SocialSearchModal.js'),
    TwitterView = require('./TwitterView.js')
    ;


var FacebookSearchModal = SocialSearchModal.extend({
	afterSearch: function (key) {
		var FacebookCollection = require('./../collections/Facebooks.js');
		this.collection = new FacebookCollection();
		this.collection.fetch({
			data: {"keyword": key}
		});

		var FacebookPostsView = require('./FacebookPostsView.js');
		this.resultsRegion.show(new FacebookPostsView({
			collection: this.collection
		}));
		this.model.set('count_select',this.collection.length);
		this.listenTo(this.collection, 'change:saved',this.setCount);
	},
	insertSelectedItems: function () {
		if(!_.isUndefined(this.collection) && !!this.collection.length) {
			var selectedPosts = this.collection.where({saved: true});
			var html = '';
			for (var i in selectedPosts) {
				html += new TwitterView({
						model: selectedPosts[i],
						template: VideoEssenceApp.templates['facebook-editor-template']
					}
				).render().$el.html();
			}
			//VideoEssenceApp.PostCreate.editor.btnFаcebook.insertHtml(html);
			//VideoEssenceApp.PostPublish.editor.btnFаcebook.insertHtml(html);
		}
	},
	setCount: function() {
		this.model.set('count_select',this.collection.where({saved: true}).length);
		this.$el.find('.modal-social-header span').html(this.model.get('embedded_title') + ' - ' + this.model.get('count_select'));
	}
});
module.exports = FacebookSearchModal;
