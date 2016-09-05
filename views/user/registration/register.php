<?php
use yii\helpers\Html;
use yii\widgets\ActiveForm;

/**
 * @var yii\web\View              $this
 * @var yii\widgets\ActiveForm    $form
 * @var dektrium\user\models\User $user
 */

$this->title = Yii::t('user', 'Create an account');
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
    
    				<div id="signup-box" class="signup-box no-border"> <!--widget-box-->
    					<div class="widget-body">
    						<div class="widget-main">
                                <h4 class="header black">
                                    <?= Html::encode($this->title) ?>
                                </h4>
                                <p class="register-desc">Start your free, no risk,  <strong>7 day trial</strong></p>
    
    							<div class="space-30"></div>
<!--    							<p> Enter your details to begin: </p>-->
    
    							 <?php $form = ActiveForm::begin([
                                     'id' => 'registration-form',
//                                     'enableAjaxValidation'   => false/*true*/,
                                     'enableClientValidation' => true,
                                     'validateOnBlur'         => false,
                                     'validateOnType'         => false,
                                     'validateOnChange'       => false,
                                     'enableAjaxValidation' => false,

                                ]); ?>
    								<fieldset>
                                        <div class="names-wp">
                                            <label class="block firstname-label">
                                                <span class="input-icon input-icon-right">
                                                    <?= $form->field($model, 'firstName', ['inputOptions' =>['placeholder' => 'First name', 'class' => 'form-control']])->textInput()->label(false) ?>
                                                    <i class="validate-icon fa fa-check"></i>
                                                </span>
                                            </label>

                                            <label class="block lastname-label">
                                                <span class="input-icon input-icon-right">
                                                    <?= $form->field($model, 'lastName', ['inputOptions' =>['placeholder' => 'Last name', 'class' => 'form-control']])->textInput()->label(false) ?>
                                                    <i class="validate-icon fa fa-check"></i>
                                                </span>
                                            </label>
                                        </div>
    
    									<label class="block clearfix">
    										<span class="block input-icon input-icon-right">
                                                <?= $form->field($model, 'email', ['inputOptions' =>['placeholder' => 'Email', 'class' => 'form-control']])->textInput()->label(false) ?>
                                                <i class="validate-icon fa fa-check"></i>
    										</span>
    									</label>
    
    									<label class="block clearfix">
    										<span class="block input-icon input-icon-right">
                                                <?= $form->field($model, 'password', ['inputOptions' =>['placeholder' => 'Password', 'class' => 'form-control']])->label(Yii::t('user', 'Password'))->textInput()->label(false)->passwordInput() ?>
                                                <i class="validate-icon fa fa-check"></i>
    										</span>
    									</label>

                                        <label class="block clearfix">
    										<span class="block input-icon input-icon-right">
                                                <?= $form->field($model, 'repeatpassword', ['inputOptions' =>['placeholder' => 'Repeat password', 'class' => 'form-control']])->label(Yii::t('user', 'Password'))->textInput()->label(false)->passwordInput() ?>
                                                <i class="validate-icon fa fa-check"></i>
    										</span>
                                        </label>

    									<div class="clearfix">
    										<!--<button type="reset" class="width-30 pull-left btn btn-sm">
    											<i class="ace-icon fa fa-refresh"></i>
    											<span class="bigger-110">Reset</span>
    										</button>-->

                                            <?= Html::submitButton(Yii::t('user', 'Sign up'), ['class' => 'btn btn-primary btn-block btn-sm text-uppercase', 'tabindex' => '5']) ?>
                                            <a class="terms" href="#">Privacy and Terms</a>

    									</div>
    								</fieldset>
    							<?php ActiveForm::end(); ?>
    						</div>
    					</div><!-- /.widget-body -->
                        <div class="toolbar clearfix">
                            Already have an account? <?= Html::a(Yii::t('user', 'Sign&nbsp;in'), ['/user/security/login'], ['class' => 'back-to-login-link', 'tabindex' => '6']) ?>
                        </div>
    				</div><!-- /.signup-box -->
    			</div><!-- /.position-relative -->
    		</div>
    	</div><!-- /.col -->
        <div class="sing-trendsquare">&copy; <?=date("Y")?> TrendSquare | All rights reserved</div>
    </div>