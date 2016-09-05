<?php
namespace app\controllers;

use Yii;
use yii\rest\ActiveController;
use yii\base;

class ImageController extends ActiveController {
	public $modelClass = 'app\models\Image';

	public function checkAccess($action, $model = null, $params = [])
	{
		if ($action == 'delete') {
			$model->user_id = Yii::$app->user->id;
				return true;
		}
		return false;
	}
}