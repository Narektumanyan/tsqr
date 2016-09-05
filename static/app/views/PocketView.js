var Marionette = require('backbone.marionette');
var VideoPocketView = require('./VideoPocketView.js');

var PocketView = Marionette.CompositeView.extend({
	el: '.pocket',
	template: VideoEssenceApp.templates['pocket'],
	childView: VideoPocketView,
	childViewContainer: ".pocket-wrapper",
	events: {
		'click .maximize': 'maximize',
		'click .minimize': 'minimize'
	},
	collectionEvents: {
		"add": "collectionChange",
		"remove": "collectionChange"
	},
	modelEvents: {
		"change:isMinification": "minificationChange"
	},
	initialize: function () {
		var self = this;
        //console.log("pocket add");
		VideoEssenceApp.vent.on("pocket:videoRemove", function (model) {
			self.removeItemFromLocalStorage(model);
			self.collection.remove(model);
		});
		VideoEssenceApp.vent.on("pocket:videoAdd", function (model) {
			self.addItemFromLocalStorage(model);
		});
	},
	minificationChange: function() {
		if(this.model.get('isMinification')) {
			this.$el.find('.pocket-wrapper').animate({ maxHeight: '0' }, 600, 'easeOutBounce');
			this.$el.find('.minimize').removeClass('minimize').addClass('maximize');

		} else {
			this.$el.find('.pocket-wrapper').animate({ maxHeight: '480px' }, 600, 'easeOutBounce');
			this.$el.find('.maximize').removeClass('maximize').addClass('minimize');
		}

	},
	collectionChange: function () {
		this.model.set({countVideo: this.collection.length});
		this.$el.find('.header-title').html('<b>Pocket</b><br/>' + this.collection.length + ' videos');
		var pocketInner = this.$el.find('.pocket-inner');
		if(this.collection.length) {
			pocketInner.show();
		} else {
			pocketInner.hide();
		}
	},
	maximize: function () {
		var isMinification = false;
		localStorage.setItem('pocketVideosMinification', isMinification);
		this.model.set({isMinification: isMinification});
	},
	minimize: function () {
		var isMinification = true;
		localStorage.setItem('pocketVideosMinification', isMinification);
		this.model.set({isMinification: isMinification});
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	},
	removeItemFromLocalStorage: function (model) {
		var videoModelsArr = JSON.parse(localStorage.getItem("pocketVideosCollection"));

		var newVideoModels = [];
		_.each(videoModelsArr, function (videoInLS) {
			if (videoInLS.id != model.get('id')) {
				newVideoModels.push(videoInLS);
			}
		});
		localStorage.setItem("pocketVideosCollection", JSON.stringify(newVideoModels));
	},
	addItemFromLocalStorage: function (model) {
		//console.log('addItemFromLocalStorage');
		this.collection.unshift(model.clone());
		localStorage.setItem("pocketVideosCollection", JSON.stringify(this.collection.toJSON()));
	}
});
module.exports = PocketView;