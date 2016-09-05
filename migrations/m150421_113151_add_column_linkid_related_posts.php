<?php

use yii\db\Schema;
use yii\db\Migration;

class m150421_113151_add_column_linkid_related_posts extends Migration
{
    public function up()
    {
	    $this->renameColumn('related_posts','id', 'link_id');
	    $this->addColumn('related_posts','id', Schema::TYPE_INTEGER);
    }

    public function down()
    {
        echo "m150421_113151_add_column_linkid_related_posts cannot be reverted.\n";

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
