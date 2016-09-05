var ImageTooltip = Dante.View.TooltipWidget.extend({
	initialize: function (opts) {
		if (opts == null) {
			opts = {};
		}
		this.icon = opts.icon || "icon-image";
		this.title = opts.title || "Add an image";
		this.action = opts.action || "menu-image";
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
		VideoEssenceApp.MediaManager.show();
		this.hide();
	},

	insertImage: function (src) {
		var self = this;

		$(this.node).html('<img src="' + src + '">');
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

        $('#editor').trigger('imageAdd', $(self.node).children('img'));
	}
});
module.exports = ImageTooltip;