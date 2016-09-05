var LinkPostView = require('./LinkPostView.js');
var LinkRelatedPostView = LinkPostView.extend({
	addLink:function(){
		this.model.set('linked', !this.model.get('linked'));
		this.render();
		VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);

		hasPost = VideoEssenceApp.PostPublish.currentPostRelation.where({id:this.model.get('id')});
		if(hasPost.length>0){
			VideoEssenceApp.linkPostsView.collection.remove(this.model);
		} else {
			VideoEssenceApp.linkPostsView.collection.add(this.model);
		}
	}
});
module.exports = LinkRelatedPostView;