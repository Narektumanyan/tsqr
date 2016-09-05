
<div class="create-post-block">
	<div class="post-preview-title">
		<?=$page->title?>
	</div>
	<div class="post-preview">
		<?php
        $outerHtml = "";
        $pageContent = json_decode($page->content);
        foreach($pageContent as $contentEl){
            if ($contentEl->elType != "video" &&
                ($contentEl->elType == "p" ||
                $contentEl->elType == "blockquote"
                )
            ){
                $outerHtml .=  "<".$contentEl->tagName." class='graf graf--".$contentEl->tagName."'>".$contentEl->content."</".$contentEl->tagName.">";
            }
            if ($contentEl->elType == "video" ){
                $outerHtml .= "<p style=''>".$contentEl->content."</p>";
            }
        }

        echo $outerHtml;

        ?>
	</div>

</div>
<script>
	function setVideoHeight() {
		var windowWidth = $(window).width();
		windowWidth = (windowWidth > 900) ? 900 : windowWidth;
		$('.video-js').height(windowWidth / 1.78);
	}
	window.post_id = <?=$_GET['id']?>;
	$(document).ready(function() {
		initializePostVideo();
		setVideoHeight();
	});
	$(window).resize(function() {
		setVideoHeight();
	});
</script>
