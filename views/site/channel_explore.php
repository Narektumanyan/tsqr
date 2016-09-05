<?php

use yii\helpers\Html;
?>
<?$videoNumber=0;?>
<div class="channel-explore-page">
<? foreach($channels as $channel) : ?>
    <?if($videoNumber%2==0):?>
        <div class="channel-row">
    <? endif; ?>
        <div class="channel-container youtube">
            <img src="<?= $channel['thumbnail'] ?>" class="thumbnail" />
            <div class="channel-description">
                <h3 class="lockup-title">
                    <?= Html::a($channel['title'], "http://www.youtube.com/channel/{$channel['id']}")?>
                </h3>
                <?=Html::a( "by " . $channel['title'], "http://www.youtube.com/channel/{$channel['id']}") ?>
                <div class="channel-detail">
                    <?=$channel['video_count']?> videos
                </div>
                <div class="text-description">
                    <?= $channel['description']?>
                    <a class="fa fa-plus-circle"></a>
                </div>
            </div>
        </div>
    <?if(($videoNumber+1)%2==0):?>
        </div>
    <? endif; ?>
    <?$videoNumber++?>
<? endforeach; ?>
</div>
