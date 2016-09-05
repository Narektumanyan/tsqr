<?
use yii\helpers\Url;
use yii\widgets\Menu;
use yii\helpers\Html;
?>

<div class="page-content">
    
</div>
<div class="pocket"></div>

<script>
    $(document).ready(function() {
        VideoEssenceApp.start();
        
        VideoEssenceApp.Gallery.start({
            images_gallery:<?=$images_gallery?>,
            images_posts:<?=$images_posts?>
        });
    });
</script>
