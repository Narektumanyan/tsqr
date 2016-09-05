var Marionette = require('backbone.marionette'),
    PostCategoriesCollection = require('../collections/PostCategoriesCollection.js'),
    PostCategoryListView = require('./PostCategoryListView.js');

var PostCategoriesListView = Marionette.CollectionView.extend({
    tagName: "tbody",
    //className: "PostCategoriesListView",
    childView: PostCategoryListView,
    onStart: function(){},
    onRender: function(){
        this.collection.comparator = 'id';

        this.collection.fetch({
            remove: false,
            add: true,
            merge: false,
            data: {"post_id": 0},
            success: function(resp){
                //console.log("resp", resp);
                //VideoEssenceApp.PostCategories.postCategoriesParams.trashedCount++;
                VideoEssenceApp.PostCategories.postCategoriesParams.allCount = resp.length;

                VideoEssenceApp.PostCategories.PostCategoriesTabView.PostCategoriesListMenuView.$el.find(".menu-categories .all").text("All ("+resp.length+")");

                var res = _.filter(resp.models, function(el){
                    return (el.attributes.trashed == true || el.attributes.trashed == 1)
                });

                VideoEssenceApp.PostCategories.postCategoriesParams.trashedCount = res.length

                VideoEssenceApp.PostCategories.PostCategoriesTabView.PostCategoriesListMenuView.$el.find(".menu-categories .deleted").text(
                    "Deleted (" + VideoEssenceApp.PostCategories.postCategoriesParams.trashedCount + ")"
                );

                if (VideoEssenceApp.PostCategories.postCategoriesParams.curTab == 1){
                    VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.set(
                        VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.where({trashed: 1})
                    ,{ ignore: 1 }
                    );
                }
            }
        });
        //console.log(VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection);
        //console.log("PostCategoriesListView this.collection", this.collection);
    }
});
module.exports = PostCategoriesListView;