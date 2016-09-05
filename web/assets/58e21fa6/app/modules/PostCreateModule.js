var Marionette = require('backbone.marionette');
var VideoROI = require('../models/VideoROI.js');
var ModalVideoCustomSelect = require('../views/ModalVideoCustomSelect.js');
var PostCreateModule = Marionette.Module.extend({
    postVideo: null,
	startWithParent: false,
    onStart: function (postData) {
        //console.log("postData", postData);

	    this.postData = postData;
        this.initRegions();

        this.showEditor();
    },
    initRegions: function() {
        this.editorRegion = new Backbone.Marionette.Region({
            el: '#post-editor'
        });
        this.modalRegion = new Backbone.Marionette.Region({
            el: '.app'
        });
    },
    showEditor: function() {
	    var Post = require('../models/Post.js');
        this.post = new Post(this.postData);

        console.log("this.post", this.post);

	    var PostEditorView = require('../views/PostEditorView.js');
        this.editor = new PostEditorView({model: this.post});
        this.listenTo(this.editor, 'video:custom:click', this.showCustomize);

        this.editorRegion.show(this.editor);
    },
    showCustomize: function(video, nodeId) {
        var roi = new VideoROI({}, {video: video});
        this.customView = new ModalVideoCustomSelect({model: roi});
        var callback = this.applyCustomize.bind(this, nodeId);
        this.listenTo(this.customView, 'video:custom:apply', callback);
        this.modalRegion.show(this.customView);
    },
    applyCustomize: function(nodeId, roi) {
        var customs = roi.video.customs;
        customs.push(roi.toJSON());
        this.editor.trigger('video:custom:update', nodeId, customs);
    }
});
module.exports = PostCreateModule;
