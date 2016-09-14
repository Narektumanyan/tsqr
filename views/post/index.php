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

    <?if (count($dataProvider->getModels()) > 0 || $allCount > 0):?>

    <ul class="posts-menu">
        <li class="active">
            <a href="/post/index" >Posts</a>
        </li>
        <li>
            <a href="/post/pages">Pages</a>
        </li>
        <li>
            <a href="/post/comments">Comments</a>
        </li>
        <li >
            <a href="/post/categories">Categories</a>
        </li>
    </ul>

<?php
    $statusPost = (isset($_GET['PostSearch']['status']) && !empty($_GET['PostSearch']['status'])) ? $_GET['PostSearch']['status'] : Post::STATUS_ALL;
?>

    <div class="row post-statistic">
        <ul class="menu-post">
            <li><a href="#" class="<?= $statusPost == Post::STATUS_ALL ? 'active' : '' ?>" data-status="<?=Post::STATUS_ALL?>">All (<?= $allCount ?>)</a></li>
            <li><a href="#" class="<?= $statusPost == Post::STATUS_PUBLISH ? 'active' : '' ?>" data-status="<?=Post::STATUS_PUBLISH?>">Published (<?= $publishCount ?>)</a></li>
            <?/*?><li><a href="#" data-status="<?=Post::STATUS_DRAFT?>">Draft (<?= $draftCount ?>)</a></li><?*/?>
            <li><a href="#" class="<?= $statusPost == Post::STATUS_TRASH ? 'active' : '' ?>" data-status="<?=Post::STATUS_TRASH?>">Trashed (<?= $trashCount ?>)</a></li>
            <li><a href="#" class="trash-posts"><?=strtoupper("TRASH POSTS")?></a></li>
        </ul>
        <div class="new-post">
            <a href="/post/publish">new post</a>
        </div>
        <div class="post-search">
            <?= Html::submitButton('<i class="fa fa-search"></i>', ['style' => (trim($textToSearch) != "") ? $buttonStyles : "", 'class' => 'post-search-title']) ?>
            <div class="search-text-wp">
                <?php
                    $searchPostTitle = (isset($_GET['PostSearch']['title']) && 
                        !empty($_GET['PostSearch']['title'])) ? $_GET['PostSearch']['title'] : '';
                ?>
                <?= Html::input("text", "textToSearch", $searchPostTitle, ['class' => 'search-post', 'placeholder' => 'Enter a post name'])?>
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
					<?= $userPosts->selectDate ?><span class="caret"></span>
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
			<div class="dropdown">
				<button class="btn dropdown-toggle" type="button" id="dropdownMenu2"
				        data-toggle="dropdown">
                    <?/*?><span class="sort"><?*/?></span><?= $userPosts->category ?><span class="caret"></span>
				</button>
				<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                    <div class="arrow"></div>
					<li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="post-categories">All categories</a></li>
					<?
					foreach ($dataProvider->models as $post) {
						$categories = $post->categories;
						if (!empty($categories)) {
							foreach ($categories as $category) {
								echo '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="post-categories">' . $category->label . '</a></li>';
							}
						}
					}
					?>
				</ul>
			</div>
	</div>

	<?= GridView::widget([
		'dataProvider' => $dataProvider,
		'filterModel' => $userPosts,
		/*'filterPosition'=>' ',*/
		'summary' => '',
		'tableOptions' => ['class' => 'table post-view-table'],
//        'rowOptions' => ['width' => '300'],
		'headerRowOptions' => ['class' => 'first'],
		'filterRowOptions' => ['class' => 'first'],
//        'options'=> ['width' => '300px'],
		'columns' => [
            [
                'class' => 'yii\grid\CheckboxColumn',
                'headerOptions' => ['class' => 'header-posts-checkbox'],
                'contentOptions' => ['class' => 'posts-checkbox'],
            ],
            [
                'contentOptions' => ['class' => 'posts-date'],
                'attribute' => 'date',
                'header' => 'Date',
                'headerOptions' => ['class' => 'header-posts-date'],
                'filter' => Html::hiddenInput(
                    'PostSearch[selectDate]',
                    $userPosts->selectDate,
                    ['class' => 'form-control']
                ),
                'format' => 'raw',
                'value' => function($model){
//                    var_dump($model);
//                    die();
                    $postDate = date_create_from_format("Y-m-d H:i:s", $model->date);
//                    var_dump($postDate->format("d/m/y"), $postDate->format("g:i a"));
                    return "<div class='post-date'>".$postDate->format("d/m/y")."<br/>".$postDate->format("g:i a")."</div>";
                },
            ],
			[
                'contentOptions' => ['class' => 'posts-video'],
				'header' => 'Title',
                'headerOptions' => ['class' => 'header-posts-video'],
				'options' => ['class' => 'first-col'],
				'attribute' => 'title',
				'format' => 'raw',
				'value' =>
					function ($model) {

                        $postText = "";
                        if (strlen($model->content) > 0) {
                            $postContent = json_decode($model->content);
                            if (is_array($postContent)) {
                                foreach ($postContent as $contentEl) {
                                    if ($contentEl->elType != "video" &&
                                        $contentEl->elType != "img" &&
                                        $contentEl->elType != "other"
                                    )
                                        $postText .= $contentEl->content;
                                }
                            }

                        }

                        $imgPreview = $model->video_image_url ? $model->video_image_url : '/images/post/noimage.jpg';

                        $linkTrashRestore = $model->status == Post::STATUS_TRASH ? Url::toRoute(['post/restore', 'id' => $model->id]) : Url::toRoute(['post/trash', 'id' => $model->id]);
                        $linkTrashRestoreText = $model->status == Post::STATUS_TRASH ? 'Restore' : 'Trash';

						return '<div class="post-video">
						    <img style="width: 180px;" src="'. $imgPreview .'" width="180" height="100" />
						</div>
						<div class="post-description">
						    <h4><a href="' . Url::toRoute(['post/publish', 'id' => $model->id]) . '">'.$model->title.'</a></h4>
						    <div class="post-content">
								' . $postText . '
							</div>
						</div>
						<div class="post-info">
                            <div class="post-views-comments">
                                15 views &bull; 20 comments
                            </div>
                            <div class="post-links">
                                <a href="' . Url::toRoute(['post/publish', 'id' => $model->id]) . '">Edit</a> &bull;
                                <a href="' . $linkTrashRestore . '">' . $linkTrashRestoreText . '</a> &bull;
                                <a href="' . Url::toRoute(['post/publish', 'id' => $model->id, 'isView' => 'Y']) . '">View</a>
                                <!-- <span class="fa-search-circle-ellipsis" data-toggle="popover" data-placement="right" data-content="<a target=\'_blank\' href=\'' . Url::toRoute(['post/view', 'id' => $model->id]) . '\'>View in my blog</a>">
                                    <div class="fa fa-circle-thin" id="post-search">
                                        <i class="fa icon-ellipsis-vertical"></i>
                                        <i class="fa fa-ellipsis-v"></i>
                                    </div>
                                </span> -->
                            </div>
                        </div>
						';
					},
				'filter' => Html::hiddenInput(
					'PostSearch[title]',
					$userPosts->title,
					['class' => 'form-control']
				)
			],
            [
                'contentOptions' => ['class' => 'posts-author'],
                'attribute' => 'author',
                'header' => 'Author',
                'format' => 'raw',
                'value' => function($model){
                    $query = new Query;
                    $query->select('id, firstname, lastname')
                        ->from('user')
                        ->where(['id'=>$model->author])
                        ->limit(1);
                    $rows = $query->all();

                    $colors = ["#f4c319", "#e14c4d", "#5fcf98", "#f48819", "#5ea9f7", "#f48819", "#5fcfce", "rgb(227,42,190)", "rgb(44,101,231)", "rgb(200,48,205)"];
                    return "<span class='author-image' style='background-color: ".$colors[rand(0, count($colors)-1)]."'>".strtoupper(substr($rows[0]["firstname"], 0, 1)." ".substr($rows[0]["lastname"], 0, 1))."</span>";
                },

            ],
			[
                'contentOptions' => ['class' => 'posts-categories'],
				'header' => 'Categories',
				'format' => 'raw',
				'value' =>
					function ($model) {
						$listOfCategories = '<div class="post-categories-wp">';
                        $colors = ["#f4c319", "#e14c4d", "#5fcf98", "#f48819", "#5ea9f7", "#f48819", "#5fcfce", "rgb(227,42,190)", "rgb(44,101,231)", "rgb(200,48,205)"];

						foreach ($model->categories as $category) {
//							$listOfCategories .= empty($listOfCategories) ? $category->label : ",$category->label";

                            if (count($model->categories) <= 3) {
                                $listOfCategories .=
                                    '<div class="post-category">' .
                                    '<span class="first-letter" style="background-color: ' . $colors[rand(0, count($colors) - 1)] . '">' . strtoupper(substr($category->label, 0, 1))
                                    . '</span>&nbsp;' . $category->label .
                                    '</div>';
                            } else {
                                $listOfCategories .=
                                    '<div class="post-category post-category-min" title="' . $category->label . '">' .
                                    '<span class="first-letter" style="background-color: ' . $colors[rand(0, count($colors) - 1)] . '">' . strtoupper(substr($category->label, 0, 1)) . '</span>' .
                                    '</div>';
                            }
                        }
                        if (count($model->categories) == 0){
                            $listOfCategories = '<div class="post-category">' .
                                '<span class="first-letter" style="background-color: ' . $colors[rand(0, count($colors) - 1)] . '">' . strtoupper(substr('Uncategorized', 0, 1))
                                . '</span>&nbsp;' . 'Uncategorized' .
                                '</div>';
                        }
                        $listOfCategories .= '</div>';



						return $listOfCategories;
					},
				'filter' => Html::hiddenInput(
					'PostSearch[category]',
					$userPosts->category,
					['class' => 'form-control']
				)
			],
			[
                'contentOptions' => ['class' => 'posts-tags'],
				'header' => 'Tags',
				'format' => 'raw',
				'value' =>
					function ($model) {
						$listOfTags = "";
						foreach ($model->tags as $tag) {
							$listOfTags .= empty($listOfTags) ? "<span class='tag'>$tag->tag_id</span>" : "<span class='tag'>$tag->tag_id</span>";
						}
						return $listOfTags;
					}
			],
			[
				'attribute' => 'status',
				'filter' => Html::hiddenInput(
					'PostSearch[status]',
					$userPosts->status,
					['class' => 'form-control']
				),
				'visible' => false
			],
		],
	]) ?>
    <?else:?>
        <div class="no-posts">
            <h2>You haven't got any posts yet</h2>
            <div class="announce">Click the button below to start</div>
            <a href="/post/publish" class="post-create">New post</a>
<!--            <button>New post</button>-->
            <div id="no-posts-img">
                <div class="no-posts-first">
                    <?= Html::img($assetUrl . '/images/posts/no_posts_first2x.jpg') ?>
                </div>
                <div class="no-posts-second">
                    <?= Html::img($assetUrl . '/images/posts/no_posts_second2x.jpg') ?>
                </div>
                <div class="no-posts-third">
                    <?= Html::img($assetUrl . '/images/posts/no_posts_third2x.jpg') ?>

                </div>
            </div>

        </div>
    <?endif;?>

    <div class="pocket"></div>
</div>

<script>
	$(document).ready(function () {
		$('.select-time-dropdown a').click(function(){
			var selectDate = $(this).data('selectTime');
			$('input[name="PostSearch[selectDate]"]').val(selectDate);
			$(".grid-view").yiiGridView("applyFilter");
		});
		$('.post-categories').click(function () {
			$('input[name="PostSearch[category]"]').val(this.innerHTML);
			$(".grid-view").yiiGridView("applyFilter");
		});
		$('.post-search-title').click(function () {
			$('input[name="PostSearch[title]"]').val($('.search-post').val());
			$(".grid-view").yiiGridView("applyFilter");
		});
		$('.search-post').bind("enterKey", function (e) {
			$('input[name="PostSearch[title]"]').val($('.search-post').val());
			$(".grid-view").yiiGridView("applyFilter");
		}).keyup(function (e) {
			if (e.keyCode == 13) {
				$(this).trigger("enterKey");
			}
		});
		$('.fa-search-circle-ellipsis').popover({
			html: true
		});
		$('.post-statistic .menu-post a').not('.trash-posts').click(function (evt) {
			var $this = $(this);
			var status = $this.data('status');
			$('input[name="PostSearch[status]"]').val(status);
            $(".post-statistic .menu-post a").removeClass("active");
            $this.addClass("active");

			$(".grid-view").yiiGridView("applyFilter");
			evt.preventDefault();
		});
		$('#w0-filters').append('<input type="hidden" name="PostSearch[status]" value="<?=$userPosts->status;?>">');

        <?if (count($dataProvider->getModels()) <= 0):?>
            var noPostIterator = 0;
            var noPostRotate = setInterval(function(){
    //            console.log($("#no-posts-img").find("div:nth-child("+noPostIterator+")"));
    //
    //            console.log($("#no-posts-img").find("div:nth-child(1)"));
    //            console.log($("#no-posts-img").find("div:nth-child(2)"));
    //            console.log($("#no-posts-img").find("div:nth-child(3)"));

                noPostIterator++;
                noPostIterator %= 4;

                if (noPostIterator == 0){
                    $("#no-posts-img").find("div").fadeOut(500);
                }
                else{
                    $("#no-posts-img").find("div:nth-child("+noPostIterator+")").fadeIn(500);
                }

    //            console.log("noPostIterator", noPostIterator);

            }, 1000);
        <?endif;?>

//                'value' => function(){
//                    return '<div class="cat-checkbox-wp">
//                        {{#if checked }}
//                            <span class="my-checked-on fa fa-check-square" style="display: inline-block;"></span>
//                            <span class="my-checked-off fa fa-square-o" style="display: none;"></span>
//                        {{else}}
//                            <span class="my-checked-on fa fa-check-square" style="display: none;"></span>
//                            <span class="my-checked-off fa fa-square-o" style="display: inline-block;"></span>
//                        {{/if}}
//                        <input type="checkbox" {{#if checked }}checked="checked"{{/if}} style="display: none;"/>
//                    </div>';
//                }

        var beautyCheckboxes =  '<span class="my-checked-on fa fa-check-square" style="display: none;"></span>'+
                                '<span class="my-checked-off fa fa-square-o" style="display: inline-block;"></span>';
        $(".post-view-table .header-posts-checkbox, .post-view-table .posts-checkbox").append(beautyCheckboxes);
        $(".post-view-table .header-posts-checkbox, .post-view-table .posts-checkbox").find("span").on("click", function(e){
            var self = $(e.target);
            var headerCheckbox = $(".post-view-table .header-posts-checkbox");
            if (self.hasClass("my-checked-on")){
                self.parent().find(".my-checked-off").show();
                self.parent().find(".my-checked-on").hide();
                self.parent().find("input[type='checkbox']").prop("checked", false);

                headerCheckbox.find(".my-checked-off").show();
                headerCheckbox.find(".my-checked-on").hide();
                headerCheckbox.find("input[type='checkbox']").prop("checked", false);

            }
            if (self.hasClass("my-checked-off")){
                self.parent().find(".my-checked-off").hide();
                self.parent().find(".my-checked-on").show();
                self.parent().find("input[type='checkbox']").prop("checked", true);
            }
            viewTrashButtonHandler();
        });
        $(".post-view-table .header-posts-checkbox").find("span").on("click", function(e){
            var self = $(e.target);
            var groupCheckbox = $(".post-view-table .posts-checkbox");
            if (self.hasClass("my-checked-on")){
                groupCheckbox.find(".my-checked-off").show();
                groupCheckbox.find(".my-checked-on").hide();
                groupCheckbox.find("input[type='checkbox']").prop("checked", false);
            }
            if (self.hasClass("my-checked-off")){
                groupCheckbox.find(".my-checked-off").hide();
                groupCheckbox.find(".my-checked-on").show();
                groupCheckbox.find("input[type='checkbox']").prop("checked", true);
            }
            viewTrashButtonHandler();
        });
        $('.trash-posts').click(function (e) {
            e.preventDefault();

            var ids = [];
            $('.post-view-table .posts-checkbox :checkbox:checked').each(function () {
                ids.push($(this).closest('tr').attr('data-key'));
            });

            console.log('trash-posts trash-posts', ids);

            if (ids.length > 0) {
                window.location.href = '/post/trashposts/?ids=' + ids.toString();
            } 
        });
        viewTrashButtonHandler = function () {
            if ($('.post-view-table .posts-checkbox :checkbox:checked').size() > 0)
                $('.trash-posts').css('display', 'inline-block');
            else
                $('.trash-posts').css('display', 'none');
        };
	});

    $(document).ready(function(){
        VideoEssenceApp.start();
        VideoEssenceApp.Pocket.start();
    });

</script>