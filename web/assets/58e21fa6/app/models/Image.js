var Image = Backbone.Model.extend({
	defaults: {
		"path": "",
		"name": "",
		"info": "",
		"filesize": "",
		"description": "",
		"loaded_date": "",
		"timestamp": "",
		"uploaded": true
	}
});
module.exports = Image;