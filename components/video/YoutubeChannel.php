<?php

namespace app\components\video;

use Yii;
use yii\base\Object;
use app\models\FollowedChannel;

class YoutubeChannel extends Object implements ChannelInterface {
    protected $_title;
    protected $_image;
    protected $_id;
    protected $_description;
    protected $_followed;
    protected $_type;
    protected $_url;
    protected $_subtype;
    protected $_statistic;

    public function __construct($channelId, $data)
    {
        $this->_image = $data->getSnippet()->getThumbnails()->getHigh()->url;
        $this->_id = $channelId;
        $this->_title = $data->getSnippet()->getChannelTitle();
//        $this->_title = $data->getSnippet()->getTitle();
        $this->_description = $data->getSnippet()->getDescription();
        $this->_type = 'youtube';
        $this->_subtype = 'channel';
        $this->_url = $this->getUrl();
        $followedChannel = FollowedChannel::find()->where([
            'chanel_id' =>  $this->_id,
            'user_id' => Yii::$app->user->id,
            'type' => $this->_type
        ])->one();
        $this->_followed = !is_null($followedChannel);
    }

    public function getTitle()
    {
        return $this->_title;
    }

    public function getImage()
    {
        return $this->_image;
    }

    public function setImage($img)
    {
        $this->_image = trim($img);
    }

    public function getUrl()
    {
        return 'http://www.youtube.com/channel/'.$this->_id;
    }

    public function getId()
    {
        return $this->_id;
    }

    public function getDescription()
    {
        return $this->_description;
    }

	public function getType()
	{
		return $this->_type;
	}

    public function getStatistic()
    {
        return $this->_statistic;
    }

    public function setStatistic($stat){
        $this->_statistic = $stat;
    }

    public function toJson()
    {
        return
            [
                'title' => $this->_title,
                'image' => $this->_image,
                'description' => $this->_description,
                'id' => $this->_id,
                'url' => $this->_url,
                'followed' => $this->_followed,
                'type' => $this->_type,
                'subtype' => $this->_subtype,
                'statistic' => $this->_statistic,
            ];
    }

//    public function fillBySearch($data)
//    {
//        $this->_image = $data->getSnippet()->getThumbnails()->getHigh()->url;
//        $this->_id = $data->getSnippet()->getChannelId();
//        $this->_title = $data->getSnippet()->getTitle();
//        $this->_description = $data->getSnippet()->getDescription();
//    }
//
//    public function fillByList($channelId, $data)
//    {
//        $this->_image = $data->getSnippet()->getThumbnails()->getHigh()->url;
//        $this->_id = $data->getSnippet()->getChannelId();
//        $this->_title = $data->getSnippet()->getTitle();
//        $this->_description = $data->getSnippet()->getDescription();
//    }
}