var Image = require('../models/Image.js');
var ImagesGalley = Backbone.Collection.extend({
	model: Image
});
module.exports = ImagesGalley;
