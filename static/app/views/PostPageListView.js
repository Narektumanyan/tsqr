var Marionette = require('backbone.marionette');

var askStatus = {
    all: -1,
    draft: 1,
    publish: 2,
    trash: 3
};

var PostPageListView = Marionette.ItemView.extend({
    tagName: "tr",
    //className: "page",
    attributes: {},
    template: VideoEssenceApp.templates['post-page-list-template'],
    activeModel: "",
    events: {
        'click .page-edit': 'pageEdit',
        'click .page-view': 'pageView',

        'click .page-publish': 'pagePublish',
        'click .page-draft': 'pageDraft',
        'click .page-trash': 'pageTrash',
        'click .page-restore': 'pageRestore',
        'click .page-delete': 'pageDelete',

        'click .pages-checkbox span': 'changeCheckbox'

    },
    modelEvents: {
        "change": "modelChanged"
    },
    modelChanged: function(){
        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        var checkedPages = _.filter(postPagesLayoutView.postPagesListView.collection.models, function(page){
            return page.attributes.checked == 1
        });

        if (checkedPages.length > 0){
            postPagesLayoutView.$el.find('.menu-pages .trash-pages').css('display', 'inline-block');
        }else{
            postPagesLayoutView.$el.find('.menu-pages .trash-pages').css('display', 'none');
        }
        //console.log('checkedPages', checkedPages, checkedPages.length);
    },

    pageView: function(e){
        e.preventDefault();

        var self = $(e.target);

        //console.log('pageView', this.model.get('id'));

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;
        postPagesLayoutView.model.set('pageForView', 1);
        postPagesLayoutView.model.set('pageForEdit', this.model.get('id'));

        VideoEssenceApp.PostPages.goToEditPage();

        return false;
    },
    pageEdit: function(e){
        e.preventDefault();
        var self = $(e.target);

        //console.log('pageEdit', this.model.get('id'));

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;
        postPagesLayoutView.model.set('pageForEdit', this.model.get('id'));

        VideoEssenceApp.PostPages.goToEditPage();

        return false;
    },
    changeCheckbox: function(e){
        var self = $(e.target);
        var headerCheckbox = $(".post-pages-table .header-pages-checkbox");

        if (self.hasClass('my-checked-on')){
            self.parent().find(".my-checked-off").show();
            self.parent().find(".my-checked-on").hide();
            self.parent().find("input[type='checkbox']").prop("checked", false);

            headerCheckbox.find(".my-checked-off").show();
            headerCheckbox.find(".my-checked-on").hide();
            headerCheckbox.find("input[type='checkbox']").prop("checked", false);

            this.model.set('checked', 0)
        }
        if (self.hasClass('my-checked-off')){
            self.parent().find(".my-checked-off").hide();
            self.parent().find(".my-checked-on").show();
            self.parent().find("input[type='checkbox']").prop("checked", true);

            this.model.set('checked', 1)
        }
    },

    pagePublish: function(e){
        e.preventDefault();
        var self = $(e.target);

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        var tabaction = postPagesLayoutView.PostPagesListMenuView
            .$el.find('.menu-pages-wp .menu-pages li a.active')
            .data('tabaction')
        ;

        postPagesLayoutView.model.fetch({
            method: 'POST',
            data: {
                publish: [ self.data('id') ],
                status: askStatus[tabaction]
            }
        });

        return false;
    },

    pageDraft: function(e){
        e.preventDefault();
        var self = $(e.target);

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        var tabaction = postPagesLayoutView.PostPagesListMenuView
            .$el.find('.menu-pages-wp .menu-pages li a.active')
            .data('tabaction')
        ;

        postPagesLayoutView.model.fetch({
            method: 'POST',
            data: {
                draft: [ self.data('id') ],
                status: askStatus[tabaction]
            }
        });

        return false;
    },

    pageTrash: function(e){
        e.preventDefault();
        var self = $(e.target);

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        var tabaction = postPagesLayoutView.PostPagesListMenuView
                .$el.find('.menu-pages-wp .menu-pages li a.active')
                .data('tabaction')
            ;

        postPagesLayoutView.model.fetch({
            method: 'POST',
            data: {
                trash: [ self.data('id') ],
                status: askStatus[tabaction]
            }
        });

        return false;
    },

    pageRestore: function(e){
        e.preventDefault();
        var self = $(e.target);

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        var tabaction = postPagesLayoutView.PostPagesListMenuView
                .$el.find('.menu-pages-wp .menu-pages li a.active')
                .data('tabaction')
            ;

        postPagesLayoutView.model.fetch({
            method: 'POST',
            data: {
                restore: [ self.data('id') ],
                status: askStatus[tabaction]
            }
        });

        return false;
    },

    pageDelete: function(e){
        e.preventDefault();
        var self = $(e.target);

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        var tabaction = postPagesLayoutView.PostPagesListMenuView
                .$el.find('.menu-pages-wp .menu-pages li a.active')
                .data('tabaction')
            ;

        postPagesLayoutView.model.fetch({
            method: 'POST',
            data: {
                delete: [ self.data('id') ],
                status: askStatus[tabaction]
            }
        });

        return false;
    },

    catShowLinkedPosts: function(e){
        e.preventDefault();

        return false;
    },
    onRender: function(){
        this.$el.attr("data-key", this.model.id);

        //console.log("onRender this.model", this.model);
        //VideoEssenceApp.beutifyCheckbox();
    },
    onShow: function(){
        //VideoEssenceApp.beutifyCheckbox();
    },
    //delPage: function(){
    //    this.model.destroy({url: "/post/del-page?id=" + this.model.get('id')});
    //},
    initialize: function () {
        //console.log('PostPageListView initialize', this.model.attributes);
    },
    deleteItem: function () {}
});
module.exports = PostPageListView;