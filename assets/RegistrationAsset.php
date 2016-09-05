<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\assets;

use yii\web\AssetBundle;

/**
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class RegistrationAsset extends AssetBundle
{
	public $sourcePath = '@app/static';
    public $baseUrl = '@web';
    public $jsOptions = [ 'position' => \yii\web\View::POS_HEAD ];

    public $css = [
        'css/bootstrap.min.css',
        'css/font-awesome.min.css',
        'css/ace-fonts.css',
//        'css/ace.min.css',
        'css/ace.css',
        'css/site.css',
        'css/ace-rtl.min.css',
        'css/ace.onpage-help.css',
//        'css/reg-manual.css',
    ];
    public $js = [
    'js/ace-extra.js',
    'js/ace-elements.js',
    'js/ace/elements.onpage-help.js',
    'js/ace/ace.onpage-help.js',
	'docs/assets/js/rainbow.js',
	'docs/assets/js/language/generic.js',
	'docs/assets/js/language/html.js',
	'docs/assets/js/language/css.js',
	'docs/assets/js/language/javascript.js',
    "js/jquery-ui.custom.js",

    "js/jquery-ui-shake.js",

    "js/bootstrap.js",
    "js/bootstrap-show-password.min.js",
    "js/jquery.ui.touch-punch.js",
	"js/jquery.easypiechart.js",
	"js/jquery.sparkline.js",
	"js/flot/jquery.flot.js",
	"js/flot/jquery.flot.pie.js",
	"js/flot/jquery.flot.resize.js",

	"js/ace/elements.scroller.js",
	"js/ace/elements.colorpicker.js",
	"js/ace/elements.fileinput.js",
	"js/ace/elements.typeahead.js",
	"js/ace/elements.wysiwyg.js",
	"js/ace/elements.spinner.js",
	"js/ace/elements.treeview.js",
	"js/ace/elements.wizard.js",
	"js/ace/elements.aside.js",
	"js/ace/ace.js",
	"js/ace/ace.ajax-content.js",
	"js/ace/ace.touch-drag.js",
	"js/ace/ace.sidebar.js",
	"js/ace/ace.sidebar-scroll-1.js",
	"js/ace/ace.submenu-hover.js",
	"js/ace/ace.widget-box.js",
	"js/ace/ace.settings.js",
	"js/ace/ace.settings-rtl.js",
	"js/ace/ace.settings-skin.js",
	"js/ace/ace.widget-on-reload.js",
	"js/ace/ace.searchbox-autocomplete.js",

    "js/login/login.js",
    ];
    public $depends = [
        'yii\web\YiiAsset',
        'app\assets\BowerAsset',
    ];
    
}
