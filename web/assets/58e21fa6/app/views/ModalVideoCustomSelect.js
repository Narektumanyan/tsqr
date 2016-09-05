require('backbone.stickit');

var ModalHandelbars = require('./ModalHandlebars.js');

var ModalVideoCustomLead = require('./ModalVideoCustomLead.js');
var ModalVideoCustomAnnotation = require('./ModalVideoCustomAnnotation.js');
var ModalVideoCustomCta = require('./ModalVideoCustomCta.js');

var ModalVideoCustomSelect = ModalHandelbars.extend({
    prefix: 'vcm',
    template: VideoEssenceApp.templates['modal-video-custom'],
    viewContainer: '.my-container',
    cancelEl: '.close',
    submitEl: '#addCompaign',
    views: {
        'select': {
            name: 'select',
            view: VideoEssenceApp.templates['modal-video-custom-select'],
        },
        'lead': {
            name: 'lead',
            view: ModalVideoCustomLead,
        },
        'annotation': {
            name: 'annotation',
            view: ModalVideoCustomAnnotation,
        },
        'cta': {
            name: 'cta',
            view: ModalVideoCustomCta,
        }
    },
    events: {
        'click #customize': 'startCampaign',
    },
    bindings: {
        '.tab_radio': 'type',
    },
    setActive: function(options) {
        console.log('set active', options, this)
    },
    onRender: function() {
        this.stickit();
        this.listenTo(this.model, 'change:type', this.changeCampaign);
        this.changeCampaign();
    },
    onDestroy: function() {
        this.unstickit();
        this.stopListening();
    },
    startCampaign: function() {
        this.openAt({name: this.model.get('type')});
    },
    changeCampaign: function() {
        var type = this.model.get('type');
        this.$el.find('.campaign-preview.active').removeClass('active');
        this.$el.find('.campaign-preview#'+type).addClass('active');
    },
    beforeSubmit: function() {
        return this.model.validate()
    },
    submit: function() {
        console.log('submit');
        this.trigger('video:custom:apply', this.model);
    }
});
module.exports = ModalVideoCustomSelect;
