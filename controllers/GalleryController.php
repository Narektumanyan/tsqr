<?php
namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\base;
use yii\filters\AccessControl;
use yii\imagine\BaseImage;
use app\models\Image;
use app\models\Post;
use app\components\CUploadedFile;

class GalleryController extends Controller {
	public function behaviors()
	{
		return [
			'access' => [
				'class' => AccessControl::className(),
				'only' => ['index'],
				'rules' => [
					[
						'allow' => true,
						'roles' => ['@']
					]
				]
			]
		];
	}

	public function beforeAction($action) {
	    $this->enableCsrfValidation = false;
	    return parent::beforeAction($action);
	}

	public function actionIndex()
	{
		$this->layout = 'library';
		$imagesGallery = Image::findAll([
			'user_id' => Yii::$app->user->id
		]);
		$imagesGalleryJson = Image::prepareJson($imagesGallery);

		$posts = Post::findAll([
			'author' => Yii::$app->user->id
		]);
		$imagesToPostsJson = [];
		foreach ($posts as $post) {
			foreach ($post->images as $image) {
				$img_data = Image::find()->where(['id' => $image->image_id])->one();
				if ($img_data) {
					$imagesToPostsJson[] = Image::prepareJson([$img_data]);
				}
			}
		}

		return $this->render('library', [
			'images_gallery' => $imagesGalleryJson,
			'images_posts' => json_encode($imagesToPostsJson)
		]);
	}
	
	public function actionUpload()
	{
		$files = CUploadedFile::getInstancesByName('images');
		$images = [];
		if (count($files)) {
			foreach ($files as $file) {
				$image = new Image();
				$image->user_id = Yii::$app->user->id;
				$image->file = $file;
				$image->loaded_date = date('Y-m-d H:i:s');
				$image->save();
				$images[] = [
					'id' => $image->id,
					'path' => $image->path,
					'preview' => $image->preview,
					'name' => $image->name,
					'description' => $image->description,
					'filesize' => $image->size,
					'info' => Image::getImageInfo($image->path),
					'loaded_date' => (new \DateTime($image->loaded_date))->format("d/m/y g:i a"),
					'timestamp' => strtotime($image->loaded_date),
				];			
			}
		}

		\Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
		$result = count($images) ? 'success' : 'error';
		return ["status" => $result, "data" => $images];
	}
	
	public function actionUpdate()
	{
		if (!Yii::$app->request->isPost)
			throw new ForbiddenHttpException('Access denied error');

		$id = Yii::$app->request->post('id');
		$name = Yii::$app->request->post('name');
		$description = Yii::$app->request->post('description');

		$model = Image::find()->where(['id' => $id])->one();

		if(is_null($model)) 
            throw new ForbiddenHttpException('Image not exist');

        if($model->user_id != Yii::$app->user->id)
            throw new ForbiddenHttpException('Access denied error');

      	$model->scenario = Image::SCENARIO_UPDATE;

        $model->name = $name;
        $model->description = $description;

        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        if ($model->save()) {
        	return ["status" => 'success', "data" => $model->getAttributes()];
        } else {
        	var_dump($model->getErrors());die;
        	return ["status" => 'error', "data" => $model->getErrors()];
        }		
	}
}