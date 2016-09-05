var Marionette = require('backbone.marionette');
var VideoPocketView = Marionette.ItemView.extend({
    template: VideoEssenceApp.templates['video-search-template'],
    className: 'modal-video-item',
    events: {
        'click .action-select': 'select',
        'click .action-unselect': 'unselect',
    },
    select: function() {
    	this.$('.action-select').removeClass('action-select').addClass('action-unselect');
    	this.model.set('selected', true);
    },
    unselect: function() {
    	this.$('.action-unselect').removeClass('action-unselect').addClass('action-select');
    	this.model.set('selected', false);
    }
});
module.exports = VideoPocketView;