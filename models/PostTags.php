<?php
/**
 * Created by PhpStorm.
 * User: wight
 * Date: 25.03.15
 * Time: 14:25
 */

namespace app\models;

use yii\db\ActiveRecord;

class PostTags  extends ActiveRecord {
	/**
	 * @inheritdoc
	 */
	public static function tableName()
	{
		return 'post_tags';
	}

	/**
	 * @inheritdoc
	 */
	public function rules()
	{
		return [
			[['post_id', 'tag_id'], 'required']
		];
	}
}