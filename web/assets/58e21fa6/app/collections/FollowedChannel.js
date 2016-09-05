var Channel = require('../models/Channel.js');
var FollowedChannelCollection = Backbone.Collection.extend({
    model: Channel,
    channelProcess: function(isFollowed, data){
        var channel = new Channel();
        channel.set(data);

        if (isFollowed) {
            this.remove(channel);
        } else {
            this.add(channel);
        }
    }
});
module.exports = FollowedChannelCollection;
