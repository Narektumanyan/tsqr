var Post = Backbone.Model.extend({
    defaults: {
        id: null,
        title: '',
        placeholder: 'New page title',
        content: '',
        videos: [],
        images: [],
        author: null,
        date: null,
        saved: false,
	    first_video_id:'',
	    first_video_type:''
    },
    validate: function() {
        // this.checkEmptyTitle();
        // this.checkEmptyLines();
    },
    export: function() {

    },
	save: function () {
		var self = this;
		var jqxhr = $.ajax('/post/save', {
			method: 'post',
			data: {
				id: this.get('id'),
				title: this.get('title'),
				content: this.get('content'),
				images: this.get('images'),
				video_id: this.get('video_id'),
				video_type: this.get('video_type')
			},
			success: function (data) {
				if (data.status == 'success' && !_.isUndefined(data.data.id)) {
					var id = data.data.id;
					self.set({'id': id});
					// window.location.href = "/post/publish/" + id;
				}
				// console.log('post save')
			}
		})
	}
});
module.exports = Post;
