<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "blog".
 *
 * @property integer $id
 * @property string $name
 * @property string $title
 * @property string $description
 * @property integer $create_date
 */
class Blog extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'blog';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name', 'title', 'description'], 'required'],
            [['description'], 'string'],
            [['create_date', 'user_id'], 'integer'],
            [['name'], 'string', 'max' => 150],
            [['title'], 'string', 'max' => 255],
            [['name'], 'unique']
        ];
    }

    public function beforeSave($insert) {
        
        if(parent::beforeSave($insert)) {
            
            if( $insert ) {
                $this->create_date = time();
                $this->user_id = \Yii::$app->user->id;
            }
        
            return true;
        }
        
        return false;
    }
    
    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'title' => 'Title',
            'description' => 'Description',
            'create_date' => 'Create Date',
            'user_id' => 'User ID',
        ];
    }
}
