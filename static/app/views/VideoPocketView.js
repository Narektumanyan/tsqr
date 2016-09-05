var Marionette = require('backbone.marionette');
var VideoPocketView = Marionette.ItemView.extend({
    template: VideoEssenceApp.templates['video-pocket-template'],
    events: {
        'click .delete-from-pocket': 'clickedButton',
        'click .thumbnail': 'openModal'
    },
    initialize:function(){
        $(".pocket").find(".pocket-wrapper").on( 'mousewheel DOMMouseScroll', function ( e ) {
            //console.log("mousewheel DOMMouseScroll");
            var e0 = e.originalEvent,
                delta = e0.wheelDelta || -e0.detail;

            this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
            e.preventDefault();
        });
    },
    clickedButton: function() {
        VideoEssenceApp.vent.trigger("pocket:videoRemove", this.model);
    },
    openModal: function(event) {
        event.preventDefault();
        VideoEssenceApp.VideoExplore.showModal(event, this.model);
    }
});
module.exports = VideoPocketView;