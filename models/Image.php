<?php

namespace app\models;

use Yii;
use yii\web\UploadedFile;
use yii\helpers\FileHelper;
use himiklab\thumbnail\EasyThumbnailImage;

/**
 * This is the model class for table "uploaded_file".
 *
 * @property integer $id
 * @property string $name
 * @property string $filename
 * @property integer $size
 * @property string $type
 * @property string $loaded_date
 */
class Image extends \yii\db\ActiveRecord
{
	/**
	 * @var CUploadedFile
	 */
	public $file;

	/**
	 * @var string Upload path
	 */
	public $uploadPath = '@webroot/uploads';

	/**
	 * @var integer the level of sub-directories to store uploaded files. Defaults to 1.
	 * If the system has huge number of uploaded files (e.g. one million), you may use a bigger value
	 * (usually no bigger than 3). Using sub-directories is mainly to ensure the file system
	 * is not over burdened with a single directory having too many files.
	 */
	public $directoryLevel = 1;

	/**
	 * @inheritdoc
	 */

	const SCENARIO_UPDATE = 'scenario_image_update';

	public static function tableName()
	{
		return 'image';
	}

	/**
	 * @inheritdoc
	 */
	public function rules()
	{
		$key = $this->file ? md5(microtime() . $this->file->name) : '';
		$fileNameFunc = function ($key) {
			if (!$this->file)
				return null;

			$base = Yii::getAlias($this->uploadPath);
			return $base . DIRECTORY_SEPARATOR . "{$key}" . "." . $this->file->extension;
		};
		$pathFunc = function ($key) {
			if (!$this->file)
				return null;

			return '/uploads/' . $key . "." . $this->file->extension;
		};
		return [
			[['file'], 'required'],
			[['file'], 'file', 'skipOnEmpty' => false],
			[['uploadPath'], 'required', 'when' => function($obj) {
				return empty($obj->filename);
			}],
			[['name', 'size'], 'default', 'value' => function($obj, $attribute) {
				if (!$this->file)
					return null;

				$filename = explode('.', $obj->file->$attribute);
				return $filename[0];
			}],
			[['type'], 'default', 'value' => function() {
				return FileHelper::getMimeType($this->file->tempName);
			}],
			[['filename'], 'default', 'value' => $fileNameFunc($key)],
			[['path'], 'default', 'value' => $pathFunc($key)],
			[['size'], 'integer'],
			[['name'], 'string', 'max' => 64],
			[['type'], 'string', 'max' => 32],
			[['filename'], 'string', 'max' => 256],
			[['preview'], 'string', 'max' => 256],
			[['description'], 'string'],
			[['loaded_date'], 'date', 'format' => 'yyyy-M-d H:m:s']
		];
	}

    public function scenarios()
    {
        $scenarios = parent::scenarios();
        $scenarios[static::SCENARIO_UPDATE] = ['name', 'description'];
        return $scenarios;
    }

	/**
	 * @inheritdoc
	 */
	public function attributeLabels()
	{
		return [
			'id' => 'ID',
			'name' => 'Basename',
			'description' => 'Description',
			'filename' => 'Filename',
			'size' => 'Filesize',
			'type' => 'Content Type',
		];
	}

	/**
	 * @inherited
	 */
	public function beforeSave($insert)
	{
		if ($this->isNewRecord === false)
			return true;

		if ($this->file && $this->file instanceof UploadedFile && parent::beforeSave($insert)) {
			FileHelper::createDirectory(dirname($this->filename));
			FileHelper::createDirectory(dirname($this->filename) . '/thumb');
			$result = $this->file->saveAlways($this->filename);

			$fname = substr($this->path, strripos($this->path, '/') + 1);
		    $im = new \Imagick(realpath($this->filename));
		    $ig = $im->getImageGeometry();
		    if ($ig['width'] > 520 || $ig['height'] > 520)
		    	$im->thumbnailImage(520, 520, true);
		    $imres = file_put_contents(dirname($this->filename) . '/thumb/' . $fname, $im); 
		    $im->clear();
		    $im->destroy();

		    if ($imres)
		    	$this->preview = '/uploads/thumb/' . $fname;

			return $result;
		}
		return false;
	}

	/**
	 * @inherited
	 */
	public function beforeDelete()
	{
		if (parent::beforeDelete()) {
			return unlink($this->filename);
		}
		return false;
	}

	/**
	 * Save file
	 * @param UploadedFile $file
	 * @param string $path
	 * @return boolean|static
	 */
	public static function saveAs($file, $path = '@runtime/upload', $directoryLevel = 1)
	{
		$model = new static([
			'file' => $file,
			'uploadPath' => $path,
			'directoryLevel' => $directoryLevel,
		]);
		return $model->save() ? $model : false;
	}

	public static function getIdViaPath ($path = null)
	{
		if (!empty($path)) {
			$img = self::find()->where(['path' => $path])->one();
			if (!$img)
				return null;
			return $img->id;
		}
	}

	public static function prepareJson($array = []) 
	{
		$json = [];

		foreach ($array as $image) {
			$json[] = [
				'id' => $image->id,
				'path' => $image->path,
				'preview' => $image->preview ? $image->preview : $image->path,
				'name' => $image->name,
				'description' => $image->description,
				'filesize' => $image->size,
				'info' => self::getImageInfo($image->path),
				'loaded_date' => (new \DateTime($image->loaded_date))->format("d/m/y g:i a"),
				'timestamp' => strtotime($image->loaded_date),
			];
		}

		return json_encode($json);
	}

	public static function getImageInfo($path)
	{
		if (empty($path))
			return null;

		$result = [];
		$data = getimagesize(Yii::getAlias('@webroot').$path);

		if (!$data)
			return null;

		$result['type'] = explode('/', $data['mime'])[1];
		$result['width'] = $data[0];
		$result['height'] = $data[1];
		return $result;
	}
}