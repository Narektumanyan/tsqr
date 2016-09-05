<?php

namespace app\components\video;

use Yii;
use yii\base\Object;
use app\models\HiddenVideo;

class YoutubeCollection extends Object implements ChannelCollectionInterface{
    protected $_service = NULL;
    protected $_items = [];
    protected $_youtubeNextPageToken = NULL;
    protected $_channelInfo = null;

    public function __construct()
    {
        $this->_service = Yii::$app->videoService->getYoutube();
    }

    public function getChannelInfo(){
        return json_encode((array)$this->_channelInfo);
    }

    public function getChannels($keyword, $offset = 0, $limit = 10, $youtubeNextPageToken = NULL, $channelType = 'show')
    {
        $maxResults = $offset+$limit;
        try {
//            \Yii::getLogger()->log('before send', (new DateTime())->format('d.m.y'));
//            \Yii::info('before send', (new DateTime())->format('d.m.y'));
            $result = $this->_service->search->listSearch('snippet',
                array('q' => $keyword, 'type' => 'channel', 'channelType' => $channelType, 'maxResults' => $limit, 'pageToken' => $youtubeNextPageToken));
            $items = $result->getItems();

//            \Yii::info('after send', (new DateTime())->format('d.m.y'));

            $this->_youtubeNextPageToken = $result->nextPageToken;
            $channelsIdsAr = array();
            foreach ($items as $key => $item) {
                $this->_items[] = new YoutubeChannel($item->getSnippet()->getChannelId(), $item);
                $channelsIdsAr[] = $item->getSnippet()->getChannelId();
            }



            $channelsIds = implode(",", $channelsIdsAr);

            if (strlen(trim($channelsIds)) > 0){
                $youtybeChannels = $this->_service->channels->listChannels('snippet',
                    array(
                        'id' => $channelsIds,
                        'part' => 'statistics,snippet',
//                        'id' => 'UC8WfLAjdSgW9TiJ9YLSrc_g',
//                        'part' => 'brandingSettings,contentDetails,contentOwnerDetails,id,invideoPromotion,snippet,statistics,status,topicDetails',
                    ))->getItems();

//                echo"<pre>";
//                print_r($youtybeChannels);
//                echo"</pre>";
//
//                die();


                $statisticsAr = array();
                foreach($youtybeChannels as $channel){
                    $statisticsAr[$channel->id]["statistic"] = $channel->getStatistics();
                    $statisticsAr[$channel->id]["snippet"] = $channel->getSnippet();

                    $result = $this->_service->search->listSearch('id',
                        array('channelId'=>$channel->id, 'type' => 'video', 'maxResults' => 1, 'pageToken' => $youtubeNextPageToken, 'order' => 'date'));
//                    array('channelId'=>'UC8WfLAjdSgW9TiJ9YLSrc_g', 'type' => 'video', 'maxResults' => 1, 'pageToken' => $youtubeNextPageToken, 'order' => 'date'));
                    $items = $result->getItems();
                    $videoIds = [];

                    foreach ($items as $key => $item) {
                        $videoIds[] = $item->getId()->getVideoId();
                    }
                    $result = $this->_service->videos->listVideos('id,snippet,statistics',
                        array('id'=>implode(',', $videoIds)));
                    $items = $result->getItems();

                    $statisticsAr[$channel->id]["publishedAt"] = is_object($items[0]) ? $items[0]->getSnippet()["publishedAt"] : "";

                }
                foreach($this->_items as $item){
                    $itemId = $item->getId();
                    if (in_array($itemId, array_keys($statisticsAr))){
//                        echo"<pre>";
//                        print_r($statisticsAr[$itemId]['snippet']->getThumbnails()->default->url);
//                        echo"</pre>";
//                        die();

                        $item->setImage($statisticsAr[$itemId]['snippet']->getThumbnails()->default->url);

                        $item->setStatistic(array(
                            "viewCount" => $statisticsAr[$itemId]["statistic"]->viewCount,
                            "videoCount" => $statisticsAr[$itemId]["statistic"]->videoCount,
                            "subscriberCount" => $statisticsAr[$itemId]["statistic"]->subscriberCount,
                            "commentCount" => $statisticsAr[$itemId]["statistic"]->commentCount,
                            "lastActivity" => $statisticsAr[$channel->id]["publishedAt"],
                        ));
                    }
                }
            }

        } catch(\Google_Service_Exception $e) {}

        return $this;
    }


    public function getTrendingChannels()
    {
        $youtubeService = Yii::$app->videoService->getYoutube();
        $result = $youtubeService->video->listChannels('snippet', array(
            'chart' => 'mostPopular'
        ));
        foreach($result->getItems() as $item){
            $this->_items[] = new YoutubeChannel($item->getSnippet()->getChannelId(), $item);
        }

        return $this;
    }

	public function getVideos($keyword, $offset, $limit, $youtubeNextPageToken = NULL)
    {
        $this->_items = $this->getVideosArray($keyword, $offset, $limit, $youtubeNextPageToken);
        return $this;
    }

    public function getVideoById($video_id)
    {
        $result = $this->_service->videos->listVideos('id,snippet,contentDetails,statistics', array('id'=>$video_id));
        $items = $result->getItems();
        foreach ($items as $key => $item) {
            $video = new YoutubeVideo();
            $video->fillFromApi($video_id, $item);
            $videos[] = $video;
        }

        return $videos;
    }

    /**
     * @param $offset
     * @param $limit
     * @return array
     */
    public function getTrendingVideos($offset, $limit, $youtubeNextPageToken = NULL)
    {
        $maxResults = $offset + $limit;
        $cache_key = 'trending-youtube-'.$limit.'-'.$youtubeNextPageToken;
        if (!($result = unserialize(Yii::$app->cache->get($cache_key))))
        {
            $result = $this->_service->videos->listVideos('id,snippet,contentDetails,statistics',
            array('chart' => 'mostPopular', 'maxResults' => $limit, 'pageToken' => $youtubeNextPageToken));

            $youtubeVideos = [];
            foreach ($result->getItems() as $key => $item) {
                $video = new YoutubeVideo();
                $video->fillFromApi($item->getId(), $item);
                $youtubeVideos[] = $video;
            }

            $result = [
                'youtubeNextPageToken' => $result->nextPageToken,
                'items' => $youtubeVideos
            ];

            Yii::$app->cache->set($cache_key, serialize($result), Yii::$app->params['time_trending_save']);
        }

        $this->_youtubeNextPageToken = $result['youtubeNextPageToken'];
        $this->_items = $this->removeHiddenVideos($result['items']);
        return $this;
    }


    public function getVideoByChannel($channel_id, $offset, $limit, $youtubeNextPageToken = NULL)
    {

        $this->_items = $this->getVideoArrayByChannel($channel_id, $offset, $limit, $youtubeNextPageToken);

//        $cache_key = 'channel-youtube-'.$channel_id.'-'.$limit.'-'.$youtubeNextPageToken.'-youtybeChannelInfo';
//        if (!($youtybeChannel = unserialize(Yii::$app->cache->get($cache_key))))
//        {
        $youtybeChannel = $this->_service->channels->listChannels('snippet',
            array(
                'id' => $channel_id,
                'part' => 'brandingSettings,snippet,statistics',
//                'id' => 'UC8WfLAjdSgW9TiJ9YLSrc_g',
//                'part' => 'brandingSettings,contentDetails,contentOwnerDetails,id,invideoPromotion,snippet,statistics,status,topicDetails',
            ))->getItems();
//            Yii::$app->cache->set($cache_key, serialize($youtybeChannel), Yii::$app->params['time_channel_save']);
//        }

        if (is_object($youtybeChannel[0])) {
            $bannerImages = $youtybeChannel[0]->getBrandingSettings()->getImage();

            $banners = [
//            "bannerImageUrl" => $bannerImages["bannerImageUrl"], // 1060 x 175
//            "1060" => $bannerImages["bannerImageUrl"], // 1060 x 175

//            "bannerTabletImageUrl" => $bannerImages["bannerTabletImageUrl"], // 1707 x 282
//            "bannerTabletLowImageUrl" => $bannerImages["bannerTabletLowImageUrl"], // 1138 x 188
//            "bannerTabletHdImageUrl" => $bannerImages["bannerTabletHdImageUrl"], // 2278 x 377
//            "bannerTabletExtraHdImageUrl" => $bannerImages["bannerTabletExtraHdImageUrl"], // 2560 x 424

//            "1707" => $bannerImages["bannerTabletImageUrl"], // 1707 x 282
                "690" => $bannerImages["bannerMobileMediumHdImageUrl"], // 690 x 263

                "1138" => $bannerImages["bannerTabletLowImageUrl"], // 1138 x 188
                "2278" => $bannerImages["bannerTabletHdImageUrl"], // 2278 x 377
//            "2560" => $bannerImages["bannerTabletExtraHdImageUrl"], // 2560 x 424

//            "bannerMobileImageUrl" => $bannerImages["bannerMobileImageUrl"], // 640 x 175
//            "bannerMobileLowImageUrl" => $bannerImages["bannerMobileLowImageUrl"], // 320 x 88
//            "bannerMobileMediumHdImageUrl" => $bannerImages["bannerMobileMediumHdImageUrl"], // 690 x 263


//            "bannerMobileExtraHdImageUrl" => $bannerImages["bannerMobileExtraHdImageUrl"], // 1140 x 395
//            "bannerMobileHdImageUrl" => $bannerImages["bannerMobileHdImageUrl"], // 1280 x 351

//            "bannerTvHighImageUrl" => $bannerImages["bannerTvHighImageUrl"], // 1920 x 1080
//            "bannerTvImageUrl" => $bannerImages["bannerTvImageUrl"], // 2120 x 1192
//            "bannerTvLowImageUrl" => $bannerImages["bannerTvLowImageUrl"], // 854 x 480
//            "bannerTvMediumImageUrl" => $bannerImages["bannerTvMediumImageUrl"], // 1280 x 720
            ];

            $snippet = [
                'title' => $youtybeChannel[0]->getSnippet()['title'],
                'thumbnails' => [
                    'default' => $youtybeChannel[0]->getSnippet()->getThumbnails()['default']['url'],
                    'medium' => $youtybeChannel[0]->getSnippet()->getThumbnails()['medium']['url'],
                    'high' => $youtybeChannel[0]->getSnippet()->getThumbnails()['high']['url'],
                ],
            ];

            $statistic = [
                "viewCount" => $youtybeChannel[0]->getStatistics()["viewCount"],
                "videoCount" => $youtybeChannel[0]->getStatistics()["videoCount"],
            ];

            $this->_channelInfo = [
                "snippet" => $snippet,
                "statistics" => $statistic,
                "banners" => $banners,
                "id" => $youtybeChannel[0]->getId(),
                "type" => "Youtube",
            ];
        }

        return $this;
    }

	public function getFollowedVideos($followedChannels, $offset, $limit, $youtubeNextPageToken = NULL)
	{
		$youtubeVideos = [];


		foreach($followedChannels as $followedChannel){
			if($followedChannel->type == 'youtube') {
				$videosGet = $this->getVideoArrayByChannel($followedChannel->getId(), $offset, $limit, $youtubeNextPageToken);
			} elseif($followedChannel->type == 'search') {
				$videosGet = $this->getVideosArray($followedChannel->id, $offset, $limit, $youtubeNextPageToken);
			}
			$youtubeVideos = array_merge($youtubeVideos, $videosGet);
		}

		return $youtubeVideos;
	}

    /**
     * @param $keyword
     * @param $offset
     * @param $limit
     * @return array
     */
    public function getVideosArray($keyword, $offset, $limit, $youtubeNextPageToken = NULL)
    {
        $cache_key = 'searchvideo-youtube-'.$keyword.'-'.$limit.'-'.$youtubeNextPageToken;
        if (!($videos = unserialize(Yii::$app->cache->get($cache_key))))
        {
            $result = $this->_service->search->listSearch('snippet',
                array('q' => $keyword, 'type' => 'video', 'maxResults' => $limit, 'pageToken' => $youtubeNextPageToken ));
            $items = $result->getItems();
            $videos['youtubeNextPageToken'] = $result->nextPageToken;

            $videoIds = [];
            foreach ($items as $key => $item) {
                $videoIds[] = $item->getId()->getVideoId();
            }

            $result = $this->_service->videos->listVideos('id,snippet,contentDetails,statistics',
                array('id'=>implode(',', $videoIds)));
            $items = $result->getItems();
            foreach ($items as $key => $item) {
                $video = new YoutubeVideo();
                $video->fillFromApi($item->getId(), $item);
                $videos['items'][] = $video;
            }

            Yii::$app->cache->set($cache_key, serialize($videos), Yii::$app->params['time_channel_save']);
        }

        $this->_youtubeNextPageToken = $videos['youtubeNextPageToken'];
        return $this->removeHiddenVideos($videos['items']);
    }


    /**
     * @return array
     */
    public function getHiddenIds()
    {
        $hiddenVideos = HiddenVideo::findAll(['user_id' => Yii::$app->user->id, 'type' => 'youtube']);
        $exclude_str = "";
        if (!is_null($hiddenVideos)) {
            foreach ($hiddenVideos as $video) {
                $exclude_str .= " -{$video->video_id}";
            }

        }
        return $exclude_str;
    }

	protected function getVideoArrayByChannel($channel_id, $offset, $limit, $youtubeNextPageToken = NULL)
	{
//        $cache_key = 'channel-youtube-'.$channel_id.'-'.$limit.'-'.$youtubeNextPageToken;
//        if (!($videos = unserialize(Yii::$app->cache->get($cache_key))))
//        {
//        $cache_key = 'channel-youtube-'.$channel_id.'-'.$limit.'-'.$youtubeNextPageToken.'-items';
//        if (!($items = unserialize(Yii::$app->cache->get($cache_key))))
//        {
            $result = $this->_service->search->listSearch('id',
                array('channelId'=>$channel_id, 'type' => 'video', 'maxResults' => $limit, 'pageToken' => $youtubeNextPageToken, 'order' => 'date'));

            $items = $result->getItems();
            $videos['youtubeNextPageToken'] = $result->nextPageToken;
            $videoIds = [];

//            Yii::$app->cache->set($cache_key, serialize($items), Yii::$app->params['time_channel_save']);
//        }

//        $cache_key = 'channel-youtube-'.$channel_id.'-'.$limit.'-'.$youtubeNextPageToken.'-videos';
//        if (!($videos = unserialize(Yii::$app->cache->get($cache_key))))
//        {


            foreach ($items as $item) {
                $videoIds[] = $item->getId()->getVideoId();
            }

            $result = $this->_service->videos->listVideos('id,snippet,contentDetails,statistics',
                array('id'=>implode(',', $videoIds)));
            $items = $result->getItems();

            $videos['items'] = [];
            foreach ($items as $item) {
                $video = new YoutubeVideo();
                $video->fillFromApi($item->getId(), $item);
                $videos['items'][] = $video;
            }

//            Yii::$app->cache->set($cache_key, serialize($videos), Yii::$app->params['time_channel_save']);
//        }

//            Yii::$app->cache->set($cache_key, serialize($videos), Yii::$app->params['time_channel_save']);
//        }

//        die();

        $this->_youtubeNextPageToken = $videos['youtubeNextPageToken'];
    	return $this->removeHiddenVideos($videos['items']);
	}

    public function getYoutubeNextPageToken()
    {
        return $this->_youtubeNextPageToken;
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
		$hiddenVideos = HiddenVideo::findAll(['user_id' => Yii::$app->user->id, 'type' => 'youtube']);
		$excludeIds = [];
		$resultVideos = [];
		foreach ($hiddenVideos as $video) {
			$excludeIds[] = $video->video_id;
		}
		foreach($videos as $video) {
			if(!in_array($video->getId(),$excludeIds)){
				$resultVideos[] = $video;
			}
		}
		return $resultVideos;
	}
}