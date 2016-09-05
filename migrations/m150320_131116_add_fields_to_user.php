<?php

use yii\db\Schema;
use yii\db\Migration;

class m150320_131116_add_fields_to_user extends Migration
{
    public function up()
    {
        $this->renameColumn('user', 'username', 'firstname');
        $this->addColumn('user', 'lastname', 'VARCHAR(25)');
        $this->dropIndex('user_unique_username', 'user');
        
        return true;
    }

    public function down()
    {
        //echo "m150320_131116_add_fields_to_user cannot be reverted.\n";
        $this->renameColumn('user', 'firstname', 'username');
        $this->dropColumn('user', 'lastname', 'VARCHAR(25)');
        $this->createIndex('user_unique_username','user','username', true);

        return true;
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
