<?php

use yii\db\Schema;
use yii\db\Migration;

class m151105_123358_create_page extends Migration
{
    public function up()
    {
        $this->createTable('page', [
                'id' => Schema::TYPE_PK,
                'author'  => Schema::TYPE_INTEGER,
                'created_at'  => Schema::TYPE_TIMESTAMP . ' DEFAULT CURRENT_TIMESTAMP',
                'title'  => Schema::TYPE_STRING,
                'content'  => Schema::TYPE_TEXT,
                'status'  => Schema::TYPE_INTEGER,
            ]
        );

        $this->addForeignKey('FK_user_id', 'page', 'author', 'user', 'id', 'RESTRICT', 'RESTRICT');
    }

    public function down()
    {
        echo "m151105_123358_create_page cannot be reverted.\n";

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
