<?php

use yii\db\Schema;
use yii\db\Migration;

class m150331_111549_add_table_hidden extends Migration
{
    public function up()
    {
        $this->createTable('hidden_video',[
                'id' => Schema::TYPE_PK,
                'user_id' => Schema::TYPE_INTEGER,
                'video_id' => Schema::TYPE_STRING . ' NOT NULL',
                'type' => Schema::TYPE_STRING
            ]
            );
    }

    public function down()
    {
        echo "m150331_111549_add_table_hidden cannot be reverted.\n";

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
