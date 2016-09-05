
<div class="create-post-block">
	<div class="post-preview-title">
		<?=$post->title?>
	</div>
	<div class="post-preview">
		<?
//        for(var i in postContent){
//            if (!postContent.hasOwnProperty(i)) continue
//
//                //console.log("postContent[prop].elType", postContent[i].elType, postContent[i]);
//
//                var currentNode = "";
//
//                if (postContent[i].elType != "video" &&
//                (postContent[i].tagName == 'p' ||
//            postContent[i].tagName == 'blockquote')
//                ){
//                contentHtml = "<"+postContent[i].tagName+" class='graf graf--"+postContent[i].tagName+"'>"+ postContent[i].content +"</"+postContent[i].tagName+">";
//
//                    currentNode = $($editor.find(".section-inner").find(".graf:last"));
//                    currentNode.before(contentHtml);
//                }
//                if (postContent[i].elType == "video"){
//                var graf = $('<p class="graf graf--p" data-video-id="'+postContent[i].videoId+
//                    '" data-video-type="'+postContent[i].videoType+'"><br></p>');
//
//                    var video = {
//                    id: postContent[i].videoId,
//                        type: postContent[i].videoType,
//                        url: postContent[i].videoUrl,
//                        poster: postContent[i].videoPoster
//                    };
//
//                    if (postContent[i].videoType == "youtube")
//                        video.embeded_url = "https://www.youtube.com/embed/"+postContent[i].videoId+"?autoplay=1";
//
//                    currentNode = $($editor.find(".section-inner").find(".graf:last"));
//
//                    currentNode.before(graf);
//
//                    VideoEssenceApp.PostPublish.editor.btnVideo.pasteVideo(video, graf);
//                }
//            }
        $outerHtml = "";
        $postContent = json_decode($post->content);
        foreach($postContent as $contentEl){
            if ($contentEl->elType != "video" &&
                ($contentEl->elType == "p" ||
                $contentEl->elType == "blockquote"
                )
            ){
//              contentHtml = "<"+postContent[i].tagName+" class='graf graf--"+postContent[i].tagName+"'>"+ postContent[i].content +"</"+postContent[i].tagName+">";
                $outerHtml .=  "<".$contentEl->tagName." class='graf graf--".$contentEl->tagName."'>".$contentEl->content."</".$contentEl->tagName.">";
            }
            if ($contentEl->elType == "video" ){
//                $outerHtml .= '<p class="graf graf--p" data-video-id="' . $contentEl->videoId .'" data-video-type="'+$contentEl->videoType+'">';

//                switch($contentEl->videoType) {
//                    case 'vimeo':
//                        $outerHtml .= "<video contenteditable='false' class='video-js vjs-default-skin' controls preload='auto' width='" + width + "' height='" + height + "' ></video>";
//                    case 'youtube':
//                        $outerHtml .= "<video contenteditable='false' src='' class='video-js vjs-default-skin' controls preload='auto' width='" + width + "' height='" + height + "' data-setup='{ \"techOrder\": [\"youtube\"], \"src\": \"" + url + "\"}'></video>";
//                }

                $outerHtml .= "<p style=''>".$contentEl->content."</p>";

//                $outerHtml .= '<br></p>';
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
