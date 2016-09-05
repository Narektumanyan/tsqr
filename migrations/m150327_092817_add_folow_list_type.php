<?php

use yii\db\Schema;
use yii\db\Migration;

class m150327_092817_add_folow_list_type extends Migration
{
    public function up()
    {
        $this->addColumn('followed_channel','type', Schema::TYPE_STRING);
    }

    public function down()
    {
        echo "m150327_092817_add_folow_list_type cannot be reverted.\n";

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
