<?
use yii\helpers\Url;
use yii\widgets\Menu;
?>

<div class="dashboard-wrapper">
    <? foreach ($categories as $category) {?>
        <div class="dashboard-item <?=$category['class']?>"
             data-index="<?=$category['class']?>"
             style='background: url("<?=\Yii::$app->assetManager->getPublishedUrl('../static').$category["normal"]?>") 10px 10px no-repeat;'
            >

            <a class="dashboard-thumbnail-container " href="<?=Url::to(['site/category', 'name' => $category['name']])?>">
                <span><?=$category['name']?></span>
            </a>
        </div>
    <?} ?>
</div>

<script>
    $(document).ready(function(){
        VideoEssenceApp.start();
        VideoEssenceApp.FollowPanel.fillChannels(<?=$jsonChannels?>);
//        VideoEssenceApp.VideoExplore.start({
//            collectionOptions: {
//                urlSearch: '<?//=$urlSearch?>//',
//                youtubeNextPageToken: '<?//=$videos->getYoutubeNextPageToken()?>//'
//            },
//            videos:<?//=$videos->toJson()?>//,
//            stopPaging: <?//=json_encode($videos->stopPaging())?>
//        });
        VideoEssenceApp.Pocket.start();

        var categories = <?= count($categories) > 0 ? json_encode($categories) : "''" ?>;
        if (window.devicePixelRatio > 1){
            $(".dashboard-wrapper .dashboard-item").each(function(i){
                var self = $(this);

                self.css("background", "url("+"<?=\Yii::$app->assetManager->getPublishedUrl('../static')?>" + categories[self.attr("data-index")].retina+") 10px 10px no-repeat")
                    .css("background-size", "280px 200px");
            });
        }

    })
</script>