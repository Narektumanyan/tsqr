<?
use yii\helpers\Html;
use yii\helpers\Url;
?>

<div id="post-pages-wp" >
    <div class="post-pages">
        <ul class="posts-menu">
            <li>
                <a href="/post/index">Posts</a>
            </li>
            <li class="active">
                <a href="/post/pages">Pages</a>
            </li>
            <li>
                <a href="/post/comments">Comments</a>
            </li>
            <li>
                <a href="/post/categories">Categories</a>
            </li>
        </ul>
        <?
//            echo"<pre>";
//            print_r($pagesCount);
//            echo"</pre>";
//            die()
        ?>
        <!-- <?=$pagesCount;?> -->

        <div class="post-page-top-menu-wp">
            <div class="post-pages-menu-all-wp">
                <div id="no-one-page" <?= ( $pagesCount > 0 ) ? "style='display: none;'" : "" ?> >
                    <h2>You haven't got any pages yet</h2>
                    <span>Click the button below to start</span>
                    <button>New page</button>
                    <div class="steacker"></div>
                </div>
                <div class="menu-pages-wp" <?= ( $pagesCount == 0 ) ? "style='display: none;'" : "" ?> >
                    <ul class="menu-pages">
                        <li><a href="#All" data-tabaction="all" class="all active" >All (3)</a></li>
                        <li><a href="#Draft" data-tabaction="draft" class="draft" >Draft (1)</a></li>
                        <li><a href="#Published" data-tabaction="publish" class="published" >Published (1)</a></li>
                        <li><a href="#Trashed" data-tabaction="trash" class="trashed" >Trashed (1)</a></li>
                        <li><a href="#TrashPages" class="trash-pages" style="display: none">Trash Pages</a></li>
                    </ul>
                    <div class="new-page">
                        <a href="#newPage">new page</a>
                    </div>
                    <div class="pages-search">
                        <?= Html::submitButton('<i class="fa fa-search"></i>', ['class' => 'post-search-title']) ?>
                        <div class="search-text-wp">
                            <?php
                            $searchPostTitle = (isset($_GET['PostSearch']['title']) &&
                                !empty($_GET['PostSearch']['title'])) ? $_GET['PostSearch']['title'] : '';
                            ?>
                            <?= Html::input("text", "textToSearch", $searchPostTitle, ['class' => 'search-post', 'placeholder' => 'Search page'])?>
                        </div>
                    </div>
                </div>
            </div>
            <div class="post-pages-filters" <?= ( $pagesCount == 0 ) ? "style='display: none;'" : "" ?> >
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
                <div class="dropdown">
                    <button class="btn dropdown-toggle" type="button" id="dropdownMenu" data-toggle="dropdown">
                        All authors<span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu select-time-dropdown" role="menu" aria-labelledby="dropdownMenu" selected>
                        <div class="arrow"></div>
                        <li role="presentation"><a role="menuitem" tabindex="1" data-select-time="all" id="">All authors</a></li>
                        <?/*?><li role="presentation"><a role="menuitem" tabindex="2" data-select-time="today" id="">Peter</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="3" data-select-time="yesterday" id="yesterday">Bob</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="4" data-select-time="week" id="this-week">Kowalsky</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="5" data-select-time="month" id="this-month">Maik</a></li><?*/?>
                    </ul>
                </div>
            </div>
        </div>
        <div id="grid-view" <?= ( $pagesCount == 0 ) ? "style='display: none;'" : "" ?> >
            <table class="pages-grid-view post-pages-table table"></table>
        </div>

    </div>
</div>

<div id="page-editor-wp" style="display: none;">
    <div class="page-editor-left">
        <div class="page-order">
            <h3>Page order</h3>
            <ul class="pages-order-list">
                <?/*?><li>Contuct Us</li>
                <li>Portfolio</li>
                <li>New page title</li><?*/?>
            </ul>
        </div>
        <div class="page-featured-image">
            <h3>Featured image</h3>
            <a href="#set-image" class="set-image">Set image</a>
        </div>
    </div>
    <div id="page-editor" class=""></div>
</div>

<div class="pocket"></div>

<script>
    $(document).ready(function() {
        VideoEssenceApp.start();
        VideoEssenceApp.Pocket.start();
        VideoEssenceApp.PostPages.start();
        VideoEssenceApp.MediaManager.start({
            images_gallery:<?= $images_gallery ?>
        });
    });
</script>