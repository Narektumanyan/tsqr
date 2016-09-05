<?php

use yii\db\Schema;
use yii\db\Migration;

class m150427_115631_add_post_categories_general_data extends Migration
{
    public function up()
    {
		$this->insert("post_categories",
				array(
					"id" => 1,
					'parent_id' => NULL,
					'label' => 'General'
				)
		);
    }

    public function down()
    {
        echo "m150427_115631_add_post_categories_general_data cannot be reverted.\n";

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
