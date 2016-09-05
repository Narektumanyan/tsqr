<?php

use yii\db\Schema;
use yii\db\Migration;

class m150415_072018_add_follow_channel_subtype extends Migration
{
    public function up()
    {
        $this->addColumn('followed_channel','subtype', Schema::TYPE_STRING . '(10) NOT NULL');
    }

    public function down()
    {
        echo "m150415_072018_add_follow_channel_subtype cannot be reverted.\n";

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
