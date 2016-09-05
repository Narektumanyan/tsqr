<?php

use yii\db\Schema;
use yii\db\Migration;

class m150813_113317_add_relation_image_to_post extends Migration
{
    public function up()
    {
        $this->createTable('post_image', [
            'post_id' => Schema::TYPE_INTEGER,
            'image_id' => Schema::TYPE_INTEGER
        ]);
    }

    public function down()
    {
        $this->dropTable('post_image');

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
