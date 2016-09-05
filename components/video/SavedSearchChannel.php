<?php

namespace app\components\video;

use Yii;
use yii\base\Object;
use app\models\FollowedChannel;

class SavedSearchChannel extends SearchChannel {

    public function __construct(FollowedChannel $channel)
    {
        $this->_id = $channel->chanel_id;
        $this->_title = $channel->name;
        $this->_description = '';
        $this->_type = 'search';
        $this->_url = $this->getUrl();
    }
}