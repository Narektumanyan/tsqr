<?php

use yii\db\Schema;
use yii\db\Migration;

class m150422_115316_add_images_table extends Migration
{
    public function up()
    {
        $this->createTable('image', [
            'id' => Schema::TYPE_PK,
            'user_id' => Schema::TYPE_INTEGER,
            'name' => Schema::TYPE_STRING . '(64)',
            'filename' => Schema::TYPE_STRING . '(256)',
            'size' => Schema::TYPE_INTEGER,
            'type' => Schema::TYPE_STRING . '(32)'
        ]);
    }

    public function down()
    {
        echo "m150422_115316_add_images_table cannot be reverted.\n";

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
