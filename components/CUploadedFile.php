<?php
/**
 * Created by PhpStorm.
 * User: wight
 * Date: 06.05.15
 * Time: 16:12
 */
namespace app\components;
use yii\web\UploadedFile;

class CUploadedFile  extends UploadedFile{
	public function saveAlways($file)
	{
		if ($this->error == UPLOAD_ERR_OK) {
			return copy($this->tempName, $file);
		}
		return false;
	}
}