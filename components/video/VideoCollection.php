<?php

namespace app\components\video;


use Yii;
use yii\base\Object;
use app\components\video\VimeoCollection;
use app\components\video\YoutubeCollection;

class VideoCollection extends Object {
    protected $_youtube = false;
    protected $_vimeo = false;
	protected $_search = false;
    protected $_items = [];
    protected $_serviceVimeo;
    protected $_serviceYoutube;
    protected $_youtubeNextPageToken;
    protected $_stopPaging = false;
    protected $_channelInfo = false;

    public function __construct($providers = [])
    {
        $this->_serviceVimeo =  Yii::$app->videoService->getVimeo();
        $this->_serviceYoutube = Yii::$app->videoService->getYoutube();
        if (in_array('youtube', $providers))
        {
            $this->_youtube = true;
        }

        if (in_array('vimeo', $providers))
        {
            $this->_vimeo = true;
        }

	    if (in_array('search', $providers))
	    {
		    $this->_search = true;
	    }
    }


    public function getChannels($name, $offset = 0, $limit = 10, $youtubeNextPageToken = NULL, $channelType = 'show')
    {
        if ($this->_youtube === true AND $this->_vimeo === true)
        {
            $items = new YoutubeCollection();
            $youtube = $items->getChannels($name, $offset, ceil(($limit+1)/2), $youtubeNextPageToken, $channelType)->toArray();

//            echo"<pre>";
//            print_r($youtube);
//            echo"</pre>";
//            die();

            $this->_youtubeNextPageToken = $items->getYoutubeNextPageToken();

            $items = new VimeoCollection();
            $vimeo = $items->getChannels($name, $offset, ceil(($limit+1)/2))->toArray();

//            echo"<pre>";
//            print_r($youtube);
//            echo"</pre>";
//
//            die();

            if (count($youtube) > count($vimeo))
            {
                $source = 'youtube';
                $source2 = 'vimeo';
            }
            else
            {
                $source = 'vimeo';
                $source2 = 'youtube';
            }

            foreach($$source as $key => $y)
            {
                $this->_items[] = $y;
                if (!empty(${$source2}[$key]))
                    $this->_items[] = ${$source2}[$key];
            }
            shuffle($this->_items);
            $this->_items = array_slice($this->_items, 0, $limit);
        }
        else
        {
            if ($this->_youtube === true)
            {
                $items = new YoutubeCollection();
                $this->_items = $items->getChannels($name, $offset, $limit, $youtubeNextPageToken, $channelType)->toArray();
                $this->_youtubeNextPageToken = $items->getYoutubeNextPageToken();
            }
            if ($this->_vimeo === true)
            {
                $items = new VimeoCollection();
                $this->_items = $items->getChannels($name, $offset, $limit)->toArray();
            }
        }

        return $this;
    }

//    public function getChannelInfo($channel_id, $channel_type="youtube"){
//        if ($channel_type == "youtube"){
//            $youtubeCollection = new YoutubeCollection();
//            $this->_channel = $youtubeCollection->getChannelInfo($channel_id);
//
//            return $this;
//        }
//        if ($channel_type == "vimeo"){}
//    }

    public function getVideoById($video_id)
    {
        if ($this->_youtube === true)
        {
            $items = new YoutubeCollection;
        }
        else
        {
            $items = new VimeoCollection;
        }

        $this->_items = $items->getVideoById($video_id);
        $this->_stopPaging = true;

        return $this;
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

    public function getYoutubeNextPageToken()
    {
        if ($this->_youtube === true)
        {
            return $this->_youtubeNextPageToken;
        }
        else
        {
            return NULL;
        }
    }

    public function stopPaging()
    {
        return $this->_stopPaging;
    }

    public function getVideos($keyword, $offset = 0, $limit = 10, $youtubeNextPageToken = NULL)
    {
        $vimeoCollection = new VimeoCollection();
        $youtubeCollection = new YoutubeCollection();

        $vimeoVideos = $vimeoCollection->getVideos($keyword, $offset, $limit);
        $youtubeVideos = $youtubeCollection->getVideos($keyword, $offset, $limit, $youtubeNextPageToken);

        $this->_items = $this->shuffleVideos($youtubeVideos->toArray(), $vimeoVideos->toArray());

//        echo"<pre>";
//        print_r([count($this->_items), count($youtubeVideos->toArray()), count($vimeoVideos->toArray())]);
//        echo"</pre>";
//
//        die();

	    $this->_youtubeNextPageToken = $youtubeVideos->getYoutubeNextPageToken();

        return $this;
    }

    public function getChannelInfo(){
        return $this->_channelInfo;
    }

    public function getChannelVideos($offset, $limit, $youtubeNextPageToken = null, $channel_id, $channel_type, $subtype = ""){
        switch($channel_type){
            case 'youtube':
                $youtubeCollection = new YoutubeCollection();
                $youtubeVideos = $youtubeCollection->getVideoByChannel($channel_id, $offset, $limit, $youtubeNextPageToken);
                $this->_youtubeNextPageToken = $youtubeVideos->getYoutubeNextPageToken();
                $this->_items = $youtubeVideos->toArray();
                $this->_channelInfo = $youtubeVideos->getChannelInfo();
                return $this;

                break;
            case 'vimeo':
                $vimeoCollection = new VimeoCollection();
                $vimeoVideos = $vimeoCollection->getVideoByChannel($channel_id, $offset, $limit);

                $this->_items = $vimeoVideos->toArray();

//                echo"<pre>";
//                print_r($this->_items);
//                echo"</pre>";
//                die();

                $this->_channelInfo = $vimeoVideos->getChannelInfo();
                return $this;
                break;
            case 'search':
                $vimeoCollection = new VimeoCollection();
                $youtubeCollection = new YoutubeCollection();

                $vimeoVideos = $vimeoCollection->getVideos($channel_id, $offset, $limit);
                $youtubeVideos = $youtubeCollection->getVideos($channel_id, $offset, $limit, $youtubeNextPageToken);

                $this->_items = $this->shuffleVideos($youtubeVideos->toArray(), $vimeoVideos->toArray());
                $this->_youtubeNextPageToken = $youtubeVideos->getYoutubeNextPageToken();

//                var_dump($channel_id);
//                die();

                $this->_channelInfo = json_encode([
                    "snippet" => [
                        'title' => $channel_id,
                        'thumbnails' => [],
                    ],
                    "statistics" => [
                        "viewCount" => "needs to calculate from videos",
                        "videoCount" => "not calculating",
                    ],
                    "banners" => [],
                    "id" => $channel_id,
                    "type" => "Search",
                ]);
                break;
        }
    }

    public function getTrendingVideos($offset = 0, $limit = 10, $youtubeNextPageToken = NULL)
    {
        $vimeoCollection = new VimeoCollection();
        $youtubeCollection = new YoutubeCollection();

        $vimeoVideos = $vimeoCollection->getTrendingVideos( $offset, $limit);
        $youtubeVideos = $youtubeCollection->getTrendingVideos($offset, $limit, $youtubeNextPageToken);
        $this->_items = $this->shuffleVideos($youtubeVideos->toArray(), $vimeoVideos->toArray());
	    $this->_youtubeNextPageToken = $youtubeCollection->getYoutubeNextPageToken();

        return $this;
    }

	protected function getVideoCount($count, $limit)
	{
		if($count > 0 && $limit % $count == 0) {
			return  $count > 0 ? $limit/$count  : 0;
		}
		else {
			return  $count > 0 ? intval($limit / $count + 1) : 0;
		}
	}

	public function getFollowedVideos($followedChannels ,$offset = 0, $limit = 20, $youtubeNextPageToken = NULL)
	{
		$vimeoCollection = new VimeoCollection();
		$youtubeCollection = new YoutubeCollection();
		$count = count($followedChannels['vimeo']) + count($followedChannels['youtube']) + count($followedChannels['search']) * 2;
		$showCount = $this->getVideoCount($count, $limit);
		$offset = $this->getVideoCount($count, $offset);
		$mixForYoutube = $followedChannels['vimeo'];
		$vimeoVideos = $vimeoCollection->getFollowedVideos(array_merge($followedChannels['vimeo'], $followedChannels['search']), $offset, $showCount);
		$youtubeVideos = $youtubeCollection->getFollowedVideos(array_merge($followedChannels['youtube'], $followedChannels['search']), $offset, $showCount, $youtubeNextPageToken);
		$this->_youtubeNextPageToken = $youtubeCollection->getYoutubeNextPageToken();

		$this->_items = array_merge($youtubeVideos, $vimeoVideos);

		return $this;
	}
    /**
     * @param $youtubeVideos
     * @param $vimeoVideos
     * @return array
     */
    private function shuffleVideos($youtubeVideos, $vimeoVideos)
    {
        $resultVideos = array();
        $maxArrVideos = (count($youtubeVideos) >= count($vimeoVideos)) ? $youtubeVideos : $vimeoVideos;
        $minArrVideos = (count($youtubeVideos) < count($vimeoVideos)) ? $youtubeVideos : $vimeoVideos;
        foreach ($maxArrVideos as $id => $video) {
            $resultVideos[] = $video;
            if (isset($minArrVideos[$id])) {
                $resultVideos[] = $minArrVideos[$id];
            }
        }
        return $resultVideos;
    }
}