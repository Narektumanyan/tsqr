var Marionette = require('backbone.marionette');
var PostCategoryView = Marionette.ItemView.extend({
    tagName: "tr",
    //className: "category",
    attributes: {},
    template: VideoEssenceApp.templates['post-category-list-template'],
    activeModel: "",
    events: {

        'click .cat-edit': 'catEdit',
        'click .cat-trash': 'catTrash',
        'click .cat-view': 'catShowLinkedPosts'
    },

    catEdit: function(e){
        e.preventDefault();

        //console.log(VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models);

        _.map(VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models, function(value){
            value.attributes.activeModel = 0;
            VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.add(value);
        });

        this.model.set("activeModel", 1);

        //console.log(VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models);

        //this.activeModel = this.$el.data("key");

        //VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView

        VideoEssenceApp.PostCategoryModal = require('../views/PostCategoryModal.js');
        $('.app').html(new VideoEssenceApp.PostCategoryModal().render().el);

        return false;
    },
    catTrash: function(e){
        e.preventDefault();

        var self = $(e.target);
        if (!self.hasClass("trashed")) {
            self.text("Untrash");
            this.model.set("trashed", 1);

            VideoEssenceApp.PostCategories.postCategoriesParams.trashedCount++;
        }
        else{
            self.text("Trash");
            this.model.set("trashed", 0);

            VideoEssenceApp.PostCategories.postCategoriesParams.trashedCount--;
        }

        VideoEssenceApp.PostCategories.PostCategoriesTabView.PostCategoriesListMenuView.$el.find(".menu-categories .deleted").text(
            "Deleted (" + VideoEssenceApp.PostCategories.postCategoriesParams.trashedCount + ")"
        );

        $.ajax({
            url: '/post/add-category',
            //method: "POST",
            data: {
                category: this.model.attributes.label,
                description: this.model.attributes.desc,
                image_id: "",
                category_id: this.model.attributes.id,
                trashed: this.model.get("trashed"),
                last_modified: (new Date).toJSON()
            },
            dataType: 'html',
            success: function (html) {
                if (VideoEssenceApp.PostCategories.PostCategoriesTabView != undefined) {
                    VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.render();
                }
            },
            error: function () {
                alert('Some error on server');
            }
        });

        return false;
    },
    catShowLinkedPosts: function(e){
        e.preventDefault();

        //console.log("catShowLinkedPosts", this);

        if (this.model.attributes.id != -1) {
            window.location = "/post/index?PostSearch%5BselectDate%5D=All+time&PostSearch%5Btitle%5D=&PostSearch%5Bcategory%5D=" +
            encodeURIComponent(this.model.attributes.label);
        }
        else{
            window.location = "/post/index?PostSearch%5BselectDate%5D=All+time&PostSearch%5Btitle%5D=&PostSearch%5Bcategory%5D=-1";
        }


        return false;
    },
    onRender: function(){
        this.$el.attr("data-key", this.model.id);

        //console.log("onRender this.model", this.model);

        VideoEssenceApp.beutifyCheckbox();
    },
    onShow: function(){
        VideoEssenceApp.beutifyCheckbox();
    },
    //delCategory: function(){
    //    this.model.destroy({url: "/post/del-category?id=" + this.model.get('id')});
    //},
    initialize: function () {},
    deleteItem: function () {}
});
module.exports = PostCategoryView;