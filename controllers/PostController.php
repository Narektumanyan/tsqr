<?php
namespace app\controllers;

use app\models\PostSearch;
use Yii;
use yii\data\ActiveDataProvider;
use yii\data\ArrayDataProvider;
use yii\filters\AccessControl;
use dektrium\user\controllers\SecurityController;
use dektrium\user\Finder;
use app\models\Post;
use app\models\Image;
use app\models\VideoPost;
use app\models\RelatedPosts;
use app\models\PostCategories;
use app\models\PostTags;
use app\models\RelatedPostCategories;
use app\models\PostImage;
use app\components\CUploadedFile;
use app\components\PixabayClient;
use yii\StdClass;
use yii\helpers\Url;
use yii\helpers\Json;
use Abraham\TwitterOAuth\TwitterOAuth;
use app\components\GooglePost;
use Embedly\Embedly;
use Facebook\FacebookSession;
use Facebook\FacebookRequest;
use yii\web\ForbiddenHttpException;

use app\components\video\VideoCollection;

use app\controllers\SiteController;

use app\models\Page;

use app\components\CropAvatar;

class PostController extends SecurityController
{
	public $enableCsrfValidation = false;
	public function __construct($id, $module, Finder $finder, $config = [])
	{
		parent::__construct($id, $module, $finder, $config);
	}

	public function behaviors()
	{
		return [
			'access' => [
				'class' => AccessControl::className(),
				'only' => ['index', 'create', 'upload', 'raw-video', 'search-images-from-key', 'save-image'],
				'rules' => [
					[
						'allow' => true,
						'roles' => ['@']
					]
				]
			]
		];
	}


	/*public function actionCreate($video_id = null, $type = null)
	{
		if (Yii::$app->request->isPost) {
			$post = new Post();
			$post->title = Yii::$app->request->post("title");
			$post->content = json_decode(Yii::$app->request->post("content"));
			$post->author = Yii::$app->user->id;
			$post->date = date("Y.m.d H:i:s");
			$post->status = Post::STATUS_DRAFT;
			if ($post->insert()) {
				$this->redirect(Url::toRoute(['post/publish', 'id' => $post->id]));
			}
		}

		$video_id = Yii::$app->getRequest()->getQueryParam('video_id', '');
		$video_type = Yii::$app->getRequest()->getQueryParam('type', '');
		$videoData = $this->getVideoUrl($video_id, $video_type);

		$video = [
			'id' => $video_id,
			'type' => $video_type,
			'url' => $videoData['url'],
			'poster' => $videoData['poster'],
		];


		$imagesGallery = Image::findAll([
			'user_id' => Yii::$app->user->id
		]);

		$imagesGalleryJson = [];
		foreach ($imagesGallery as $image) {
			$imagesGalleryJson[] = [
				'id' => $image->id,
				'path' => $image->path,
				'preview' => $image->preview ? $image->preview : $image->path,
				'name' => $image->name,
				'loaded_date' => $image->loaded_date
			];
		}


		return $this->render('create', [
			'video' => $video,
			'images_gallery' => json_encode($imagesGalleryJson)
		]);
	}*/

    public function actionTestStore(){

        return json_encode(Yii::$app->getRequest()->post());
    }

	public function actionPublish($id = null)
    {
        if (is_null($id)) {

            $video_id = Yii::$app->getRequest()->getQueryParam('video_id', '');
            $video_type = Yii::$app->getRequest()->getQueryParam('type', '');
            $video_width = Yii::$app->getRequest()->getQueryParam('width', '');
            $video_height = Yii::$app->getRequest()->getQueryParam('height', '');
            $videoData = $this->getVideoUrl($video_id, $video_type);

            $post = new Post();
            $post->title = '';
            $post->content = '';
            $post->author = Yii::$app->user->id;
            $post->date = date("Y.m.d H:i:s");
            $post->status = Post::STATUS_DRAFT;
            $post->video_id = $video_id;
            $post->video_type = $video_type;
            $post->video_url = $videoData['url'];
            $post->video_image_url = $videoData['poster'];

//            echo"<pre>";
//            print_r($post);
//            echo"</pre>";
//            die();

            $post->insert();

            $video = [
                'id' => $video_id,
                'type' => $video_type,
                'width' => $video_width,
                'height' => $video_height,
                'url' => $videoData['url'],
                'poster' => $videoData['poster'],
            ];

            if (is_null($post)) {
                throw new ForbiddenHttpException('Post not exist');
            }
            if ($post->author != Yii::$app->user->id) {
                throw new ForbiddenHttpException('Access denied error');
            }

            if (Yii::$app->request->isPost) {
                $tags = explode(',', Yii::$app->request->post("tags"));
                $post->saveTags($tags);

                $categories = json_decode(Yii::$app->request->post("selectedCategories"));
                $post->categories_list = $categories;

                $relations = json_decode(Yii::$app->request->post("relations"));
                $post->related_post_list = $relations;

                $post->show_related = Yii::$app->request->post("show_related");
                $post->related_headline = Yii::$app->request->post("related_headline");
                $post->status = Post::STATUS_PUBLISH;

                if ($post->save()) {
                    $post->saveImages(Yii::$app->request->post('images'));
                }

                $this->redirect(Url::toRoute(['post/index']));
            }

            $userPosts = Post::findAll(['author' => Yii::$app->user->id]);

            $postsInJson = [];

            foreach ($userPosts as $anyPost) {
                $post->content = preg_replace('/<script\b[^>]*>(.*?)<\/script>/is', "", $anyPost->content);
                $post->title = preg_replace('/<script\b[^>]*>(.*?)<\/script>/is', "", $anyPost->title);
                $linked = RelatedPosts::find()->where([
                    'id' => $post->id,
                    'related_id' => $anyPost->id
                ])->exists();
                $postsInJson[] = array_merge($anyPost->toJson(), ['linked' => $linked]);
            }

            $imagesGallery = Image::findAll([
                'user_id' => Yii::$app->user->id
            ]);

            $imagesGalleryJson = Image::prepareJson($imagesGallery);

            return $this->render('publish', [
                'userposts' => json_encode($postsInJson, JSON_UNESCAPED_SLASHES),
                'post' => $post,
                'images_gallery' => $imagesGalleryJson,
                'video' => $video,
                "isView" => "",
            ]);
        }
        if (!is_null($id)){
            $post = Post::find()->where(['id' => $id])->one();

            $isView = Yii::$app->getRequest()->getQueryParam('isView', '') == "Y" ? 1 : 0;

            $videoData = $this->getVideoUrl($post->video_id, $post->video_type);

            $video = [
                'id' => $post->video_id,
                'type' => $post->video_type,
                'url' => $videoData["url"],
                'poster' => $videoData["poster"],
                'content' => $post->content,
            ];

            if(is_null($post)) {
                throw new ForbiddenHttpException('Post not exist');
            }
            if($post->author != Yii::$app->user->id) {
                throw new ForbiddenHttpException('Access denied error');
            }

            if (Yii::$app->request->isPost) {
                $tags = explode(',', Yii::$app->request->post("tags"));
                $post->saveTags($tags);

                $categories = json_decode(Yii::$app->request->post("selectedCategories"));
                $post->categories_list = $categories;

                $relations = json_decode(Yii::$app->request->post("relations"));
                $post->related_post_list = $relations;

                $post->show_related = Yii::$app->request->post("show_related");

                $post->content = json_encode(Yii::$app->request->post("content"));

                $post->title = Yii::$app->request->post("title", 'Untitled');
                if (trim($post->title) == '' ) $post->title = 'Untitled';

                $postContent = json_decode($post->content);

                if (is_array($postContent)) {
                    foreach ($postContent as $contentEl) {
                        if ($contentEl->elType == "video") {
                            $res = $this->getVideoUrl($contentEl->videoId, $contentEl->videoType);

                            $video["poster"] = $res["poster"];
                            $post->video_image_url = $res["poster"];
                            break;
                        }
                    }
                }

                $post->related_headline = strlen(Yii::$app->request->post("related_headline")) > 0 ?
                    Yii::$app->request->post("related_headline") : "Recommended for you";

                $post->status = Post::STATUS_PUBLISH;

                if ($post->save()) {
                    $post->saveImages(Yii::$app->request->post('images'));
                }

                echo "ok";
                die();
            }

            $postContent = json_decode($post->content);
            if (is_array($postContent)) {
                foreach ($postContent as $contentEl) {
                    if ($contentEl->elType == "video") {
                        $res = $this->getVideoUrl($contentEl->videoId, $contentEl->videoType);
                        $contentEl->videoUrl = $res["url"];
                        $contentEl->videoPoster = $res["poster"];
//                        $contentEl->content = "";
                    }
                }
                $post->content = json_encode($postContent);
            }

            $userPosts = Post::findAll(['author' => Yii::$app->user->id]);

            foreach($userPosts as $anyPost){
                $postContent = json_decode($anyPost->content);
                $htmlContent = "";
                if (is_array($postContent)) {
                    foreach ($postContent as $contentEl) {
//                    echo "type ".$contentEl->elType."\r\n";

                        if ($contentEl->elType == "video") {
                            $res = $this->getVideoUrl($contentEl->videoId, $contentEl->videoType);
                            $contentEl->videoUrl = $res["url"];
                            $contentEl->videoPoster = $res["poster"];
                            $contentEl->content = "";
                        }
                        if ($contentEl->elType != "video" && $contentEl->elType != "img") {
                            $htmlContent .= "<" . $contentEl->tagName . ">" . $contentEl->content . "</" . $contentEl->tagName . ">";
                        }
                    }
                }
                $anyPost->content = $htmlContent;
            }


            $postsInJson = [];

            foreach ($userPosts as $anyPost) {
                $anyPost->content = preg_replace('/<script\b[^>]*>(.*?)<\/script>/is', "", $anyPost->content);
                $anyPost->title = preg_replace('/<script\b[^>]*>(.*?)<\/script>/is', "", $anyPost->title);
                $linked = RelatedPosts::find()->where([
                    'id' => $post->id,
                    'related_id' => $anyPost->id
                ])->exists();
                $postsInJson[] = array_merge($anyPost->toJson(), ['linked' => $linked], ['video_image_url' => $anyPost->video_image_url]);
            }

//            echo"<pre>";
//            print_r($postsInJson);
//            echo"</pre>";
//            die();

            $imagesGallery = Image::findAll([
                'user_id' => Yii::$app->user->id
            ]);

            $imagesGalleryJson = Image::prepareJson($imagesGallery);

            return $this->render('publish', [
                'userposts' => json_encode($postsInJson, JSON_UNESCAPED_SLASHES),
                'post' => $post,
                'images_gallery' => $imagesGalleryJson,
                'video' => $video,
                'isView' => $isView,
            ]);
        }
	}


	public function actionEdit($id) {

		$post = Post::find()->where(['id' => $id])->one();

		if(is_null($post)) {
			throw new ForbiddenHttpException('Post not exist');
		}
		if($post->author != Yii::$app->user->id) {
			throw new ForbiddenHttpException('Access denied error');
		}

		$video_id = Yii::$app->getRequest()->getQueryParam('video_id', '');
		$type = Yii::$app->getRequest()->getQueryParam('type', '');

		$url = '';
		if ($type == 'vimeo') {
			$info = [];
			try {
				$info = json_decode(file_get_contents("http://player.vimeo.com/video/$video_id/config"));
			} catch (Exception $e) {}
			$url = $info->request->files->h264->sd->url;
		}

		$imagesGallery = Image::findAll([
			'user_id' => Yii::$app->user->id
		]);

		$imagesGalleryJson = Image::prepareJson($imagesGallery);

		return $this->render('edit', [
			'post' => $post,
			'video_id' => $video_id,
			'video_type' => $type,
			'video_url' => $url,
			'images_gallery' => $imagesGalleryJson
		]);
	}

	public function actionIndex()
	{
		$userPosts = new PostSearch();

		$postSearch = Yii::$app->request->get("PostSearch");
		$provider = $userPosts->search($postSearch);
		$userPosts->setAttributes($postSearch);

		foreach($provider->getModels() as $post){
			$post->findVideoId();
		}

		$allCount = Post::getAllCount(Yii::$app->user->id);
		$draftCount = Post::getDraftCount(Yii::$app->user->id);
		$publishCount = Post::getPublishCount(Yii::$app->user->id);
		$trashCount = Post::getTrashCount(Yii::$app->user->id);

		return $this->render('index', [
			'allCount' => $allCount,
			'draftCount' => $draftCount,
			'publishCount' => $publishCount,
			'trashCount' => $trashCount,
			'dataProvider' => $provider,
            'userPosts' => $userPosts,
			'textToSearch' => \Yii::$app->request->get("textToSearch"),
		]);
	}

    public function actionCategories(){
        $categories = PostCategories::find()
            ->where('(' . PostCategories::tableName() . '.user_id is NULL or ' . PostCategories::tableName() . '.user_id = ' . Yii::$app->user->id . ')')
            ->asArray()
            ->all();

//        select count(p.id) from post as p
//        where p.id not in (select rpc.post_id from related_post_categories as rpc)

        $posts = Post::find()
            ->where(
                '(' . Post::tableName() . '.author = ' . Yii::$app->user->id . ') and ' .
                '(' . Post::tableName() . '.id not in (select rpc.post_id from related_post_categories as rpc) )'
            )
            ->asArray()
            ->all();

//        echo"<pre>";
//        print_r(count($posts));
//        echo"</pre>";
//
//        die();

        return $this->render("categories", [
            'allCount' => count($categories),
            'uncategorisedPostsCount' => count($posts)
        ]);
    }

    public function actionPages(){
        $imagesGallery = Image::findAll([
            'user_id' => Yii::$app->user->id
        ]);

        $pagesCount = Page::find()->where(['author' => Yii::$app->user->id])->count();

//        echo"<pre>";
//        print_r($pagesCount);
//        echo"</pre>";
////        echo $pagesCount;
//        die();

        $imagesGalleryJson = Image::prepareJson($imagesGallery);

        return $this->render("pages", [
            'images_gallery' => $imagesGalleryJson,
            'pagesCount' => $pagesCount,
        ]);
    }

	public function actionView($id)
	{
		$post = Post::find()->where(['id' => $id])->one();
		if(is_null($post)) {
			throw new ForbiddenHttpException('Post not exist');
		}
		if($post->author != Yii::$app->user->id) {
			throw new ForbiddenHttpException('Access denied error');
		}
		$this->layout = 'view';
		return $this->render('view', compact('post'));
	}

	public function actionGetCategories($post_id)
	{
        if (trim($post_id) != "" && trim($post_id) != 0) {

            $categories = PostCategories::find()->
            select(PostCategories::tableName() . '.*, ' . RelatedPostCategories::tableName() . '.category_id as checked')->
            leftJoin(
                RelatedPostCategories::tableName(),
                PostCategories::tableName() . '.`id` = ' . RelatedPostCategories::tableName() . '.`category_id` AND ' . RelatedPostCategories::tableName() . '.post_id = ' . $post_id
            )->
            where('(' . PostCategories::tableName() . '.user_id is NULL or ' . PostCategories::tableName() . '.user_id = ' . Yii::$app->user->id . ')')->
            asArray()->
            all();
        }
        else{
            $categories = PostCategories::find()
                ->select('post_categories.*,
                    parent_c.label as parent,
                    ( select count(rpc.id) from related_post_categories as rpc where rpc.category_id = `post_categories`.`id` ) as posts_count
                ')
                ->leftJoin('post_categories as parent_c', '`parent_c`.`id` = `post_categories`.`parent_id`')
                ->where('post_categories.user_id = ' . Yii::$app->user->id . ' or isnull(post_categories.user_id)')
                ->asArray()
                ->all();
        }

		$result = [];
		foreach($categories as $category)
		{
			$result[] = [
				'id' => $category['id'],
				'label' => $category['label'],
                'desc' => $category['desc'],
				'open'=> false,
				'inode' => false,
				'checkbox' => true,
				'radio' => false,
                'trashed' => ($category['trashed'] == 1) ? 1 : 0,
				'checked' => !empty($category['checked'])?true:false,
                'parent_id' => !empty($category['parent_id'])? $category['parent_id'] : false,
                'parent' => isset($category['parent']) && strlen(trim($category['parent'])) > 0 ? $category['parent'] : "undefined",
                'posts_count' => isset($category['posts_count']) && strlen(trim($category['posts_count'])) > 0 ? $category['posts_count'] : 0,
                'barge' => isset($category['barge']) && strlen(trim($category['barge'])) > 0 ? $category['barge'] : 0,
                'last_modified' => $category['last_modified'],
			];
		}

//        echo"<pre>";
//        print_r($result);
//        echo"</pre>";
//
//        die();

		echo json_encode($result);
	}

	public function actionAddCategory($category, $description = '', $image_id = null,
                                      $category_id = 0, $trashed = 0, $parent_id = 0, $image_url = "",
                                      $last_modified = 0, $opt = '')
	{
        $new_category = "";
        if ($category_id != 0){
            $new_category = PostCategories::find()->where(["id" => $category_id])->one();
        }
        else{
            $new_category = new PostCategories;
        }

        if ($last_modified != 0) {
            $last_modified = explode(".", $last_modified)[0];
            $last_modified = explode("T", $last_modified)[0] . " " . explode("T", $last_modified)[1];
            $last_modified = \DateTime::createFromFormat("Y-m-d H:i:s", $last_modified);
        }

        $new_category->user_id = Yii::$app->user->id;
		$new_category->label = $category;
		$new_category->desc = $description;
		$new_category->image_id = $image_id;
		$new_category->trashed = $trashed;
		$new_category->parent_id = $parent_id;
		$new_category->barge = $image_url;
		$new_category->last_modified = is_object($last_modified) ? $last_modified->format("Y-m-d H:i:s") : 0;
//
//        echo"<pre>";
//        print_r($new_category);
//        echo"</pre>";
//        die();

		if ($new_category->save())
		{
            if ($opt != 'barge'){
                PostCategories::deleteAll(['and', "label=''", "barge=''"]);
            }

            echo $new_category->id;
            die();
		}
		else
		{
			throw new \Exception('Saving error');
		}
	}

    public function actionDelCategory($id){
//        die("here");
        $cat_id = Yii::$app->getRequest()->getQueryParam('id', '');
        $category = PostCategories::find()->where(['id' => $cat_id])->one();
        $category->delete();
//        $post = Post::find()->where(['id' => $id])->one();

    }


	public function actionVideoInfo()
	{
		\Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
		$url = Yii::$app->getRequest()->getQueryParam('video_url', '');
		$info = $this->getVideoInfoByUrl($url);
		$videoData = $this->getVideoUrl($info['id'], $info['type']);
		$info['url'] = $videoData['url'];
		$info['poster'] = $videoData['poster'];
		$info['customs'] = [];
		return $info;
	}

	/**
	 * return external id and type of video by url
	 * @param  string $url         video url
	 * @param  string &$video_id   link to get video id
	 * @param  string &$video_type link to get video type
	 * @return array               contain video id and type
	 */
	private function getVideoInfoByUrl($url, &$video_id = null, &$video_type = null)
	{
		$res = null;
		if (preg_match(SiteController::URL_REGEXP_YOUTUBE, $url, $res)) {
			$video_id = $res[1];
			$video_type = SiteController::VIDEO_TYPE_YOUTUBE;
		} elseif(preg_match(SiteController::URL_REGEXP_VIMEO, $url, $res)) {
			$video_id = $res[1];
			$video_type = SiteController::VIDEO_TYPE_VIMEO;
		}
		return [
			'id' => $video_id,
			'type' => $video_type,
		];
	}

	private function getVimeoRaw($video_id, $video_type) {
		$video_url = null;
		if ($video_type == SiteController::VIDEO_TYPE_VIMEO) {
			try {
				$info = json_decode(file_get_contents("http://player.vimeo.com/video/$video_id/config"));
//				var_dump($info); die();
				if(isset($info->request->files->h264)){
					$video_url = $info->request->files->h264->sd->url;
				}elseif($info->request->files->vp6){
					$video_url = $info->request->files->vp6->sd->url;
				}
				$video_tumbnail = $info->video->thumbs->base;

			} catch (Exception $e) {}
		} elseif ($video_type == SiteController::VIDEO_TYPE_YOUTUBE) {
			$video_url = "http://www.youtube.com/watch?v={$video_id}";
		}
		return $video_url;
	}

	/**
	 * return url to video or stream
	 * @param  string $video_id   external video id
	 * @param  string $video_type youtube or vimeo
	 * @return string             url to video or stream
	 */
	private function getVideoUrl($video_id, $video_type)
	{
		$video_url = null;
		$video_poster = '';
		if ($video_type == SiteController::VIDEO_TYPE_VIMEO) {
			try {
                $video_url = "http://vimeo.com/{$video_id}";
                $info = json_decode(@file_get_contents("http://player.vimeo.com/video/$video_id/config"));
                $video_poster = $info->video->thumbs->base;

//				if(isset($info->request->files->h264)){
//					$video_url = $info->request->files->h264->sd->url;
//				}elseif($info->request->files->vp6) {
//                    $video_url = $info->request->files->vp6->sd->url;
//				}else{
//                    $video_url = $info->request->video->share_url;
//                }

			} catch (Exception $e) {}
		} elseif ($video_type == SiteController::VIDEO_TYPE_YOUTUBE) {
			$video_url = "http://www.youtube.com/watch?v={$video_id}";
            $video_poster = "http://img.youtube.com/vi/{$video_id}/mqdefault.jpg";
		}
		return [
			'url' => $video_url,
			'poster' => $video_poster
		];
	}

    public function actionVideoUrl(){
        if(Yii::$app->request->isPost){
//            $video_id = Yii::$app->getRequest()->post('video_id', '');
//            $video_type = Yii::$app->getRequest()->post('video_type', '');
            $sendVideosUrls = Yii::$app->getRequest()->post('sendVideosUrls', '');
//            return json_encode([$video_id, $video_type]);
            $requestUrls = [];
            foreach($sendVideosUrls["videos"] as $videoInfo){
                $requestUrls[] = $this->getVideoUrl($videoInfo["video_id"], $videoInfo["video_type"]);
            }
            return json_encode($requestUrls);
        }
    }

	public function actionUpload()
	{
		var_dump(CUploadedFile::getInstancesByName('file'));die;
		$files = CUploadedFile::getInstancesByName('file');
		$images = [];
		if (count($files)) {
			foreach ($files as $file) {
				$image = new Image();
				$image->user_id = Yii::$app->user->id;
				$image->file = $file;
				$image->loaded_date = date('Y-m-d H:i:s');
				$image->save();
				$images[] = [
					'id' => $image->id,
					'path' => $image->path,
					'name' => $image->name,
					'loaded_date' => $image->loaded_date,
				];
			}
		}

		\Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
		$result = count($images) ? 'success' : 'error';
		return ["status" => $result, "data" => $images];
	}

	public function actionRawVideo($video_id)
	{
		$info = [];
		try {
			$info = json_decode(file_get_contents("http://player.vimeo.com/video/$video_id/config"));
		} catch (Exception $e) {
		}

		\Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

		if (!isset($info->request->files->h264->sd->url)) {
			return [
				"status" => "error"
			];
		}
		return [
			"status" => "success",
			"data" => $info->request->files->h264->sd->url
		];
	}

	public function actionSearchImagesFromKey($key, $page = 1, $limit = 20)
	{
		require_once Yii::getAlias('@vendor') . '/zoonman/pixabay-php-api/src/Zoonman/Pixabay/PixabayClient.php';

		$pixabayClient = new PixabayClient([
			'username' => Yii::$app->params['pixabay']['username'],
			'key' => Yii::$app->params['pixabay']['key'],
            "page" => (int) $page,
            "per_page" => (int) $limit,
		]);

		\Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

		try {
			$results = $pixabayClient->get(['q' => $key], true);
		} catch (\Exception $e) {
			return [
				"status" => "error",
				"data" => $e->getMessage()
			];
		}

		return [
			"status" => "success",
			"data" => $results->hits
		];

	}

	public function actionTwitters($keyword, $count = 6)
	{
		$connection = new TwitterOAuth(
			Yii::$app->params['twitter']['consumer_key'],
			Yii::$app->params['twitter']['consumer_secret'],
			Yii::$app->params['twitter']['oauth_token'],
			Yii::$app->params['twitter']['oauth_token_secret']
		);

		if (stripos($keyword, 'twitter')!==false)
		{
			preg_match_all('/[0-9]+$/', $keyword, $res);
			$id = $res[0][0];
			$tweets = new \stdClass();
			$tweets->statuses[] = $connection->get("statuses/show", array("id" => $id));
		}
		else
		{

			$tweets = $connection->get("search/tweets", array("q" => $keyword, 'count' => $count, 'result_type ' => 'popular'));
		}

		$result = [];
		if (!empty($tweets->statuses))
		{
			foreach($tweets->statuses as $t){

                $tData = new \DateTime($t->created_at);

				$result[] = [
					'id' => $t->id_str,
					'text' => $t->text,
					'user' => $t->user->name,
					'screen_name' => $t->user->screen_name,
					'created_at' => $tData->format("d/m/y g:i a")
				];
			}
		}

		\Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
		return $result;
	}

	public function actionSaveImage($url)
	{
		try {
			$content = @file_get_contents($url);
			if($content == false) {
				throw new \Exception('Image url error');
			}
			$temp_file = tempnam(sys_get_temp_dir(), 've');
			$explode_url = explode('/', $url);
			$image_url_name = end($explode_url);
			$temp_file .= $image_url_name;
			$fp = fopen($temp_file, 'w');
			fwrite($fp, $content);
			fseek($fp, 0);
			$_FILES["file"] = [
				"name" => $image_url_name,
				"type" => filetype($temp_file),
				"tmp_name" => $temp_file,
				"error" => 0,
				"size" => filesize($temp_file)
			];
			$image = new Image();
			$image->user_id = Yii::$app->user->id;
			$image->file = CUploadedFile::getInstanceByName('file');
			$image->loaded_date = date('Y-m-d H:i:s');
			$image->save();

			\Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
			return [
				"status" => "success",
				"data" => json_decode(Image::prepareJson([$image]))[0]
			];
		} catch (\Exception $e) {
			\Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
			return [
				"status" => "error",
				"data" => $e->getMessage()
			];
		}
	}

	public function actionSearchGooglePosts($keyword)
	{
		$client = new \Google_Client();
		$client->setDeveloperKey("AIzaSyA6cXc37Ysp72PPXvRKEQ-n3NPuGxWLGuc");
		$plus = new \Google_Service_Plus($client);

		$optParams = [
			'maxResults' => 6,
			'orderBy' => 'best',
		];

		$googlePosts = [];
		if (stripos($keyword, 'plus.google.com') !== false) {
			$file = file_get_contents('https://plus.google.com/+DanTallant/posts/XBHBvv77NiV');
			preg_match_all('/meta:(\w*);/', $file, $res);
			if (isset($res[1][0])) {
				$id = $res[1][0];
				try {
					$activity = $plus->activities->get($id);
					$googlePost = new GooglePost();
					$googlePost->fillByResponse($activity);
					$googlePosts[] = $googlePost->toArray();
				} catch (\Google_Service_Exception $e) {
				}
			}
		} else {
			try {
				$activities = $plus->activities->search($keyword, $optParams);
			} catch (\Google_Service_Exception $e) {
				$activities = [];
			}

			$googlePosts = [];
			foreach ($activities['items'] as $activity) {
				$googlePost = new GooglePost();
				$googlePost->fillByResponse($activity);
                $arGooglePost = $googlePost->toArray();
                $arGooglePost["published"] = (new \DateTime($arGooglePost["published"]))->format("d/m/y g:i a");
				$googlePosts[] = $arGooglePost;
			}
		}
		\Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
		return $googlePosts;
	}

	public function actionSearchFacebookPosts($keyword)
	{

		if (stripos($keyword, 'facebook.com')!==false)
		{
			$embedly = new Embedly(['key' => Yii::$app->params['embedly']['api_key']]);


			preg_match_all('/[0-9]+/', $keyword, $res);
			if(isset($res[0][0])){
				$id = $res[0][0];

				try {
					$response = $embedly->extract(['url'=>$keyword]);
					if(is_array($response)) {
						$responseObj = $response[0];
						\Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
						return [
							'id' => $id,
							'author_url' => $responseObj->authors[0]->url,
							'author' => $responseObj->authors[0]->name,
							'content' => $responseObj->description,
							'published' => $responseObj->published,
							'url' => $responseObj->url
						];
					}
				} catch (\Exception $e) {
					\Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
					return [];
				}
			}
		}
		\Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
		return [];
	}

    public function actionTrash($id) {
        $post = Post::find()->where(['id' => $id])->one();
        $post->status = Post::STATUS_TRASH;
        $post->save();
        $this->redirect('/post/index');
    }

    public function actionRestore($id) {
        $post = Post::find()->where(['id' => $id])->one();
        $post->status = Post::STATUS_DRAFT;
        $post->save();
        $this->redirect('/post/index');
    }

	public function actionTrashposts($ids = null) {
        if (!$ids) 
            return false;
        $arr = explode(',', $ids);
		foreach ($arr as $value) {
            $post = Post::find()->where(['id' => $value])->one();
            if ($post->status != Post::STATUS_TRASH) {
                $post->status = Post::STATUS_TRASH;
                $post->save();
            }
            else{
                Post::deleteAll(['id' => $value]);
            }
        }
		$this->redirect('/post/index');
	}

	public function actionSave() {
		$id = Yii::$app->request->post('id');
		$post = Post::find()->where(['id' => $id])->one();

		\Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
		if(is_null($post)) {
			$post = new Post();
			$post->author = Yii::$app->user->id;
			$post->date = date("Y.m.d H:i:s");
		}
		if($post->author != Yii::$app->user->id) {
			return [
				'status' => 'error',
				'data' => 'Permission denied'
			];
		}
		if (Yii::$app->request->isPost) {
			$post->title = Yii::$app->request->post('title');
			$post->content = json_decode(Yii::$app->request->post('content'));
			$post->video_id = Yii::$app->request->post('video_id', null);
			$post->video_type = Yii::$app->request->post('video_type', null);
			$post->video_url = $post->getVideoPreviewUrl();
			$post->status = 1;
			if ($post->save()) {
				$post->saveImages(Yii::$app->request->post('images'));
			}
			return [
				'status' => 'error'
			];
		}
	}

    public function actionSaveBarge(){
        $crop = new CropAvatar(
            isset($_POST['avatar_src']) ? $_POST['avatar_src'] : null,
            isset($_POST['avatar_data']) ? $_POST['avatar_data'] : null,
            isset($_FILES['avatar_file']) ? $_FILES['avatar_file'] : null
        );

        $response = array(
            'state'  => 200,
            'message' => $crop -> getMsg(),
            'result' => "/".$crop -> getResult()
        );

        echo json_encode($response);
        die();
    }
}
