var Marionette = require('backbone.marionette');
var PocketModule = Marionette.Module.extend({
	initialize: function (moduleName, app, options) {
		console.log('initialize PocketModule');
		this.fillDataFromLS();

		var PocketView = require('../views/PocketView.js');
		this.view = new PocketView({
			model: new Backbone.Model({
				isMinification: this.isMinification,
				countVideo: this.pocketVideosCollection.length
			}),
			collection: this.pocketVideosCollection
		});

        //console.log("this.view", this.view);
        //console.log("this.pocketVideosCollection", this.pocketVideosCollection);

	},
	onStart: function () {
        if ($('.pocket').length == 0) {
            return;
        }
        //console.log("Pocket start");
		this.view.render();
	},
	fillDataFromLS: function () {
        //console.log("fillDataFromLS");
		var PocketVideosCollection = require('../collections/PocketVideos.js');
		this.pocketVideosCollection = new PocketVideosCollection();
		this.isMinification = false;
		this.fillVideosCollection();
		this.fillMinificationOption();
	},
	fillVideosCollection: function () {
		try {
			var VideoModel = require('../models/Video.js');
			var videoModelsArr = JSON.parse(localStorage.getItem("pocketVideosCollection"));
			var videoModels = [];
			for (var i in videoModelsArr) {
				var videoModel = videoModelsArr[i];
				videoModels.push(new VideoModel(videoModel));
			}
			this.pocketVideosCollection.set(videoModels);
		} catch (e) {
		}
	},
	fillMinificationOption: function () {
		var minificationOption = localStorage.getItem("pocketVideosMinification");
		if (!_.isNull(minificationOption)) {
			minificationOption = (minificationOption === 'true');
			this.isMinification = minificationOption;
		}
	},
	rerender: function () {
		this.view.render();
	}
});
module.exports = PocketModule;
