<?
use yii\grid\GridView;
use yii\helpers\Html;
use yii\helpers\Url;
use app\models\Post;
use yii\db\Query;

use app\assets\AppAsset;

$assetUrl = AppAsset::register($this)->baseUrl;
?>
<div class="posts-viewer">


    <ul class="posts-menu">
        <li>
            <a href="/post/index" >Posts</a>
        </li>
        <li>
            <a href="/post/pages">Pages</a>
        </li>
        <li class="active">
            <a href="/post/comments">Comments</a>
        </li>
        <li>
            <a href="/post/categories">Categories</a>
        </li>
    </ul>



    <div class="row post-statistic">
        <ul class="menu-post">
            <li><a href="#" class="" data-status="">All (2)</a></li>
            <li><a href="#" class="" data-status="">Pending (1)</a></li>
            <li><a href="#" class="" data-status="">Approved (2)</a></li>
            <li><a href="#" class="" data-status="">Trashed (3)</a></li>
        </ul>
<!--        <div class="new-post">-->
<!--            <a href="/post/publish">new post</a>-->
<!--        </div>-->
        <div class="post-search">
            <?= Html::submitButton('<i class="fa fa-search"></i>', ['style' => (trim($textToSearch) != "") ? $buttonStyles : "", 'class' => 'post-search-title']) ?>
            <div class="search-text-wp">
                <?php
                $searchPostTitle = (isset($_GET['PostSearch']['title']) &&
                    !empty($_GET['PostSearch']['title'])) ? $_GET['PostSearch']['title'] : '';
                ?>
                <?= Html::input("text", "textToSearch", $searchPostTitle, ['class' => 'search-post', 'placeholder' => 'Search comments'])?>
            </div>
        </div>
    </div>

    <div class="post-index-filters">
        <?/*?>
<div class="dropdown">
	<button class="btn dropdown-toggle" type="button" id="dropdownMenu" data-toggle="dropdown">
		All time<span class="caret"></span>
	</button>
	<ul class="dropdown-menu select-time-dropdown" role="menu" aria-labelledby="dropdownMenu" selected>
		<div class="arrow"></div>
		<li role="presentation"><a role="menuitem" tabindex="1" data-select-time="all" id="">All time</a></li>
		<li role="presentation"><a role="menuitem" tabindex="2" data-select-time="today" id="">Today</a></li>
		<li role="presentation"><a role="menuitem" tabindex="3" data-select-time="yesterday" id="yesterday">Yesterday</a></li>
		<li role="presentation"><a role="menuitem" tabindex="4" data-select-time="week" id="this-week">This week</a></li>
		<li role="presentation"><a role="menuitem" tabindex="5" data-select-time="month" id="this-month">This month</a></li>
	</ul>
</div>

            <?*/?>

        <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="dropdownMenu1"
                    data-toggle="dropdown">
                All time<span class="caret"></span>
            </button>
            <ul class="dropdown-menu select-time-dropdown" role="menu" aria-labelledby="dropdownMenu1" selected>
                <div class="arrow"></div>
                <li role="presentation"><a role="menuitem" tabindex="1" data-select-time="All time" id="">All time</a></li>
                <li role="presentation"><a role="menuitem" tabindex="2" data-select-time="Today" id="">Today</a></li>
                <li role="presentation"><a role="menuitem" tabindex="3" data-select-time="Yesterday" id="yesterday">Yesterday</a></li>
                <li role="presentation"><a role="menuitem" tabindex="4" data-select-time="This week" id="this-week">This week</a></li>
                <li role="presentation"><a role="menuitem" tabindex="5" data-select-time="This month" id="this-month">This month</a></li>
            </ul>
        </div>


        <div class="row comment-data-title">
            <div class="col-xs-1 col-md-1">
                <input type="checkbox">
            </div>
            <div class="col-xs-1 col-md-1 dateDiv">
                <h4>Date</h4>
            </div>
            <div class="col-xs-6 col-md-6">
                <h4>Comment</h4>
            </div>
            <div class="col-xs-2 col-md-2 authorDiv">
                <h4>Author</h4>
            </div>
            <div class="col-xs-2 col-md-2">
                <h4>In Response To</h4>
            </div>
        </div>

        <!--Block for loop-->
        <div class="row comment-data">
            <div class="col-xs-1 col-md-1 checkboxDiv">
                <input type="checkbox">
            </div>
            <div class="col-xs-1 col-md-1 dateDiv">
                <p class="gray-text">04/22/2015 at 17:05</p>
                <!--To make button active with text "Approved" just add class to button "approve-button-active"-->
                <button class="approve-button"></button>
            </div>
            <div class="col-xs-6 col-md-6 commentDiv">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus architecto consequatur culpa deserunt dolorem esse, et eveniet iste, magnam nam nobis obcaecati odio omnis optio quam quisquam vel. Dolore, sint!</p>
                <p class="gray-text post-links">
                    <a href="#">View</a> • <a href="#">Delete</a>
                </p>
            </div>
            <div class="col-xs-2 col-md-2 authorDiv">
                <p>Mr Kowalski</p>
                <p><a href="#">http://yandex.ru</a></p>
            </div>
            <div class="col-xs-2 col-md-2 responseDiv">
                <p class="pink-text">Hello world!</p>
                <p class="gray-text">View post(1)</p>
            </div>
        </div>
        <!--End Block for loop-->

        <div class="row comment-data">
            <div class="col-xs-1 col-md-1 checkboxDiv">
                <input type="checkbox">
            </div>
            <div class="col-xs-1 col-md-1 dateDiv">
                <p class="gray-text">04/22/2015 at 17:05</p>
                <!--To make button active with text "Approved" just add class to button "approve-button-active"-->
                <button class="approve-button approve-button-active"></button>
            </div>
            <div class="col-xs-6 col-md-6 commentDiv">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus architecto consequatur culpa deserunt dolorem esse, et eveniet iste, magnam nam nobis obcaecati odio omnis optio quam quisquam vel. Dolore, sint!</p>
                <p class="gray-text post-links">
                    <a href="">View</a> • <a href="">Delete</a>
                </p>
            </div>
            <div class="col-xs-2 col-md-2 authorDiv">
                <img src="http://www.jachtinterieurbouw.nl/wp-content/uploads/2016/02/van-de-water.jpg" alt="" class="author-image">

            </div>
            <div class="col-xs-2 col-md-2 responseDiv">
                <p class="pink-text">Hello world!</p>
                <p class="gray-text">View post(1)</p>
            </div>
        </div>

        <div class="row comment-data">
            <div class="col-xs-1 col-md-1 checkboxDiv">
                <input type="checkbox">
            </div>
            <div class="col-xs-1 col-md-1 dateDiv">
                <p class="gray-text">04/22/2015 at 17:05</p>
                <!--To make button active with text "Approved" just add class to button "approve-button-active"-->
                <button class="approve-button approve-button-active"></button>
            </div>
            <div class="col-xs-6 col-md-6 commentDiv">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus architecto consequatur culpa deserunt dolorem esse, et eveniet iste, magnam nam nobis obcaecati odio omnis optio quam quisquam vel. Dolore, sint!</p>
                <p class="gray-text post-links">
                    <a href="">View</a> • <a href="">Delete</a>
                </p>
            </div>
            <div class="col-xs-2 col-md-2 authorDiv">
                <img src="http://solutionsforstartup.wp.irishmiss.com/wp-content/uploads/2013/03/radio7_hair.jpg" alt="" class="author-image">
            </div>
            <div class="col-xs-2 col-md-2 responseDiv">
                <p class="pink-text">Hello world!</p>
                <p class="gray-text">View post(1)</p>
            </div>
        </div>



    </div>





<!--<!--If there is no posts-->
<!--        <div class="no-posts">-->
<!--            <h2>You haven't got any comment yet</h2>-->
<!--            <div class="announce">Click the button below to start</div>-->
<!--            <a href="/post/publish" class="post-create">New Comment</a>-->
<!---->
<!--            <div id="no-posts-img">-->
<!--                <div class="no-posts-first">-->
<!---->
<!--                </div>-->
<!--                <div class="no-posts-second">-->
<!---->
<!--                </div>-->
<!--                <div class="no-posts-third">-->
<!---->
<!--                </div>-->
<!--            </div>-->
<!---->
<!--        </div>-->
<!--    <!--End of no posts-->
</div>


