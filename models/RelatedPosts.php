<?php
/**
 * Created by PhpStorm.
 * User: wight
 * Date: 25.03.15
 * Time: 14:25
 */

namespace app\models;

use yii\db\ActiveRecord;

class RelatedPosts  extends ActiveRecord {
	/**
	 * @inheritdoc
	 */
	public static function tableName()
	{
		return 'related_posts';
	}

	/**
	 * @inheritdoc
	 */
	public function rules()
	{
		return [
			[['id', 'related_id'], 'required']
		];
	}
}