TwitterTooltip = Dante.View.TooltipWidget.extend({
	initialize: function (opts) {
		if (opts == null) {
			opts = {};
		}
		this.icon = opts.icon || "icon-twitter";
		this.title = opts.title || "Add a twitter posts";
		this.action = opts.action || "menu-twitter";
		return this.current_editor = opts.current_editor;
	},

	handleClick: function (ev) {
		return this.twitterSelect(ev);
	},

	twitterSelect: function (ev) {
		var ph;
		ph = '<br>';
		this.node = this.current_editor.getNode();
		//$(this.node).html(ph).addClass("twitter-block");
		this.current_editor.setRangeAt(this.node);
		var TwitterSearchModal = require('../app/views/TwitterSearchModal.js');
		var socialSearchModal = new TwitterSearchModal({
			model: new Backbone.Model({
				placeholder: 'Enter a keyword or Twitter post link',
				embedded_title: 'Embedded Twitter Posts',
				embedded_name: 'Tweets',
				count_embedded_posts: 0,
				count_select: 0
			})
		});
		$('.app').html(socialSearchModal.render().el);
		this.hide();
	},

	insertHtml: function (src) {
		$(this.node).html(src);
        var lastGraf = $("#editor").find(".section-inner .graf").last();
        
        if(lastGraf.text() != ''){
        	$("#editor").find(".section-inner .graf--last").removeClass('graf--last');

            $("#editor")
                .find(".section-inner")
                .append('<p class="graf graf--p graf--empty graf--last is-selected" name="' + window.Dante.utils.generateUniqueName() + '"><br/></p>');
        }
	}
});
module.exports = TwitterTooltip;