<?php
namespace app\components\video;

interface ChannelCollectionInterface {
    public function getChannels($keyword, $offset, $limit);
    public function getVideoByChannel($channel_id, $offset, $limit);
    public function toJson();
    public function toArray();
}