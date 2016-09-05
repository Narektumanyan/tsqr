<?php
/**
 * Created by PhpStorm.
 * User: wight
 * Date: 08.04.15
 * Time: 15:48
 */

namespace app\models;
use yii\db\ActiveRecord;

class PostCategories extends ActiveRecord {

	public static function tableName()
	{
		return 'post_categories';
	}

	/**
	 * @inheritdoc
	 */
	public function rules()
	{
		return [
//			[['label'], 'required'],
			[['user_id'], 'integer']
		];
	}

	public function toJson(){
		return
			[
				'id' => $this->id,
				'label' => $this->label,
				'inode' => $this->parent_id>0,
				'open' => false,
				'checkbox' => true,
				'radio' => false
				/*'branch' =>*/
			];
	}
}