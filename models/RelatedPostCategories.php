<?php
/**
 * Created by PhpStorm.
 * User: wight
 * Date: 08.04.15
 * Time: 15:48
 */

namespace app\models;
use yii\db\ActiveRecord;

class RelatedPostCategories extends ActiveRecord {

	public static function tableName()
	{
		return 'related_post_categories';
	}

	/**
	 * @inheritdoc
	 */
	public function rules()
	{
		return [
			[['post_id', 'category_id'], 'required']
		];
	}
}