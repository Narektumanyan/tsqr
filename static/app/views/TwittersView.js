var Marionette = require('backbone.marionette');
var TwitterView = require('./TwitterView.js');

var $ = require('jquery');
	require('perfect-scrollbar/jquery')($);
	
var TwittersView = Marionette.CollectionView.extend({
	className: 'image-search-result-inner',
	childView: TwitterView,
	initialize: function() {
		this.listenTo(this.collection, "add", this.updateScrollbar);
	},
	updateScrollbar: function () {
		$('.modal-social-search-result').perfectScrollbar();
		$('.modal-social-embeded-result').perfectScrollbar();
	}
});
module.exports = TwittersView;