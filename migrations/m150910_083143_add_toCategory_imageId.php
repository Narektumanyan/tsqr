<?php

use yii\db\Schema;
use yii\db\Migration;

class m150910_083143_add_toCategory_imageId extends Migration
{
    public function up()
    {
        $this->addColumn('post_categories', 'image_id', Schema::TYPE_INTEGER);
        $this->addColumn('post_categories', 'desc', Schema::TYPE_TEXT);
    }

    public function down()
    {
        echo "m150910_083143_add_toCategory_imageId cannot be reverted.\n";

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
