var FacebookTooltip = Dante.View.TooltipWidget.extend({
	initialize: function (opts) {
		if (opts == null) {
			opts = {};
		}
		this.icon = opts.icon || "icon-facebook";
		this.title = opts.title || "Add facebook post";
		this.action = opts.action || "menu-facebook";
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
		var FacebookSearchModal = require('../app/views/FacebookSearchModal.js');
		var socialSearchModal = new FacebookSearchModal({
			model: new Backbone.Model({
				placeholder: 'Enter a Facebook post link',
				embedded_title: 'Embedded Facebook Posts',
				count_select: 0
			})
		});
		$('.app').html(socialSearchModal.render().el);
		this.hide();
	},

	insertHtml: function (src) {
		$(this.node).append(src);
        var lastGraf = $("#editor").find(".section-inner").find(".graf--last");
        //console.log(lastGraf, lastGraf.html(), lastGraf.length);
        if(lastGraf.length > 0){
            lastGraf.removeClass("graf--last");
            $("#editor")
                .find(".section-inner")
                .append('<p class="graf graf--p graf--empty graf--last is-selected" name="' + window.Dante.utils.generateUniqueName() + '"><br/></p>');
        }
        else {
            $("#editor")
                .find(".section-inner")
                .append('<p class="graf graf--p graf--empty graf--last is-selected" name="' + window.Dante.utils.generateUniqueName() + '"><br/></p>');

        }
	}
});
module.exports = FacebookTooltip;