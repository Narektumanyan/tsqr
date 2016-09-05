<?php

namespace app\assets\bower;

use yii\web\AssetBundle;

class NiceScroll extends AssetBundle {
	public $sourcePath = '@app/vendor/bower/jquery.nicescroll/dist';

	public $js = [
		'jquery.nicescroll.min.js',
	];
}
