<?php

use yii\db\Schema;
use yii\db\Migration;

class m150325_100149_add_table_follow extends Migration
{
    public function up()
    {
        $this->createTable('followed_channel',[
                'id' => Schema::TYPE_PK,
                'user_id' => Schema::TYPE_INTEGER,
                'chanel_id' => Schema::TYPE_STRING . ' NOT NULL',
            ]
            );
    }

    public function down()
    {
        echo "m150325_100149_add_table_follow cannot be reverted.\n";

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
