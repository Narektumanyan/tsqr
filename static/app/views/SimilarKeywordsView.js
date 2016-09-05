var Marionette = require('backbone.marionette');
var SearchVideoView = require('./SearchVideoView.js');

var SimilarKeywordsView = Marionette.CollectionView.extend({
	childView: SearchVideoView
});
module.exports = SimilarKeywordsView;