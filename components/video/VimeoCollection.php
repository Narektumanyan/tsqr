<?php

namespace app\components\video;


use Yii;
use yii\base\Object;
use Vimeo\Vimeo;
use app\models\HiddenVideo;

class VimeoCollection extends Object implements ChannelCollectionInterface{
    protected $_service = NULL;
    protected $_advanceService = NULL;
    protected $_items = [];
    protected $_channelInfo = null;

    public function __construct()
    {
        $this->_service = Yii::$app->videoService->getVimeo();
        $this->_advanceService = Yii::$app->videoService->getVimeoAdvanceService();
    }

    public function getChannels($keyword, $offset = 0, $limit = 10)
    {
        $page = round($offset/$limit) + 1;
        $items = $this->_service->request('/channels', array('query' => $keyword, 'per_page' => $limit, 'page' => $page));

//        echo"<pre>";
//        print_r($items);
//        echo"</pre>";

//        echo"<pre>";
//        echo json_encode($items);
////        echo"</pre>";
//        die();

        if (!empty($items['body']['data']))
        {
            foreach ($items['body']['data'] as $item) {
//                echo"<pre>";
////                print_r($item);
//                print_r($item['metadata']['connections']['videos']['total']);
//                echo"</pre>";
//
//                die();

                $vimeoChannel = new VimeoChannel();
                $vimeoChannel->fillByChannel($item);
                $this->_items[] = $vimeoChannel;
            }
        }
        return $this;
    }

    public function getVideos($keyword, $offset, $limit)
    {
        $vimeoVideos = $this->getVideosArray($keyword, $offset, $limit);
        $this->_items = $vimeoVideos;
        return $this;
    }

    /**
     * @param $offset
     * @param $limit
     * @return array
     */
    public function getTrendingVideos($offset, $limit)
    {
        $page = round($offset / $limit) + 1;
        $cache_key = 'trending-vimeo-'.$limit.'-'.$page;
        if (!($vimeoVideos = unserialize(Yii::$app->cache->get($cache_key))))
        {
            $searchResults = $this->_service->request('/channels/staffpicks/videos', array(
                'page' => $page,
                'per_page' => $limit
            ));

            $vimeoVideos = array();
            if (!empty($searchResults['body']['data']))
            {
                foreach ($searchResults['body']['data'] as $vid) {
                    $video = new VimeoVideo();
                    $video->fillFromApi($vid);
                    $vimeoVideos[] = $video;
                }
            }

            Yii::$app->cache->set($cache_key, serialize($vimeoVideos), Yii::$app->params['time_trending_save']);
        }

        $vimeoVideos = $this->removeHiddenVideos($vimeoVideos);
        $this->_items = $vimeoVideos;
        return $this;
    }

	public function getFollowedVideos($followedChannels, $offset, $limit)
    {
		$vimeoVideos = array();
		foreach($followedChannels as $followedChannel){
			if($followedChannel->type == 'vimeo') {
                $vimeoVideosGet = $this->getVideoArrayByChannel($followedChannel->getId(), $offset, $limit, $followedChannel->getSubtype());
			} elseif($followedChannel->type == 'search') {
				$vimeoVideosGet = $this->getVideosArray($followedChannel->id, $offset, $limit);
			}
            if (is_array($vimeoVideosGet))
                $vimeoVideos = array_merge($vimeoVideos, $vimeoVideosGet);
		}

		return $vimeoVideos;
	}


    public function getVideoByChannel($channel_id, $offset, $limit)
    {
        $this->_items = $this->getVideoArrayByChannel($channel_id, $offset, $limit);
        return $this;
    }

	protected function getVideoArrayByChannel($channel_id, $offset, $limit, $subtype = '')
	{
		$page = $limit>0 ? round($offset / $limit) + 1 : 0;
//		$cache_key = 'channel-vimeo-'.$channel_id.'-'.$limit.'-'.$page.'-'.$subtype;
//		$cache_key_channel = 'channel-vimeo-'.$channel_id.'-'.$limit.'-'.$page.'-'.$subtype.'info';
//        if (!($videos = unserialize(Yii::$app->cache->get($cache_key))) || !($this->_channelInfo = unserialize(Yii::$app->cache->get($cache_key_channel))))
//        {
            $videos = [];
    		try {
    			if($subtype == "user"){
    				$searchResults = $this->_service->request('/users/'.$channel_id.'/videos', array(
    					'sort' => 'date',
    					'page' => $page,
    					'per_page' => $limit,
    					'full_response' => 'true',
    				));
    			} else {
    				$searchResults = $this->_service->request('/channels/'.$channel_id.'/videos', array(
    					'sort' => 'date',
    					'page' => $page,
    					'per_page' => $limit,
    					'filter_embeddable' => 'true',
    					'full_response' => 'true',
    				));
    			}




                if (!empty($searchResults['body']['data']))
                {
        			foreach ($searchResults['body']['data'] as $videoVimeo) {
        				$video = new VimeoVideo();
						$video->fillFromApi($videoVimeo);
						$videos[] = $video;
    				}
                }

//                echo"<pre>";
//                print_r($videos);
//                echo"</pre>";
//                die();

                $searchResults = $this->_service->request('/channels/'.$channel_id, array());
                $this->_channelInfo = [
                    "snippet" => array(
                        'title' => $searchResults["body"]["name"],
                        'thumbnails' => [
                            'default' => $searchResults["body"]["header"]["sizes"][0]["link"],
                            'medium' => $searchResults["body"]["header"]["sizes"][0]["link"],
                            'high' => $searchResults["body"]["header"]["sizes"][0]["link"],
                        ],
                    ),
                    "statistics" => array(
                        "viewCount" => "needs to calculate from videos",
                        "videoCount" => $searchResults["body"]["metadata"]["connections"]["videos"]["total"],
                    ),
                    "banners" => array(
                        "1138" => $searchResults["body"]["header"]["sizes"][0]["link"],
                        "2278" => $searchResults["body"]["header"]["sizes"][0]["link"],
                    ),
                    "id" => $channel_id,
                    "type" => "Vimeo",
                ];
                $per_page = 50;
                $page_count = floor($searchResults["body"]["metadata"]["connections"]["videos"]["total"] / $per_page) + 1;
                $views_count = 0;
                for ($i=1; $i <= $page_count; $i++){
                    $searchResults = $this->_service->request('/channels/'.$channel_id."/videos?page=".$i."&per_page=".$per_page, array());
                    foreach($searchResults["body"]["data"] as $video){
                        $views_count += $video["stats"]["plays"];
                    }
                }
                $this->_channelInfo["statistics"]["viewCount"] = $views_count;


    		} catch(\VimeoAPIException $e) {}

//            Yii::$app->cache->set($cache_key, serialize($videos), Yii::$app->params['time_channel_save']);
//            Yii::$app->cache->set($cache_key_channel, serialize($this->_channelInfo), Yii::$app->params['time_channel_save']);
//        }

        $videos = $this->removeHiddenVideos($videos);

		return $videos;
	}

    public function getChannelInfo(){
        return json_encode((array)$this->_channelInfo);
    }

    public function getVideoById($video_id)
    {
        $searchResults = $this->_service->request('/videos/'.$video_id);
        $video = new VimeoVideo();
        $video->fillFromApi($searchResults['body']);
        $videos[] = $video;

        return $videos;
    }

    /**
     * @param $keyword
     * @param $offset
     * @param $limit
     * @return array
     */
    public function getVideosArray($keyword, $offset, $limit = 50)
    {
        $page = round($offset / $limit) + 1;
//        $cache_key = 'searchvideo-vimeo-'.$keyword.'-'.$limit.'-'.$page;
//        if (!($vimeoVideos = unserialize(Yii::$app->cache->get($cache_key))))
//        {

            $filteredItems = [];
            $total = false;
            $searchOffset = $offset;
            $searchLimit = $limit;

            do {
                $searchPage = round($searchOffset / $searchLimit) + 1;

                $items = $this->_service->request('/videos',
                    [
                        'query' => $keyword,
                        'page' => $searchPage,
                        'per_page' => $searchLimit
                    ]
                );

                // исключаем ненужные по content ratings
                if ($searchOffset >= $items["body"]["total"])
                    $total = true;

                foreach ($items["body"]["data"] as $item) {

                    // violence, drugs, language, nudity, safe, unrated
                    // https://developer.vimeo.com/api/playground/contentratings

                    $badRating = [
                        "violence",
                        "drugs",
                        "language",
                        "nudity",
                        "unrated"
                    ];

                    $badVideo = false;
                    foreach($item["content_rating"] as $contentRating){
                        if (in_array($contentRating, $badRating))
                            $badVideo = true;
                    }
                    if (!$badVideo){
                        $filteredItems[] = $item;
                    }
                }
                $searchOffset += $searchLimit;

            }while(count($filteredItems) < $limit && !$total);



            $vimeoVideos = array();
            if (isset($filteredItems) && count($filteredItems) > 0) {
                foreach ($filteredItems as $item) {
                    $video = new VimeoVideo();
                    $video->fillFromApi($item);
                    $vimeoVideos[] = $video;
                }
            }

//            Yii::$app->cache->set($cache_key, serialize($vimeoVideos), Yii::$app->params['time_channel_save']);
//        }
        return $this->removeHiddenVideos($vimeoVideos);
    }

    public function getYoutubeNextPageToken()
    {
        return NULL;
    }

    public function toJson()
    {
        $items = [];
        foreach($this->_items as $item)
        {
            $items[] = $item->toJson();
        }

        return json_encode($items);
    }

    public function toArray()
    {
        return $this->_items;
    }

    public function removeHiddenVideos($videos)
    {
        $hiddenVideos = HiddenVideo::findAll(['user_id' => Yii::$app->user->id, 'type' => 'vimeo']);
        $excludeIds = [];
        $resultVideos = [];
        foreach ($hiddenVideos as $video) {
            $excludeIds[] = $video->video_id;
        }
        foreach($videos as $video) {
            if(!in_array($video->getId() ,$excludeIds)){
                $resultVideos[] = $video;
            }
        }
        return $resultVideos;
    }
}