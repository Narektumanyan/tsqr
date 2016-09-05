<?php

use yii\db\Schema;
use yii\db\Migration;

class m150813_112003_add_preview_image extends Migration
{
    public function up()
    {
        $this->addColumn('image', 'preview', Schema::TYPE_STRING . '(255)');
    }

    public function down()
    {
        $this->dropColumn('image', 'preview');

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
