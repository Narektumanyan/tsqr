<?php

namespace app\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Post;
use yii\db\Query;

/**
 * CountrySearch represents the model behind the search form about `app\models\Country`.
 */
class PostSearch extends Post
{
    /**
     * @inheritdoc
     */
	public $category;
	public $selectDate;

    public function rules()
    {
        return [
            [['title'], 'safe'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
	    $query = Post::find();

	    $dataProvider = new ActiveDataProvider([
		    'query' => $query,
	    ]);
	    $this->load($params);

	    $this->selectDate = "All time";
	    $this->category = "All categories";
	    if (isset($params)) {
		    if(isset($params["selectDate"])) {
			    $this->selectDate = $params["selectDate"];
		    }
		    if(isset($params["category"])) {
			    $this->category = $params["category"];
		    }
		    if(isset($params["title"])) {
			    $this->title = $params["title"];
		    }
		    if(isset($params["status"])) {
			    $this->status = $params["status"];
		    }
		    if(!empty($this->title)){
			    $query->andFilterWhere([
				    'like', 'post.title', $this->title,
			    ]);
		    }
		    if(isset($this->category) && $this->category != "All categories"){
                if ($this->category != -1) {
                    $query->leftJoin('related_post_categories', 'post_id=post.id');
                    $query->leftJoin('post_categories', 'related_post_categories.category_id=post_categories.id');
                    $query->andFilterWhere([
                        '=', 'post_categories.label', $params["category"],
                    ]);
                }
		    }
	    }

	    if (isset($this->selectDate)) {
		    if ($this->selectDate == "Today") {
			    $datetime = new \DateTime('now');
			    $datetime1 = $datetime->format('Y-m-d 00:00:00');
			    $datetime2 = $datetime->format('Y-m-d 23:59:59');
		    } else {
			    if ($this->selectDate == "Yesterday") {
				    $datetime = new \DateTime('now');
				    $datetime->sub(new \DateInterval('P1D'));
				    $datetime1 = $datetime->format('Y-m-d 00:00:00');
				    $datetime2 = $datetime->format('Y-m-d 23:59:59');
			    } else {
				    if ($this->selectDate == "This week") {
					    $datetime1 = new \DateTime('this week');
					    $datetime2 = (new \DateTime('this week'))->add(new \DateInterval('P6D'));
					    $datetime1 = $datetime1->format('Y-m-d');
					    $datetime2 = $datetime2->format('Y-m-d');
				    } else {
					    if ($this->selectDate == "This month") {
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
				    'date',
				    $datetime1,
			    ]);
			    $query->andFilterWhere([
				    '<=',
				    'date',
				    $datetime2,
			    ]);
		    }
	    }

	    $query->andFilterWhere([
		    '=',
		    'author',
		    Yii::$app->user->id
	    ]);

        if ($this->category == -1) {
            $query->andFilterWhere([
                'not in',
                'id',
                (new Query())->select('post_id')->from('related_post_categories')
            ]);
        }

	    if(!empty($this->status) && $this->status != Post::STATUS_ALL) {
		    $query->andFilterWhere([
			    '=',
			    'post.status',
			    $this->status,
		    ]);
	    }

	    $query->orderBy(['id' => SORT_DESC]);

//        echo"<pre>";
//        print_r($query);
//        echo"</pre>";
//
//        die();

        return $dataProvider;
    }
}
