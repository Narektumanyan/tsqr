<?php

use yii\db\Schema;
use yii\db\Migration;

class m150414_064733_create_related_posts_table extends Migration
{
    public function up()
    {
	    $this->createTable('related_posts', [
			    'id' => Schema::TYPE_PK,
			    'related_id'  => Schema::TYPE_INTEGER,
		    ]
	    );
    }

    public function down()
    {
        echo "m150414_064733_create_related_posts_table cannot be reverted.\n";

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
