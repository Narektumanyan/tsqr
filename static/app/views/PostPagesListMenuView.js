var Marionette = require('backbone.marionette');

var STATUS_ALL 	 = -1;
var STATUS_DRAFT   = 1;
var STATUS_PUBLISH = 2;
var STATUS_TRASH 	 = 3;

var PostPagesListMenuView = Marionette.ItemView.extend({
    el: '.post-page-top-menu-wp',
    template: false,
    events: {
        'click .menu-pages .all': 'menuAll',
        'click .menu-pages .draft': 'menuDraft',
        'click .menu-pages .published': 'menuPublished',
        'click .menu-pages .trashed': 'menuTrashed',

        'click .menu-pages .trash-pages': 'buttonTrash',

        'click .post-search-title': 'searchPage',

        'click .post-pages-filters .select-time-dropdown li a': 'selectTime',

        'click .menu-pages-wp .new-page a': 'newPage',
        'click #no-one-page button': 'newPage'
    },
    newPage: function(e){
        e.preventDefault();

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;
        postPagesLayoutView.model.set('pageForEdit', 0);

        VideoEssenceApp.PostPages.goToEditPage();

        return false;
    },
    modelEvents: {
        "change": "modelChanged"
    },
    switchView: function(opt){
        if (opt == 0){
            $("#no-one-page").show();

            $('.menu-pages-wp .menu-pages li a').removeClass('active');
            $('.menu-pages-wp .menu-pages li a.all').addClass('active');

            $(".menu-pages-wp").hide();
            $(".post-pages-filters").hide();
            $("#grid-view").hide();
        }
        if (opt != 0){
            $("#no-one-page").hide();
            $(".menu-pages-wp").show();
            $(".post-pages-filters").show();
            $("#grid-view").show();
        }
    },
    selectTime: function(e){
        //e.preventDefault();

        var self = $(e.target);
        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        postPagesLayoutView.model.fetch({
            method: 'POST',
            data: {
                selectDate: self.data("select-time")
            }
        });

        //return false;
    },
    searchPage: function(e){
        e.preventDefault();

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        this.$el.find('.menu-pages-wp .menu-pages li a').removeClass('active');

        postPagesLayoutView.model.fetch({
            method: 'POST',
            data: {
                search: this.$el.find('.pages-search .search-text-wp input.search-post').val()
            }
        });

        return false;
    },
    menuAll: function(e){
        e.preventDefault();

        var self = $(e.target);
        this.$el.find('.menu-pages-wp .menu-pages li a').removeClass('active');
        self.addClass('active');

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        postPagesLayoutView.model.fetch({
            method: 'POST',
            data: {
                status: STATUS_ALL
            }
        });

        return false;
    },
    menuDraft: function(e){
        e.preventDefault();

        var self = $(e.target);
        this.$el.find('.menu-pages-wp .menu-pages li a').removeClass('active');
        self.addClass('active');

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        postPagesLayoutView.model.fetch({
            method: 'POST',
            data: {
                status: STATUS_DRAFT
            }
        });

        return false;
    },
    menuPublished: function(e){
        e.preventDefault();

        var self = $(e.target);
        this.$el.find('.menu-pages-wp .menu-pages li a').removeClass('active');
        self.addClass('active');

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        postPagesLayoutView.model.fetch({
            method: 'POST',
            data: {
                status: STATUS_PUBLISH
            }
        });

        return false;
    },
    menuTrashed: function(e){
        e.preventDefault();

        var self = $(e.target);
        this.$el.find('.menu-pages-wp .menu-pages li a').removeClass('active');
        self.addClass('active');

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        postPagesLayoutView.model.fetch({
            method: 'POST',
            data: {
                status: STATUS_TRASH
            }
        });

        return false;
    },
    buttonTrash: function(e){
        e.preventDefault();

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        postPagesLayoutView.model.fetch({
            method: 'POST',
            data: {
                trash: _.pluck(
                            _.filter(postPagesLayoutView.postPagesListView.collection.models, function(page){
                                return page.attributes.checked == 1;
                            }
                        ), 'id')
            }
        });

        return false;
    },
    onRender: function(){
        //console.log("PostPagesListMenuView onRender");
    },
    initialize: function(){
        this.model = new (Backbone.Model.extend({
            defaults: {
                all: 0,
                draft: 0,
                publish: 0,
                trash: 0,
                search: ''
                //, status: -1
            }
        }))();
    },
    modelChanged: function(e){
        this.$el.find('.menu-pages-wp .all').text('All (' + this.model.get('all') + ')');
        this.$el.find('.menu-pages-wp .draft').text('Draft (' + this.model.get('draft') + ')');
        this.$el.find('.menu-pages-wp .published').text('Published (' + this.model.get('publish') + ')');
        this.$el.find('.menu-pages-wp .trashed').text('Trashed (' + this.model.get('trash') + ')');
        this.$el.find('.menu-pages-wp .search-post').val(this.model.get('search'));
    }
});
module.exports = PostPagesListMenuView;