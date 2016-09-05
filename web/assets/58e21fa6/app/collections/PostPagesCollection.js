var PostPage = require('../models/PostPage.js');
var PostPagesCollection = Backbone.Collection.extend({
    model: PostPage,
    parse: function(response) {
        return response;
    },
    url: function () {
        return '/page/index';
    }
});
module.exports = PostPagesCollection;
