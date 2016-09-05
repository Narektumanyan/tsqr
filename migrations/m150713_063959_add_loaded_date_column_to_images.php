<?php

use yii\db\Schema;
use yii\db\Migration;

class m150713_063959_add_loaded_date_column_to_images extends Migration
{
    public function up()
    {
        $this->addColumn('image', 'loaded_date', Schema::TYPE_DATETIME);
    }

    public function down()
    {
        echo "m150713_063959_add_loaded_date_column_to_images cannot be reverted.\n";

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
