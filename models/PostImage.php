<?php
namespace app\models;
use yii\db\ActiveRecord;

class PostImage extends ActiveRecord {

	public static function tableName()
	{
		return 'post_image';
	}

	public function rules()
	{
		return [
			[['image_id', 'post_id'], 'required'],
			[['image_id', 'post_id'], 'integer']
		];
	}
}