var Twitter = Backbone.Model.extend({
	defaults: {
		created_at: "",
		id: "",
		text: "",
		user: "",
        saved: false
	}
});
module.exports = Twitter;