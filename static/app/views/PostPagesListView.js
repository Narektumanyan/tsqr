var Marionette = require('backbone.marionette'),
    PostPagesCollection = require('../collections/PostPagesCollection.js'),
    PostPageListView = require('./PostPageListView.js');

var PostPagesListView = Marionette.CollectionView.extend({
    tagName: "tbody",
    //className: "PostPagesListView",
    childView: PostPageListView,
    onStart: function(){},
    onBeforeRender: function(){
        //this.collection.comparator = 'order';
        //this.collection.sort();
    },
    onRender: function(){
        //this.collection.comparator = 'id';
        //this.collection.sort();
    }
});
module.exports = PostPagesListView;