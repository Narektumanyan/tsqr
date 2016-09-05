<?php
// Post create view
?>

<div id="post-editor" class="create-post-block"></div>

<script>
	$(document).ready(function() {
		VideoEssenceApp.start();
		VideoEssenceApp.PostCreate.start({
			id:      <?= json_encode($model->id) ?>,
			title:   <?= json_encode($model->title) ?>,
			content: <?= json_encode($model->content) ?>,
			author:  <?= json_encode($model->author) ?>,
			status:  <?= json_encode($model->status) ?>
		});


		VideoEssenceApp.MediaManager.start({
			images_gallery:<?= $images_gallery ?>
		});
	});
</script>
