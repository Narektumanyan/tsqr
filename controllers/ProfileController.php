<?php

namespace app\controllers;

use Yii;
use yii\data\ActiveDataProvider;
use yii\data\ArrayDataProvider;
use yii\filters\AccessControl;
use dektrium\user\controllers\SecurityController;
use dektrium\user\Finder;

use app\models\Blog;
use app\models\BlogTags;

class ProfileController extends SecurityController
{
    public $enableCsrfValidation = false;
    
    public function __construct($id, $module, Finder $finder, $config = [])
    {
            parent::__construct($id, $module, $finder, $config);
    }

    public function behaviors()
    {
            return [
                    'access' => [
                            'class' => AccessControl::className(),
                            'only' => ['index', 'view', 'edit', 'checkname'],
                            'rules' => [
                                    [
                                            'allow' => true,
                                            'roles' => ['@']
                                    ]
                            ]
                    ]
            ];
    }
    
    
    
    public function actionIndex() 
    {
//        echo 11111;
        return $this->render('index');
    }
}

