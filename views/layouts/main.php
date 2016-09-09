<?php
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;
use yii\widgets\Menu;
use yii\helpers\Url;

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
</head>
<body class="no-skin">
<?php $this->beginBody() ?>

<?/*?>
<!-- #section:basics/navbar.layout -->
<div id="navbar" class="navbar navbar-default    navbar-collapse       h-navbar">
<script type="text/javascript">
    try{ace.settings.check('navbar' , 'fixed')}catch(e){}
</script>

<div class="navbar-container" id="navbar-container">
<div class="navbar-header pull-left">
    <!-- #section:basics/navbar.layout.brand -->
    <a href="/" class="navbar-brand">
        <small>
            <i class="fa fa-leaf"></i>
            Ace Admin
        </small>
    </a>

    <!-- /section:basics/navbar.layout.brand -->

    <!-- #section:basics/navbar.toggle -->
    <button class="pull-right navbar-toggle navbar-toggle-img collapsed" type="button" data-toggle="collapse" data-target=".navbar-buttons,.navbar-menu">
        <span class="sr-only">Toggle user menu</span>

        <img src="/source/avatars/user.jpg" alt="Jason's Photo" />
    </button>

    <button class="pull-right navbar-toggle collapsed" type="button" data-toggle="collapse" data-target=".sidebar">
        <span class="sr-only">Toggle sidebar</span>

        <span class="icon-bar"></span>

        <span class="icon-bar"></span>

        <span class="icon-bar"></span>
    </button>

    <!-- /section:basics/navbar.toggle -->
</div>

<!-- #section:basics/navbar.dropdown -->
<div class="navbar-buttons navbar-header pull-right  collapse navbar-collapse" role="navigation">
<ul class="nav ace-nav">
<li class="transparent">
    <a data-toggle="dropdown" class="dropdown-toggle" href="#">
        <i class="ace-icon fa fa-bell icon-animated-bell"></i>
    </a>

    <div class="dropdown-menu-right dropdown-navbar dropdown-menu dropdown-caret dropdown-close">
        <div class="tabbable">
            <ul class="nav nav-tabs">
                <li class="active">
                    <a data-toggle="tab" href="#navbar-tasks">
                        Tasks
                        <span class="badge badge-danger">4</span>
                    </a>
                </li>

                <li>
                    <a data-toggle="tab" href="#navbar-messages">
                        Messages
                        <span class="badge badge-danger">5</span>
                    </a>
                </li>
            </ul><!-- .nav-tabs -->

            <div class="tab-content">
                <div id="navbar-tasks" class="tab-pane in active">
                    <ul class="dropdown-menu-right dropdown-navbar dropdown-menu">
                        <li>
                            <a href="#">
                                <div class="clearfix">
                                    <span class="pull-left">Software Update</span>
                                    <span class="pull-right">65%</span>
                                </div>

                                <div class="progress progress-mini">
                                    <div style="width:65%" class="progress-bar"></div>
                                </div>
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <div class="clearfix">
                                    <span class="pull-left">Hardware Upgrade</span>
                                    <span class="pull-right">35%</span>
                                </div>

                                <div class="progress progress-mini">
                                    <div style="width:35%" class="progress-bar progress-bar-danger"></div>
                                </div>
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <div class="clearfix">
                                    <span class="pull-left">Unit Testing</span>
                                    <span class="pull-right">15%</span>
                                </div>

                                <div class="progress progress-mini">
                                    <div style="width:15%" class="progress-bar progress-bar-warning"></div>
                                </div>
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <div class="clearfix">
                                    <span class="pull-left">Bug Fixes</span>
                                    <span class="pull-right">90%</span>
                                </div>

                                <div class="progress progress-mini progress-striped active">
                                    <div style="width:90%" class="progress-bar progress-bar-success"></div>
                                </div>
                            </a>
                        </li>

                        <li class="dropdown-footer">
                            <a href="#">
                                See tasks with details
                                <i class="ace-icon fa fa-arrow-right"></i>
                            </a>
                        </li>
                    </ul>
                </div><!-- /.tab-pane -->

                <div id="navbar-messages" class="tab-pane">
                    <ul class="dropdown-menu-right dropdown-navbar dropdown-menu">
                        <li class="dropdown-content">
                            <ul class="dropdown-menu dropdown-navbar">
                                <li>
                                    <a href="#">
                                        <img src="/source/avatars/avatar.png" class="msg-photo" alt="Alex's Avatar" />
																<span class="msg-body">
																	<span class="msg-title">
																		<span class="blue">Alex:</span>
																		Ciao sociis natoque penatibus et auctor ...
																	</span>

																	<span class="msg-time">
																		<i class="ace-icon fa fa-clock-o"></i>
																		<span>a moment ago</span>
																	</span>
																</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <img src="/source/avatars/avatar3.png" class="msg-photo" alt="Susan's Avatar" />
																<span class="msg-body">
																	<span class="msg-title">
																		<span class="blue">Susan:</span>
																		Vestibulum id ligula porta felis euismod ...
																	</span>

																	<span class="msg-time">
																		<i class="ace-icon fa fa-clock-o"></i>
																		<span>20 minutes ago</span>
																	</span>
																</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <img src="/source/avatars/avatar4.png" class="msg-photo" alt="Bob's Avatar" />
																<span class="msg-body">
																	<span class="msg-title">
																		<span class="blue">Bob:</span>
																		Nullam quis risus eget urna mollis ornare ...
																	</span>

																	<span class="msg-time">
																		<i class="ace-icon fa fa-clock-o"></i>
																		<span>3:15 pm</span>
																	</span>
																</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <img src="/source/avatars/avatar2.png" class="msg-photo" alt="Kate's Avatar" />
																<span class="msg-body">
																	<span class="msg-title">
																		<span class="blue">Kate:</span>
																		Ciao sociis natoque eget urna mollis ornare ...
																	</span>

																	<span class="msg-time">
																		<i class="ace-icon fa fa-clock-o"></i>
																		<span>1:33 pm</span>
																	</span>
																</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <img src="/source/avatars/avatar5.png" class="msg-photo" alt="Fred's Avatar" />
																<span class="msg-body">
																	<span class="msg-title">
																		<span class="blue">Fred:</span>
																		Vestibulum id penatibus et auctor  ...
																	</span>

																	<span class="msg-time">
																		<i class="ace-icon fa fa-clock-o"></i>
																		<span>10:09 am</span>
																	</span>
																</span>
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li class="dropdown-footer">
                            <a href="inbox.html">
                                See all messages
                                <i class="ace-icon fa fa-arrow-right"></i>
                            </a>
                        </li>
                    </ul>
                </div><!-- /.tab-pane -->
            </div><!-- /.tab-content -->
        </div><!-- /.tabbable -->
    </div><!-- /.dropdown-menu -->
</li>

<!-- #section:basics/navbar.user_menu -->
<li class="light-blue user-min">
    <a data-toggle="dropdown" href="#" class="dropdown-toggle">
        <img class="nav-user-photo" src="/source/avatars/user.jpg" alt="Jason's Photo" />
								<span class="user-info">
									<small>Welcome,</small>
									Jason
								</span>

        <i class="ace-icon fa fa-caret-down"></i>
    </a>

    <ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
        <li>
            <a href="#">
                <i class="ace-icon fa fa-cog"></i>
                Settings
            </a>
        </li>

        <li>
            <a href="profile.html">
                <i class="ace-icon fa fa-user"></i>
                Profile
            </a>
        </li>

        <li class="divider"></li>

        <li>

                <?= Html::a('<i class="ace-icon fa fa-power-off"></i>Logout', ['/user/logout']); ?>

        </li>
    </ul>
</li>

<!-- /section:basics/navbar.user_menu -->
</ul>
</div>

<!-- /section:basics/navbar.dropdown -->
<nav role="navigation" class="navbar-menu pull-left collapse navbar-collapse">
    <!-- #section:basics/navbar.nav -->
    <ul class="nav navbar-nav">
        <li>
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                Overview
                &nbsp;
                <i class="ace-icon fa fa-angle-down bigger-110"></i>
            </a>

            <ul class="dropdown-menu dropdown-light-blue dropdown-caret">
                <li>
                    <a href="#">
                        <i class="ace-icon fa fa-eye bigger-110 blue"></i>
                        Monthly Visitors
                    </a>
                </li>

                <li>
                    <a href="#">
                        <i class="ace-icon fa fa-user bigger-110 blue"></i>
                        Active Users
                    </a>
                </li>

                <li>
                    <a href="#">
                        <i class="ace-icon fa fa-cog bigger-110 blue"></i>
                        Settings
                    </a>
                </li>
            </ul>
        </li>

        <li>
            <a href="#">
                <i class="ace-icon fa fa-envelope"></i>
                Messages
                <span class="badge badge-warning">5</span>
            </a>
        </li>
    </ul>

    <!-- /section:basics/navbar.nav -->

    <!-- #section:basics/navbar.form -->
    <form class="navbar-form navbar-left form-search" role="search" action="/site/videosearch">
        <div class="form-group">
            <input type="text" placeholder="search" name="textToSearch" value="<?=!empty($_GET['textToSearch'])?$_GET['textToSearch']:''?>"/>
        </div>
        <?= Html::submitButton('<i class="ace-icon fa fa-search icon-only bigger-110"></i>', ['class' => 'btn btn-xs btn-info2']) ?>
        <!--<button type="button" class="btn btn-xs btn-info2">
            <i class="ace-icon fa fa-search icon-only bigger-110"></i>
        </button>-->
	    <span class="search-follower-wrap"></span>
    </form>
    <!-- /section:basics/navbar.form -->
</nav>
</div><!-- /.navbar-container -->
</div>
<?*/?>

<!-- /section:basics/navbar.layout -->
<!--<div class="main-container" id="main-container">-->
<!--<script type="text/javascript">-->
<!--    try{ace.settings.check('main-container' , 'fixed')}catch(e){}-->
<!--</script>-->

<?/*?>
<!-- #section:basics/sidebar.horizontal -->
<div id="sidebar" class="sidebar      h-sidebar                navbar-collapse collapse">
<script type="text/javascript">
    try{ace.settings.check('sidebar' , 'fixed')}catch(e){}
</script>

<div class="sidebar-shortcuts" id="sidebar-shortcuts">
    <div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
        <button class="btn btn-success">
            <i class="ace-icon fa fa-signal"></i>
        </button>

        <button class="btn btn-info">
            <i class="ace-icon fa fa-pencil"></i>
        </button>

        <!-- #section:basics/sidebar.layout.shortcuts -->
        <button class="btn btn-warning">
            <i class="ace-icon fa fa-users"></i>
        </button>

        <button class="btn btn-danger">
            <i class="ace-icon fa fa-cogs"></i>
        </button>

        <!-- /section:basics/sidebar.layout.shortcuts -->
    </div>

</div><!-- /.sidebar-shortcuts -->
<?*/?>

<!--<div id="mobile-view-menu-wp">-->
    <div id="mobile-view-menu">
        <div class="profile-icons">
            <div class="profile-menu-wp">
                <div class="profile-upload">
                    <div class="fa fa-camera"></div><br/>
                    Upload
                </div>
                <div class="profile-full-name">
                    <span>
                    <?= (is_object(\Yii::$app->user->identity)) ? \Yii::$app->user->identity->getAttribute("firstname")." "
                        .\Yii::$app->user->identity->getAttribute("lastname") : ""; ?>
                    </span>
                </div>

                <ul class="profile-menu">
                    <li class="first-item"><a href="#Billing&Upgrades">Billing and upgrades</a></li>
                    <li><?= Html::a('Image library', '/gallery/index') ?></li>
                    <li><a href="#EmailSubscribers">Email subscribers</a></li>
                    <li class="empty-item"></li>
                    <li class="last-item"><a href="/user/logout">Logout</a></li>
                </ul>
            </div>
        </div>

        <div class="main-menu">
            <?
            echo Menu::widget([
                'items' => [
                    ['label' => 'My site', 'url' => ['post/index' ]],
                    ['label' => 'Discovery', 'url' => ['/site/index'], 'active' => strpos(trim( Url::to(''), "/"), 'site') !== false],
                    ['label' => 'Impressions', 'url' => ['index#Impressions']],
                    ['label' => 'Help', 'url' => ['index#Help']]
                ],
                'options' => [
                    'class' => 'main-nav-list'
                ]
            ]);
            ?>
        </div>

        <div class="video-explore-page ">
            <div class="followed-panel">
                <?/*?><div class="followed-header similar">
                    <!--                <i class="fa fa-circle-thin"></i>-->
                    Similar keyword</div>
                <div class="similar-keyword-wrapper similar">
                    Loading ...
                </div>
                <div class="followed-header found">
                    <!--                <i class="fa fa-circle-thin"></i>-->
                    Found channels</div>
                <div class="search-panel-wrapper found">
                    Loading ...
                </div><?*/?>
                <div class="followed-header following">
                    <!--                <i class="fa fa-circle-thin"></i>-->
                    Following <span></span></div>
                <div class="followed-panel-wrapper">
                    Loading ...
                </div>
            </div>
        </div>
    </div>
<!--</div>-->

<div id ="main-view">
    <div id="header">
        <div class="logo">
            <a href="/site/index"><h1>Trendsquare</h1></a>
        </div>

        <div class="main-menu">
        <?
            echo Menu::widget([
                'items' => [
                    ['label' => 'My site', 'url' => ['post/index' ], 'active' => strpos(trim( Url::to(''), "/"), 'post') !== false],
                    ['label' => 'Discovery', 'url' => ['/site/index'], 'active' => strpos(trim( Url::to(''), "/"), 'site') !== false],
                    ['label' => 'Impressions', 'url' => ['index#Impressions']],
                    ['label' => 'Help', 'url' => ['index#Help']]
                ],
                'options' => [
                    'class' => 'main-nav-list'
                ]
            ]);
        ?>
        </div>

        <div class="profile-icons">
            <div class="diag-for-new bullet" >
                <div class="redbull"></div>
            </div>
            <div class="profile"><?
                if (is_object(\Yii::$app->user->identity)) {
                 echo   substr(\Yii::$app->user->identity->getAttribute("firstname"), 0, 1) . " " .
                    substr(\Yii::$app->user->identity->getAttribute("lastname"), 0, 1);
                };
                ?></div>
            <div class="profile-menu-wp">
                <div class="profile-upload">
                    <div class="fa fa-camera"></div><br/>
                    Upload
                </div>
                <div class="profile-full-name">
                    <?= (is_object(\Yii::$app->user->identity)) ? \Yii::$app->user->identity->getAttribute("firstname")." "
                    .\Yii::$app->user->identity->getAttribute("lastname") : ""; ?>
                </div>

                <ul class="profile-menu">
                    <li class="first-item"><a href="#Billing&Upgrades">Billing and upgrades</a></li>
                    <li><a href="#ImageLibrary">Image library</a></li>
                    <li><a href="#EmailSubscribers">Email subscribers</a></li>
                    <li class="empty-item"></li>
                    <li class="last-item"><a href="/user/logout">Logout</a></li>
                </ul>
            </div>
        </div>

        <div class="menu-icon fa fa-bars"></div>

    </div>

    <div class="gray-space"></div>
    <!-- /section:basics/sidebar.layout.minimize -->
    <!--<script type="text/javascript">-->
    <!--    try{ace.settings.check('sidebar' , 'collapsed')}catch(e){}-->
    <!--</script>-->
    <!--</div>-->

    <!-- /section:basics/sidebar.horizontal -->
    
    
    
    <div class="main-content-inner">
    <!--    <div class="page-content"> -->
            <!-- #section:settings.box -->
            <?php if( Yii::$app->session->hasFlash('error') ): ?>
                <div class="get-error-message bg-danger">
                    <?php echo Yii::$app->session->getFlash('error') ?>
                    <button class="close" type="button" aria-hidden="true">×</button>
                </div>
            <?php endif; ?>
            
            <?= $content ?>
    <!--    </div> <!-- /.page-content -->
    </div><!-- /.main-content -->



<!--    <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">-->
<!--        <i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>-->
<!--    </a>-->
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

    <div class="app"></div>
</div>
</body>
</html>
<?php $this->endBody() ?>

<?php $this->endPage() ?>
