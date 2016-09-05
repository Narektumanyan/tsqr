var PostCategory = Backbone.Model.extend({
    defaults: {
        id:"",
        label:"",
        open:false,
        inode:false,
        checkbox:true,
        radio:false,
        checked:false,
        trashed: 0,
        posts_count: 0,
        barge: ""
    }
});
module.exports = PostCategory;