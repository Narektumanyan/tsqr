var Marionette = require('backbone.marionette'),
	ImagesCollection = require('../collections/ImagesGallery.js'),
	ImagesView = require('./GalleryImagesView.js'),
	ImageView = require('./GalleryImageView.js'),
	ImageModel = require('../models/Image.js');

var $ = require('jquery');
	require('perfect-scrollbar/jquery')($);

var GalleryManager = Marionette.ItemView.extend({
	tagName: 'div',
	id: 'image-library-content',
	template:  VideoEssenceApp.templates['gallery-template'],
	events: {
		// 'click .tab-image-library': 'renderLibrary',
		// 'click .tab-image-posts': 'renderLibraryPosts',
		'click .action-delete': 'deleteItems',
		'click .action-add': 'actionUpload'
	},
	currentTab: '',
	parallelUploads: 1,
	maxFileSize: 3,
	errorCode: {
		0: 'Error',
		1: 'File size too big',
		2: 'Uploading error',
		3: 'Uploading canceled'
	},

	galleryRegion: '#gallery-media-region',
	emptyRegion: '#gallery-empty-region',

	onRender: function () {
		var self = this.$el;

		this.renderLibrary();
		this.changeRegion();

		this.listenTo(this.collection, 'destroy', this.changeRegion);
		this.listenTo(this.collection, 'add', this.changeRegion);

		this.listenTo(this.collection, 'add', this.generateTextDate);
	},

	changeRegion: function () {
		this.$el.find(this.galleryRegion).hide();
		this.$el.find(this.emptyRegion).hide();

		if (this.collection.length == 0)
			this.$el.find(this.emptyRegion).show()
		else
			this.$el.find(this.galleryRegion).show();

		this.changeCount();
	},

	changeTab: function (tab, content) {
		this.hideAllBeforeSelect();
		this.$(tab).addClass('selected');
		this.currentTab = this.$(content);
		this.currentTab.show();
	},
	hideAllBeforeSelect: function () {
		this.currentTab = '';
		this.$('.ve-tab').removeClass('selected');
		this.$('.tab-content-gallery').hide();
	},
	renderLibrary: function () {
		this.changeTab('.tab-image-library', '#tab-image-library');
		this.collection = VideoEssenceApp.Gallery.imagesGalleryCollection;
		var collectionView = new ImagesView({
			collection: this.collection
		});
		this.imagesRegion = new Marionette.Region({
			el: this.$(".tab-image-library-result")
		});
		this.imagesRegion.show(collectionView);
		this.$('.tab-image-library span').text(this.collection.length);
		this.initScrollbar($('.tab-image-library-result'));
	},
	renderLibraryPosts: function () {
		this.changeTab('.tab-image-posts', '#tab-image-posts');
		var collectionView = new ImagesView({
			collection: VideoEssenceApp.Gallery.imagesPostsCollection
		});
		this.imagesRegion = new Marionette.Region({
			el: this.$(".tab-image-posts-result")
		});
		this.imagesRegion.show(collectionView);
		this.initScrollbar($('.tab-image-posts-result'));
	},
	changeCount: function () {
		this.$('.tab-image-library span').text(this.collection.length);
	},
	deleteItems: function () {
		var model,
			collectionSelected = new ImagesCollection(this.collection.where({'selected': true}));
		while (model = collectionSelected.first()) {
		    model.destroy({url: "/image/delete/" + model.get('id')});
		}
	},
	actionUpload: function () {
		VideoEssenceApp.MediaManager.show({'onlyupload': true});
	},
	
	initScrollbar: function (elem) {
		elem.perfectScrollbar();
	},
	updateScrollbar: function (elem) {
		elem.perfectScrollbar('update');
	}
});

module.exports = GalleryManager;
