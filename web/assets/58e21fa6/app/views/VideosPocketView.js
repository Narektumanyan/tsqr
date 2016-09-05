var VideoPocketView = require('./VideoPocketView.js');
var VideosPocketView = Backbone.Marionette.CollectionView.extend({
    childView: VideoPocketView
});
module.exports = VideosPocketView;
