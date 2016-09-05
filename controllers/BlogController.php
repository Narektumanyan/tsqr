<?php

namespace app\controllers;

use Yii;
use yii\data\ActiveDataProvider;
use yii\data\ArrayDataProvider;
use yii\filters\AccessControl;
use dektrium\user\controllers\SecurityController;
use dektrium\user\Finder;

use app\models\Blog;

class BlogController extends SecurityController
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
    
    public function actionCheckname() {
        
        $post = Yii::$app->request->post();
        
        $name = $post['blogName'];
        
        $result = Blog::find()->where(['name' => $name])->one();
        
        if( $result ) {
            json_encode(['success' => 1, 'error' => 'Sorry, this name is already taken!']);
        } 
//        dbg($result);
    }
}

