var VideoROI = Backbone.Model.extend({
    types: {
        'lead': {
            title: 'Lead capture form',
            img: 'http://res.cloudinary.com/diyo0e4ky/image/upload/v1415374378/VideoEssence/campaigns_06.png'
        },
        'annotation': {
            title: 'Annotation',
            img: 'http://res.cloudinary.com/diyo0e4ky/image/upload/v1415374378/VideoEssence/campaigns_08.png'
        },
        'cta': {
            title: 'CTA button',
            img: 'http://res.cloudinary.com/diyo0e4ky/image/upload/v1415374378/VideoEssence/campaigns_12.png'
        }
    },
    colors: ['#FF3333', '#FF6633', '#FFCC33', '#99CC00', '#3399FF', '#003399', '#6633FF', ],
    fontSizes: [12, 14, 16, 18, 20, 22, 24, 26],
    emailProviders: ['aweber', 'getresponse', 'mailchimp', 'constantcontact', 'icontact', 'htmlform'],
    defaults: {
        type: 'lead',
        headline: 'Add keyword',
        subHeadline: 'We never spam your mailbox, you can unsubscribe\n from our channel at any time.',
        buttonText: null,
        targetUrl: 'http://',
        text: null,
        textFontSizenull: 12,
        textColor: '#000000',
        buttonColor: '#FF3333',
        left: 2,
        top: 2,
        backgroundColor: '#3399FF',
        opacity: 70,
        emailServiceProvider: null,
        timeStart: 0,
        timeStop: 0,
        displayOnPause: false,
        askNames: false,
        allowSkip: true,
        showCloseButton: true
    },
    video: {
        length: 500,
        thumbnail: 'http://i.ytimg.com/vi/UKY3scPIMd8/hqdefault.jpg'
    },
    initialize: function(attributes, options) {
        _.extend(this.video, _.result(options, 'video', {}));
        this.defaults.timeStop = this.video.length;
    },
    validate: function() {
        console.log('validation');
        if (this.get('type') === 'lead') {
            this.set({timeStop: 0}, {silent: true});
        }
        return true;
    }
});
module.exports = VideoROI;