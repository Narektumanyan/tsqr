var Backbone = require('backbone');
var _ = require('underscore');
require('backbone.stickit');
require('jquery-ui');
require('jquery-colpick');

Backbone.Stickit.addHandler([{
    selector: '.sliderWidget',
    initialize: function($el, model, options) {
        var params = options.params || {};
        var onSlide = function(event, ui) {
            model.set(options.observe, ui.value);
        }
        params.value = model.get(options.observe);
        params.slide = onSlide;
        $el.slider(params);
        options.initialized = true;
    },
    update: function($el, val, model, options) {
        if (options.initialized) $el.slider('value', val);
    }
}, {
    selector: '.draggable',
    initialize: function($el, model, options) {
        var params = options.params || {};
        var onStop = function(event, ui) {
            model.set(ui.position);
        }
        params.containment = "parent";
        params.stop = onStop;
        $el.draggable(params);
    },
    update: function($el, val, model, options) {
        $el.css({
            'background-color': val[0],
            left: val[1],
            top: val[2]
        });
    }
}, {
    selector: '.colorSelector',
    initialize: function($el, model, options) {
        var val = model.get(options.observe);
        var applyColor = function(color) {
            $el.find('.no-color-holder').text(color);
            $el.find('.color-holder i').css({background: color});
            $el.find('input').val(color);
        }
        var params = _.extend(options.params || {}, {
            layout: 'hex',
            submit: false,
            color: '000000',
            showEvent: '',
            onChange: function(hsl, hex, rgb) {
                var color = '#' + hex.toUpperCase();
                applyColor(color);
                model.set(options.observe, color);
            }
        });
        applyColor('#' + params.color)
        if (options.single || !_.include(model.colors, val)) {
            params.color = val.slice(1,7);
        }
        if (val.slice(1,7) == params.color) {
            $el.find('input').trigger('click');
        }
        $el.colpick(params);
        $el.on('click', '.color-picking', function(){
            $el.colpickShow();
        });
        options.initialized = true;
    },
    update: function($el, val, model, options) {
        if (options.initialized) {
            if (options.single || !_.include(model.colors, val)) {
                $el.colpickSetColor(val.slice(1,7), false);
            }
        }
    }
}]);

var Marionette = require('backbone.marionette');

var ModalVideoCustom = Marionette.ItemView.extend({
    templateHelpers: function () {
        return {
            colors:         this.model.colors,
            fontSizes:      this.model.fontSizes,
            emailProviders: this.model.emailProviders,
            thumbnail:      this.model.video.thumbnail,
        }
    },
    events: {
        'click .color-picking': 'changeColor',
        'click .closeAnnotation': function(event) {
            event.preventDefault();
        },
    },
    bindings: {
        '#displayOnPause': 'displayOnPause',
        '#showCloseButton': 'showCloseButton',
        '#allowSkip': 'allowSkip',
        '#askNames': 'askNames',
        '#text': 'text',
        '#headline': 'headline',
        '#subHeadline': 'subHeadline',
        '#buttonText': 'buttonText',
        '#targetUrl': 'targetUrl',
        '#emailServiceProvider': 'emailServiceProvider',
        '#textFontSize': 'textFontSize',
        '#textColor .color-pick': 'textColor',
        '#textColor .colorSelector': {
            observe: 'textColor',
            single: true,
        },
        '#buttonColor .color-pick': 'buttonColor',
        '#buttonColor .colorSelector': 'buttonColor',
        '#backgroundColor .color-pick': 'backgroundColor',
        '#backgroundColor .colorSelector': 'backgroundColor',
        '#opacity': 'opacity',
        '#opacitySlider': {
            observe: 'opacity',
            params: {max: 100}
        },
        '#timeStart': {
            observe: 'timeStart',
            onGet: 'formatTime',
            onSet: 'parseTime'
        },
        '#timeStop': {
            observe: 'timeStop',
            onGet: 'formatTime',
            onSet: 'parseTime'
        },
        '#previewCta .cta': {
            observe: ['buttonColor', 'left', 'top'],
        },
        '#previewCta .button': {
            observe: 'buttonText',
            updateModel: false,
        },
        '#previewAnnotation .annotation': {
            observe: ['backgroundColor', 'left', 'top']
        },
        '#previewAnnotation .text': {
            observe: 'text',
            updateModel: false,
            attributes: [{
                name: 'style',
                observe: ['textColor', 'textFontSize'],
                updateModel: false,
                onGet: function(values, options) {
                    return [
                        'color:'+values[0],
                        'font-size:'+values[1]+'px'
                    ].join(';');
                }
            }]
        },
        '#previewAnnotation .closeAnnotation': {
            observe: 'showCloseButton',
            updateModel: false,
            visible: function(val) {
                return val == true;
            }
        },
        '#previewLead .background': {
            updateModel: false,
            attributes: [{
                name: 'style',
                observe: ['backgroundColor', 'opacity'],
                updateModel: false,
                onGet: function(values, options) {
                    return [
                        'background-color:'+values[0],
                        'opacity:'+(values[1]/100)
                    ].join(';');
                }
            }]
        },
        '#previewLead .headline': {
            observe: 'headline',
            updateModel: false
        },
        '#previewLead .subheadline': {
            observe: 'subHeadline',
            updateModel: false
        },
        '#previewLead .form': {
            classes: {
                'with-name': 'askNames',
            }
        },
        '#previewLead .skip': {
            observe: 'allowSkip',
            updateModel: false,
            visible: function(val) {
                return val == true;
            }
        },
        '#previewLead .button': {
            observe: 'buttonText',
            updateModel: false,
            attributes: [{
                name: 'style',
                observe: ['buttonColor'],
                updateModel: false,
                onGet: function(values, options) {
                    return [
                        'background-color:'+values[0]
                    ].join(';');
                }
            }]
        },
    },
    onRender: function() {
        this.addBinding(null, '#timeStartSlider', {
            observe: 'timeStart',
            params: {max: this.model.video.length}
        });
        this.addBinding(null, '#timeStopSlider', {
            observe: 'timeStop',
            params: {max: this.model.video.length}
        });
        this.stickit();
    },
    onDestroy: function() {
        this.unstickit();
    },
    changeColor: function(event) {
        $(event.currentTarget).prev(':radio').trigger('click');
    },
    parseTime: function(time) {
        var match = /^(\d+)(:(\d{0,}))?$/.exec(time);
        var min = match && match[1]|0 || 0,
            sec = match && match[2]|0 || 0;
        return min * 60 + sec;
    },
    formatTime: function(seconds) {
        var min = ~~(seconds/60),
            sec = seconds % 60;
        return min + ':' + ("00" + sec).slice(-2);
    }
});

module.exports = ModalVideoCustom;
