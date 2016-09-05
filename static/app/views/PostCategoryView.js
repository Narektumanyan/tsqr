var Marionette = require('backbone.marionette');
var PostCategoryView = Marionette.ItemView.extend({
    tagName: "div",
    className: "post-category",
    template: VideoEssenceApp.templates['post-category-template'],
    events: {
        //'mouseenter .cat': 'showDeleteIcon',
        //'mouseout .cat': 'hideDeleteIcon'
        'click .delete-image': 'delCategory'
    },
    //template: false,
    //showDeleteIcon: function(){
    //
    //},
    delCategory: function(){
        this.model.destroy({url: "/post/del-category?id=" + this.model.get('id')});
    },
    initialize: function () {},
    deleteItem: function () {}
});
module.exports = PostCategoryView;