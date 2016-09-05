<?php

use yii\db\Schema;
use yii\db\Migration;

class m151118_125448_add_description_image extends Migration
{
    public function up()
    {
        $this->addColumn('image', 'description', 'text');
    }

    public function down()
    {
        $this->dropColumn('image', 'description');
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
