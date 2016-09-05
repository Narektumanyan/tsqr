FollowerSearch = Backbone.Marionette.ItemView.extend({
	el : '.search-follower-wrap',
	template: VideoEssenceApp.templates['follower-search-template'],
	events : {
		'click .search-follower' : 'addOrRemoveFollow'
	},
	initialize: function() {
		//this.model.set('followed', false);
        this.model = new Channel({
            followed: false
        })
	},
	setQuery: function(query, collection){
		this.model.set('query', query);
		this.model.set('title', query);
		this.model.set('id', query);
		this.model.set('url', '/site/videosearch?textToSearch=' + query);
		this.model.set('type', 'search');
		this.model.set('subtype', 'search');
		this.model.set('followed', VideoEssenceApp.FollowPanel.exist(query));
	},
	addOrRemoveFollow : function(){
		var followed = this.model.get('followed');
		var query = this.model.get('query');
		if(followed){
			VideoEssenceApp.FollowPanel.remove(this.model.get('query'));
			this.model.set('followed', false);
		}
		else {
			VideoEssenceApp.FollowPanel.add(this.model);
			this.model.set('followed', true);
		}

		this.render();
	}
});
