<?php

use yii\db\Schema;
use yii\db\Migration;

class m150911_084901_add_toPost_videoImage extends Migration
{
    public function up()
    {
        $this->addColumn('post', 'video_image_url', Schema::TYPE_STRING);

    }

    public function down()
    {
        echo "m150911_084901_add_toPost_videoImage cannot be reverted.\n";

        return false;
    }
    
    /*
    // Use safeUp/safeDown to run migration code within a transaction
    public function safeUp()
    {
    }
    
    public function safeDown()
    {
    }
    */
}
