VideoEssenceApp.VideoLead = Backbone.Model.extend({
	defaults: {
		'headline': 'Subscribe to get free access',
		'subheadline': 'We never spam your mailbox, you can unsubscribe from our channel at any time.',

		'buttonText': 'Subscribe',
		'buttonColor': '#FF3333',

		'backgroundColor': '#FF3333',
		'backgroundOpacity': 0.7,

		'allowSkip': true,
		'displayVideoIsPaused': false,
		'askNames': false,
		'timeStop': '0:00'
	}
});