<?php

namespace app\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Page;
use yii\db\Query;

class PageSearch extends Page
{
//	public $category;
	public $selectDate;
    private $limit = 1;
    private $offset = 0;

    public function rules()
    {
        return [
            [['title'], 'safe'],
        ];
    }

    public function scenarios()
    {
        return Model::scenarios();
    }

    public function search($params)
    {
	    $query = Page::find();

	    $dataProvider = new ActiveDataProvider([
		    'query' => $query,
	    ]);
	    $this->load($params);

//        echo"<pre>";
//        print_r($params);
//        echo"</pre>";
//
//        die();

//        'offset' => Yii::$app->getRequest()->post('offset', 0),
//        'searchText' => Yii::$app->getRequest()->post('search', ''),
//        'status' => Yii::$app->getRequest()->post('status', 0),
//        'trash' => Yii::$app->getRequest()->post('trash', []),
//        'unTrash' => Yii::$app->getRequest()->post('unTrash', []),
//        'selectDate' => Yii::$app->getRequest()->post('selectDate', 0),

//	    $this->selectDate = "All time";
//	    $this->author = "All authors";
//	    if (isset($params)) {
//		    if(isset($params["selectDate"])) {
//			    $this->selectDate = $params["selectDate"];
//		    }
//		    if(isset($params["title"])) {
//			    $this->title = $params["title"];
//		    }
//		    if(isset($params["status"])) {
//			    $this->status = $params["status"];
//		    }
//		    if(isset($params["author"])) {
//			    $this->author = $params["author"];
//		    }
//		    if(!empty($this->title)){
//			    $query->andFilterWhere([
//				    'like', 'page.title', $this->title,
//			    ]);
//		    }
//	    }



	    if (is_string($params['selectDate'])) {
		    if ($params['selectDate'] == "today") {
			    $datetime = new \DateTime('now');
			    $datetime1 = $datetime->format('Y-m-d 00:00:00');
			    $datetime2 = $datetime->format('Y-m-d 23:59:59');
		    } else {
			    if ($params['selectDate'] == "yesterday") {
				    $datetime = new \DateTime('now');
				    $datetime->sub(new \DateInterval('P1D'));
				    $datetime1 = $datetime->format('Y-m-d 00:00:00');
				    $datetime2 = $datetime->format('Y-m-d 23:59:59');
			    } else {
				    if ($params['selectDate'] == "week") {
					    $datetime1 = new \DateTime('this week');
					    $datetime2 = (new \DateTime('this week'))->add(new \DateInterval('P6D'));
					    $datetime1 = $datetime1->format('Y-m-d');
					    $datetime2 = $datetime2->format('Y-m-d');
				    } else {
					    if ($params['selectDate'] == "month") {
						    $datetime1 = new \DateTime('first day of this month');
						    $datetime2 = new \DateTime('last day of this month');
						    $datetime1 = $datetime1->format('Y-m-d');
						    $datetime2 = $datetime2->format('Y-m-d');
					    }
				    }
			    }
		    }
		    if (isset($datetime1) && isset($datetime2)) {
			    $query->andFilterWhere([
				    '>=',
				    'created_at',
				    $datetime1,
			    ]);
			    $query->andFilterWhere([
				    '<=',
				    'created_at',
				    $datetime2,
			    ]);
		    }
	    }

	    $query->andFilterWhere([
		    '=',
		    'author',
		    Yii::$app->user->id
	    ]);

	    if(!empty($params['status']) && $params['status'] != $this::STATUS_ALL ) {
		    $query->andFilterWhere([
			    '=',
			    'page.status',
                $params['status'],
		    ]);
	    }

        if ( strlen($params['searchText']) > 0 &&
             !preg_match('/(select|update|insert|delete|replace)/', $params['searchText'])
        ){
            $query->andFilterWhere([
                'like',
                'page.title',
                $params['searchText']
            ]);
        }

	    $query->orderBy(['order' => SORT_ASC]);

//        echo"<pre>";
//        print_r($query);
//        echo"</pre>";
//
//        die();

        return $dataProvider;
    }
}
