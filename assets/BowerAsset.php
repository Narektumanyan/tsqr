<?php
/**
 * Created by PhpStorm.
 * User: wight
 * Date: 19.03.15
 * Time: 17:53
 */

namespace app\assets;

use yii\web\AssetBundle;

class BowerAsset extends AssetBundle {
	public $sourcePath = '@app/static/bower';

	public $js = [
		'underscore/underscore.js',
		'handlebars/handlebars.js',
		'backbone/backbone.js',
		'marionette/lib/backbone.marionette.js',
		'marionette.handlebars/dist/marionette.handlebars.js',
		'moment/moment.js',
		'sanitize.js/lib/sanitize.js',
		// 'dante/dist/js/dante-editor.js',
		'video.js/dist/video-js/video.dev.js',
		'videojs-vimeo/src/media.vimeo.js',
		'videojs-youtube/src/youtube.js',
		'bloodhound/dist/bloodhound-base.concat.js',
		'typeahead.js/dist/typeahead.bundle.js',
		'bootstrap-tagsinput/src/bootstrap-tagsinput.js',
        'backbone.collectionView/src/backbone.collectionView.js'
	];
	public $css = [
		'font-awesome/css/font-awesome.min.css',
		'backbone-modal/backbone.modal.css',
		'backbone-modal/backbone.modal.theme.css',
		// 'dante/dist/css/dante-editor.css',
		'video.js/dist/video-js/video-js.css',
		'dropzone/dist/basic.css',
		'dropzone/dist/dropzone.css',
		'bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
		'loaders.css/loaders.css'
	];
	public $depends = [
		'app\assets\npm\Colpick',
		'app\assets\bower\NiceScroll',
		'app\assets\npm\PerfectScrollbar',
	];
}
