<?php

namespace app\components\video;

use Yii;
use yii\base\Object;
use app\models\FollowedChannel;
use yii\helpers\Url;

class SearchChannel extends Object implements ChannelInterface {
    protected $_title;
    protected $_image;
    protected $_id;
    protected $_description;
    protected $_followed;
    protected $_type;
    protected $_url;
    protected $_subtype;

    public function __construct($data)
    {
        $this->_id = $data->chanel_id;
        $this->_title = $data->chanel_id;
        $this->_description = '';
        $this->_type = 'search';
        $this->_url = $this->getUrl();
    }

    public function getTitle()
    {
        return $this->_title;
    }

    public function getImage()
    {
        return $this->_image;
    }

    public function getUrl()
    {
	    return Url::toRoute(['post/videosearch', 'textToSearch' => $this->_id]);
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
                'subtype' => $this->_subtype
            ];
    }
}