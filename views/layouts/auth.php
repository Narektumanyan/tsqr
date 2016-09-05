<?php
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;
use app\assets\RegistrationAsset;
use yii\widgets\Menu;

/* @var $this \yii\web\View */
/* @var $content string */

RegistrationAsset::register($this);

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
</head>
<body class="login-layout light-login">
<?php $this->beginBody() ?>
<!-- #section:basics/navbar.layout -->
<script type="text/javascript">
    try{ace.settings.check('navbar' , 'fixed')}catch(e){}
</script>

<!-- /section:basics/navbar.dropdown -->

<!-- /section:basics/navbar.layout -->
<div class="main-container" id="main-container">
<script type="text/javascript">
    try{ace.settings.check('main-container' , 'fixed')}catch(e){}
</script>


<!-- /section:basics/sidebar.horizontal -->
<div class="main-content">
    <!--<div class="page-content">-->
        <!-- #section:settings.box -->
        <?= $content ?>
    <!--</div><!-- /.page-content -->
</div><!-- /.main-content -->

<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
    <i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
</a>
</div><!-- /.main-container -->

<script type="text/javascript">
    if('ontouchstart' in document.documentElement) document.write("<script src='/source/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
</script>

<!-- inline scripts related to this page -->
<script type="text/javascript">
    jQuery(function($) {
        var $sidebar = $('.sidebar').eq(0);
        if( !$sidebar.hasClass('h-sidebar') ) return;

        $(document).on('settings.ace.top_menu' , function(ev, event_name, fixed) {
            if( event_name !== 'sidebar_fixed' ) return;

            var sidebar = $sidebar.get(0);
            var $window = $(window);

            //return if sidebar is not fixed or in mobile view mode
            if( !fixed || ( ace.helper.mobile_view() || ace.helper.collapsible() ) ) {
                $sidebar.removeClass('hide-before');
                //restore original, default marginTop
                //ace.helper.removeStyle(sidebar , 'margin-top')

                $window.off('scroll.ace.top_menu')
                return;
            }


            var done = false;
            $window.on('scroll.ace.top_menu', function(e) {

                var scroll = $window.scrollTop();
                scroll = parseInt(scroll / 4);//move the menu up 1px for every 4px of document scrolling
                if (scroll > 17) scroll = 17;


                if (scroll > 16) {
                    if(!done) {
                        $sidebar.addClass('hide-before');
                        done = true;
                    }
                }
                else {
                    if(done) {
                        $sidebar.removeClass('hide-before');
                        done = false;
                    }
                }

                sidebar.style['marginTop'] = (17-scroll)+'px';
            }).triggerHandler('scroll.ace.top_menu');

        }).triggerHandler('settings.ace.top_menu', ['sidebar_fixed' , $sidebar.hasClass('sidebar-fixed')]);

        $(window).on('resize.ace.top_menu', function() {
            $(document).triggerHandler('settings.ace.top_menu', ['sidebar_fixed' , $sidebar.hasClass('sidebar-fixed')]);
        });


    });
</script>


<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
