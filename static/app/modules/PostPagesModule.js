var Marionette = require('backbone.marionette'),
    PostPagesCollection = require('../collections/PostPagesCollection.js'),
    PostCategoriesCollection = require('../collections/PostCategoriesCollection.js'),
    PostPagesLayoutView = require('../views/PostPagesLayoutView.js')
    //,PostPageEditor = require('../views/PostPageEditor.js')
    ;

var PostPagesModule = Marionette.Module.extend({
    startWithParent: false,
    initialize: function (moduleName, app, options) {
        console.log("PagesModule initialized");
    },
    onStart: function(options){
        // console.log("PagesModule onStart options", options);

        // список страниц
        this.PostPagesLayoutView = new PostPagesLayoutView();
        this.postPagesListRegion = new Backbone.Marionette.Region({
            el: '#post-pages-wp'
        });
        this.postPagesListRegion.show(this.PostPagesLayoutView );
        // end список страниц

        // редактор страницы
        this.editorWpRegion = new Backbone.Marionette.Region({
            el: '#page-editor-wp'
        });

        this.editorRegion = new Backbone.Marionette.Region({
            el: '#page-editor'
        });

        // end редактор страницы

    },
    goToEditPage: function(){
        this.postPagesListRegion.$el.hide();
        this.editorWpRegion.$el.show();

        this.showEditor();
    },
    goToPagesList: function(){
        this.postPagesListRegion.$el.show();
        this.editorWpRegion.$el.hide();

        clearInterval(this.editor.autosave);

        this.PostPagesLayoutView.model.fetch({
            method: 'POST',
            data: {}
        });

        //this.PostPagesLayoutView.render();
        this.postPagesListRegion.show(this.PostPagesLayoutView );
    },
    showEditor: function() {
        var Page = require('../models/PostPage.js');

        //var Pages = new (Backbone.Model.extend({
        //    defaults: {},
        //    parse: function(response) {
        //        return response;
        //    },
        //    url: function () {
        //        return '/page/index';
        //    }
        //}))();
        //Pages.fetch({
        //    method: 'POST'
        //})

        this.editPage = new Page();

        this.editPage.parse = function(response) {return response;};
        this.editPage.url = function () {return '/page/edit'; };

        //var pageId = 6; // todo: pageId устанавливается исходя из edit или new

        var pageForEditId = VideoEssenceApp.PostPages.PostPagesLayoutView.model.get('pageForEdit')

        this.editPage.set('id', parseInt(pageForEditId));

        console.log('pageForEditId', pageForEditId);

        var PostPageEditorView = require('../views/PostPageEditorView.js');

        console.log('test');

        this.editor = new PostPageEditorView({model: this.editPage});

        console.log('this.editor', this.editor.model);

        this.editorRegion.show(this.editor);
    }
});
module.exports = PostPagesModule;