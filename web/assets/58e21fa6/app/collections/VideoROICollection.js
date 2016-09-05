var VideoROI = require('../models/VideoROI.js');
var VideoROICollection = Backbone.Collection.extend({
	model: VideoROI
});
module.exports = VideoROICollection;