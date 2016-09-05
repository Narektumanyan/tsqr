var Marionette = require('backbone.marionette');
var ModalHandelbars = require('./ModalHandlebars.js');

var LinkPostsView = require('./LinkPostsView.js');
var LinkPosts = require('../collections/LinkPosts.js');
var LinkRelatedPostsView =  require('./LinkRelatedPostsView.js');

var RelatedModal = ModalHandelbars.extend({
    model: new Backbone.Model({
        listType: 'all'
    }),
    template:  VideoEssenceApp.templates['modal-template-post-categories'],
    cancelEl: '.bbm-button, .post-category-add-close',
    events: {
        "click #post-search" : "search",
        'keyup .search-post': 'searchFromInput',
        "click .post-btn" : "addRelations",
        "click .post-category-add-create" : "addPostCategoryWP",
        'keyup #category-name': 'nameCategory',
        "click .all-posts" : "showAll",
        "click .related-posts" : "showRelated",
        'click .change-barge': "bargeImage"
    },
    templateHelpers: function () {
        return {
            onlyupload: false
        };
    },
    onClose: function(){
        _.map(VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models, function(value){
            value.attributes.activeModel = 0;
            VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.add(value);
        });
    },
    addPostCategoryWP: function(e){
        e.preventDefault();
        this.addPostCategory();
        return false;
    },
    addPostCategory: function(opt){
        var catName = $(this.$el.find("#category-name"));
        var catDesc = $(this.$el.find("#category-desc"));
        var catImg = $(this.$el.find("#category-image"));
        var catBarge = $(this.$el.find("#category-image"));
        var catParent = $(this.$el.find("#category-parent"));

        //if (catName.val().trim() != '' ) {
            $.ajax({
                url: '/post/add-category',
                data: {
                    category: catName.val(),
                    description: catDesc.val(),
                    image_id: catImg.val(),
                    parent_id: catParent.val(),
                    image_url: catBarge.val(),
                    last_modified: (new Date).toJSON(),
                    opt: opt,
                    category_id: (
                        this.curCategory != undefined &&
                        this.curCategory.attributes != undefined &&
                        this.curCategory.attributes.id != undefined
                    ) ? this.curCategory.attributes.id : 0
                },
                dataType: 'html',
                success: function (resp) {
                    console.log("success addPostCategory", resp);

                    //VideoEssenceApp.curCategoryId =  resp;


                    if (VideoEssenceApp.PostCategories.PostCategoriesTabView != undefined) {
                        VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.fetch({
                            remove: false,
                            add: true,
                            merge: true,
                            data: {post_id: 0},
                            success: function () {
                                //console.log("collection", VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models);

                                var curCat = _.filter(VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models, function (el) {
                                    return el.id == resp;
                                })[0];

                                curCat.attributes.activeModel = 1;

                                if (curCat.attributes.image_url != undefined) {
                                    curCat.attributes.barge = curCat.attributes.image_url;
                                }

                                //console.log("curCat !@#!@#", curCat);

                                VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.add(curCat);

                                //console.log("curCat", VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection);

                                if (opt != undefined && opt == "barge") {
                                    var PostCategoriesBargeImage = require('../views/PostCategoriesBargeImage.js');
                                    $('.app').html(new PostCategoriesBargeImage().render().el);
                                }

                                if (VideoEssenceApp.PostCategories.PostCategoriesTabView != undefined) {
                                    VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.render();
                                }
                            }
                        });
                    }

                    if (VideoEssenceApp.PostPublish.publishView != undefined) {

                        VideoEssenceApp.PostPublish.publishView.categories.fetch({
                                //remove: false,
                                add: true,
                                merge: true,
                                data: {post_id: 0},
                                success: function () {
                                    var curCat = _.filter(VideoEssenceApp.PostPublish.publishView.categories.models, function (el) {
                                        return el.id == resp;
                                    })[0];

                                    console.log('models', VideoEssenceApp.PostPublish.publishView.categories.models);
                                    console.log('curCat', curCat);

                                    curCat.attributes.activeModel = 1;

                                    if (curCat.attributes.image_url != undefined) {
                                        curCat.attributes.barge = curCat.attributes.image_url;
                                    }

                                    console.log('categories0', VideoEssenceApp.PostPublish.publishView.categories);

                                    VideoEssenceApp.PostPublish.publishView.categories.add(curCat);

                                    console.log('categories1', VideoEssenceApp.PostPublish.publishView.categories);

                                    if (opt != undefined && opt == "barge") {
                                        var PostCategoriesBargeImage = require('../views/PostCategoriesBargeImage.js');
                                        $('.app').html(new PostCategoriesBargeImage().render().el);
                                    }

                                    VideoEssenceApp.PostPublish.publishView.postCategoriesView.render();
                                }
                        });
                    }
                },
                error: function () {
                    alert('Some error on server');
                }
            });
        //}

        if (VideoEssenceApp.PostCategories.PostCategoriesTabView != undefined) {
            _.map(VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models, function (value) {
                if (value.attributes.activeModel == 1) {
                    value.attributes.label = catName.val();
                    value.attributes.desc = catDesc.val();
                    value.attributes.parent_id = catParent.val();
                    //value.attributes.label = catImg.val();
                }
                value.attributes.activeModel = 0;
                VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.add(value);
            });
        }

        if (opt == undefined || opt != "barge")
            this.triggerCancel();

        return false;
    },
    bargeImage: function(e){
        e.preventDefault();

        this.addPostCategory("barge");

        console.log("barge");

        //VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection

        return false;
    },
    nameCategory : function(e){
        //console.log("this.region", e.target, e.keyCode == 13 && $(e.target).val()!='', $(e.target).val());
        //console.log("testCategoryKeyUp", this);
        var input = this.$el.find("#category-name");
        var firstLetter = this.$el.find(".category-img-wp .first-letter");
        var $input = $(input);

        if(e.keyCode != 13 && $input.val()!='' && ($("#category-barge").val() == '' || $("#category-image").val() == ''))
        {
            $(firstLetter).text($input.val().toString()[0].toUpperCase());

        }
    },
    beforeCancel: function(e){},
    beforeSubmit: function(){
        this.model.set('headline', $("#headline").text());
        $('input[name=related_headline]').val($("#headline").text());
    },
    showAll: function() {
        this.model.set({
            listType: 'all',
            keyword: ''
        });
        this.render();
        VideoEssenceApp.linkPostsView = new LinkPostsView({
            collection: VideoEssenceApp.PostPublish.linkPostsCollection
        });

        VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);
    },
    showRelated: function() {
        this.model.set({
            listType: 'related',
            keyword: ''
        });
        this.render();
        VideoEssenceApp.linkPostsView = new LinkRelatedPostsView({
            collection:
                new LinkPosts(VideoEssenceApp.PostPublish.linkPostsCollection.where({linked: true}))
        });
        VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);
    },

    onRender: function(){

        //console.log("VideoEssenceApp.catBarge", VideoEssenceApp.catBarge);
        //
        //if (VideoEssenceApp.catBarge != undefined){
        //    $("#category-image").val(VideoEssenceApp.catBarge);
        //    this.model.bargeImg = VideoEssenceApp.catBarge;
        //    console.log("this.model.bargeImg", this.model.bargeImg)
        //    //this.render();
        //}

        //console.log("onRender option", option, this.model);
        //console.log("RelatedModal activeModel", VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.where({activeModel: 1}));
        //
        //this.curCategory = VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.where({activeModel: 1})[0];
        //console.log("this.curCategory", this.curCategory, this.curCategory.attributes.label, this.curCategory.attributes.desc);
        //if (this.curCategory.length > 0){
        //    console.log(this.$el);
        //    $(this.$el.find("#category-name")).val(this.curCategory.attributes.label);
        //    $(this.$el.find("#category-desc")).text(this.curCategory.attributes.desc);
        //}
    },
    onShow : function(){
        //console.log("onShow");

        if (this.$el.find('.post-container').length > 0) {

            VideoEssenceApp.linkPostsRegion = new Marionette.Region({
                el: this.$el.find('.post-container')
            });
            VideoEssenceApp.linkPostsView = new LinkPostsView({
                collection: VideoEssenceApp.PostPublish.linkPostsCollection
            });

            VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);

            $("#headline").keypress(function (e) {
                return e.which != 13;
            });
        }

        //.fetch({
        //    remove: false,
        //    add: true,
        //    merge: false,
        //    data: {"post_id": window.post_id}
        //});

        //console.log('PostPublish', VideoEssenceApp.PostPublish.publishView.categories);

        if (VideoEssenceApp.PostPublish.publishView != undefined){
            this.curCategory =
                VideoEssenceApp.PostPublish.publishView.categories
                    .where({activeModel: 1})[0]
            ;

            VideoEssenceApp.PostPublish.publishView.categories.add({
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
                radio: false,
                trashed: 0
            });

            this.parentCategories =_.filter(
                VideoEssenceApp.PostPublish.publishView.categories.models,
                function(el){
                    return el.attributes.activeModel == undefined || el.attributes.activeModel == 0;
                }
            );

            var parent_id = (this.curCategory != undefined) ? this.curCategory.attributes.parent_id : 0;

            var parentCategories = "";
            if (this.parentCategories.length > 0){
                parentCategories = _.reduce(
                    _.map(
                        this.parentCategories,
                        function(el){
                            var selected = "";
                            if (parent_id == el.attributes.id ){
                                selected = "selected='true'";
                            }

                            return "<option value='"+ el.attributes.id +"' " + selected + " >" + el.attributes.label + "</option>"
                        }
                    ),
                    function(el1, el2){
                        return el1 + el2
                    }
                );
            }

            $(this.$el.find("#category-parent")).html(
                /*"<option value='0'></option>" + */ parentCategories
            );

            if (this.curCategory != undefined) {
                $(this.$el.find("#category-name")).val(this.curCategory.attributes.label);
                $(this.$el.find("#category-desc")).text(this.curCategory.attributes.desc);
                $(this.$el.find("#category-parent")).select(this.curCategory.attributes.parent_id);
                $(this.$el.find(".first-letter")).text(this.curCategory.attributes.label.substring(0, 1).toUpperCase());

                if (this.curCategory.attributes.barge != undefined && this.curCategory.attributes.barge != 0) {
                    $(this.$el.find(".category-img-wp .first-letter"))
                        //.attr("style", "background: url('" + this.curCategory.attributes.image_url + "') 0 0 no-repeat;")
                        .attr("style", "")
                        .text("")
                        .html("<img width='30' height='30' src='" + this.curCategory.attributes.barge + "' />")
                    ;
                    $(this.$el.find("#category-image")).val(this.curCategory.attributes.barge);
                    $(this.$el.find("#category-barge")).val(this.curCategory.attributes.barge);
                }
                if (this.curCategory.attributes.image_url != undefined && this.curCategory.attributes.image_url != 0) {
                    $(this.$el.find(".category-img-wp .first-letter"))
                        //.attr("style", "background: url('" + this.curCategory.attributes.image_url + "') 0 0 no-repeat;")
                        .attr("style", "")
                        .text("")
                        .html("<img width='30' height='30' src='" + this.curCategory.attributes.image_url + "' />")
                    ;
                    $(this.$el.find("#category-image")).val(this.curCategory.attributes.image_url);
                    $(this.$el.find("#category-barge")).val(this.curCategory.attributes.image_url);
                    this.curCategory.barge = this.curCategory.attributes.image_url;
                    VideoEssenceApp.PostPublish.publishView.categories.add(this.curCategory);
                }

            }
        }

        if (VideoEssenceApp.PostCategories.PostCategoriesTabView != undefined) {
            //console.log("!@#", VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection);
            this.curCategory =
                VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection
                .where({activeModel: 1})[0]
            ;

            this.parentCategories =_.filter(
                VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models,
                function(el){
                    return el.attributes.activeModel == undefined || el.attributes.activeModel == 0;
                }
            );

            var parent_id = (this.curCategory != undefined) ? this.curCategory.attributes.parent_id : 0;

            var parentCategories = "";
            if (this.parentCategories.length > 0){
                parentCategories = _.reduce(
                    _.map(
                        this.parentCategories,
                        function(el){
                            var selected = "";
                            if (parent_id == el.attributes.id ){
                                selected = "selected='true'";
                            }

                            return "<option value='"+ el.attributes.id +"' " + selected + " >" + el.attributes.label + "</option>"
                        }
                    ),
                    function(el1, el2){
                        return el1 + el2
                    }
                );
            }

            $(this.$el.find("#category-parent")).html(
                /*"<option value='0'></option>" + */ parentCategories
            );

            if (this.curCategory != undefined) {
                $(this.$el.find("#category-name")).val(this.curCategory.attributes.label);
                $(this.$el.find("#category-desc")).text(this.curCategory.attributes.desc);
                $(this.$el.find("#category-parent")).select(this.curCategory.attributes.parent_id);
                $(this.$el.find(".first-letter")).text(this.curCategory.attributes.label.substring(0, 1).toUpperCase());

                if (this.curCategory.attributes.barge != undefined && this.curCategory.attributes.barge != 0) {
                    $(this.$el.find(".category-img-wp .first-letter"))
                        //.attr("style", "background: url('" + this.curCategory.attributes.image_url + "') 0 0 no-repeat;")
                        .attr("style", "")
                        .text("")
                        .html("<img width='30' height='30' src='" + this.curCategory.attributes.barge + "' />")
                    ;
                    $(this.$el.find("#category-image")).val(this.curCategory.attributes.barge);
                    $(this.$el.find("#category-barge")).val(this.curCategory.attributes.barge);
                }
                if (this.curCategory.attributes.image_url != undefined && this.curCategory.attributes.image_url != 0) {
                    $(this.$el.find(".category-img-wp .first-letter"))
                        //.attr("style", "background: url('" + this.curCategory.attributes.image_url + "') 0 0 no-repeat;")
                        .attr("style", "")
                        .text("")
                        .html("<img width='30' height='30' src='" + this.curCategory.attributes.image_url + "' />")
                    ;
                    $(this.$el.find("#category-image")).val(this.curCategory.attributes.image_url);
                    $(this.$el.find("#category-barge")).val(this.curCategory.attributes.image_url);
                    this.curCategory.barge = this.curCategory.attributes.image_url;
                    VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.add(this.curCategory);
                }

            }
        }

        $('.selectpicker').selectpicker({
            style: 'btn-info',
            size: 4 //,
            //showIcon: false
            //showContent: false
        });
    },
    searchFromInput: function(event) {
        if(event.keyCode == 13){
            this.search();
        }
    },
    search: function(){
        var keyword = this.$(".search-post").val();
        this.model.set({
            listType: 'all',
            keyword: keyword
        });
        this.render();
        findResult = new Backbone.Collection();
        VideoEssenceApp.PostPublish.linkPostsCollection.each(function(post) {
            postTitle = post.get('title');
            if(postTitle.indexOf(keyword) > -1){
                findResult.add(post);
            }
        });
        VideoEssenceApp.linkPostsView = new LinkPostsView({
            collection: findResult
        });

        VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);

    },
    addRelations:function(){
        this.model.set('listType', 'all');
        $(this.el).hide();
    }
});
module.exports = RelatedModal;