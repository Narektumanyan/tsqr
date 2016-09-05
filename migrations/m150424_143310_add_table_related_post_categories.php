<?php

use yii\db\Schema;
use yii\db\Migration;

class m150424_143310_add_table_related_post_categories extends Migration
{
    public function up()
    {
	    $this->createTable('related_post_categories',[
			    'id' => Schema::TYPE_PK,
			    'post_id' => Schema::TYPE_INTEGER,
			    'category_id' => Schema::TYPE_INTEGER
		    ]
	    );
    }

    public function down()
    {
        echo "m150424_143310_add_table_related_post_categories cannot be reverted.\n";

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
