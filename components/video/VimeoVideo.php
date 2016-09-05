<?php

namespace app\components\video;

use Yii;


class VimeoVideo extends Video {

	public function getUrl()
	{
		return 'https://vimeo.com/'.$this->_id;
	}

	public function fillFromApi($data)
	{
//        echo"<pre>";
//        print_r($data);
//        echo"</pre>";
//        die();

		$this->_id = explode('/',$data['uri'])[2];
		$this->_url = 'https://vimeo.com/'.$this->_id;
		$this->_type = 'vimeo';
		$this->_image = $data['pictures']['sizes'][2]['link'];
		$this->_title = $data['name'];
		$this->_description = $data['description'];
		$this->_published_at = $data['created_time'];

		$this->_channel_id = '';
		$this->_channel_title = '';

		$this->_channel_id = explode('/', $data['user']['uri'])[2];
		$this->_channel_title = $data['user']['name'];
		$this->_channel_url = $data['user']['link'];
		$this->_channel_subtype = 'user';

		$this->_view_count = $data['stats']['plays'];
		$this->_duration = date("i:s",$data['duration']);

        $this->_width = $data['width'];
        $this->_height = $data['height'];
	}

	public function fillFromAdvancedApi($data)
	{
		$this->_id = $data->id;
		$this->_type = 'vimeo';
		$this->_image = $data->thumbnails->thumbnail[1]->_content;
		$this->_title = $data->title;
		$this->_description = $data->description;
		$this->_published_at = $data->upload_date;

		$this->_channel_id = $data->owner->id;
		$this->_channel_title = $data->owner->display_name;
		$this->_channel_url = $data->owner->profileurl;
		$this->_channel_subtype = 'user';

		$this->_view_count = (isset($data->number_of_plays) ? $data->number_of_plays : "");
		$this->_duration = date("i:s",$data->duration);
	}
}