<?php

use yii\db\Schema;
use yii\db\Migration;

class m151008_135107_add_fields_to_category_table extends Migration
{
    public function up()
    {
        $this->addColumn('post_categories', 'trashed', Schema::TYPE_BOOLEAN);
        $this->addColumn('post_categories', 'barge', Schema::TYPE_STRING);
        $this->addColumn('post_categories', 'last_modified', Schema::TYPE_DATETIME );
    }

    public function down()
    {
        $this->dropColumn('post_categories', 'trashed');
        $this->dropColumn('post_categories', 'barge');
        $this->dropColumn('post_categories', 'last_modified');
//        return true;

//        echo "m151008_135107_add_fields_to_category_table cannot be reverted.\n";
//
//        return false;
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
