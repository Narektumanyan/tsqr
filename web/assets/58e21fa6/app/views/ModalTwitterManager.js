var ModalHandelbars = require('./ModalHandlebars.js');
VideoEssenceApp.ModalTwitterManager = VideoEssenceApp.ModalHandelbars.extend({
	prefix: 'bim',
	template:  VideoEssenceApp.templates['modal-twitter-manager-template'],
	cancelEl: '.bbm-button',
	events: {
		'click .tab-upload': 'showDropZone',
		'click .tab-library': 'showImageLibrary',
		'click .tab-search': 'showSearch',
		'click .tab-url': 'showUrl',
		'keyup .search-url': 'searchImages',
		'keyup .insert-url': 'insertImages'
	},
	onRender: function()
	{
		this.initDropZone();
		this.$el.find('.tab-upload').addClass('selected');

		this.rerenderGallery();
	},
	hideAllBeforeSelect: function () {
		this.$el.find('.ve-tab').removeClass('selected');
		this.$el.find('.dropzone-wrapper').hide();
		this.$el.find('.image-library-wrapper').hide();
		this.$el.find('.image-search-wrapper').hide();
		this.$el.find('.image-url-wrapper').hide();
	},
	showImageLibrary: function() {
		this.hideAllBeforeSelect();

		this.$el.find('.tab-library').addClass('selected');
		this.$el.find('.image-library-wrapper').show();
	},
	showDropZone: function() {
		this.dropzone.removeAllFiles();

		this.hideAllBeforeSelect();
		this.$el.find('.tab-upload').addClass('selected');
		this.$el.find('.dropzone-wrapper').show();
	},
	showSearch: function() {
		this.hideAllBeforeSelect();

		this.$el.find('.tab-search').addClass('selected');
		this.$el.find('.image-search-wrapper').show();
	},
	showUrl: function() {
		this.hideAllBeforeSelect();

		this.$el.find('.tab-url').addClass('selected');
		this.$el.find('.image-url-wrapper').show();
	},
	rerenderGallery: function () {
		this.videoEssenceApp = new VideoEssenceApp.ImagesPocketView({
			collection: VideoEssenceApp.MediaManager.imagesGalleyCollection
		});
		this.imagesRegion = new Backbone.Marionette.Region({
			el: this.$el.find(".image-library-wrapper")
		});
		this.imagesRegion.show(this.videoEssenceApp);
	},
	initDropZone: function () {
		var self = this;
		this.$el.find('.dropzone').dropzone({
			url: "/post/upload",
			maxFiles: 1,
			maxFilesize: 2,
			init: function() {
				self.dropzone = this;
			},
			accept: function(file, done) {
				if (file.name == "justinbieber.jpg") {
					done("Naha, you don't.");
				}
				else { done(); }
			},
			processFile : function(a) {
				console.log(a);
			},
			success: function(file,response){
				if(response.status == "success") {
					VideoEssenceApp.MediaManager.imagesGalleyCollection.add(response.data);
					self.rerenderGallery();
					self.showImageLibrary();
				}

			}
		});
	},
	searchImages:  function (event) {
		var self = this;
		var ImagesCollection = Backbone.Collection.extend({
			model: VideoEssenceApp.ImageSearch
		});
		var imagesCollection = new ImagesCollection();

		if(event.keyCode == 13){
			var jqxhr = $.ajax("/post/search-images-from-key?key=" + encodeURIComponent(this.$el.find('.search-url').val()))
				.done(function (data) {
					if (data.status === "success") {
						if(_.isArray(data.data) && data.data.length > 0){
							for (var i in data.data) {
								var image = data.data[i];
								imagesCollection.push(
									new VideoEssenceApp.ImageSearch({
										"previewURL": image.previewURL,
										"webformatURL": image.webformatURL
									})
								)
							}
							self.fillSearchResults(imagesCollection);
						} else {
							self.$el.find(".image-search-result").text('No results');
						}

					}
				});
		}
	},
	fillSearchResults: function(imagesCollection) {
		var imageSearchesView = new VideoEssenceApp.ImageSearchesView({
			collection: imagesCollection
		});
		var imageSearcheRegion = new Marionette.Region({
			el: this.$el.find(".image-search-result")
		});
		imageSearcheRegion.show(imageSearchesView);
	},
	insertImages: function (event) {
		var self = this;
		if(event.keyCode == 13){
			var jqxhr = $.ajax("/post/save-image?url=" + encodeURIComponent(this.$el.find('.insert-url').val()))
				.done(function (data) {
					if(data.status !== 'error'){
						self.saveImage(data.data.path);
					}
				});
		}
	},
	saveImage: function (bigUrl) {
		//VideoEssenceApp.PostCreate.editor.btnImage.insertImage(bigUrl);
		VideoEssenceApp.PostPublish.editor.btnImage.insertImage(bigUrl);
		VideoEssenceApp.MediaManager.imagesGalleyCollection.push({path: bigUrl});
		VideoEssenceApp.MediaManager.hide();
	}
});
