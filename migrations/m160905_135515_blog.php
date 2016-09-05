<?php

use yii\db\Schema;
use yii\db\Migration;

class m160905_135515_blog extends Migration
{
    public function up()
    {
        $this->createTable('blog', [
            'id' => Schema::TYPE_PK,
            'name' => Schema::TYPE_STRING . ' (100) NOT NULL',
            'title' => Schema::TYPE_STRING . ' NOT NULL',
            'description' => Schema::TYPE_TEXT,
            'create_date' => Schema::TYPE_INTEGER,
        ]);
    }

    public function down()
    {
        echo "m160905_135515_blog cannot be reverted.\n";
        
        $this->dropTable('blog');
        
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
