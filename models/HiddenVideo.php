<?php
/**
 * Created by PhpStorm.
 * User: wight
 * Date: 25.03.15
 * Time: 14:25
 */

namespace app\models;

use yii\db\ActiveRecord;

class HiddenVideo  extends ActiveRecord {
	/**
	 * @inheritdoc
	 */
	public static function tableName()
	{
		return 'hidden_video';
	}

	/**
	 * @inheritdoc
	 */
	public function rules()
	{
		return [
			[['user_id', 'video_id'], 'required']
		];
	}
}