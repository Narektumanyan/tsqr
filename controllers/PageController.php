<?php
namespace app\controllers;

use Yii;
use yii\data\ActiveDataProvider;
use yii\data\ArrayDataProvider;
use yii\filters\AccessControl;
use yii\web\ForbiddenHttpException;
use yii\web\Response;
use dektrium\user\controllers\SecurityController;
use dektrium\user\Finder;

use app\models\Page;
use app\models\PageSearch;
use app\models\Image;

use yii\helpers\Url;
use yii\helpers\Json;

class PageController extends SecurityController
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
				'only' => ['index', 'view', 'edit'],
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
        if(Yii::$app->request->isPost) {
//    in:
//       offset = 0
//       search text = ''
//       curTab (All 0, Draft 1, Published 2, Trashed 3) = 0
//       trash / unTrash ( array )
//       selectDate

//   out:
//        all
//        publish
//        draft
//        trashed
//        search text

//        all authors
//        pages (title, author, comments, created)
//        offset for pagination

            $this->clearEmpty();

            $opt = [
                'offset' => Yii::$app->getRequest()->post('offset', 0),
                'searchText' => Yii::$app->getRequest()->post('search', ''), // +
                'status' => Yii::$app->getRequest()->post('status', -1), // +

                'publish' => Yii::$app->getRequest()->post('publish', []), // +
                'draft' => Yii::$app->getRequest()->post('draft', []), // +
                'trash' => Yii::$app->getRequest()->post('trash', []), // +
                'restore' => Yii::$app->getRequest()->post('restore', []), // +
                'delete' => Yii::$app->getRequest()->post('delete', []), // +

                'selectDate' => Yii::$app->getRequest()->post('selectDate', 0),
            ];

            if (count($opt['trash']) > 0){
                foreach($opt['trash'] as $trashId){
                    $this->changeStatus( $trashId, Page::STATUS_TRASH );
                }
            }

            if (count($opt['restore']) > 0){
                foreach($opt['restore'] as $restoreId){
                    $this->changeStatus( $restoreId, Page::STATUS_DRAFT );
                }
            }

            if (count($opt['publish']) > 0){
                foreach($opt['publish'] as $publishId){
                    $this->changeStatus( $publishId, Page::STATUS_PUBLISH );
                }
            }

            if (count($opt['draft']) > 0){
                foreach($opt['draft'] as $draftId){
                    $this->changeStatus( $draftId, Page::STATUS_DRAFT );
                }
            }

            if (count($opt['delete']) > 0){
                foreach($opt['delete'] as $draftId){
                    $this->deletePage( $draftId );
                }
            }

            $model = new PageSearch();
            $provider = $model->search($opt);
            $model->setAttributes($opt);

            $allCount = Page::getAllCount(Yii::$app->user->id);
            $draftCount = Page::getDraftCount(Yii::$app->user->id);
            $publishCount = Page::getPublishCount(Yii::$app->user->id);
            $trashCount = Page::getTrashCount(Yii::$app->user->id);

            echo json_encode([
                'allCount' => $allCount,
                'draftCount' => $draftCount,
                'publishCount' => $publishCount,
                'trashCount' => $trashCount,
                'pages' => Page::pagesToJson($provider->getModels()),
                'textToSearch' => \Yii::$app->request->get("textToSearch"),
            ]);
        }
        die();
    }

    public function actionView($id = null)
    {
        $model = Page::find(['id' => $id])->one();

        $this->checkAccess($model);

        $this->layout = 'view';
        return $this->render('view', compact('model'));
    }

	public function actionEdit()
    {
        if(Yii::$app->request->isPost) {
            $opt = [
                'id' => Yii::$app->getRequest()->post('id', 0),
                'action' => Yii::$app->getRequest()->post('action', 'open'),
                'status' => Yii::$app->getRequest()->post('status', Page::STATUS_DRAFT),
                'content' => Yii::$app->getRequest()->post('content', []),
                'title' => Yii::$app->getRequest()->post('title', 'New page title'),
                'order' => Yii::$app->getRequest()->post('order', []),
            ];

            $model = Page::find()->where(['id' => $opt['id']])->one();

            if (is_null($model)) {
                $model = new Page();
                $model->author = Yii::$app->user->id;
                $model->created_at = date("Y.m.d H:i:s");
                $model->status = Page::STATUS_DRAFT;
                $model->title = '';

                $model->content = json_encode([]);
                $model->insert();
            }

            if ($model->author != Yii::$app->user->id) {
                throw new ForbiddenHttpException('Access denied error');
            }

            if ($opt['action'] == 'save' && (
                    (trim($opt['content'][0]['content']) != '' && trim($opt['content'][0]['content']) != '<br>')
                    || trim($opt['title']) != ''
                )
            ){

                $model->setAttributes([
                    'content' => json_encode($opt['content']),
                    'status' => $opt['status'],
                ]);

                if ((trim($opt['content'][0]['content']) != '' && trim($opt['content'][0]['content']) != '<br>') &&
                    trim($opt['title']) == ''
                ){
                    $opt['title'] = 'Untitled';
                }

                $model->setAttribute('title', $opt['title']);

                if (is_array($opt['order']) && count($opt['order'])){
                    $newOrdes = array_flip($opt['order']);
                    foreach($newOrdes as $key => $val){
                        $this->changeOrder( $key, $val + 1);
                    }
                }

                $model->save();
            }

            $imagesGallery = Image::findAll([
                'user_id' => Yii::$app->user->id
            ]);
            $imagesGalleryJson = Image::prepareJson($imagesGallery);

            echo json_encode([
                'id' => $model->getAttribute('id'),
                'author' => ['name' => $model->user->firstname, 'lastname' => $model->user->lastname],

                'title' => $model->getAttribute('title'),
                'content' => $model->getAttribute('content'),
                'status' => $model->getAttribute('status'),

                'images_gallery' => $imagesGalleryJson
            ]);

            die();

        }
	}

    public function actionSave() {
        $id = Yii::$app->request->post('id');
        $model = Page::find()->where(['id' => $id])->one();

        Yii::$app->response->format = Response::FORMAT_JSON;

        if(is_null($model)) {
            $model = new Page();
            $model->author = Yii::$app->user->id;
            $model->created_at = date("Y.m.d H:i:s");
        }

        if($model->author != Yii::$app->user->id) {
            return [
                'status' => 'error',
                'data' => 'Permission denied'
            ];
        }

        if (Yii::$app->request->isPost) {
            $model->title = Yii::$app->request->post('title');
            $model->content = json_decode(Yii::$app->request->post('content'));
            $model->video_id = Yii::$app->request->post('video_id', null);
            $model->video_type = Yii::$app->request->post('video_type', null);
            $model->video_url = $model->getVideoPreviewUrl();
            $model->status = 1;

            if ($model->save()) {
                return ['status' => 'success'];
            }

            return ['status' => 'error'];
        }
    }

//    public function actionPublish($id = null)
//    {
//        $model = Page::find()->where(['id' => $id])->one();
//
//        $this->checkAccess($model);
//
//        $model->status = Page::STATUS_PUBLISH;
//        $model->save();
//        $this->redirect('/page/index');
//    }

//    public function actionTrash($id = null) {
//        $model = Page::find()->where(['id' => $id])->one();
//
//        $this->checkAccess($model);
//
//        $model->status = Page::STATUS_TRASH;
//        $model->save();
//        $this->redirect('/page/index');
//    }

//    public function actionRestore($id = null) {
//        $model = Page::find()->where(['id' => $id])->one();
//
//        $this->checkAccess($model);
//
//        $model->status = Page::STATUS_DRAFT;
//        $model->save();
//        $this->redirect('/page/index');
//    }



    private function clearEmpty(){
//        $model = Page::find()->where(['or', 'title' => '', 'content' => ['', '[]'], ])->all();
//        $model->deleteAll();
        Page::deleteAll(['and', "title=''", "content='[]'"]);

//        $this->checkAccess($model);

//        $model->status = $status;
//        $model->delete();
    }

    private function deletePage($id){
        Page::deleteAll(['id' => $id]);
    }

    private function changeStatus($id, $status){
        $model = Page::find()->where(['id' => $id])->one();

        $this->checkAccess($model);

        $model->status = $status;
        $model->save();
    }

    private function changeOrder($id, $order){
        $model = Page::find()->where(['id' => $id])->one();

        $this->checkAccess($model);

        $model->order = $order;
        $model->save();
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::className(), ['id' => 'author']);
    }

    private function checkAccess($model)
    {
        if(is_null($model)) {
            throw new ForbiddenHttpException('Page not exist');
        }

        if($model->author != Yii::$app->user->id) {
            throw new ForbiddenHttpException('Access denied error');
        }
    }
}
