<?php

namespace app\components;
require(__DIR__ . '/vimeo.php');

use yii\base\Component;
use Vimeo\Vimeo;
use phpVimeo;

class VideoServiceComponent  extends Component{
	private $youtubeService;
	private $vimeoService;
	private $vimeoAdvanceService;
	public function init(){
		$client = new \Google_Client();
		$client->setDeveloperKey("AIzaSyAxC56PXOmCF4_rq4d0-XYhuuSxkO2DnD4");
//		$client->setDeveloperKey("AIzaSyA6cXc37Ysp72PPXvRKEQ-n3NPuGxWLGuc");
		$this->youtubeService = new \Google_Service_YouTube($client);

		$this->vimeoService = new Vimeo('6d47b21e9e77274c35d3aeaa455a99a17eeb5749', 'JaV7KoA2xvaacKsiJEvRj6n92k6zek4jgji/n/WGMKw4EoNJOHSgHEJkaoFvv3ucSfvLBM/Rt82S3HhfuLU6QUCVGYC1eXK+onLVZ1kaTXrfS54QraNqneQWFJhlemjo');
		$this->vimeoService->setToken('79d10fe0ec602a5268aab3bb1c911995');

		$this->vimeoAdvanceService = $phpVimeo = new \phpVimeo('8574994eff12e8c4c038608bbcbd78d55a710896', '61f7fb7fd9fa6028c86bf320157db6c75576e941');
	}

	public function getYoutube()
	{
		return $this->youtubeService;
	}

	public function getVimeo()
	{
		return $this->vimeoService;
	}

	public function getVimeoAdvanceService()
	{
		return $this->vimeoAdvanceService;
	}
}