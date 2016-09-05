<?php

namespace app\controllers;

use app\components\video\YoutubeCollection;
use app\components\video\VimeoCollection;
use app\models\HiddenVideo;
use Yii;
use yii\base\Object;
use yii\filters\AccessControl;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;
use app\models\FollowedChannel;
use app\models\FollowSearch;
use app\components\Category;
use app\components\FollowedChannelService;
use app\components\video\VideoCollection;
use dektrium\user\controllers\SecurityController;
use dektrium\user\Finder;
use yii\helpers\Url;

class SiteController extends SecurityController
{
    const URL_REGEXP_YOUTUBE = '%^# Match any YouTube URL
        (?:https?://)?  # Optional scheme. Either http or https
        (?:www\.)?      # Optional www subdomain
        (?:             # Group host alternatives
          youtu\.be/    # Either youtu.be,
        | youtube\.com  # or youtube.com
          (?:           # Group path alternatives
            /embed/     # Either /embed/
          | /v/         # or /v/
          | /watch\?v=  # or /watch\?v=
          )             # End path alternatives.
        )               # End host alternatives.
        ([\w-]{10,12})  # Allow 10-12 for 11 char YouTube id.
        $%x'
        ;
    const URL_REGEXP_VIMEO = '/https?:\/\/(?:www\.)?vimeo\.com\/(?:channels\/\w+\/)?(\d{2,13})/';

    const VIDEO_TYPE_YOUTUBE = 'youtube';
    const VIDEO_TYPE_VIMEO = 'vimeo';

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
                'only' => ['index', 'categories', 'category', 'logout', 'followChanel', 'channelVideos'],
                'rules' => [
                    [
                        'allow' => true,
                        'roles' => ['@']
                    ]
                ]
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post','get'],
                ],
            ],
        ];
    }

	public function actions()
	{
		return [
			'error' => [
				'class' => 'yii\web\ErrorAction',
			],
			'captcha' => [
				'class' => 'yii\captcha\CaptchaAction',
				'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
			],
		];
	}

	public function actionIndex($offset = 0, $limit=20, $youtubeNextPageToken = NULL)
	{
		$category = new Category();

        $sources = ['youtube', 'vimeo'];
        $videoCollection = new VideoCollection($sources);
        $videos = $videoCollection->getTrendingVideos( ceil($offset/count($sources)), ceil($limit/count($sources)), $youtubeNextPageToken);

        $FollowedChannelService = new FollowedChannelService();
        $jsonChannels = $FollowedChannelService->getAllFollowedChannelCurrentUser(true);


        return $this->render('discovery', [
			'categories' => $category->getCategories(),
            'urlSearch' => '/site/index',
            'videos' => $videos,
            'jsonChannels' => $jsonChannels
		]);
	}

    public function actionExplore($offset = 0, $limit=20, $youtubeNextPageToken = NULL){
        $category = new Category();

        $sources = ['youtube', 'vimeo'];
        $videoCollection = new VideoCollection($sources);
        $videos = $videoCollection->getTrendingVideos( ceil($offset/count($sources)), ceil($limit/count($sources)), $youtubeNextPageToken);

        $FollowedChannelService = new FollowedChannelService();
        $jsonChannels = $FollowedChannelService->getAllFollowedChannelCurrentUser(true);


        return $this->render('discovery', [
            'categories' => $category->getCategories(),
            'urlSearch' => '/site/explore',
            'videos' => $videos,
            'jsonChannels' => $jsonChannels
        ]);
    }

	public function actionLogout()
	{
		Yii::$app->user->logout();
		return $this->goHome();
	}

	public function actionContact()
	{
		$model = new ContactForm();
		if ($model->load(Yii::$app->request->post()) && $model->contact(Yii::$app->params['adminEmail'])) {
			Yii::$app->session->setFlash('contactFormSubmitted');

			return $this->refresh();
		} else {
			return $this->render('contact', [
				'model' => $model,
			]);
		}
	}

    public function actionLogin()
    {
        $this->layout = 'auth.php';
        $model = \Yii::createObject(LoginForm::className());

        $this->performAjaxValidation($model);

        if ($model->load(\Yii::$app->getRequest()->post()) && $model->login()) {
            return $this->goBack();
        }

        return $this->render('/user/security/login', [
            'model'  => $model,
            'module' => Yii::$app->getModule('user'),
        ]);
    }

    public function actionAbout()
    {
        return $this->render('about');
    }

    /**
     * @param $textToSearch
     */
    public function actionVideosearch($textToSearch, $offset = 0, $limit=20, $youtubeNextPageToken = null)
    {
        $textToSearch = trim($textToSearch);

        if (preg_match(self::URL_REGEXP_YOUTUBE, $textToSearch, $res))
        {
            $video_id = $res[1];
            $videoCollection = new VideoCollection(['youtube']);
            $videos = $videoCollection->getVideoById($video_id);
        } elseif (preg_match(self::URL_REGEXP_VIMEO, $textToSearch, $res)) {
            $video_id = $res[1];
            $videoCollection = new VideoCollection(['vimeo']);
            $videos = $videoCollection->getVideoById($video_id);
        } else {
            $sources = ['youtube', 'vimeo'];
            $videoCollection = new VideoCollection($sources);
            $videos = $videoCollection->getVideos($textToSearch, ceil($offset/count($sources)), ceil($limit/count($sources)), $youtubeNextPageToken);
        }



        if (Yii::$app->request->isAjax) {
            \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
            echo '{"youtubeNextPageToken": "'.$videos->getYoutubeNextPageToken().'", "videos": '.$videos->toJson().'}';
        } else {
	        $FollowedChannelService = new FollowedChannelService();
	        $jsonChannels = $FollowedChannelService->getAllFollowedChannelCurrentUser(true);

//	        return $this->render('video_explore', [
//		        'query' => $textToSearch,
//		        'urlSearch' => '/site/videosearch?textToSearch=' . $textToSearch,
//		        'videos' => $videos,
//		        'jsonChannels' => $jsonChannels
//	        ]);

            return $this->render('discovery', [
                'query' => $textToSearch,
                'urlSearch' => '/site/videosearch?textToSearch=' . $textToSearch,
                'videos' => $videos,
                'jsonChannels' => $jsonChannels
            ]);
        }
    }

    public function actionGetchannelbykeyword($textToSearch, $offset = 0, $limit = 3 )
    {
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $items = new VideoCollection(['youtube', 'vimeo']);
        echo '{"channels": '.$items->getChannels($textToSearch, $offset, $limit, NULL, 'any')->toJson().'}';
    }

    public function actionChannelvideos($channel_type, $channel_id, $offset = 0, $limit=20, $youtubeNextPageToken = null)
    {
	    $subtype = Yii::$app->getRequest()->getQueryParam('subtype');
	    $sources = ['youtube', 'vimeo'];
	    $videoCollection = new VideoCollection($sources);
	    $videoCollection->getChannelVideos($offset, $limit, $youtubeNextPageToken, $channel_id, $channel_type, $subtype);

//        echo"<pre>";
//        print_r($videoCollection);
//        echo"</pre>";
//        die();

        $categoryName = unserialize(Yii::$app->cache->get('category-name'));

        if (Yii::$app->request->isAjax)
	    {
		    \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
		    echo '{"youtubeNextPageToken": "'.$videoCollection->getYoutubeNextPageToken().'", "videos": '.$videoCollection->toJson().
                ', "channelInfo":'.$videoCollection->getChannelInfo().', "categoryName": "'.(strlen(trim($categoryName)) > 0 ? $categoryName : 0).'" }';
	    }
	    else {
		    $FollowedChannelService = new FollowedChannelService();
		    $jsonChannels = $FollowedChannelService->getAllFollowedChannelCurrentUser(true);

            return $this->render('discovery', [
                'urlSearch' => '/site/channelvideos?channel_type=' . $channel_type . '&channel_id=' . $channel_id,
                'videos' => $videoCollection,
                'jsonChannels' => $jsonChannels,
                'jsonChannelInfo' => $videoCollection->getChannelInfo(),
                'categoryName' => strlen(trim($categoryName)) > 0 ? $categoryName : 0,
            ]);



//		    return $this->render('video_list', [
//			    'urlSearch' => '/site/channelvideos?channel_type=' . $channel_type . '&channel_id=' . $channel_id,
//			    'videos' => $videoCollection,
//			    'jsonChannels' => $jsonChannels
//		    ]);
	    }
    }

    public function actionCategories()
    {
        $category = new Category();
        return $this->render('categories', [
            'categories' => $category->getCategories()
        ]);
    }

    public function actionCategory($name, $offset = 0, $limit=20, $type='html', $youtubeNextPageToken = NULL)
    {
		$FollowedChannelService = new FollowedChannelService();
		$FollowedChannelService->getAllFollowedChannelCurrentUser();
        $jsonChannels = $FollowedChannelService->getAllFollowedChannelCurrentUser(true);
        $sources = ['youtube', 'vimeo'];
        $items = new VideoCollection($sources);
        $items = $items->getChannels($name, ceil($offset/count($sources)), ceil($limit/count($sources)), $youtubeNextPageToken);
    

//        echo"<pre>";
//        print_r($items);
//        echo"</pre>";
//
//        die();

        Yii::$app->cache->set('category-name', serialize($name), Yii::$app->params['time_name_category_save']);
        $catName = Yii::$app->request->get("name");

        $category = new Category();
        $categories = $category->getCategories();
        
        $catImg = array();
        foreach($categories as $key => $val ){
            if ($val["name"] == $catName)
                $catImg = [
                    "normal" => \Yii::$app->assetManager->getPublishedUrl('../static').$val["normal"],
                    "retina" => \Yii::$app->assetManager->getPublishedUrl('../static').$val["retina"],
                ];
        }

        if ($type!=='json')
        {
//            dbg($items, false);
//            dbg($catImg, false);
//            dbg($jsonChannels);
            
            return $this->render('discovery', [
                'urlSearch' => '/site/category',
                'channels' => $items,
                'name' => $catName,
                'imgs' => $catImg,
                'jsonChannels' => $jsonChannels,
            ]);

//            return $this->render('category',
//                array(
//                    'channels' => $items
//                )
//            );
        }
        else
        {dbg('2');
            \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
            echo '{"youtubeNextPageToken": "'.$items->getYoutubeNextPageToken().'", "channels": '.$items->toJson().'}';
        }
    }

    public function actionFollowChannel()
    {
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        $chanelId = Yii::$app->request->post('id');
        $type = Yii::$app->request->post('type');
        $subtype = Yii::$app->request->post('subtype');
        $name = Yii::$app->request->post('name');
        $image = Yii::$app->request->post('image');

        $followedChannel = new FollowedChannel();
        $followedChannel->chanel_id = $chanelId;
        $followedChannel->user_id = Yii::$app->user->id;
        $followedChannel->type = $type;
        $followedChannel->subtype = $subtype;
        $followedChannel->name = $name;
        $followedChannel->image = $image;

        if ($followedChannel->save()) {
            return [
                "status"=> "success"
            ];
        } else {
            return [
                "status"=> print_r($followedChannel->errors, true)
            ];
        }
    }

    public function actionUnfollowChannel()
    {
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        $chanelId = Yii::$app->request->post('id');
        $type = Yii::$app->request->post('type');
        $subtype = Yii::$app->request->post('subtype');

        $followedChannel = FollowedChannel::findOne([
            'chanel_id' => $chanelId,
            'user_id' => Yii::$app->user->id,
            'type' => $type,
            'subtype' => $subtype
        ]);

        if ($followedChannel === null) {
            return [
                "status"=> "error"
            ];
        } else {
            $followedChannel->delete();
            return [
                "status"=> "success"
            ];
        }
    }

    public function actionTrending($offset = 0, $limit=20, $youtubeNextPageToken = null)
    {
        $sources = ['youtube', 'vimeo'];
        $videoCollection = new VideoCollection($sources);
        $videos = $videoCollection->getTrendingVideos(ceil($offset/count($sources)), ceil($limit/count($sources)), $youtubeNextPageToken);

        if (!Yii::$app->request->isAjax) {
            $FollowedChannelService = new FollowedChannelService();
            $jsonChannels = $FollowedChannelService->getAllFollowedChannelCurrentUser(true);

//            return $this->render('video_list', [
//                'urlSearch' => '/site/trending',
//                'videos' => $videos,
//                'jsonChannels' => $jsonChannels
//            ]);
            return $this->render('discovery', [
                'urlSearch' => '/site/trending',
                'videos' => $videos,
                'jsonChannels' => $jsonChannels
            ]);
        } else {
            \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
            echo '{"youtubeNextPageToken": "'.$videos->getYoutubeNextPageToken().'", "videos": '.$videos->toJson().'}';
        }
    }



    public function actionMyfeed($offset = 0, $limit=20, $youtubeNextPageToken = null)
    {
        $FollowedChannelService = new FollowedChannelService();
        $followedChannels["youtube"] = $FollowedChannelService->getAllFollowedChannelCurrentUser(false, 'youtube');
        $followedChannels["vimeo"] = $FollowedChannelService->getAllFollowedChannelCurrentUser(false, 'vimeo');
        $followedChannels["search"] = $FollowedChannelService->getAllFollowedChannelCurrentUser(false, 'search');
        $sources = ['youtube', 'vimeo', 'search'];

        $videoCollection = new VideoCollection($sources);
        $videos = $videoCollection->getFollowedVideos($followedChannels, $offset, $limit, $youtubeNextPageToken);

        if (!Yii::$app->request->isAjax) {
            $jsonChannels = $FollowedChannelService->getAllFollowedChannelCurrentUser(true);
//			return $this->render('video_list', [
//				'urlSearch' => '/site/myfeed',
//				'videos' => $videos,
//				'jsonChannels' => $jsonChannels,
//			]);
            return $this->render('discovery', [
				'urlSearch' => '/site/myfeed',
				'videos' => $videos,
				'jsonChannels' => $jsonChannels,
			]);
		} else {
			\Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
			echo '{"youtubeNextPageToken": "'.$videos->getYoutubeNextPageToken().'", "videos": '.$videos->toJson().'}';
		}
	}

    public function actionHideVideo($id, $type)
    {
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        $videoId = $id;
        $hiddenVideo = new HiddenVideo();
        $hiddenVideo->video_id = $videoId;
        $hiddenVideo->user_id = Yii::$app->user->id;
        $hiddenVideo->type = $type;
        $hiddenVideo->save();
        return [
            "status"=> "success"
        ];
    }
}
