<?php

namespace app\components\video;

use Yii;
use yii\base\Object;
use app\models\FollowedChannel;

class SavedYoutubeChannel extends YoutubeChannel {
    public function __construct(FollowedChannel $channel)
    {
        $this->_id = $channel->chanel_id;
        $this->_title = $channel->name;
        $this->_image = $channel->image;
        $this->_type = 'youtube';
        $this->_url = $this->getUrl();
        $this->_followed = true;
    }
}