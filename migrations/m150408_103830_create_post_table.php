<?php

use yii\db\Schema;
use yii\db\Migration;

class m150408_103830_create_post_table extends Migration
{
	public function up()
	{
		$this->createTable('post', [
				'id' => Schema::TYPE_PK,
                'author'  => Schema::TYPE_INTEGER,
                'date'  => Schema::TYPE_DATETIME,
                'title'  => Schema::TYPE_STRING,
                'content'  => Schema::TYPE_TEXT,
			]
		);
	}

	public function down()
	{
		echo "m150408_103830_create_post_table cannot be reverted.\n";

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
