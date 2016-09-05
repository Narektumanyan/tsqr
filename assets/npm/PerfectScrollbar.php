<?php

namespace app\assets\npm;

use yii\web\AssetBundle;

class PerfectScrollbar extends AssetBundle {
	public $sourcePath = '@app/node_modules/perfect-scrollbar/dist/css';

	public $css = [
		'perfect-scrollbar.min.css',
	];
}
