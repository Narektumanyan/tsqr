<?php

use yii\db\Schema;
use yii\db\Migration;

class m151113_090945_add_order_field_for_pages extends Migration
{
    public function up()
    {
        $this->addColumn('page', 'order', Schema::TYPE_INTEGER);
    }

    public function down()
    {
        echo "m151113_090945_add_order_field_for_pages cannot be reverted.\n";

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
