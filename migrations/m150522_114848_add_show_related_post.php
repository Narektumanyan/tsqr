<?php

use yii\db\Schema;
use yii\db\Migration;

class m150522_114848_add_show_related_post extends Migration
{
    public function up()
    {
        $this->addColumn('post','show_related', Schema::TYPE_INTEGER . ' DEFAULT 0');
    }

    public function down()
    {
        $this->dropColumn('post', 'show_related');
    }
}
