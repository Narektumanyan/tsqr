<?php

/*
 * This file is part of the Dektrium project.
 *
 * (c) Dektrium project <http://github.com/dektrium>
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

use yii\mail\BaseMessage;

/**
 * @var \yii\web\View $this
 * @var BaseMessage $content
 */
?>
<?php $this->beginPage() ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width" />
    <?php $this->head() ?>
  </head>
  <body style="width: 100% !important; min-width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; color: #333333; font-family: 'Open Sans', sans-serif; font-weight: normal; text-align: left; line-height: 21px; font-size: 16px; background: #EDF3F6; margin: 0; padding: 0;" bgcolor="#EDF3F6">
<style type="text/css">
  @font-face {
  font-family: 'Open Sans'; font-style: normal; font-weight: 400; src: local('Open Sans'), local('OpenSans'), url('http://fonts.gstatic.com/s/opensans/v13/cJZKeOuBrn4kERxqtaUH3aCWcynf_cDxXwCLxiixG1c.ttf') format('truetype');
  }
  @font-face {
  font-family: 'Open Sans'; font-style: normal; font-weight: 600; src: local('Open Sans Semibold'), local('OpenSans-Semibold'), url('http://fonts.gstatic.com/s/opensans/v13/MTP_ySUJH_bn48VBG8sNSonF5uFdDttMLvmWuJdhhgs.ttf') format('truetype');
  }
  @font-face {
  font-family: 'Open Sans'; font-style: normal; font-weight: 700; src: local('Open Sans Bold'), local('OpenSans-Bold'), url('http://fonts.gstatic.com/s/opensans/v13/k3k702ZOKiLJc3WVjuplzInF5uFdDttMLvmWuJdhhgs.ttf') format('truetype');
  }
</style>
<?php $this->beginBody() ?>
<?= $content ?>
<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
