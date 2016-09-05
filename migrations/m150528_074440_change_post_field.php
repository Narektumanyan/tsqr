<?php

use yii\db\Schema;
use yii\db\Migration;

class m150528_074440_change_post_field extends Migration
{
    public function up()
    {
        $this->renameColumn('post', 'draft', 'status');
    }

    public function down()
    {
        echo "m150528_074440_change_post_field cannot be reverted.\n";

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
