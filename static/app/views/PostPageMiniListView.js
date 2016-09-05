var Marionette = require('backbone.marionette');

var PostPageMiniListView = Marionette.ItemView.extend({
    tagName: "li",
    template: VideoEssenceApp.templates['post-page-mini-list-template'],
    activeModel: ""
});
module.exports = PostPageMiniListView;