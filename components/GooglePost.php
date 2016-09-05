<?php

namespace app\components;


class GooglePost
{
	private $author;
	private $author_id;
	private $author_url;

	private $published;
	private $url;
	private $content;

	public function fillByResponse(\Google_Service_Plus_Activity $data)
	{
		$this->author = $data->getActor()->getDisplayName();
		$this->author_id = $data->getActor()->getId();
		$this->author_url = $data->getActor()->getUrl();
		$this->published = $data->getPublished();
		$this->url = $data->getUrl();
		$this->id = $data->getId();
		$googlePlusContent = $data->getObject()->getContent();
		$this->content = is_array($googlePlusContent) ? $googlePlusContent->getContent() : $googlePlusContent;
	}

	public function fillByEmbedly($data)
	{
//		[provider_url] => http://plus.google.com
//    [description] => Harmless but mind-numbingly frustrating bug: I have my dream setup (Ubuntu 14.04), but one bug is driving me crazy. When I have multiple Firefox windows open, spread out on different workspaces (so, a FF window on Workspace1, another on Workspace 2), the focus sometimes / frequently stays on the previous workspace.
//	[title] => Harmless but mind-numbingly frustrating bug: I have my dream setup (Ubuntu 14.04), but one bug is driving...
//    [author_name] => Rob Boone
//    [thumbnail_width] => 50
//    [url] => https://plus.google.com/102776690451299730567/posts/Js5vuPzuNn9
//    [thumbnail_url] => https://lh3.googleusercontent.com/-VLHmk-nfPsQ/AAAAAAAAAAI/AAAAAAAAACo/0gz4A_KHGb4/photo.jpg?sz=50
//    [author_url] => https://plus.google.com/102776690451299730567
//    [version] => 1.0
//    [provider_name] => Google+
//	[type] => link
//    [thumbnail_height] => 50

//		$this->author = $data['author_name']
//		$this->author_id = $data->getActor()->getId();
//		$this->author_url = $data[]
//		$this->published = $data->getPublished();
//		$this->url = $data->getUrl();
//		$this->id = $data->getId();
//		$googlePlusContent = $data->getObject()->getContent();
//		$this->content = is_array($googlePlusContent) ? $googlePlusContent->getContent() : $googlePlusContent;
	}

	public function toArray()
	{
		return get_object_vars($this);
	}
}