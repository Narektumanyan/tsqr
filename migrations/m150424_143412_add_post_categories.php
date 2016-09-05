<?php

use yii\db\Schema;
use yii\db\Migration;

class m150424_143412_add_post_categories extends Migration
{
    public function up()
    {
	    $this->createTable('post_categories',[
			    'id' => Schema::TYPE_PK,
			    'parent_id' => Schema::TYPE_INTEGER,
			    'label' => Schema::TYPE_STRING,
		    ]
	    );
    }

    public function down()
    {
        echo "m150424_143412_add_post_categories cannot be reverted.\n";

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
