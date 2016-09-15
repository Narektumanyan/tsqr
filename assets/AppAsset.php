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
class AppAsset extends AssetBundle
{
    public $sourcePath = '@app/static';
    public $baseUrl = '@web';
    public $jsOptions = ['position' => \yii\web\View::POS_HEAD];

    public $css = [
        'js/dante/dist/css/dante-editor.css',
        //		'css/ace-fonts.css',
        //		'css/ace-ie.css',

        'css/bootstrap.css',
        'css/ace.css',

        //		'css/ace.onpage-help.css',
        //		'docs/assets/js/themes/sunburst.css',

//        'css/site.min.css',
        'css/site.css',
        
        'css/custom.css',
        'css/jquery-ui.custom.css',
        'css/tag-basic-style.css',

        //		'css/aciTree.css',

        'js/cropper/cropper.min.css',
        'js/cropper/main.css',
    ];
    public $js = [
        'js/dante/dist/js/dante-editor.js',

        'js/handlebars-heplers.js',

        //		'js/ace-extra.js',
        //		'js/ace-elements.js',
        //		'js/ace/elements.onpage-help.js',
        //		'js/ace/ace.onpage-help.js',
        //		'docs/assets/js/rainbow.js',
        //		'docs/assets/js/language/generic.js',
        //		'docs/assets/js/language/html.js',
        //		'docs/assets/js/language/css.js',
        //		'docs/assets/js/language/javascript.js',

        "js/jquery-ui.custom.js",
        "js/bootstrap.js",
        "js/jquery.ui.touch-punch.js",
        "js/jquery.easypiechart.js",
        "js/jquery.sparkline.js",

//        		"js/flot/jquery.flot.js",
//        		"js/flot/jquery.flot.pie.js",
//        		"js/flot/jquery.flot.resize.js",
//
//        		"js/ace/elements.scroller.js",
//        		"js/ace/elements.colorpicker.js",
//        		"js/ace/elements.fileinput.js",
//        		"js/ace/elements.typeahead.js",
//        		"js/ace/elements.wysiwyg.js",
//        		"js/ace/elements.spinner.js",
//        		"js/ace/elements.treeview.js",
//        		"js/ace/elements.wizard.js",
//        		"js/ace/elements.aside.js",
//        		"js/ace/ace.js",
//        		"js/ace/ace.ajax-content.js",
//        		"js/ace/ace.touch-drag.js",
//        		"js/ace/ace.sidebar.js",
//        		"js/ace/ace.sidebar-scroll-1.js",
//        		"js/ace/ace.submenu-hover.js",
//        		"js/ace/ace.widget-box.js",
//        		"js/ace/ace.settings.js",
//        		"js/ace/ace.settings-rtl.js",
//        		"js/ace/ace.settings-skin.js",
//        		"js/ace/ace.widget-on-reload.js",
//        		"js/ace/ace.searchbox-autocomplete.js",

//        		"js/danteImageTooltip.js",
//        		"js/danteGooglePTooltip.js",
//        		"js/danteFacebookTooltip.js",
//        		"js/danteVideoTooltip.js",
//        		"js/danteTwitterTooltip.js",
//        		'js/built.js',

        //		'js/aciTree/jquery.aciPlugin.min.js',
        //		'js/aciTree/jquery.aciTree.dom.js',
        //		'js/aciTree/jquery.aciTree.core.js',
        //		'js/aciTree/jquery.aciTree.checkbox.js',

//        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js',
//        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.js',

        'js/bootstrap-select/bootstrap-select.js',
        'js/cropper/cropper.min.js',

        'js/module.js',
//		'js/module.min.js',

        'js/templates.js',
        'js/postVideo.js',

        'js/layout/layout.js',
        'js/tagging.min.js',
        'js/custom.js',
    ];
    public $depends = [
        'yii\web\YiiAsset',
        'app\assets\BowerAsset'
    ];

}
