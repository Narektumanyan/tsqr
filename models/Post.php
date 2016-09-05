<?php
/**
 * Created by PhpStorm.
 * User: wight
 * Date: 08.04.15
 * Time: 15:48
 */

namespace app\models;

use yii\db\ActiveRecord;

/**
 * This is the model class for table "user".
 *
 * @property string $videoUrl
 */
class Post extends ActiveRecord
{
	const STATUS_ALL = -1;
	const STATUS_DRAFT = 1;
	const STATUS_PUBLISH = 2;
	const STATUS_TRASH = 3;

	public $videoId;
	public $videoUrl;

	public function behaviors()
	{
		return [
			[
				'class' => \voskobovich\behaviors\ManyToManyBehavior::className(),
				'relations' => [
					'categories_list' => 'categories',
					'related_post_list' => 'relatedPosts'
				],
			],
		];
	}

	public function saveTags($tags)
	{
		PostTags::deleteAll(['post_id' => $this->id]);
		foreach ($tags as $tag) {
			$tagModel = new PostTags();
			$tagModel->post_id = $this->id;
			$tagModel->tag_id = $tag;
			$tagModel->insert();
		}
	}

	public function saveImages($images)
	{
		PostImage::deleteAll(['post_id' => $this->id]);
		if (empty($images))
			return false;
		foreach ($images as $path) {
			$image_id = Image::getIdViaPath($path);
			if (!empty($image_id) && !empty($this->id)) {
				$model = new PostImage();
				$model->post_id = $this->id;
				$model->image_id = $image_id;
				$model->insert();
			}
		}
	}

	public function getTags()
	{
		return $this->hasMany(PostTags::className(), ['post_id' => 'id']);
	}

	public function getCategories()
	{
		return $this->hasMany(PostCategories::className(),
			['id' => 'category_id'])->viaTable(RelatedPostCategories::tableName(), ['post_id' => 'id']);
	}

	public function getRelatedPosts()
	{
		return $this->hasMany(Post::className(), ['id' => 'related_id'])->viaTable(RelatedPosts::tableName(),
			['id' => 'id']);
	}

	public function getImages()
	{
		return $this->hasMany(PostImage::className(), ['post_id' => 'id']);
	}

	public function getVideos()
	{
		return $this->hasMany(VideoPost::className(), ['post_id' => 'id']);
	}

	public function setVideos()
	{
	}

	public static function tableName()
	{
		return 'post';
	}

	/**
	 * @inheritdoc
	 */
	public function rules()
	{
		return [
			[['author', 'status'], 'required'],
			[['categories_list'], 'safe'],
			[['show_related'], 'integer'],
			[['related_headline'], 'string']
		];
	}

	public function toJson()
	{
		return
			[
				'id' => $this->id,
				//'relatedPostsId' => $this->relatedPostsId,
				'title' => $this->title,
				'date' => $this->date,
				'content' => $this->content,
				'videos' => $this->videos
			];
	}

	public static function postsToJson($posts)
	{
		$postsArray = [];
		foreach ($posts as $post) {
			$postsArray[] = $post->toJson();
		}
		return $postsArray;
	}

	public function findVideoId()
	{
		$startUrl = strpos($this->content, 'background-image: url(');
		$startUrl = strpos($this->content, 'https:', $startUrl);
		$endUrl = strpos($this->content, ')', $startUrl);
		$this->videoId = substr($this->content, $startUrl, $endUrl - $startUrl);
	}

	public static function getAllCount($user)
	{
		return Post::find()->where(['author' => $user])->count();
	}

	public static function getDraftCount($user)
	{
		return Post::find()->where([
			'status' => Post::STATUS_DRAFT,
			'author' => $user
		])->count();
	}

	public static function getPublishCount($user)
	{
		return Post::find()->where([
			'status' => Post::STATUS_PUBLISH,
			'author' => $user
		])->count();
	}

	public static function getTrashCount($user)
	{
		return Post::find()->where([
			'status' => Post::STATUS_TRASH,
			'author' => $user
		])->count();
	}

	public function getVideoPreviewUrl()
	{
		$url = 'http://placekitten.com/g/170/114';
		if ($this->video_type == 'youtube') {
			$url = 'http://img.youtube.com/vi/' . $this->video_id . '/mqdefault.jpg';
		} elseif ($this->video_type == 'vimeo') {
			$vimeo = unserialize(file_get_contents("http://vimeo.com/api/v2/video/$this->video_id.php"));
			$url = $vimeo[0]['thumbnail_medium'];
		}
		return $url;
	}
}