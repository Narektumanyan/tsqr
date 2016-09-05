var Marionette = require('backbone.marionette');
var VideoROICollectionView = Marionette.CollectionView.extend({
    template: VideoEssenceApp.templates['video-roi-collection'],
    showForTime: function(time) {
        this.children.each(function(view){
            view.applyPlay(time);
        });
    },
    showPause: function() {
        this.children.each(function(view){
            view.applyPause();
        });
    }
});
module.exports = VideoROICollectionView;