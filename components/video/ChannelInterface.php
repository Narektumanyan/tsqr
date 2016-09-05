<?php

namespace app\components\video;

interface ChannelInterface {
    public function getTitle();
    public function getImage();
    public function getUrl();
    public function getId();
    public function getDescription();
    public function toJson();
}