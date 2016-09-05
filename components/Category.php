<?php

namespace app\components;


use yii\base\Component;

class Category extends Component {
    protected $_categories = [
        "music" => [
            'name' => 'Music',
            'class' => "music",
            'normal' => '/images/discovery/music_new.jpg',
            'retina' => '/images/discovery/music2x_new.jpg',
        ],
        "health-fitness" => [
            'name' => 'Health & Fitness',
            'class' => 'health-fitness',
            'normal' => '/images/discovery/health_new.jpg',
            'retina' => '/images/discovery/health2x_new.jpg',
        ],
        "science-tech" => [
            'name' => 'Science & Tech',
            'class' => 'science-tech',
            'normal' => '/images/discovery/science_new.jpg',
            'retina' => '/images/discovery/science2x_new.jpg',
        ],
        "beauty-fashion" => [
            'name' => 'Beauty & Fashion',
            'class' => 'beauty-fashion',
            'normal' => '/images/discovery/beauty_new.jpg',
            'retina' => '/images/discovery/beauty2x_new.jpg',
        ],
        "movies-tv-shows" => [
            'name' => 'Movies & TV shows',
            'class' => 'movies-tv-shows',
            'normal' => '/images/discovery/movies_new.jpg',
            'retina' => '/images/discovery/movies2x_new.jpg',
        ],
        "comedy" => [
            'name' => 'Funny',
            'class' => 'comedy',
            'normal' => '/images/discovery/funny_new.jpg',
            'retina' => '/images/discovery/funny2x_new.jpg',
        ],
        "cooking" => [
            'name' => 'Cooking',
            'class' => 'cooking',
            'normal' => '/images/discovery/cooking.jpg',
            'retina' => '/images/discovery/cooking2x.jpg',
        ],
        "animation" => [
            'name' => 'Animation',
            'class' => 'animation',
            'normal' => '/images/discovery/animation_new.jpg',
            'retina' => '/images/discovery/animation2x_new.jpg',
        ],
        "automotive" => [
            'name' => 'Automotive',
            'class' => 'automotive',
            'normal' => '/images/discovery/automotive_new.jpg',
            'retina' => '/images/discovery/automotive2x_new.jpg',
        ],
        "gaming" => [
            'name' => 'Gaming',
            'class' => 'gaming',
            'normal' => '/images/discovery/gaming.jpg',
            'retina' => '/images/discovery/gaming2x.jpg',
        ],
        "art-design" => [
            'name' => 'Art & Design',
            'class' => 'art-design',
            'normal' => '/images/discovery/art.jpg',
            'retina' => '/images/discovery/art2x.jpg',
        ],
        "news-politics" => [
            'name' => 'News & Politics',
            'class' => 'news-politics',
            'normal' => '/images/discovery/news.jpg',
            'retina' => '/images/discovery/news2x.jpg',
        ],
        "travel-lifestyle" => [
            'name' => 'Travel & Lifestyle',
            'class' => 'travel-lifestyle',
            'normal' => '/images/discovery/travel_new.jpg',
            'retina' => '/images/discovery/travel2x_new.jpg',
        ],
        "documentary" => [
            'name' => 'Documentary',
            'class' => 'documentary',
            'normal' => '/images/discovery/documentary.jpg',
            'retina' => '/images/discovery/documentary2x.jpg',
        ],
        "narrative" => [
            'name' => 'Narrative',
            'class' => 'narrative',
            'normal' => '/images/discovery/narrative_new.jpg',
            'retina' => '/images/discovery/narrative2x_new.jpg',
        ],
        "how-to-diy" => [
            'name' => 'How-to & DIY',
            'class' => 'how-to-diy',
            'normal' => '/images/discovery/howto_new.jpg',
            'retina' => '/images/discovery/howto2x_new.jpg',
        ]

    ];

    public function getCategories()
    {
        return $this->_categories;
    }
}