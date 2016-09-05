<?php
/**
 * Created by PhpStorm.
 * User: wight
 * Date: 08.04.15
 * Time: 15:58
 */

namespace app\components\video;

use Yii;

class YoutubeVideo extends Video {

	public function getUrl()
	{
		return 'http://www.youtube.com/watch?v='.$this->_id;
	}

	public function fillFromApi($id,$data)
	{
		//$data = $data->getSnippet();
		$this->_id = $id;
		$this->_url = 'http://www.youtube.com/watch?v='.$this->_id;
		$this->_type = 'youtube';
		$this->_image = $data->getSnippet()->getThumbnails()->getHigh()->url;
		$this->_title = $data->getSnippet()->getTitle();
		$this->_title = $data->getSnippet()->getTitle();
		$this->_description = $data->getSnippet()->getDescription();
		$this->_published_at = $data->getSnippet()->getPublishedAt();

		//$youtubeService = Yii::$app->videoService->getYoutube();
		//$videoDetails = $youtubeService->videos->listVideos('snippet,contentDetails,statistics',
		//	array('id' => $this->_id))->getItems();

		$this->_view_count = $data->getStatistics()->getViewCount();
		$this->_channel_title = $data->getSnippet()->getChannelTitle();
		$this->_channel_id = $data->getSnippet()->getChannelId();
		$this->_channel_url = 'http://www.youtube.com/channel/'.$this->_channel_id;

		$start = new \DateTime('@0');
		$start->add(new \DateInterval($data->getContentDetails()->getDuration()));
		$this->_duration = $start->format('i:s');
	}
}