var Marionette = require('backbone.marionette'),
	ModalHandelbars = require('./ModalHandlebars.js'),
	ImagesView = require('./ImagesView.js'),
	ImageView = require('./ImageView.js'),
	ImageModel = require('../models/Image.js'),
	ImageSearch = require('../models/ImageSearch.js'),
	ImageSearchsView = require('./ImageSearchsView.js'),
	ImagesCollection = require('../collections/ImagesGallery.js'),
	UploadImagesView = require('./UploadImagesView.js');

var $ = require('jquery');
require('perfect-scrollbar/jquery')($);

var ModalMediaManager = ModalHandelbars.extend({
	prefix: 'bim',
	template: VideoEssenceApp.templates['modal-media-manager-template'],
	cancelEl: '.bbm-button',
	events: {
		'click .tab-upload': 'showDropZone',
		'click .tab-library': 'showImageLibrary',
		'click .tab-search': 'showSearch',
		'click .tab-url': 'showUrl',
		'keyup .search-url': 'searchImagesInput',
		'click .search-images-button': 'searchImages',
		// 'keyup .insert-url': 'insertImages',
		'click .modal-close': 'triggerCancel',
		'click .action-cancel': 'triggerCancel',
		'click .action-add': 'addImageToPost',
		'click .action-add-library': 'addImageInLibrary',
		'click .image-gallery-item': 'selectItem',
		'click .action-upload': 'actionUpload'
	},
	currentTab: '',
	currentItem: '',
	parallelUploads: 1,
	maxFileSize: 3,
	onlyupload: false,
	errorCode: {
		0: 'Error',
		1: 'File size too big',
		2: 'Uploading error',
		3: 'Uploading canceled'
	},
	searchPage: 1,
	searchScrollYPx: 300,
	searchLoading: false,

	onRender: function() {
		if (this.args[0] && this.args[0].onlyupload !== undefined) 
			this.onlyupload = this.args[0].onlyupload;

		if (this.onlyupload === true)
			this.$el.addClass('onlyupload');

		this.initDropzone();
		this.insertImages();
		this.uploadCollection.reset();
		this.changeTab('.tab-upload', '#media-library-image-load');

		if (this.onlyupload === false)
			this.rerenderGallery();

		this.listenTo(this.uploadCollection, 'add', this.uploadImage);

		this.listenTo(this.uploadCollection, 'change:uploaded', this.checkQueue);
		this.listenTo(this.uploadCollection, 'change:error', this.checkQueue);
		this.listenTo(this.uploadCollection, 'change:canceled', this.cancelUpload);
	},
	changeTab: function(tab, content) {
		this.hideAllBeforeSelect();
		this.$(tab).addClass('selected');
		this.currentTab = this.$(content);
		this.currentTab.show();
	},
	selectItem: function(e) {
		if (this.onlyupload === true && $(e.target.closest('#media-library-image-search')).size() == 0)
			return;

		var el = $(e.target.closest('.image-gallery-item'));
		if (el.find('.error').length > 0)
			return true;
		this.$el.find('.selected-item').removeClass('selected-item');
		this.currentItem = el;
		this.currentItem.addClass('selected-item');
	},
	addImageToPost: function() {
		if (this.currentItem != '') {
			//VideoEssenceApp.PostCreate.editor.btnImage.insertImage(this.currentItem.find('img').attr('data-path'));
            if (VideoEssenceApp.PostPublish.editor != undefined)
			    VideoEssenceApp.PostPublish.editor.btnImage.insertImage(this.currentItem.find('img').attr('data-path'));
            if (VideoEssenceApp.PostPages.editor != undefined)
                VideoEssenceApp.PostPages.editor.btnImage.insertImage(this.currentItem.find('img').attr('data-path'));

			VideoEssenceApp.MediaManager.hide();
		}
	},
	addImageInLibrary: function() {
		if (!this.currentItem)
			return false;

		var self = this;
		if (event.keyCode == 13 || $('.insert-url').change()) {
			var jqxhr = $.ajax({
					url: "/post/save-image?url=" + encodeURIComponent(self.currentItem.find('img').attr('data-path')),
					beforeSend: function () {
						VideoEssenceApp.MediaManager.hide();
					}
				})
				.done(function(data) {
					if (data.status !== 'error' && data.data.id) {
						data.data.preview = data.data.path;
						var model = new ImageModel(data.data);
						var item = new ImageView({
							model: model
						});
						item.render();
						data.data.isAlreadyUpload = true;
						VideoEssenceApp.Gallery.imagesGalleryCollection.add(data.data);
						if (this.onlyupload === false)
							self.rerenderGallery();
					}
				});
		}
	},
	hideAllBeforeSelect: function() {
		this.currentItem = '';
		this.currentTab = '';
		this.$('.ve-tab').removeClass('selected');
		this.$('.media-library-image-content').hide();
	},
	showImageLibrary: function() {
		this.changeTab('.tab-library', '#media-library-image-collection');
		this.initScrollbar($('#media-library-image-collection .media-gallery-wrapper'));
	},
	showDropZone: function() {
		this.uploadCollection.reset();
		this.$('.dz-message').show();
		this.changeTab('.tab-upload', '#media-library-image-load');
	},
	showSearch: function() {
		var self = this;
		this.changeTab('.tab-search', '#media-library-image-search');
		this.initScrollbar($('#media-library-image-search .image-search-result'));
		$('.image-search-result').on('scroll', function() {
			var scrollTop = $(this).scrollTop();
			if ($('.image-search-result').height() + scrollTop + self.searchScrollYPx > $('.image-search-result-inner').outerHeight(true) && self.searchLoading === false) {
				self.searchLoading = true;
				self.searchPage++;
				self.searchImages(false);
			}
		});
	},
	showUrl: function() {
		this.changeTab('.tab-url', '#media-library-image-url');
	},
	rerenderGallery: function() {
		this.videoEssenceApp = new ImagesView({
			collection: VideoEssenceApp.Gallery.imagesGalleryCollection
		});
		this.imagesRegion = new Marionette.Region({
			el: this.$(".media-gallery-wrapper")
		});
		this.imagesRegion.show(this.videoEssenceApp);
		this.initScrollbar($('#media-library-image-collection .media-gallery-wrapper'));
	},
	initScrollbar: function(elem) {
		elem.perfectScrollbar();
	},
	updateScrollbar: function(elem) {
		elem.perfectScrollbar('update');
	},
	actionUpload: function() {
		$('#upload-gallery-images').click();
	},
	initDropzone: function() {
		var self = this;
		this.uploadCollection = new ImagesCollection();

		var collectionView = new UploadImagesView({
			collection: this.uploadCollection
		});
		this.uploadRegion = new Marionette.Region({
			el: this.$(".gallery-upload-images")
		});
		this.uploadRegion.show(collectionView);

		this.initScrollbar($('#media-library-image-load .gallery-upload-images'));

		this.$('#upload-gallery-images').on('change', function() {
			self.addToUploadCollection(this.files);
		});

		this.$("#media-library-image-load .dropzone").on("dragover", function(event) {
			event.preventDefault();
			$(this).addClass('dragging');
		});

		this.$("#media-library-image-load .dropzone").on("dragleave", function(event) {
			event.preventDefault();
			$(this).removeClass('dragging');
		});

		this.$("#media-library-image-load .dropzone").on("drop", function(event) {
			event.preventDefault();
			self.addToUploadCollection(event.originalEvent.dataTransfer.files);
		});
	},
	addToUploadCollection: function(files) {
		var self = this;
		$.each(files, function(i, file) {
			if (!file.type.match(/image.*/))
				return true;
			var reader = new FileReader();
			reader.onload = (function(e) {
				var preview = self.createPreview(e.target.result);
				file.preview = preview;
				self.uploadCollection.add({
					preview: preview,
					path: e.target.result,
					name: file.name.split('.')[0],
					size: file.size,
					type: file.type,
					uploaded: false,
					uploading: false,
					canceled: false,
					error: false,
					progress: 0,
					file: file
				});
				self.$('.dz-message').hide();
				self.initScrollbar($('#media-library-image-load .gallery-upload-images'));
			});
			reader.readAsDataURL(file);
		});
	},
	createPreview: function(src) {
		var img = new Image();
		img.src = src;
		var MAX_WIDTH = 175;
		var MAX_HEIGHT = 175;
		var width = img.width;
		var height = img.height;

		if (width > height) {
			if (width > MAX_WIDTH) {
				height *= MAX_WIDTH / width;
				width = MAX_WIDTH;
			}
		} else {
			if (height > MAX_HEIGHT) {
				width *= MAX_HEIGHT / height;
				height = MAX_HEIGHT;
			}
		}
		var canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, width, height);
		var dataurl = canvas.toDataURL("image/png");
		return dataurl;
	},
	uploadImage: function(model) {
		if (model.get('size') > (this.maxFileSize * 1000000)) {
			this.errorUpload(1, model);
		} else {
			this.uploadFile(model);
		}
	},
	cancelUpload: function(model) {
		var ajax = model.get('ajax');
		if (ajax)
			ajax.abort();
		else
			this.errorUpload(3, model);
	},
	errorUpload: function(code, model) {
		var errMsg = this.errorCode[code];
		if (!errMsg)
			errMsg = this.errorCode[0];
		model.set({
			'error': true,
			'errorText': errMsg,
			'uploading': false,
			'uploaded': false
		});
	},
	uploadFile: function(model) {
		if (this.uploadCollection.where({
				'uploading': true
			}).length >= this.parallelUploads)
			return true;

		var self = this;
		model.set({
			'uploading': true
		});

		var formdata = new FormData();
		formdata.append('images', model.get('file'));

		model.set({
			'ajax': new XMLHttpRequest()
		});

		var ajax = model.get('ajax');

		ajax.upload.addEventListener("progress", function(event) {
			return self.progressHandler(event, model);
		}, false);

		ajax.addEventListener("load", function(event) {
			return self.completeHandler(event, model);
		}, false);

		ajax.addEventListener("error", function(event) {
			return self.errorHandler(event, model);
		}, false);

		ajax.addEventListener("abort", function(event) {
			return self.abortHandler(event, model);
		}, false);

		ajax.open("POST", "/gallery/upload");
		ajax.send(formdata);
	},
	checkQueue: function(model) {
		var lengthQueue = this.uploadCollection.where({
			'uploading': true
		}).length;
		if (lengthQueue < this.parallelUploads) {
			var count = this.parallelUploads - lengthQueue;
			var collection = this.uploadCollection.where({
				'uploading': false,
				'uploaded': false,
				'error': false
			});
			for (i in collection) {
				if (i < count)
					this.uploadFile(collection[i]);
			}
		}
	},
	progressHandler: function(event, model) {
		var percent = (event.loaded / event.total) * 100;
		model.set({
			'progress': parseInt(percent)
		});
	},
	completeHandler: function(event, model) {
		var data = JSON.parse(event.target.response);
		if (data.status == 'success') {
			model.set({
				'id': data.data[0].id,
				'preview': data.data[0].preview,
				'path': data.data[0].path,
				'loaded_date': data.data[0].loaded_date,
				'info': data.data[0].info,
				'filesize': data.data[0].filesize,
				'timestamp': data.data[0].timestamp,
				'uploaded': true,
				'uploading': false
			});
			VideoEssenceApp.Gallery.imagesGalleryCollection.add(model);
		} else {
			this.errorUpload(2, model);
		}
	},
	errorHandler: function(event, model) {
		this.errorUpload(2, model);
	},
	abortHandler: function(event, model) {
		this.errorUpload(3, model);
	},

	searchImagesInput: function(event) {
		if (event.keyCode == 13) {
			this.searchImages();
		}
	},
	searchImages: function(refresh) {
		var self = this,
			ImagesCollection = Backbone.Collection.extend({
				model: ImageSearch
			});

		if (refresh !== false) {
			this.searchPage = 1;
			$('.image-search-result').scrollTop(0);
		}

		if(this.searchPage == 1)
			this.searchImagesCollection = new ImagesCollection();

		var jqxhr = $.ajax({
				url: "/post/search-images-from-key?key=" + encodeURIComponent(this.$('.search-url').val()) + '&page=' + self.searchPage,
				beforeSend: function() {
					$('.image-search-result').append(self.getLoader());
				}
			})
			.done(function(data) {
				$('.image-search-result .loader-big').remove();
				if (data.status === "success") {
					if (_.isArray(data.data) && data.data.length > 0) {
						for (var i in data.data) {
							var image = data.data[i];
							var re = /([\S]+\/)([\S]+)\./;
							var title = image.previewURL.match(re)[2];
							self.searchLoading = false;
							self.searchImagesCollection.push(
								new ImageSearch({
									'path': image.webformatURL,
									'preview': image.previewURL,
									'name': title
								})
							);
						}
						self.fillSearchResults(self.searchImagesCollection);

					} else {
						self.$(".image-search-result").text('No results');
					}
				}
			});
	},
	fillSearchResults: function(imagesCollection) {
		var imageSearchesView = new ImageSearchsView({
			collection: imagesCollection
		});
		var imageSearcheRegion = new Marionette.Region({
			el: this.$(".image-search-result")
		});
		imageSearcheRegion.show(imageSearchesView);
		this.updateScrollbar($('#media-library-image-search .image-search-result'));
	},
	insertImages: function(event) {
		var self = this;
		self.$el.find('.insert-url').on('input', function () {
			var jqxhr = $.ajax({
					url: "/post/save-image?url=" + encodeURIComponent(self.$('.insert-url').val()),
					beforeSend: function() {
						$('.url-search-result .message').hide();
						$('.url-search-result').append(self.getLoader());
					}
				})
				.done(function(data) {
					if (data.status !== 'error' && data.data.id) {
						data.data.preview = data.data.path;
						var model = new ImageModel(data.data);
						var item = new ImageView({
							model: model
						});
						item.render();
						$('.url-search-result div').not('.message').remove();
						$('.url-search-result .message').hide();
						$('.url-search-result').append(item.$el);
						VideoEssenceApp.Gallery.imagesGalleryCollection.add(data.data);
						if (this.onlyupload === false)
							self.rerenderGallery();
					} else {
						$('.url-search-result div').not('.message').remove();
						$('.url-search-result .message').show();
					}
				});
			})
	},
	saveImage: function(bigUrl) {
		//VideoEssenceApp.PostCreate.editor.btnImage.insertImage(bigUrl);
		VideoEssenceApp.Gallery.imagesGalleryCollection.push({
			path: bigUrl
		});
		VideoEssenceApp.MediaManager.hide();
	},
	getLoader: function() {
		return '<div class="loader-big"></div>';
	}
});
module.exports = ModalMediaManager;