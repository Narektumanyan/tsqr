<?php

use yii\db\Schema;
use yii\db\Migration;

class m150525_111531_add_headline_related_post extends Migration
{
    public function up()
    {
        $this->addColumn('post','related_headline', Schema::TYPE_STRING . ' DEFAULT NULL');
    }

    public function down()
    {
        $this->dropColumn('post', 'related_headline');
    }
}
