<?php
/**
 * Created by PhpStorm.
 * User: wight
 * Date: 25.03.15
 * Time: 14:25
 */

namespace app\models;

use yii\db\ActiveRecord;

class VideoPost  extends ActiveRecord {
	/**
	 * @inheritdoc
	 */
	public static function tableName()
	{
		return 'video_post';
	}

	/**
	 * @inheritdoc
	 */
	public function rules()
	{
		return [
			[['id', 'post_id', 'video_id', 'video_type'], 'required']
		];
	}
}