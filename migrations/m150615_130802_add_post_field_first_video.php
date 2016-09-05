<?php

use yii\db\Schema;
use yii\db\Migration;

class m150615_130802_add_post_field_first_video extends Migration
{
	public function up()
	{
		$this->addColumn('post', 'video_id', Schema::TYPE_STRING . '(25)');
		$this->addColumn('post', 'video_type', Schema::TYPE_STRING . '(20)');
		$this->addColumn('post', 'video_url', Schema::TYPE_STRING . '(255)');
	}

    public function down()
    {
        echo "m150615_130802_add_post_field_first_video cannot be reverted.\n";

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
