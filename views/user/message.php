<?php

/*
 * This file is part of the Dektrium project.
 *
 * (c) Dektrium project <http://github.com/dektrium>
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

/**
 * @var $this   yii\web\View
 * @var $title  string
 * @var $module dektrium\user\Module
 */
use yii\helpers\Html;

//$this->title = $title;

?>
<div class="message">
<?= $this->render('/_alert', [
    'module' => $module,
]) ?>
<?
/*if($this->title == \Yii::t('user', 'Account confirmation')){
    Html::a(Yii::t('user', 'resend verification email'), ['user/registration/resend']);
}*/
?>
<?= Html::a(Yii::t('user', 'Go to sign in page'), ['/user/security/login'],['class'=>'back-to-login-link']) ?>
</div>
