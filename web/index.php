<?php

// comment out the following two lines when deployed to production
defined('YII_DEBUG') or define('YII_DEBUG', true);
defined('YII_ENV') or define('YII_ENV', 'dev');

require(__DIR__ . '/../vendor/autoload.php');
require(__DIR__ . '/../vendor/yiisoft/yii2/Yii.php');

$config = require(__DIR__ . '/../config/web.php');

$application = new yii\web\Application($config);

$application->run();

function dbg($data, $die = true, $var_dump = false){
//    if($_SERVER['REMOTE_ADDR'] == '185.44.228.181' || $_SERVER['REMOTE_ADDR'] == '185.44.228.182'){
        echo '<pre>';
            if($var_dump){
                var_dump($data);
            }
            else{
                print_r($data);
            }
        echo '</pre>';

        if($die){
            die('DEBUG');
        }
//    }
}