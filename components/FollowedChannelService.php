<?php

namespace app\components;

use Yii;
use app\models\FollowedChannel;
use app\components\video\SavedYoutubeChannel;
use app\components\video\SavedVimeoChannel;
use app\components\video\SavedSearchChannel;

/**
 * Class FollowedChannelService
 */
class FollowedChannelService
{
	const VIMEO_TYPE = 'vimeo';
	//const VIMEO_USER_TYPE = 'vimeo_user';
	const YOUTUBE_TYPE = 'youtube';

	/**
	 * @param bool $getInJson
	 * @return array|string
	 */
	public function getAllFollowedChannelCurrentUser($getInJson = false, $type = false)
	{
//        var_dump($getInJson);
//        var_dump($type);
		if ($getInJson) {
			$channels = $this->getAllFollowedChannelUser(Yii::$app->user->id, $type);
			$items = array();
			foreach ($channels as $channel) {
				$items[] = $channel->toJson();
			}
			return count($items) > 0 ? json_encode($items) : 0;
		} else {
			return $this->getAllFollowedChannelUser(Yii::$app->user->id, $type);
		}
	}

	/**
	 * @param $userId
	 * @return array
	 */

	public function getAllFollowedChannelUser($userId, $type = false)
	{
		if ($type) {
			/*if ($type == FollowedChannelService::VIMEO_TYPE) {
				$type = [FollowedChannelService::VIMEO_TYPE, FollowedChannelService::VIMEO_USER_TYPE];
			}*/
			$followedChannels = FollowedChannel::find()->where(['user_id' => $userId, 'type' => $type])->all();
		} else {
			$followedChannels = FollowedChannel::find()->where(['user_id' => $userId])->all();
		}

		$youtubeService = Yii::$app->videoService->getYoutube();
		$vimeoAdvanceService = Yii::$app->videoService->getVimeoAdvanceService();
		$resultChannels = array();

//        echo"<pre>";
//        print_r($followedChannels);
//        echo"</pre>";
//        die();

		foreach ($followedChannels as $followedChannel) {
			if ($followedChannel->type == FollowedChannelService::VIMEO_TYPE) {
				$resultChannels[] = $this->getChanelByVimeo($followedChannel);
			} elseif ($followedChannel->type == 'search') {
				$resultChannels[] = $this->getChanelBySearch($followedChannel);
			} else {
				$resultChannels[] = $this->getChanelByYoutubeItem($followedChannel);
			}
		}

		return $resultChannels;
	}

	public function getChanelByVimeo(FollowedChannel $item)
	{
		return new SavedVimeoChannel($item);
	}

	public function getChanelBySearch(FollowedChannel $item)
	{
		return new SavedSearchChannel($item);
	}

	public function getChanelByYoutubeItem(FollowedChannel $item)
	{
		return new SavedYoutubeChannel($item);
	}

	/**
	 * @param $followedChannels
	 * @param $chanelId
	 * @return null
	 */
	public function findFollowedChannelByChanelId($followedChannels, $chanelId)
	{
		foreach ($followedChannels as $followedChannel) {
			if ($followedChannel->chanel_id = $chanelId) {
				return $followedChannel;
			}
		}
		return null;
	}
}