var PostCategory = require('../models/PostCategory.js');
var PostCategoriesCollection = Backbone.Collection.extend({
    model: PostCategory,
    parse: function(response) {
        return response;
    },
    url: function () {
        return '/post/get-categories';
    }
});
module.exports = PostCategoriesCollection;
