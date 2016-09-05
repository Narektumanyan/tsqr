<?php

namespace app\components\video;

use Yii;
use yii\base\Object;
use app\models\FollowedChannel;

class SavedVimeoChannel extends VimeoChannel
{
	public function __construct(FollowedChannel $channel)
    {
        $this->_id = $channel->chanel_id;
        $this->_title = $channel->name;
        $this->_image = $channel->image;
        $this->_type = 'vimeo';
        $this->_subtype = $channel->subtype;
        $this->_followed = true;
    }
}