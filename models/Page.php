<?php
namespace app\models;

use yii\db\ActiveRecord;
use app\models\User;

class Page extends ActiveRecord
{
	const STATUS_ALL 	 = -1;
	const STATUS_DRAFT   = 1;
	const STATUS_PUBLISH = 2;
	const STATUS_TRASH 	 = 3;

//	public $videoId;
//	public $videoUrl;

	public static function tableName()
	{
		return 'page';
	}

	public function rules()
	{
		return [
			[['author', 'status'], 'required'],
			[['author', 'status'], 'integer'],
			[['content'], 'string']
		];
	}

	public function toJson()
	{
		return
			[
				'id' => $this->id,
				'title' => $this->title,
				'author' => ['name' => $this->user->firstname, 'lastname' => $this->user->lastname],
				'created_at' => (new \DateTime($this->created_at))->format("m/d/y \\a\\t g:i a"),
				'content' => $this->content,
				'status' => $this->status,
                'order' => $this->order
			];
	}

	public static function pagesToJson($pages)
	{
		$pagesArray = [];
		foreach ($pages as $page) {
			$pagesArray[] = $page->toJson();
		}
		return $pagesArray;
	}

	public static function getAllCount($user)
	{
		return Page::find()->where(['author' => $user])->count();
	}

	public static function getDraftCount($user)
	{
		return Page::find()->where([
			'status' => Page::STATUS_DRAFT,
			'author' => $user
		])->count();
	}

	public static function getPublishCount($user)
	{
		return Page::find()->where([
			'status' => Page::STATUS_PUBLISH,
			'author' => $user
		])->count();
	}

	public static function getTrashCount($user)
	{
		return Page::find()->where([
			'status' => Page::STATUS_TRASH,
			'author' => $user
		])->count();
	}

    public function getUser()
    {
        return $this->hasOne(User::className(), ['id' => 'author']);
    }
}