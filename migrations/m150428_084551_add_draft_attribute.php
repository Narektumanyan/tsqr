<?php

use yii\db\Schema;
use yii\db\Migration;

class m150428_084551_add_draft_attribute extends Migration
{
    public function up()
    {
        $this->addColumn('post','draft', Schema::TYPE_INTEGER . ' NOT NULL DEFAULT 0');
    }

    public function down()
    {
        $this->dropColumn('post', 'draft');
    }
}
