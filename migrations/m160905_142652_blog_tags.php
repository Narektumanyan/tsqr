<?php

use yii\db\Schema;
use yii\db\Migration;

class m160905_142652_blog_tags extends Migration
{
    public function up()
    {
        $this->createTable('blog', [
            'id' => Schema::TYPE_PK,
            'blog_id' => Schema::TYPE_INTEGER,
            'tag_name' => Schema::TYPE_STRING . ' (100) NOT NULL'
        ]);
    }

    public function down()
    {
        echo "m160905_142652_blog_tags cannot be reverted.\n";

        $this->dropTable('blog_tags');
        
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
