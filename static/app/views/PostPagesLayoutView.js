var Marionette = require('backbone.marionette'),
    PostPagesListMenuView = require('../views/PostPagesListMenuView.js')
    ;

var PostPagesLayoutView = Marionette.LayoutView.extend({
    el: '.post-pages',
    template: false,

    regions: {
        "pages": ".pages-grid-view",
        "menu": ".menu-pages-wp"
    },

    onShow: function(){

        this.model = new (Backbone.Model.extend({
            defaults: {},
            parse: function(response) {
                return response;
            },
            url: function () {
                return '/page/index';
            }
        }))();

        this.model.fetch({
            method: 'POST',
            remove: false,
            add: true,
            merge: false,
            data: {}
        });

        this.PostPagesListMenuView = new PostPagesListMenuView();

        this.model.on('sync', function(resp){

            // todo учесть пагинацию
            var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView,
                PostPagesListView = require('../views/PostPagesListView.js'),
                PostPagesCollection = require('../collections/PostPagesCollection.js');

            postPagesLayoutView.postPagesListView = new PostPagesListView({
                collection: new PostPagesCollection()
            });

            if ( resp.get('allCount') > 0 ){
                var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;
                postPagesLayoutView.PostPagesListMenuView.switchView(1);
            }

            if ( resp.get('allCount') == 0 ){
                var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;
                postPagesLayoutView.PostPagesListMenuView.switchView(0);
            }

            postPagesLayoutView.postPagesListView.collection.add(resp.get('pages'));

            //console.log('collection', postPagesLayoutView.postPagesListView.collection, resp.get('pages'))

            postPagesLayoutView.getRegion('pages').show(
                postPagesLayoutView.postPagesListView
            );

            postPagesLayoutView.listPagesTHead =
                '<thead>'+
                '<tr class="first">'+
                '<th class="header-pages-checkbox">'+
                '<input type="checkbox" class="select-on-check-all" name="selection_all" value="-2"><span class="my-checked-on fa fa-check-square" style="display: none;"></span><span class="my-checked-off fa fa-square-o" style="display: inline-block;"></span></th>'+
                '<th class="header-pages-title">Title</th>'+
                '<th class="header-pages-author">Author</th>'+
                '<th class="header-pages-comments">Comments</th>'+
                '<th class="header-pages-created">Created</th>'+
                '</tr>'+
                '</thead>'
            ;
            postPagesLayoutView.$el.find(".pages-grid-view").prepend(postPagesLayoutView.listPagesTHead);

            postPagesLayoutView.$el.find('.post-pages-table .header-pages-checkbox span').on('click', function(e){
                var self = $(e.target);
                var groupCheckbox = $(".post-pages-table .pages-checkbox");

                if (self.hasClass("my-checked-on")) {
                    self.parent().find(".my-checked-off").show();
                    self.parent().find(".my-checked-on").hide();
                    self.parent().find("input[type='checkbox']").prop("checked", false);

                    groupCheckbox.find(".my-checked-off").show();
                    groupCheckbox.find(".my-checked-on").hide();
                    groupCheckbox.find("input[type='checkbox']").prop("checked", false);

                    _.each(postPagesLayoutView.postPagesListView.collection.models, function(page){
                        page.attributes.checked = 0;
                    });

                    postPagesLayoutView.$el.find('.menu-pages .trash-pages').css('display', 'none');

                    //postPagesLayoutView.postPagesListView.collection.set(postPagesLayoutView.postPagesListView.collection.models);

                    //console.log(postPagesLayoutView.postPagesListView.collection.models, postPagesLayoutView.postPagesListView.collection);
                }
                if (self.hasClass("my-checked-off")) {
                    self.parent().find(".my-checked-off").hide();
                    self.parent().find(".my-checked-on").show();
                    self.parent().find("input[type='checkbox']").prop("checked", true);

                    groupCheckbox.find(".my-checked-off").hide();
                    groupCheckbox.find(".my-checked-on").show();
                    groupCheckbox.find("input[type='checkbox']").prop("checked", true);

                    _.each(postPagesLayoutView.postPagesListView.collection.models, function(page){
                        page.attributes.checked = 1;
                    });

                    postPagesLayoutView.$el.find('.menu-pages .trash-pages').css('display', 'inline-block');

                    //console.log(postPagesLayoutView.postPagesListView.collection.models, postPagesLayoutView.postPagesListView.collection);
                }
            });

            postPagesLayoutView.$el.find('.post-pages-table .header-pages-title').on('click', function(e){
                var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

                var title = $(postPagesLayoutView.$el.find('.post-pages-table .header-pages-title'));

                if (title.find('i').length == 0){
                    postPagesLayoutView.$el.find('.post-pages-table .header-pages-title').parent().find('.fa-caret-up, .fa-caret-down').remove();
                    title.append('<i class="fa fa-caret-up"></i>');
                    postPagesLayoutView.postPagesListView.collection.comparator = 'title';
                    postPagesLayoutView.postPagesListView.collection.sort();
                } else if(title.find('i.fa-caret-up').length > 0){
                    title.find('i').remove();
                    postPagesLayoutView.$el.find('.post-pages-table .header-pages-title').parent().find('.fa-caret-up, .fa-caret-down').remove();
                    title.append('<i class="fa fa-caret-down"></i>');

                    postPagesLayoutView.postPagesListView.collection.comparator = function(a, b){
                        return -(a.get('title').localeCompare(b.get('title')));
                    };
                    postPagesLayoutView.postPagesListView.collection.sort();

                } else if(title.find('i.fa-caret-down').length > 0){
                    title.find('i').remove();

                    postPagesLayoutView.postPagesListView.collection.comparator = 'order';
                    postPagesLayoutView.postPagesListView.collection.sort();
                }

            });

            postPagesLayoutView.$el.find('.post-pages-table .header-pages-author').on('click', function(e){
                var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

                var author = $(postPagesLayoutView.$el.find('.post-pages-table .header-pages-author'));

                if (author.find('i').length == 0){
                    postPagesLayoutView.$el.find('.post-pages-table .header-pages-title').parent().find('.fa-caret-up, .fa-caret-down').remove();
                    author.append('<i class="fa fa-caret-up"></i>');
                    postPagesLayoutView.postPagesListView.collection.comparator = function(a, b){
                        //console.log(a.get('author'));
                        var c = a.get('author').name.toString()[0].toUpperCase() + a.get('author').lastname.toString()[0].toUpperCase();
                        var d = b.get('author').name.toString()[0].toUpperCase() + b.get('author').lastname.toString()[0].toUpperCase();
                        return c.localeCompare(d);
                    };
                    postPagesLayoutView.postPagesListView.collection.sort();
                } else if(author.find('i.fa-caret-up').length > 0){
                    author.find('i').remove();
                    postPagesLayoutView.$el.find('.post-pages-table .header-pages-title').parent().find('.fa-caret-up, .fa-caret-down').remove();
                    author.append('<i class="fa fa-caret-down"></i>');

                    postPagesLayoutView.postPagesListView.collection.comparator = function(a, b){
                        //console.log(a.get('author'));
                        var c = a.get('author').name.toString()[0].toUpperCase() + a.get('author').lastname.toString()[0].toUpperCase();
                        var d = b.get('author').name.toString()[0].toUpperCase() + b.get('author').lastname.toString()[0].toUpperCase();
                        return -(c.localeCompare(d));
                    };
                    postPagesLayoutView.postPagesListView.collection.sort();

                } else if(author.find('i.fa-caret-down').length > 0){
                    author.find('i').remove();

                    postPagesLayoutView.postPagesListView.collection.comparator = 'order';
                    postPagesLayoutView.postPagesListView.collection.sort();
                }
            });

            //VideoEssenceApp.beutifyCheckbox(); // todo: чекбоксы  beutifyCheckbox

            postPagesLayoutView.PostPagesListMenuView.model.set({
                all: resp.get('allCount'),
                draft: resp.get('draftCount'),
                publish: resp.get('publishCount'),
                trash: resp.get('trashCount'),
                search: resp.get('textToSearch')
            });
        });
    }
});
module.exports = PostPagesLayoutView;