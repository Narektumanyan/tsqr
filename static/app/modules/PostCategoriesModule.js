var Marionette = require('backbone.marionette'),
    PostCategoriesCollection = require('../collections/PostCategoriesCollection.js'),
    PostCategoriesListView = require('../views/PostCategoriesListView.js'),
    PostCategoriesTabView = require('../views/PostCategoriesTabView.js');

var PostCategoriesModule = Marionette.Module.extend({
    startWithParent: false,
    initialize: function (moduleName, app, options) {
        console.log("PostCategoriesModule initialized");
    },
    onStart: function(options){
        console.log("PostCategoriesModule onStart options", options);

        this.PostCategoriesTabView = new PostCategoriesTabView();

        this.postCategoriesListRegion = new Backbone.Marionette.Region({
            el: '#grid-view'
        });

        this.postCategoriesListRegion.show(this.PostCategoriesTabView );

        this.postCategoriesParams = {
            allCount: 0,
            trashedCount: 0,
            curTab: 0
        };

        VideoEssenceApp.PostCategoryModal = require('../views/PostCategoryModal.js');

        //var territories = require("../../territories.json");
        //
        //this.territories = JSON.parse(territories);

    },
    initList: function(){

    }
});
module.exports = PostCategoriesModule;