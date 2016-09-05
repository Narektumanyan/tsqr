<!--<div class="video-explore-page ">-->
<!--    <div class="followed-panel">-->
<!--        <div class="followed-header"><i class="fa fa-circle-thin"></i>Following</div>-->
<!--        <div class="followed-panel-wrapper">-->
<!--            <div class="followed-item">-->
<!--                <i class="fa fa-circle-thin"></i>Andrey & Ko-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->

<!--    <!--	<div class="app"></div>-->

    <div class="explore-video-wrapper clearfix "></div>
<!--</div>-->

<?//
//echo"<pre>";
//print_r($videos->toJson());
//echo"</pre>";
//?>

<?
//var_dump(isset($jsonChannelBanners) && strlen(trim($jsonChannelBanners)) > 0);
//die();
//print_r($jsonChannels);
//die();
?>

<![CDATA[YII-BLOCK-BODY-END]]>

<script>
    jQuery(document).ready();
</script>

<script>
    $(document).ready(function(){
	    VideoEssenceApp.start();
	    VideoEssenceApp.FollowPanel.fillChannels(<?= $jsonChannels ?>);

	    VideoEssenceApp.VideoExplore.start({
		    collectionOptions: {
			    urlSearch: '<?=$urlSearch?>',
			    youtubeNextPageToken: '<?=$videos->getYoutubeNextPageToken()?>'
		    },
		    videos:<?=$videos->toJson()?>,
		    stopPaging: <?=json_encode($videos->stopPaging())?>,
            channelInfo: <?= isset($jsonChannelInfo) && strlen(trim($jsonChannelInfo)) > 0 ? $jsonChannelInfo : 0 ?>,
            followChannels: <?= isset($jsonChannels) && strlen(trim($jsonChannels)) > 0 ? $jsonChannels : 0 ?>,
            categoryName: '<?= isset($categoryName) && strlen(trim($categoryName)) > 0 ? $categoryName : "Explore" ?>'
	    });
	    VideoEssenceApp.Pocket.start();
    });
</script>
