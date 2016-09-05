var LinkPost = Backbone.Model.extend({
	defaults: {
		video_id: 1,
		type: "youtube",
		title: "this is title",
		description: "this is description"
	}
});
module.exports = LinkPost;