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

$this->title = Yii::t('user', 'Reset password');
$this->params['breadcrumbs'][] = $this->title;
?>

<div class="login-layout light-login">
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
                <div id="forgot-box" class="forgot-box no-border"> <!--widget-box-->
                    <div class="widget-body">
                        <div class="widget-main">
                            <h4 class="header black">
                                <?= Html::encode($this->title) ?>
                            </h4>
                            <p class="some-text">
                                Enter the email address you used when&nbsp;you
                                signed&nbsp;up and we'll send instructions
                            </p>
                            <div class="space-30"></div>
                            <?php $form = ActiveForm::begin([
                                'id'                     => 'password-recovery-form',
                                'enableAjaxValidation'   => true,
                                'enableClientValidation' => false
                            ]); ?>
                            <fieldset>
                                <label class="block clearfix">
                                    <span class="block input-icon input-icon-right">
                                        <?= $form->field($model, 'email', ['inputOptions' =>['placeholder' => 'Email', 'class' => 'form-control', 'value' => $model->email]])->textInput()->label(false) ?>
                                        <i class="validate-icon fa fa-check"></i>
                                    </span>
                                </label>

                                <?= Html::submitButton(Yii::t('user', 'Send me instructions'), ['class' => 'btn btn-success btn-block text-uppercase']) ?>

                                <?php ActiveForm::end(); ?>
                            </fieldset>
                        </div>
                    </div><!-- /widget-body-->
                    <div class="toolbar clearfix">
                        Remember you password? <?= Html::a(Yii::t('user', 'Sign&nbsp;in'), ['/user/security/login'], ['class' => 'back-to-login-link', 'tabindex' => '6']) ?>
                    </div>
                </div>


            </div>
        </div><!-- /.col -->
    </div>
    <div class="sing-trendsquare">&copy; <?=date("Y")?> TrendSquare | All rights reserved</div>
</div>