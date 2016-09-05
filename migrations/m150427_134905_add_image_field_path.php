<?php

use yii\db\Schema;
use yii\db\Migration;

class m150427_134905_add_image_field_path extends Migration
{
    public function up()
    {
        $this->addColumn('image','path', Schema::TYPE_STRING . '(256)');
    }

    public function down()
    {
        echo "m150427_134905_add_image_field_path cannot be reverted.\n";

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
