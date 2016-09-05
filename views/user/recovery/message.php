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
 * @var $this                     yii\web\View
 *
 * @var yii\widgets\ActiveForm    $form
 *
 * @var $title                    string
 * @var $module                   dektrium\user\Module
 */
use yii\helpers\Html;
use yii\widgets\ActiveForm;

$this->title = Yii::t('user', 'Almost done');
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

                <div id="message-box" class="message-box no-border"> <!--widget-box-->
                    <div class="widget-body">
                        <div class="widget-main">
                            <div class="letter"></div>
                            <h4 class="header black">
                                <?= Html::encode($this->title) ?>
                            </h4>
                            <p class="some-text">
                                Password has been changed<br/>
                                <i><?=$model->email?></i>
                            </p>
                            <?
                            $form = ActiveForm::begin([
                                'id' => 'resend-form',
                                'method' => 'post',
                                'action' => '/user/login'
                            ])
                            ?>
                            <fieldset>
                                <?= Html::hiddenInput('email', $model->email)?>
                                <div class="clearfix">
                                    <?= Html::submitButton(Yii::t('user', 'Sign in'), ['class' => 'btn btn-primary btn-block btn-sm text-uppercase', 'tabindex' => '5']) ?>
                                </div>
                            </fieldset>
                            <?php ActiveForm::end(); ?>
                        </div>
                    </div><!-- /.widget-body -->
<!--                    <div class="toolbar clearfix">-->
<!--                        All good! --><?//= Html::a(Yii::t('user', 'Sign&nbsp;in'), ['/user/security/login'], ['class' => 'back-to-login-link', 'tabindex' => '6']) ?>
<!--                    </div>-->
                </div><!-- /.resend-box -->
            </div><!-- /.position-relative -->
        </div>
    </div>
    <div class="sing-trendsquare">&copy; <?=date("Y")?> TrendSquare | All rights reserved</div>
</div>
