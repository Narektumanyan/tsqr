var Marionette = require('backbone.marionette');

var ChannelView = Marionette.ItemView.extend({
	className: "video-item-wrapper",
	template:  VideoEssenceApp.templates['row-category-template'],
	events: {
		'click .button-like .following': 'clickedButton',
		'mouseover  .button-like .following': 'hoverFollowIn',
		'mouseout  .button-like .following': 'hoverFollowOut'
	},

	clickedButton: function() {
		var isSaved = this.model.get('followed');

		this.model.set('followed', !isSaved);
		this.render();
	},
    hoverFollowIn: function(e){
        //console.log("in", this.model.attributes);
        var self = $(e.target);
        if (self.hasClass("followed")){
            self.text("Unfollow").css("background-color", "#bcc4c5").css("color", "#ffffff");
        }
        else{
            self.css("color", "#ffffff").css("background-color", "#fc3768");
        }
    },
    hoverFollowOut: function(e){
        //console.log("out", e.target);
        var self = $(e.target);
        if (self.hasClass("followed")){
            self.text("Following").css("background-color", "#ffffff").css("color", "#bcc4c5");
        }
        else{
            self.css("color", "#fc3768").css("background-color", "#ffffff");
        }
    }
});
module.exports = ChannelView;