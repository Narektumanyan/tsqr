<?php
// Post create view
?>

<div id="post-editor" class="create-post-block"></div>

<script>
	$(document).ready(function() {
		VideoEssenceApp.start();
		VideoEssenceApp.PostCreate.start({
			videos: [{
				id: '<?=$video['id']?>',
				type: '<?=$video['type']?>',
				url: '<?=$video['url']?>',
				poster: '<?=$video['poster']?>',
				customs: []
			}]
		});

		VideoEssenceApp.MediaManager.start({
			images_gallery:<?=$images_gallery?>
		});
	});
</script>
