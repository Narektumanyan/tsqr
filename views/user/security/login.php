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
use dektrium\user\widgets\Connect;

/**
 * @var yii\web\View                   $this
 * @var dektrium\user\models\LoginForm $model
 * @var dektrium\user\Module           $module
 */
 
$this->title = Yii::t('user', 'Sign in to your account');
$this->params['breadcrumbs'][] = $this->title;
?>

<?//= $this->render('/_alert', ['module' => Yii::$app->getModule('user')]) ?>

<div class="row position-relative">
	<div class="col-sm-10 col-sm-offset-1">
		<div class="login-container">
			<div class="center">
				<h1>
                    <a href="/" class="ts-icon" usemap="loginMap">TrendSquare</a>
                    <img width="58" height="64" src="<?=\Yii::$app->assetManager->getPublishedUrl('../static')?>/images/login/logo.png" alt="" usemap="#loginMap" />
                    <map name="loginMap" id="loginMap">
                        <area alt="" title="" href="#" shape="poly" coords="0,6,0,42,13,56,29,63,48,56,58,45,58,7,52,1,9,0" />
                    </map>
                </h1>
			</div>
            
			<div class="space-30"></div>

			<div class="position-relative">
				<div id="login-box" class="login-box  no-border visible">
					<div class="widget-body">
						<div class="widget-main">
							<h4 class="header black">
								<?= Html::encode($this->title) ?>
							</h4>

							<div class="space-30"></div>
                            <?php $form = ActiveForm::begin([
                                'id'                     => 'login-form',
                                'enableAjaxValidation'   => false/*true*/,
                                'enableClientValidation' => true,
                                'validateOnBlur'         => false,
                                'validateOnType'         => false,
                                'validateOnChange'       => false,
                            ]) ?>        
						
								<fieldset>
									<label class="block clearfix">
										<span class="block input-icon input-icon-right">
                                            <?= $form->field($model, 'email', ['inputOptions' => ['autofocus' => 'autofocus', 'class' => 'form-control no-right-icon', 'tabindex' => '1',
                                                'placeholder' => 'Email']])->textInput()->label(false) ?>
										</span>
									</label>

									<label class="block clearfix">
										<span class="block input-icon input-icon-right">
                                            <?= $form->field($model, 'password', ['inputOptions' => [ 'data-toggle'=> 'password', 
                                                'class' => 'form-control', 'tabindex' => '2', 'placeholder'=>'Password']])->textInput()->label(false)->passwordInput()?>
										</span>
									</label>

									<div class="clearfix additional">
										<div class="forgot-wp">
                                            <span class="checbox-wp">
                                                <span class="my-checked-on fa fa-check-square" ></span>
                                                <span class="my-checked-off fa fa-square-o" ></span>
                                                <input type="checkbox" tabindex="3" class="ace" name="login-form[rememberMe]" value="1">
                                            </span>
                                            <span class="lbl">
                                                <?= Html::activeLabel($model, 'rememberMe') ?>
                                            </span>
                                        </div>

                                        <?php if ($module->enableConfirmation): ?>
                                            <span class="forgot-password-link-wp">
                                                <?= Html::a(Yii::t('user', 'Forgot password?'), ['/user/recovery/request'], ['tabindex' => '4', 'class'=>'forgot-password-link']) ?>
                                            </span>
                                        <?endif;?>

									</div>

                                    <div class="space-6"></div>

                                    <?= Html::submitButton(Yii::t('user', 'Sign in'), ['class' => 'btn btn-primary btn-block btn-sm text-uppercase', 'tabindex' => '5']) ?>

									<div class="space-4"></div>
								</fieldset>
                            <?php ActiveForm::end(); ?>
							<div class="social-login center"></div>
						</div><!-- /.widget-main -->

                        <?= Connect::widget([
                            'baseAuthUrl' => ['/user/security/auth']
                        ]) ?>                        
					</div><!-- /.widget-body -->
                    <div class="toolbar clearfix">
                        Don't have an account yet? <?= Html::a(Yii::t('user', 'Sign&nbsp;up'), ['/user/registration/register'], ['class' => 'user-signup-link', 'tabindex' => '6']) ?><br/>
<!--                        Forgot your password? --><?//= Html::a(Yii::t('user', 'Reset'), ['/user/recovery/request'], ['class' => 'user-signup-link', 'tabindex' => '6']) ?>
                    </div>
				</div><!-- /.login-box -->
			</div>
		</div><!-- /.col -->
	</div>
    <div class="sing-trendsquare">&copy; <?=date("Y")?> TrendSquare | All rights reserved</div>

</div>

