<?php
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;
use yii\widgets\Menu;

/* @var $this \yii\web\View */
/* @var $content string */

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
	<!--<meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">-->
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta charset="utf-8" />
	<title>Dashboard - Ace Admin</title>

	<meta name="description" content="overview &amp; stats" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
	<!--<?= Html::csrfMetaTags() ?>-->
	<title><?= Html::encode($this->title) ?></title>
	<?php $this->head() ?>
	<style>
		html {
			height: 100%;
		}
		body {
			height: 100%;
		}
		.create-post-block {
			max-width: 900px;
			width: initial;
		}
	</style>
</head>
<body class="no-skin">
<?php $this->beginBody() ?>

<div class="content-post-preview">
	<?= $content ?>
</div>

</body>
</html>
<?php $this->endBody() ?>

<?php $this->endPage() ?>
