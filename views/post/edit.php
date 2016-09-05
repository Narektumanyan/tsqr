<?php
// Post create view
?>

<div id="post-editor" class="create-post-block"></div>

<script>
	$(document).ready(function() {
		VideoEssenceApp.start();
		VideoEssenceApp.PostCreate.start({
			id: <?=json_encode($post->id)?>,
			title: <?=json_encode($post->title)?>,
			content: <?=json_encode($post->content)?>
		});


		VideoEssenceApp.MediaManager.start({
			images_gallery:<?=$images_gallery?>
		});

		VideoEssenceApp.checkedCategories = {};
	});
</script>
