'use strict';

var Marionette = require('backbone.marionette');
window.VideoEssenceApp = new Marionette.Application();
window.VideoEssenceApp.on('start', function() {
	console.log('Application start');
});

module.exports = window.VideoEssenceApp;
