<?php

use yii\db\Schema;
use yii\db\Migration;

class m150817_122743_foundChannels extends Migration
{
    public function up()
    {
//        $this->execute("ALTER TABLE ...");

        $this->addColumn('followed_channel', 'image', Schema::TYPE_STRING);
        $this->addColumn('followed_channel', 'lastSeen', Schema::TYPE_TIMESTAMP);
    }

    public function down()
    {
        echo "m150817_122743_foundChannels cannot be reverted.\n";
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
