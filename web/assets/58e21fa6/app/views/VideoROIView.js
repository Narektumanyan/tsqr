var Marionette = require('backbone.marionette');
var VideoROIView = Marionette.ItemView.extend({
    template: VideoEssenceApp.templates['video-roi'],
    templateHelpers: function () {
        var self = this;
        var equal = function(need, data) {
            return need === data;
        }
        return {
            display: function() {
                return self.model.get('displayOnPause') ? 1 : 0;
            },
            typeIsLead: equal('lead', this.model.get('type')),
            typeIsAnnotation: equal('annotation', this.model.get('type')),
            typeIsCta: equal('cta', this.model.get('type')),
            opacity: function() {
                return self.model.get('opacity')/100;
            }
        }
    },
    events: {
        'click .closeAnnotation': 'skip',
        'click .skip': 'skip',
    },
    isPause: false,
    skiped: false,
    skipedOnPause: false,
    skip: function() {
        if (this.isPause) {
            this.skipedOnPause = true;
        } else {
            this.skiped = true;
        }
        this.hide();
    },
    onRender: function() {
        this.hide();
    },
    show: function() {
        if (!this.skiped) {
            this.$el.show();
        }
    },
    showOnPause: function() {
        if (!this.skipedOnPause) {
            this.$el.show();
        }
    },
    hide: function() {
        this.$el.hide();
    },
    applyPlay: function(time) {
        this.isPause = false;
        if (time > this.model.get('timeStart')) {
            this.show();
        } else {
            this.hide();
        }
        if (time >= this.model.get('timeStop') && this.model.get('timeStop') > 0) {
            this.hide();
        }
    },
    applyPause: function() {
        this.isPause = true;
        if (this.model.get('displayOnPause')) {
            this.showOnPause();
        }
    }
});
module.exports = VideoROIView;