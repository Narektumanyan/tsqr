var Marionette = require('backbone.marionette'),
    PostCategoriesCollection = require('../collections/PostCategoriesCollection.js'),
    PostCategoriesListView = require('../views/PostCategoriesListView.js'),
    PostCategoriesListMenuView = require('../views/PostCategoriesListMenuView.js');

var PostCategoriesTabView = Marionette.LayoutView.extend({
    tagName: "div",
    className: "PostCategoriesTabView",
    template: VideoEssenceApp.templates['post-categories-list-template'],
    regions: {
      "categories": ".post-categories-table",
      "menu": ".menu-categories-wp",
      "test": ".test-backgrid-view"
    },
    onShow: function(){
        this.categories = new PostCategoriesCollection();

        this.categories.on("sync", function(resp){
            if (VideoEssenceApp.PostCategories.postCategoriesParams.curTab != 1 &&
                VideoEssenceApp.PostCategories.postCategoriesParams.curTab != 2)
                VideoEssenceApp.PostCategories.PostCategoriesTabView.PostCategoriesListMenuView.switchView(resp.length);

            VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.add({
                barge: 0,
                checkbox: true,
                checked: false,
                desc: "",
                id: 0,
                inode: false,
                label: 'Uncategorized',
                last_modified: new Date(),
                open: false,
                parent: 'None',
                parent_id: -1,
                posts_count: VideoEssenceApp.PostCategories.uncategorisedPostsCount,
                radio: false,
                trashed: 0
            });

            VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.sort(['id']);


        });

        this.categories.fetch({
            remove: false,
            add: true,
            merge: false,
            data: {post_id : 0}
        });


        //console.log("PostCategoriesTabView onShow", this.categories);

        this.postCategoriesListView = new PostCategoriesListView({
            collection: this.categories
        });

        //console.log(this.regions)

        this.getRegion('categories').show(this.postCategoriesListView );

        this.listCategoriesTHead = '<thead>' +
        '<tr class="first">' +
        '<th class="header-categories-checkbox">' +
        '<input type="checkbox" class="select-on-check-all" name="selection_all" value="-2">'  +
        '</th>' +
        '<th class="header-categories-name">Name</th>' +
        '<th class="header-categories-description">Description</th>' +
        '<th class="header-categories-barge">Barge</th>' +
        '<th class="header-categories-parent">Parent category</th>' +
        '<th class="header-categories-posts-count">Post count</th>' +
        '</tr>' +
        '</thead>';

        this.$el.find("table").prepend(this.listCategoriesTHead);

        VideoEssenceApp.beutifyCheckbox();

        //if (this.postCategoriesListView.collection)
        //
        //    this.postCategoriesListView

        this.PostCategoriesListMenuView = new PostCategoriesListMenuView();
        this.PostCategoriesListMenuView.render();

        $(VideoEssenceApp.PostCategories.PostCategoriesTabView.PostCategoriesListMenuView.$el.find(".menu-categories .all"))
            .text("All ("+VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models.length+")")

        //console.log("this.PostCategoriesListMenuView", this.postCategoriesListView.collection.length);
    }
});
module.exports = PostCategoriesTabView;