<?
    use yii\helpers\Url;

    $tags = [];
    foreach($post->tags as $tag){
        $tags[] = $tag->tag_id;
    }

    $categories = [];
    foreach($post->categories as $cat){
        $categories[] = $cat->id;
    }

    $related = [];
    foreach($post->relatedPosts as $related_post){
        $related[] = $related_post->toJson();
    }
?>
<div class="post-viewer" >
    <??>
    <div class="publish-block-wp" style="<?=($isView) ? "display:none;" : ""?>">
        <div class="publish-block"></div>
    </div>

    <?
//    echo"<pre>";
//    print_r($post->content);
//    echo"</pre>";
    ?>

    <div class="create-publish-post-block" >
        <div id="post-editor" class="<?= $isView ? 'post-view-content' : '' ?>"></div>

        <?/*?>
        <form action="<?=Url::toRoute(['post/publish', 'id' => $post->id])?>" method="post" id="post-form">
            <input name='relations' id='relations' type="hidden">
            <input name='selectedCategories' id='selected-categories' type="hidden">
            <input name='tags' id='tags' type="hidden">
            <input type="hidden" name="<?= Yii::$app->request->csrfParam; ?>"
                   value="<?= Yii::$app->request->csrfToken; ?>"/>
            <input type="hidden" name="show_related" id="show_related" value=""/>
            <input type="hidden" name="related_headline" value="<?=$post->related_headline?>"/>
            <input id='post-submit' type="submit" class="btn" value="Publish">
        </form>
        <?*/?>
    </div>
    <?if(!$isView):?>
    <div class="pocket"></div>
    <?endif;?>
</div>

<script>
	window.post_id = <?=$post->id?>;
	$(document).ready(function() {
		initializePostVideo();
		VideoEssenceApp.start();
        <?if(!$isView):?>
            VideoEssenceApp.Pocket.start();
        <?endif;?>

        VideoEssenceApp.PostPublish.start({
            postInformationTags: <?= count($tags) > 0 ? "'".trim(implode(',', $tags), ",")."'" : "''" ?>,
            postInformationShowRelated: <?= $post->show_related ? 1 : 0 ?>,
            additinonalInfo: <?= json_encode(array(
                "post" => array(
                    "id" => $post->id,
                    "related_headline" => $post->related_headline,
                ),
                "csrf" => array(
                    "param" => Yii::$app->request->csrfParam,
                    "tocken" =>  Yii::$app->request->csrfToken,
                ),
                "route" => Url::toRoute(['post/publish', 'id' => $post->id]),
                "tags" => $tags,
            ))?>,
            // editor
            postData: {
                id: '<?=$post->id?>',
                title: '<?=$post->title?>',
                content: '<?=rawurlencode($post->content)?>',
                videos: [{
                    id: '<?=$video['id']?>',
                    type: '<?=$video['type']?>',
                    url: '<?=$video['url']?>',
                    poster: '<?=$video['poster']?>',
                    width: '<?=$video['width']?>',
                    height: '<?=$video['height']?>',

//                    id: 'iFgiJwdWYCo&type',
//                    type: 'youtube',
//                    url: 'http://www.youtube.com/watch?v=iFgiJwdWYCo',
//                    poster: 'http://placehold.it/640x360',

                    customs: []
                }]
            }
        });

		VideoEssenceApp.PostPublish.linkPostsCollection.set(<?=$userposts?>);
		VideoEssenceApp.PostPublish.currentPostRelation.set(<?=json_encode($related)?>);

		VideoEssenceApp.checkedCategories = [<?=implode(',', $categories)?>];

        VideoEssenceApp.MediaManager.start({
            images_gallery:<?=$images_gallery?>
        });

	});
</script>
