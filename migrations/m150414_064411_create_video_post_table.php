<?php

use yii\db\Schema;
use yii\db\Migration;

class m150414_064411_create_video_post_table extends Migration
{
	public function up()
	{
		$this->createTable('video_post', [
				'id' => Schema::TYPE_PK,
				'post_id'  => Schema::TYPE_INTEGER,
				'video_id'  => Schema::TYPE_STRING,
				'video_type'  => Schema::TYPE_STRING
			]
		);
	}

    public function down()
    {
        echo "m150414_064411_create_video_post_table cannot be reverted.\n";

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
