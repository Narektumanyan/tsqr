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
    
    public function actionCheckname()
    {
        
        $post = Yii::$app->request->post();
        
        $name = $post['blogName'];
        
        $result = Blog::find()->where(['name' => $name])->one();
        
        if( $result ) {
            echo json_encode(['success' => 0, 'error' => 'Sorry, this name is already taken!']);
        } else {
            echo json_encode(['success' => 1, 'message' => 'Accepted!']);
        }
//        dbg($result);
    }
    
    
    public function actionCreate()
    {
        $post = Yii::$app->request->post();
        
        if( isset($post['Blog']) ) {
            
            $blogData = $post['Blog'];
            
            $blogModel = new Blog();
        
            $blogModel->name = $blogData['blog-name'];
            $blogModel->title = $blogData['blog-title'];
            $blogModel->description = $blogData['blog-descr'];
            
            if( $blogModel->save() ){
                
                if( isset($post['tag']) ) {
            
                    $tagData = $post['tag'];

                    $columns = ['blog_id', 'tag_name'];
                    $rows = [];
                    foreach($tagData as $item) {
                        $rows[] = [$blogModel->id, $item];
                    }
                    
                    if( !empty($rows) ) {
                        Yii::$app->db->createCommand()->batchInsert('blog_tags', $columns, $rows)->execute();
                    }
                }
                
                return $this->goHome();
            } else {
                
                Yii::$app->session->setFlash('error', 'Something went wrong! Please try again!');
                return $this->goHome();
            }
            
        } else {
            
            Yii::$app->session->setFlash('error', 'Something went wrong! Please try again!');
            return $this->goHome();
        }
    }
    
    
    public function actionIndex() 
    {
        $blogs = Blog::find()->where(['user_id' => Yii::$app->user->id])->all();
//        dbg($blogs);
        
        
        return $this->render('index', [
                    'blogs' => $blogs
                ]);
    }
}

