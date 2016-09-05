var Marionette = require('backbone.marionette');
var GooglePostView= require('./GooglePostView.js');

var $ = require('jquery');
	require('perfect-scrollbar/jquery')($);
	
var GooglePostsView = Marionette.CollectionView.extend({
	className: 'image-search-result-inner',
	childView: GooglePostView,
	initialize: function() {
		this.listenTo(this.collection, "add", this.updateScrollbar);	
	},
	updateScrollbar: function () {
		$('.modal-social-search-result').perfectScrollbar();
		$('.modal-social-embeded-result').perfectScrollbar();
	}
});
module.exports = GooglePostsView;