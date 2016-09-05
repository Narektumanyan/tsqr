var Marionette = require('backbone.marionette');
var SearchPanelModule = Marionette.Module.extend({
    initialize: function( moduleName, app, options ) {
	    console.log('initialize SearchPanel');

	    var Channels = require('../collections/Channels.js');
	    this.searchChannelCollection = new Channels();
	    this.searchChannelCollection.url = '/site/getchannelbykeyword';
	    //this.searchPanelRegionMobile = new Marionette.Region({
		 //   el: "#mobile-view-menu .search-panel-wrapper"
	    //});
        //this.searchChannelCollection.on("request", function(model, xhr, options){
         //   //console.log("request", this, model, xhr, options);
         //   console.log("request", this.first(3), model.first(3));
        //});
        this.searchChannelCollection.on("sync", function(model, resp, options){
            //console.log("request", this, model, resp, options);
            console.log("sync", this.first(3), model.first(3), model);
            //model.reset();
            //model.add(model.first(3));

            //var f3 = model.first(3);
            //model.url = '/site/getchannelbykeyword';

        });

        this.searchPanelRegionNormal = new Marionette.Region({
            el: ".search-wp .channel-wp"
	    });

	    return false;
    },
	fillChannels: function (keyword) {
		this.searchChannelCollection.fetch({
			remove: false,
			add: true,
			merge: false,
			data: {"textToSearch": keyword}
		});

        //this.searchChannelCollection.reset(this.searchChannelCollection.first(3));
        console.log("this.searchChannelCollection1",
            this.searchChannelCollection,
            _.first(this.searchChannelCollection, 3),
            this.searchChannelCollection.first(3)
        );

        //console.log("this.searchChannelCollection.models", this.searchChannelCollection.models);

		var SearchVideosView = require('../views/SearchVideosView.js');
		//var videosViewMobile = new SearchVideosView({
		//	collection: this.searchChannelCollection
		//});
        var videosViewNormal = new SearchVideosView({
            collection: this.searchChannelCollection
        });
        //console.log("videosViewNormal ", videosViewNormal.collection, _.first(videosViewNormal.collection, 3));
		if($(".search-panel-wrapper").length > 0 || $(".search-wp .channel-wp").length > 0) {
            this.searchPanelRegionNormal.show(videosViewNormal);
            //this.searchPanelRegionMobile.show(videosViewMobile);
		}
	}
});
module.exports = SearchPanelModule;