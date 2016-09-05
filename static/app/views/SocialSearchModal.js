var Marionette = require('backbone.marionette');
var ModalHandelbars = require('./ModalHandlebars.js');

var $ = require('jquery');
	require('perfect-scrollbar/jquery')($);

var SocialSearchModal = ModalHandelbars.extend({
	events: {
		"click .search-images-button": "search",
		'keyup .post-search-field': 'searchFromInput',
		'click .tab-all-posts-social': 'showAllSocPosts',
		'click .tab-embedded-posts-social': 'showEmbeddedSocPosts'
	},
	template: VideoEssenceApp.templates['modal-social-search'],
	cancelEl: '.modal-close, .action-cancel',
	submitEl: '.action-add',
	currentTab: '',

	onRender: function () {
		var $result_el = this.$el.find(".modal-social-search-result");
		var $result_el_embeded = this.$el.find(".modal-social-embeded-result");
		this.resultsRegion = new Marionette.Region({
			el: $result_el[0]
		});
		this.resultsRegionEmbeded = new Marionette.Region({
			el: $result_el_embeded[0]
		});
		this.showAllSocPosts();
	},
	changeTab: function (tab, content) {
		this.hideAllBeforeSelect();
		this.$(tab).addClass('selected');
		this.currentTab = this.$(content);
		this.currentTab.show();
		this.updateScrollbar($('.modal-social-search-result'));
		this.updateScrollbar($('.modal-social-embeded-result'));
	},
	hideAllBeforeSelect: function () {
		this.currentTab = '';
		this.$('.ve-tab').removeClass('selected');
		this.$('.modal-social-tab').hide();
	},
	showAllSocPosts: function() {
		this.initScrollbar($('.modal-social-search-result'));
		this.changeTab('.tab-all-posts-social', '#modal-social-posts-search');
	},
	showEmbeddedSocPosts: function() {
		this.initScrollbar($('.modal-social-embeded-result'));
		this.changeTab('.tab-embedded-posts-social', '#modal-social-posts-embedded');
	},
	searchFromInput: function (evt) {
		if (evt.keyCode == 13) {
			this.search();
		}
	},

	search: function () {
		this.insertSelectedItems();
		var key = $('.post-search-field').val();
		this.afterSearch(key);
	},
	afterSearch: function (key) {

	},
	submit: function () {
		this.insertSelectedItems();
	},
	insertSelectedItems: function () {

	},
	initScrollbar: function (elem) {
		elem.perfectScrollbar();
	},
	updateScrollbar: function (elem) {
		elem.perfectScrollbar('update');
	}
});
module.exports = SocialSearchModal;