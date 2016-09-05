var ImageSearch = Backbone.Model.extend({
	defaults: {
		"previewURL": "",
		"webformatURL": ""
	}
});
VideoEssenceApp.ImageSearch = ImageSearch;
module.exports = ImageSearch;