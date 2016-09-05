<?php

use yii\helpers\Url;

?>
<!--<div class="video-explore-page ">-->
<!--    <div class="followed-panel">-->
<!--        <div class="followed-header"><i class="fa fa-circle-thin"></i>Similar keyword</div>-->
<!--        <div class="similar-keyword-wrapper">-->
<!--            Loading ...-->
<!--        </div>-->
<!--        <div class="followed-header"><i class="fa fa-circle-thin"></i>Found channels</div>-->
<!--        <div class="search-panel-wrapper">-->
<!--            Loading ...-->
<!--        </div>-->
<!--        <div class="followed-header"><i class="fa fa-circle-thin"></i>Following</div>-->
<!--        <div class="followed-panel-wrapper">-->
<!--	        Loading ...-->
<!--        </div>-->
<!--    </div>-->

<table class="search-wp">
    <tr class="search-head">
        <th width="66%"><h3>Topics</h3></th>
        <th width="33%"><h3>Channels</h3></th>
    </tr>
    <tr class="search-body">
        <td width="66%" valign="top" align="left" class="topic-wp">
<!--            <div class="search-topic">-->
<!--                <a class="topic-image" href="#topic-image">C</a>-->
<!--                <div class="title">-->
<!--                    <a href="#topic-content" class="topic-content">Cool Sport Records 2015</a>-->
<!--                </div>-->
<!--                <div class="following">-->
<!--                    <a class="follow-this" href="#follow-this">Follow</a>-->
<!--                </div>-->
<!--            </div>-->
        </td>
        <td width="33%" valign="top" align="left" class="channel-wp" >
<!--            <div class="search-channel">-->
<!--                <a class="channel-image" href="#channel-image">C</a>-->
<!--                <div class="title">-->
<!--                    <a href="#channel-content" class="channel-content">Ben's Stiller Sport Channel</a>-->
<!--                </div>-->
<!--                <div class="following">-->
<!--                    <a class="follow-this" href="#follow-this">Follow</a>-->
<!--                </div>-->
<!--            </div>-->
        </td>
    </tr>
    <tr><td height="20" colspan="2"></td></tr>
</table>

    <div class="explore-video-wrapper clearfix "></div>

<!--</div>-->

<?
//echo"<pre>";
//print_r($jsonChannels);
//echo"</pre>";
?>

<![CDATA[YII-BLOCK-BODY-END]]>

<??>
<script>
    $(document).ready(function(){
        VideoEssenceApp.start();
	    VideoEssenceApp.FollowPanel.fillChannels(<?=$jsonChannels?>);

	    VideoEssenceApp.VideoExplore.start({
		    collectionOptions: {
			    urlSearch: '<?=$urlSearch?>',
			    urlForChannelVideos: '<?=Url::toRoute('/site/channelvideos')?>',
			    youtubeNextPageToken: '<?=$videos->getYoutubeNextPageToken()?>'
		    },
		    videos:<?=$videos->toJson()?>,
		    stopPaging: <?=json_encode($videos->stopPaging())?>,
            isSearch: true,
            query: <?= strlen(trim($query)) > 0 ? "'".$query."'" : "false" ?>
	    });
	    VideoEssenceApp.SimilarKeyword.start({
		    textToSearch:'<?=rawurlencode($_GET['textToSearch'].' ')?>'
	    });
	    VideoEssenceApp.SearchPanel.fillChannels('<?=$_GET["textToSearch"]?>');
	    VideoEssenceApp.Pocket.start();
    });
</script>

<script>
function createSimilarKeywords(data){
	VideoEssenceApp.SimilarKeyword.showPanel(data);
};
</script>

