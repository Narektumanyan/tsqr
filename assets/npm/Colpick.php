<?php

namespace app\assets\npm;

use yii\web\AssetBundle;

class Colpick extends AssetBundle {
	public $sourcePath = '@app/static/bower';

	public $css = [
		'jquery-colpick/css/colpick.css',
	];
}
