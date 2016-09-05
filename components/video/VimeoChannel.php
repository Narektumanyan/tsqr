<?php

namespace app\components\video;

use Yii;
use yii\base\Object;
use app\models\FollowedChannel;

class VimeoChannel extends Object implements ChannelInterface
{
	const SUBTYPE_CHANNEL = 'channel';
	const SUBTYPE_USER = 'user';
	protected $_title;
	protected $_image;
	protected $_id;
	protected $_description;
	protected $_followed;
	protected $_type;
	protected $_url;
	protected $_subtype;
	protected $_statistic;
	protected $_size;

	public function fillByChannel($data)
	{
		$this->_image = $data['header']['sizes'][0]['link'];
		$this->_id = explode('/', $data['uri'])[2];
		$this->_title = $data['name'];
		$this->_description = $data['description'];
		$this->_type = 'vimeo';
        $this->_subtype = 'channel';
		$this->_subtype = VimeoChannel::SUBTYPE_CHANNEL;
        $this->_size = [
            'width' => $data['width'],
            'height' => $data['height'],
        ];
		$followedChannel = FollowedChannel::find()->where([
			'chanel_id' => $this->_id,
			'user_id' => Yii::$app->user->id,
			'type' => $this->_type
		])->one();
		$this->_followed = !is_null($followedChannel);
		$this->_statistic = [
            'videoCount' => $data['metadata']['connections']['videos']['total']
        ];
	}

	public function fillByAdvanced($data)
	{
		$this->_id = $data->id;

		$this->_title = $data->name;
		$this->_description = $data->description;
		$this->_type = 'vimeo';
		$this->_subtype = VimeoChannel::SUBTYPE_CHANNEL;
		$followedChannel = FollowedChannel::find()->where([
			'chanel_id' => $this->_id,
			'user_id' => Yii::$app->user->id,
			'type' => $this->_type
		])->one();
		$this->_followed = !is_null($followedChannel);
	}

	public function fillByUser($data)
	{
		$this->_id = $data->id;
		$this->_title = $data->display_name;
		$this->_description = '';
		$this->_type = 'vimeo';
		$this->_subtype = VimeoChannel::SUBTYPE_USER;
		$this->_followed = false;

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
		if ($this->subtype == VimeoChannel::SUBTYPE_USER)
		{
			return 'https://vimeo.com/user'.$this->_id;
		}
		else
		{
			return 'https://vimeo.com/channels/' . $this->_id;
		}
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

	public function getSubtype()
	{
		return $this->_subtype;
	}

	public function toJson()
	{
		return
			[
				'title' => $this->_title,
				'image' => $this->_image,
				'description' => $this->_description,
				'id' => $this->_id,
				'url' => $this->url,
				'followed' => $this->_followed,
				'type' => $this->_type,
				'subtype' => $this->_subtype,
                'statistic' => $this->_statistic,
                'size' => $this->_size,
			];
	}
}