var Marionette = require('backbone.marionette');
var PostCategoryView = require('./PostCategoryView.js');
var PostCategoriesView = Marionette.CollectionView.extend({
    tagName: "div",
    className: "post-categories-wrapper",
    childView: PostCategoryView,
    onRender: function(){
        //console.log("PostCategoriesView rendered");
        //console.log("PostCategoriesView collection", this.collection);
        this.collection.fetch({
            remove: false,
            add: true,
            merge: false,
            data: {"post_id": window.post_id}
        });
    }
});
module.exports = PostCategoriesView;

