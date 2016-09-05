<?php

/*
 * This file is part of the Dektrium project.
 *
 * (c) Dektrium project <http://github.com/dektrium>
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/**
 * @var yii\web\View $this
 * @var yii\widgets\ActiveForm $form
 * @var dektrium\user\models\RecoveryForm $model
 */

$this->title = Yii::t('user', 'Welcome back');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="row position-relative">
    <div class="col-sm-10 col-sm-offset-1">
        <div class="login-container">
            <div class="center">
                <h1>
                    <a href="/" class="ts-icon">TrendSquare</a>
                    <img width="58" height="64" src="<?=\Yii::$app->assetManager->getPublishedUrl('../static')?>/images/login/logo.png" alt="" usemap="#loginMap" />
                    <map name="loginMap" id="loginMap">
                        <area alt="" title="" href="#" shape="poly" coords="0,6,0,42,13,56,29,63,48,56,58,45,58,7,52,1,9,0" />
                    </map>
                </h1>
            </div>
            <div class="space-30"></div>
            <div class="position-relative">
                <div id="reset-box" class="reset-box no-border"> <!--widget-box-->
                    <div class="widget-body">
                        <div class="widget-main">
                            <h4 class="header black">
                                <?= Html::encode($this->title) ?>
                            </h4>
                            <p class="some-text">
                                Enter the new password for&nbsp;your&nbsp;account<br/>
                                to access creating great campaigns
                            </p>
                            <div class="space-30"></div>
                            <?php $form = ActiveForm::begin([
                                'id'                     => 'password-recovery-form',
                                'enableAjaxValidation'   => false,
                                'enableClientValidation' => true
                            ]); ?>
                            <fieldset>

                                <label class="block clearfix">
                                    <span class="block input-icon input-icon-right">
                                        <?= $form->field($model, 'password', ['inputOptions' =>['data-toggle'=> 'password', 'placeholder' => 'Password', 'tabindex' => '1',
                                            'class' => 'form-control']])->label(Yii::t('user', 'Password'))->textInput()->label(false)->passwordInput() ?>
                                        <i class="validate-icon fa fa-check"></i>
                                    </span>
                                </label>

                                <label class="block clearfix">
										<span class="block input-icon input-icon-right">
                                            <?= $form->field($model, 'repeatpassword', ['inputOptions' => [ 'data-toggle'=> 'password',
                                                'class' => 'form-control', 'tabindex' => '2', 'placeholder'=>'Repeat password']])->textInput()->label(false)->passwordInput()?>
										</span>
                                </label>

                                <?= Html::submitButton(Yii::t('user', 'Create password'), ['class' => 'btn btn-success btn-block text-uppercase', 'tabindex' => '3']) ?>

                                <?php ActiveForm::end(); ?>
                            </fieldset>
                        </div>
                    </div><!-- /widget-body-->
                    <div class="toolbar clearfix">
                        Don't have an account yet? <?= Html::a(Yii::t('user', 'Sign&nbsp;up'), ['/user/registration/register'], ['class' => 'back-to-login-link', 'tabindex' => '4']) ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="sing-trendsquare">&copy; <?=date("Y")?> TrendSquare | All rights reserved</div>
</div>