var VideoModel = require('../models/Video.js');
var PocketVideosCollection = Backbone.Collection.extend({
    model: VideoModel
});
module.exports = PocketVideosCollection;
