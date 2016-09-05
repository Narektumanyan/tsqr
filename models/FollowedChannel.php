<?php
/**
 * Created by PhpStorm.
 * User: wight
 * Date: 25.03.15
 * Time: 14:25
 */

namespace app\models;

use yii\db\ActiveRecord;

class FollowedChannel  extends ActiveRecord {
	/**
	 * @inheritdoc
	 */
	public static function tableName()
	{
		return 'followed_channel';
	}

	/**
	 * @inheritdoc
	 */
	public function rules()
	{
		return [
			[['user_id', 'chanel_id', 'name', 'type'], 'required'],
			[['user_id', 'chanel_id', 'type', 'subtype'], 'unique', 'targetAttribute' => array('user_id', 'chanel_id', 'type', 'subtype')],
		];
	}
}