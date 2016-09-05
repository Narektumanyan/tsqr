<?php

use yii\db\Schema;
use yii\db\Migration;

class m150429_121814_add_name_for_followed_channels extends Migration
{
    public function up()
    {
        $this->addColumn('followed_channel','name', Schema::TYPE_STRING . ' NOT NULL DEFAULT "Channel name"');
    }

    public function down()
    {
        $this->dropColumn('followed_channel', 'name');
    }
}
