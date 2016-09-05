<?php

use yii\db\Schema;
use yii\db\Migration;

class m150424_115325_add_table_post_tags extends Migration
{
    public function up()
    {
	    $this->createTable('post_tags',[
			    'id' => Schema::TYPE_PK,
			    'post_id' => Schema::TYPE_INTEGER,
			    'tag_id' => Schema::TYPE_STRING . ' NOT NULL',
		    ]
	    );
    }

    public function down()
    {
        echo "m150424_115325_add_table_post_tags cannot be reverted.\n";

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
