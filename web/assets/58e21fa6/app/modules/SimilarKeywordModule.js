var Marionette = require('backbone.marionette');
var SimilarKeywordModule = Marionette.Module.extend({
	startWithParent: false,
	initialize: function( moduleName, app, options ) {
		//this.regionMobile = new Backbone.Marionette.Region({
		//	el: "#mobile-view-menu .similar-keyword-wrapper"
		//});

        this.regionNormal = new Backbone.Marionette.Region({
			el: ".search-wp .topic-wp"
		});

	},
	onStart: function(options) {
		this.textToSearch = options.textToSearch;
        //console.log("options.textToSearch", options.textToSearch);

		var similar_keywords_query = document.createElement('script');
		similar_keywords_query.setAttribute('src','https://www.google.com/complete/search?client=hp&hl=en&sugexp=msedr&gs_rn=62&gs_ri=hp&cp=1&gs_id=9c&q='+options.textToSearch+'&xhr=t&callback=createSimilarKeywords');
		document.head.appendChild(similar_keywords_query);

	},
	showPanel: function(data) {
		var SimilarKeywordsView = require('../views/SimilarKeywordsView.js');
		var SimilarKeywords = require('../collections/SimilarKeywords.js');
		var collection = new SimilarKeywords();
		//this.viewMobile = new SimilarKeywordsView({
		//	collection: collection,
         //   className: "thisViewMobile"
		//});
        this.viewNormal = new SimilarKeywordsView({
			collection: collection,
            className: "thisViewNormal"
		});
        //this.viewNormal.className = "thisViewNormal";

        //console.log("showPanel this.textToSearch", this.textToSearch);
        //console.log("showPanel collection", collection);

        this.textToSearch = data[0].trim();

		collection.push({
			title: this.textToSearch,
			id: this.textToSearch,
            url: "/site/channelvideos?channel_type=search&channel_id="+encodeURIComponent(this.textToSearch)
		});

        //console.log("collection data", data, _.first(data[1], [5]));

        // todo: 6 - max limit for topics (5 + 1)
		collection.add(_.map(_.first(data[1], [5]), function(element){
			var query = element[0].replace(/<b>/gi," ").replace(/<\/b>/gi," ").trim();
			return {
				title: query,
				id: query,
                url: "/site/channelvideos?channel_type=search&channel_id="+encodeURIComponent(query)
			};
		}));

        //console.log("collection", collection, collection.first(6));

		//this.regionMobile.show(this.viewMobile);
		this.regionNormal.show(this.viewNormal);
	}
});
module.exports = SimilarKeywordModule;