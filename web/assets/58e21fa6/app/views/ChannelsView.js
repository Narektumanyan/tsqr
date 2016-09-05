var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var ChannelView = require('./ChannelView.js');

var ChannelsView = Marionette.CompositeView.extend({
    offset: 20,
    limit: 20,
    works: false,
    model: new Backbone.Model({
        gettingIsStop: false
    }),
	childView: ChannelView,
    template:  VideoEssenceApp.templates['category-template'],
    childViewContainer: '.list',
    getItems: function(){
        this.works = true;
        this.collection.fetch({
            remove: false,
            add: true,
            merge: false,
            data: {"offset": this.offset, "limit": this.limit},
            success: _.bind(function(model, response, options){
                if(response.channels.length>0)
                {
                    this.works = false;
                    this.offset += this.limit;
                    this.collection.youtubeNextPageToken = response.youtubeNextPageToken;
                }
                else
                {
                    this.stopGetting();
                }
            }, this),
            error: _.bind(function(){
                this.stopGetting();
            }, this)
        });
    },
    stopGetting: function(){
        this.works = false;
        this.model.set('gettingIsStop', true);
        this.render();
    },
    constructor: function (params, options) {
        Marionette.CompositeView.prototype.constructor.apply(this, arguments);

        this.model.set("nameCat",  options.name);
        this.model.set("imgs",  options.imgs);
        this.model.set("retina", window.devicePixelRatio > 1);

    }
});
module.exports = ChannelsView;
