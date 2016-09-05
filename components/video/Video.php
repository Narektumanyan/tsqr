<?php

namespace app\components\video;

use Yii;
use yii\base\Object;

class Video extends Object{
	protected $_type;
	protected $_title;
	protected $_image;
	protected $_id;
    protected $_url;
	protected $_description;
	protected $_published_at;
	protected $_channel_id;
    protected $_channel_title;
    protected $_channel_url;
	protected $_channel_subtype;
	protected $_view_count;
	protected $_duration;
	protected $_width;
	protected $_height;

	/**
	 * @return mixed
	 */
	public function getDuration()
	{
		return $this->_duration;
	}

	/**
	 * @return mixed
	 */
	public function getViewCount()
	{
		return $this->_view_count;
	}

	/**
	 * @return mixed
	 */
	public function getChannelId()
	{
		return $this->_channel_id;
	}

	/**
	 * @return mixed
	 */
	public function getPublishedAt()
	{
		return $this->_published_at;
	}

	/**
	 * @return mixed
	 */
	public function getChannelAuthor()
	{
		return $this->_channel_author;
	}

	public function getType()
	{
		return $this->_type;
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
		return NULL;
	}

	public function getId()
	{
		return $this->_id;
	}

	public function getDescription()
	{
		return $this->_description;
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
				'type' => $this->_type,
				'published_at' => $this->_published_at,
				'channel_id' => $this->_channel_id,
                'channel_title' => $this->_channel_title,
                'channel_url' => $this->_channel_url,
                'channel_subtype' => $this->_channel_subtype,
				'view_count' => $this->_view_count,
				'duration' => $this->_duration,
				'width' => $this->_width,
				'height' => $this->_height,
			];
	}
}
