'use strict';
var VideoEssenceApp = require('./app.js');

VideoEssenceApp.on('start', function() {
	var CategoryModule = require('./modules/CategoryModule.js');
	VideoEssenceApp.module("Category", CategoryModule);

	var VideoExploreModule = require('./modules/VideoExplore.js');
	VideoEssenceApp.module("VideoExplore", VideoExploreModule);

	var SearchPanelModule = require('./modules/SearchPanel.js');
	VideoEssenceApp.module("SearchPanel", SearchPanelModule);

	var FollowPanelModule = require('./modules/FollowPanel.js');
	VideoEssenceApp.module("FollowPanel", FollowPanelModule);

	var PocketModule = require('./modules/Pocket.js');
	VideoEssenceApp.module("Pocket", PocketModule);

	var SimilarKeywordModule = require('./modules/SimilarKeywordModule.js');
	VideoEssenceApp.module("SimilarKeyword", SimilarKeywordModule);

	var MediaManagerModule = require('./modules/MediaManagerModule.js');
	VideoEssenceApp.module("MediaManager", MediaManagerModule);

	var PostCreateModule = require('./modules/PostCreateModule.js');
	VideoEssenceApp.module("PostCreate", PostCreateModule);

	var PostPublishModule = require('./modules/PostPublishModule.js');
	VideoEssenceApp.module("PostPublish", PostPublishModule);

	var GalleryModule = require('./modules/GalleryModule.js');
	VideoEssenceApp.module("Gallery", GalleryModule);

    var PostCategoriesModule = require('./modules/PostCategoriesModule.js');
    VideoEssenceApp.module("PostCategories", PostCategoriesModule);

    var PostPagesModule = require('./modules/PostPagesModule.js');
    VideoEssenceApp.module("PostPages", PostPagesModule);
});

