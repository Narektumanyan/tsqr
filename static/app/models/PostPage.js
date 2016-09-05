var PostPage = Backbone.Model.extend({
    defaults: {
        id: "",
        author: "",
        created_at: "",
        title: "",
        placeholder: 'New page title',
        content: "",
        status: 0,
        trashed: 0,
        comments_count: 0,
        checked: 0
    }
});
module.exports = PostPage;