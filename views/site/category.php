<div class="video-wrapper">
        <?php // dbg($channels->toArray()[0]->getUrl()); ?>
</div>
<script>
	$(document).ready(function () {
		VideoEssenceApp.start();
		VideoEssenceApp.Category.start({
			category: <?=json_encode(urlencode($_GET['name']))?>,
			channels: <?=$channels->toJson()?>,
                        name: '<?=$name?>',
			youtubeNextPageToken: '<?=json_encode($channels->getYoutubeNextPageToken())?>',
                        imgs: <?= count($imgs) > 0 ? json_encode($imgs) : "''"?>
		});
        VideoEssenceApp.FollowPanel.fillChannels(<?=$jsonChannels?>);
	});
</script>