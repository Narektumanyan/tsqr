<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "blog_tags".
 *
 * @property integer $id
 * @property integer $blog_id
 * @property string $tag_name
 */
class BlogTags extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'blog_tags';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['blog_id', 'tag_name'], 'required'],
            [['blog_id'], 'integer'],
            [['tag_name'], 'string', 'max' => 100]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'blog_id' => 'Blog ID',
            'tag_name' => 'Tag Name',
        ];
    }
}
