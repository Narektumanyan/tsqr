var Facebook = Backbone.Model.extend({
	defaults: {
		author: "",
		author_id: "",
		author_url: "",
		published: "",
		url: "",
		content: "",
		saved: false
	}
});
module.exports = Facebook;