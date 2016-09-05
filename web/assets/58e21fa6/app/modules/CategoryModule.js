var Marionette = require('backbone.marionette');
var CategoryModule = Marionette.Module.extend({
	startWithParent: false,
	onStart: function (options) {
		console.log('Category Module start');
		this.region = new Marionette.Region({
			el: ".video-wrapper"
		});
		var Channels = require('../collections/Channels.js');

		this.channels = new Channels(options.channels, {
			category: options.category,
			youtubeNextPageToken: options.youtubeNextPageToken
		});

        console.log('this.channels', this.channels);

		var ChannelsView = require('../views/ChannelsView.js');
		this.channelsView = new ChannelsView({
			collection: this.channels
		}, {
            name: options.name,
            imgs: options.imgs
        });
		this.region.show(this.channelsView);

        console.log(this.channelsView);

		this.scrollListener();
	},
	scrollListener : function () {
		var self = this;
		$(window).on("scroll", function () {
			if ($(window).scrollTop() >= $(document).height() - $(window).height() - 200 && !self.channelsView.works) {
				self.channelsView.getItems();
			}
		});
	}
});
module.exports = CategoryModule;