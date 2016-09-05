var Marionette = require('backbone.marionette');

var PostCategoriesListMenuView = Marionette.ItemView.extend({
    el: '#post-cvategories-menu-all-wp',
    template: false,
    events: {
        'click .menu-categories .all': 'menuAll',
        'click .menu-categories .deleted': 'menuDeleted',
        'click .menu-categories .delete-category': 'buttonDelete',
        'click .new-category a': 'addCategoryModal',
        'click .post-search-title': 'searchCategory',

        'click #no-one-category button': 'addCategoryModal'
    },
    switchView: function(opt){
        if (opt == 0){
            $("#no-one-category").show();
            $(".menu-categories-wp").hide();
            $(".post-categories-filters").hide();
            $("#grid-view").hide();
        }
        if (opt != 0){
            $("#no-one-category").hide();
            $(".menu-categories-wp").show();
            $(".post-categories-filters").show();
            $("#grid-view").show();
        }
    },
    searchCategory: function(e){
        e.preventDefault();

        VideoEssenceApp.PostCategories.postCategoriesParams.curTab = 2;

        VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.fetch({
            remove: false,
            add: true,
            merge: false,
            data: {"post_id": 0},
            success: function(){
                var textToSearch = $(".search-post").val();

                var resultOfSearch = _.filter(
                    VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models,
                    function(el){
                        //console.log("textToSearch", textToSearch, el.attributes.label, el.attributes.label.toLowerCase().indexOf(textToSearch.toLowerCase()));

                        if (textToSearch.trim() != ""){
                            return (el.attributes.label.toLowerCase().indexOf(textToSearch.toLowerCase()) > -1) ||
                                (el.attributes.desc.toLowerCase().indexOf(textToSearch.toLowerCase()) > -1);
                        }
                        else{
                            return true;
                        }
                    }
                );
                VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.set(resultOfSearch);

                if (textToSearch.trim() == ""){
                    $(".delete-category").hide().text("Delete");

                    $(".post-categories-table input[type='checkbox']").each(function(){
                        var self = $(this);
                        self.parent().find(".my-checked-off").show();
                        self.parent().find(".my-checked-on").hide();
                        self.parent().find("input[type='checkbox']").prop("checked", false);
                    });

                    $(".menu-categories li a").removeClass("active");
                    $(".menu-categories li a.all").addClass("active");

                    //VideoEssenceApp.PostCategories.postCategoriesParams.curTab = 0;
                }
            }
        });

        return false;
    },
    addCategoryModal: function(e){
        e.preventDefault();

        _.map(VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models, function(value){
            value.attributes.activeModel = 0;
            VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.add(value);
        });

        VideoEssenceApp.PostCategoryModal = require('../views/PostCategoryModal.js');
        $('.app').html(new VideoEssenceApp.PostCategoryModal().render().el);
        return false;
    },
    menuAll: function(e){
        e.preventDefault();

        $(".delete-category").hide().text("Delete");

        $(".post-categories-table input[type='checkbox']").each(function(){
            var self = $(this);
            self.parent().find(".my-checked-off").show();
            self.parent().find(".my-checked-on").hide();
            self.parent().find("input[type='checkbox']").prop("checked", false);
        });

        var self = $(e.target);
        this.$el.find(".menu-categories li a").removeClass("active");
        self.addClass("active");

        VideoEssenceApp.PostCategories.postCategoriesParams.curTab = 0;

        //console.log("menuAllEvent", e);

        VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.fetch({
            remove: false,
            add: true,
            merge: false,
            data: {"post_id": 0}
        });


        //console.log(VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection);

        return false;
    },
    menuDeleted: function(e){
        e.preventDefault();

        $(".delete-category").hide().text("Untrash");

        $(".post-categories-table input[type='checkbox']").each(function(){
            var self = $(this);
            self.parent().find(".my-checked-off").show();
            self.parent().find(".my-checked-on").hide();
            self.parent().find("input[type='checkbox']").prop("checked", false);
        });

        var self = $(e.target);
        this.$el.find(".menu-categories li a").removeClass("active");
        self.addClass("active");

        VideoEssenceApp.PostCategories.postCategoriesParams.curTab = 1;

        console.log(VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection);

        VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.set(
            VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.where({trashed: 1})
        );

        return false;
    },
    buttonDelete: function(e){
        e.preventDefault();

        //console.log("buttonDelete", e);

        $(".post-categories-table tbody tr").each(function(i){
            var self = $(this);
            if (self.find(".category-checkbox input[type='checkbox']").prop("checked")){
                //console.log(VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models,
                //    _.filter(VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models, function(el){
                //        return el.attributes.id == self.data("key");
                //    }) // self.data("key")
                //);
                var curCat = _.filter(
                    VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models,
                    function(el){
                        return el.attributes.id == self.data("key");
                    }
                )[0];

                var trashLink = $(self.find(".cat-trash"));
                if (VideoEssenceApp.PostCategories.postCategoriesParams.curTab == 1){
                    //console.log("1", .find(".cat-trash"), trashLink.find(".cat-trash").hasClass("trashed"));
                    if (trashLink.hasClass("trashed")) {
                        trashLink.text("Trash");
                        if (curCat.attributes.trashed == 1) {
                            VideoEssenceApp.PostCategories.postCategoriesParams.trashedCount--;
                        }
                        curCat.attributes.trashed = 0;

                        VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.add(curCat);

                        VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.set(
                            VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.where({trashed: 1})
                        );
                    }
                }
                else {
                    if (!trashLink.hasClass("trashed")) {
                        trashLink.text("Untrash");
                        if (curCat.attributes.trashed == 0) {
                            VideoEssenceApp.PostCategories.postCategoriesParams.trashedCount++;
                        }
                        curCat.attributes.trashed = 1;

                        VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.add(curCat);
                    }
                }

                VideoEssenceApp.PostCategories.PostCategoriesTabView.PostCategoriesListMenuView.$el.find(".menu-categories .deleted").text(
                    "Deleted (" + VideoEssenceApp.PostCategories.postCategoriesParams.trashedCount + ")"
                );

                $.ajax({
                    url: '/post/add-category',
                    data: {
                        category: curCat.attributes.label,
                        description: curCat.attributes.desc,
                        image_id: "",
                        category_id: curCat.attributes.id,
                        trashed: curCat.get("trashed"),
                        last_modified: (new Date).toJSON()
                    },
                    dataType: 'html',
                    success: function (html) {

                        $(".post-categories-table input[type='checkbox']").each(function(){
                            var self = $(this);

                            self.parent().find(".my-checked-off").show();
                            self.parent().find(".my-checked-on").hide();
                            self.parent().find("input[type='checkbox']").prop("checked", false);

                        });

                        if (VideoEssenceApp.PostCategories.PostCategoriesTabView != undefined) {
                            VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.render();
                        }
                    },
                    error: function () {
                        alert('Some error on server');
                    }
                });
            }
        });

        $(".delete-category").hide();

        //VideoEssenceApp.beutifyCheckbox();
        //console.log($(".post-categories-table input[type='checkbox']"));

        return false;
    },
    onRender: function(){
        console.log("PostCategoriesListMenuView onRender");
    }
});
module.exports = PostCategoriesListMenuView;