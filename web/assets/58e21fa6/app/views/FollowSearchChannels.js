var Marionette = require('backbone.marionette');
var FollowSearchChannel = require('./FollowSearchChannel.js');
FollowSearchChannels = Marionette.CollectionView.extend({
	childView: FollowSearchChannel
});
