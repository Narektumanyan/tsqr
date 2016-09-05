<?php

use yii\db\Schema;
use yii\db\Migration;

class m150525_125139_headline_add_default extends Migration
{
    public function up()
    {
        $this->dropColumn('post', 'related_headline');
        $this->addColumn('post','related_headline', Schema::TYPE_STRING . ' DEFAULT "Recommended for you"');
    }

    public function down()
    {
        $this->dropColumn('post', 'related_headline');
        $this->addColumn('post','related_headline', Schema::TYPE_STRING . ' DEFAULT NULL');
    }
}
