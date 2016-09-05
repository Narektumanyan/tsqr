module.exports = function(grunt) {
	grunt.initConfig({

		handlebars: {
			compile: {
				options: {

					// configure a namespace for your templates
					namespace: 'VideoEssenceApp.templates',

					// convert file path into a function name
					// in this example, I convert grab just the filename without the extension
					processName: function(filePath) {
						var pieces = filePath.split('/');
						return pieces[pieces.length - 1].split('.')[0];
					}

				},

				// output file: input files
				files: {
					'static/js/templates.js': 'static/app/templates/*.hbs'
				}
			}
		},


		sass: {
			options: {
				// If you can't get source maps to work, run the following command in your terminal:
				// $ sass scss/foundation.scss:css/foundation.css --sourcemap
				// (see this link for details: http://thesassway.com/intermediate/using-source-maps-with-sass )
				sourceMap: true
			},

			dist: {
				options: {
					//outputStyle: 'compressed'
				},
				files: {
					'static/css/site.css': 'static/scss/site.scss'
				}
			}
		},
		browserify: {
			dist: {
				options: {
					//transform: [hbsfy],
					browserifyOptions: {
						debug: true
					}
				},
				files: {
					'static/js/module.js': [

                        //'static/bower/underscore/underscore.js',
                        //'static/bower/handlebars/handlebars.js',
                        //'static/bower/backbone/backbone.js',
                        //'static/bower/marionette/lib/backbone.marionette.js',
                        //'static/bower/marionette.handlebars/dist/marionette.handlebars.js',
                        //'static/bower/moment/moment.js',
                        //'static/bower/sanitize.js/lib/sanitize.js',
                        //'static/bower/dante/dist/js/dante-editor.js',
                        //'static/bower/video.js/dist/video-js/video.dev.js',
                        //'static/bower/videojs-vimeo/src/media.vimeo.js',
                        //'static/bower/videojs-youtube/src/youtube.js',
                        //'static/bower/bloodhound/dist/bloodhound-base.concat.js',
                        //'static/bower/typeahead.js/dist/typeahead.bundle.js',
                        //'static/bower/bootstrap-tagsinput/src/bootstrap-tagsinput.js',
                        //'static/bower/backbone.collectionView/src/backbone.collectionView.js',

						//'static/js/handlebars-heplers.js',
                        //
						//"static/js/jquery-ui.custom.js",
						//"static/js/bootstrap.js",
						//"static/js/jquery.ui.touch-punch.js",
						//"static/js/jquery.easypiechart.js",
						//"static/js/jquery.sparkline.js",

						//'static/js/bootstrap-select/bootstrap-select.js',
						//'static/js/cropper/cropper.min.js',

                        'static/js/shim.js',
                        'static/app/index.js'
					]
				}
			}
		},

		//uglify:{
		//	dist: {
		//		files: {
		//		  'static/js/module.min.js': ['static/js/module.js']
		//		}
		//	}
		//},

        //cssmin:{
        //	dist: {
        //		files: {
        //		  'static/css/site.min.js': [
        //             'static/css/bootstrap.css',
        //             'static/css/ace.css',
        //
        //             'static/scss/site.scss',
        //
        //             'static/css/jquery-ui.custom.css',
        //             'static/js/cropper/cropper.min.css',
        //             'static/js/cropper/main.css'
        //         ]
        //		}
        //	}
        //},
		
		watch: {
			//grunt: { files: ['Gruntfile.js'] },
			browserify: {
				files: 'static/app/**/*.js',
				tasks: ['browserify']
			},
			sass: {
				files: 'static/scss/**/*.scss',
				tasks: ['sass']
			},
			handlebars: {
				files: 'static/app/templates/*.hbs',
				tasks: ['handlebars']
			}//,
            //uglify: {
            //    files: 'static/js/module.js',
            //    tasks: ['uglify']
            //}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	//grunt.loadNpmTasks('grunt-contrib-uglify');

	//grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.loadNpmTasks('grunt-browserify');

	grunt.registerTask('build', ['sass','handlebars','browserify'/*,'uglify'*/]);
	grunt.registerTask('default', ['watch']);
};