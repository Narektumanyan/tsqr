<?php

use yii\db\Schema;
use yii\db\Migration;

class m150520_072717_add_user_id_in_categories extends Migration
{
    public function up()
    {
        $this->addColumn('post_categories','user_id', Schema::TYPE_INTEGER . ' DEFAULT NULL');
    }

    public function down()
    {
        $this->dropColumn('post_categories', 'user_id');
    }
}
