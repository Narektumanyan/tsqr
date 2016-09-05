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
	<div class="row">
		<div class="col-xs-12">
			<div class="alert alert-info">
				Verification message resended.
			</div>
		</div>
	</div>
	<?= Html::a(Yii::t('user', 'Go to sign in page'), ['/user/security/login'],['class'=>'back-to-login-link']) ?>
</div>


