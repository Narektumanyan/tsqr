var GooglePTooltip = Dante.View.TooltipWidget.extend({
	initialize: function (opts) {
		if (opts == null) {
			opts = {};
		}
		this.icon = opts.icon || "icon-google-plus";
		this.title = opts.title || "Add google post";
		this.action = opts.action || "menu-google";
		return this.current_editor = opts.current_editor;
	},

	handleClick: function (ev) {
		return this.imageSelect(ev);
	},

	imageSelect: function (ev) {
		var ph;
		ph = '<br>';
		this.node = this.current_editor.getNode();
		$(this.node).html(ph).addClass("is-ve-image");
		this.current_editor.setRangeAt(this.node);

		var GoogleSearchModal = require('../app/views/GoogleSearchModal.js');
		var socialSearchModal = new GoogleSearchModal({
			model: new Backbone.Model({
				placeholder: 'Enter a keyword or Google+ post link',
				embedded_title: 'Embedded Google+ Posts',
				embedded_name: 'Google+',
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
module.exports = GooglePTooltip;