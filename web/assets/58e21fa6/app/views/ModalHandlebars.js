require('backbone.modal');
var Backbone = require('backbone');

var ModalHandelbars = Backbone.Modal.extend({
	buildTemplate: function (template, data) {
		var templateFunction;
		if (typeof template === 'function') {
			templateFunction = template;
		} else {
			templateFunction = Handlebars.compile(Backbone.$(template).html());
		}

		if (this.args[0] && this.args[0].onlyupload !== undefined) 
			data.onlyupload = this.args[0].onlyupload;

		return templateFunction(data);
	},
	checkKey: function (e) {
		if (this.active) {
			switch (e.keyCode) {
				case 27:
					return this.triggerCancel(e);
			}
		}
	},
	render: function (options) {
		if (typeof this.beforeRender === "function") {
			this.beforeRender();
		}
		ModalHandelbars.__super__.render.apply(this, arguments);
		return this;
	}
});
module.exports = ModalHandelbars;
