<?php

$params = require(__DIR__ . '/params.php');

$config = [
    'id' => 'basic',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'defaultRoute' => 'site/index',
    'components' => [
        'request' => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            'cookieValidationKey' => 'WSnvxslDjdamCXPWSrK2Bcz6c-mdY6PH',
        ],
        'user' => [
            'enableAutoLogin' => true,
            'loginUrl' => '/user/login',
            'returnUrl' => '/site/index'
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
                'user/login' => 'site/login',
                'http://<subdomain:\w+>.trend.loc' => 'blog/index',
//                'user/<controller:\w+>/<action:\w+>' => 'user/<controller>/<action>',
                'PUT <controller:\w+>/<action:\w+>/<id:\w+>' => '<controller>/<action>',
                '<controller:\w+>/<action:\w+>/<id:\w+>' => '<controller>/<action>',
            ],
        ],
        'db' => require(__DIR__ . '/db.php'),
        'view' => [
            'theme' => [
                'pathMap' => [
                    '@dektrium/user/views' => '@app/views/user'
                ],
            ],
        ],
        'assetManager' => [
            'forceCopy' => true
        ],
        'videoService' => [
            'class' => 'app\components\VideoServiceComponent',
        ],
        'cache' => [
            'class' => 'yii\redis\Cache',
            'redis' => [
                'hostname' => 'localhost',
                'port' => 6379,
                'database' => 4,
            ],
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer'
        ],
    ],
    'params' => $params,
    'modules' => [
        'user' => [
            'class' => 'dektrium\user\Module',
            'controllerMap' => [
                'security' => [
                    'class' => 'app\controllers\SiteController',
                    'layout' => '@app/views/layouts/auth.php'
                ],
                'registration' => [
                    /*'class' => 'dektrium\user\controllers\RegistrationController',*/
	                'class' => 'app\controllers\user\RegistrationController',
                    'layout' => '@app/views/layouts/auth.php'
                ],
                'recovery' => [
//                    'class' => 'dektrium\user\controllers\RecoveryController',
                    'class' => 'app\controllers\user\RecoveryController',
                    'layout' => '@app/views/layouts/auth.php'
                ],

            ],
            'modelMap' => [
                'User' => 'app\models\User',
                'RegistrationForm' => 'app\models\RegistrationForm',
                'LoginForm' => 'app\models\LoginForm',
                'RecoveryForm' => 'app\models\RecoveryForm',
            ],
            'mailer' => [
                'sender'                => 'no-reply@video-essence.rit-soft.com', // or ['no-reply@myhost.com' => 'Sender name']
                'welcomeSubject'        => 'Welcome subject',
                'confirmationSubject'   => 'Confirmation subject',
                'reconfirmationSubject' => 'Email change subject',
                'recoverySubject'       => 'Recovery subject',
            ],
            'urlRules' => [
                '<id:\d+>'                                  => 'profile/show',
                '<action:(login|logout)>'                   => 'security/<action>',
                '<action:(register|resend)>'                => 'registration/<action>',
                'confirm/<id:\d+>/<code:[A-Za-z0-9_-]+>'    => 'registration/confirm',
                'forgot'                                    => 'recovery/request',
                'recover/<id:\d+>/<code:[A-Za-z0-9_-]+>'    => 'recovery/reset',
                'settings/<action:\w+>'                     => 'settings/<action>'
            ],
        ],
    ],
];

if (YII_ENV_DEV) {
    // configuration adjustments for 'dev' environment
//    $config['bootstrap'][] = 'debug';
//    $config['modules']['debug'] = 'yii\debug\Module';
//
    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = 'yii\gii\Module';
}

return $config;
