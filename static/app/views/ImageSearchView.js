var Marionette = require('backbone.marionette');
var ImageSearchView = Marionette.ItemView.extend({
	tagName: "div",
	className: "image-search-item",
	template: VideoEssenceApp.templates['image-search-template'],

	events: {
		'click img': 'selectImage'
	},
	initialize: function () {

	},
	selectImage: function () {
		var self = this;
		VideoEssenceApp.MediaManager.modalView.showLoaderSearch();
		var jqxhr = $.ajax("/post/save-image?url=" + encodeURIComponent(this.model.get('webformatURL')))
			.done(function (data) {
				if(data.status !== 'error'){
					self.saveImage(data.data.path);
				}
			});
	},
	saveImage: function (bigUrl) {
		//VideoEssenceApp.PostCreate.editor.btnImage.insertImage(bigUrl);
		VideoEssenceApp.PostPublish.editor.btnImage.insertImage(bigUrl);
		VideoEssenceApp.MediaManager.imagesGalleyCollection.push({path: bigUrl});
		VideoEssenceApp.MediaManager.hide();
	}
});
module.exports = ImageSearchView;