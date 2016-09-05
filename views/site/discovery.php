<?
use yii\helpers\Url;
use yii\widgets\Menu;
use yii\helpers\Html;
?>
<?
//echo"<pre>";
//print_r($channelInfo);
//echo"</pre>";
//echo"<pre>";
//print_r($videos);
//echo"</pre>";


?>


<div class="left-column">
    <div class="video-explore-page ">
        <div class="followed-panel">
            <?/*?><div class="followed-header">
                Similar keyword</div>
            <div class="similar-keyword-wrapper">
                Loading ...
            </div>
            <div class="followed-header">
                Found channels</div>
            <div class="search-panel-wrapper">
                Loading ...
            </div><?*/?>
            <div class="followed-header">
                Following <span></span></div>
            <div class="followed-panel-wrapper">
                Loading ...
            </div>
            <div class="followed-more" style="display: none;">
                <div class="more" >More >
                    <div class="followed-more-wrapper"></div>
                </div>
            </div>
            <div class="new-user-message">
                <div class="hello">Hello, <?= (is_object(\Yii::$app->user->identity)) ? \Yii::$app->user->identity->getAttribute("firstname"): ""; ?>!</div>
                <h3>Welcome to Trendsquare!</h3>
                <p>
                    With just a TrendSquare,
                    you can watch, like, and
                    subscribe.
                </p>
                <p>
                    Accounts don't come with a
                    TrendSquare channel by
                    default; without a channel,
                    you have no public presence
                    on TrendSquare.
                </p>
            </div>
        </div>
    </div>
</div>

<div class="page-content">
    <div class="page-header">
        <?php
        $options = [
            'class' => 'page-menu',
        ];

        $textToSearch = \Yii::$app->request->get("textToSearch");
        if (trim($textToSearch) != ""){
            $options['style'] = 'display: none;';
            $buttonStyles = 'background-color: #fc3768; position: absolute;';
        }

        $activeExplore = ((trim( str_replace("/index", "", Url::to('')), "/") != "" &&
                strpos('site/explore', trim( str_replace("/index", "", Url::to('')), "/")) !== false) ||
            strpos(trim( str_replace("/index", "", Url::to('')), "/"), 'site/videosearch' ) !== false) ? true : false;

        $activeExplore = (bool)(Yii::$app->controller->id == "site" &&
            (Yii::$app->controller->action->id == "index" ||
                Yii::$app->controller->action->id == "explore" ||
                Yii::$app->controller->action->id == "videosearch"
            ));

        echo Menu::widget([
            'items' => [
                ['label' => 'My feed', 'url' => ['site/myfeed'], 'route' => '/site', 'activateParents' => true],
                ['label' => 'Trending', 'url' => ['site/trending'], 'route' => '/site/index', 'activateParents' => true],
                ['label' => 'Explore', 'url' => ['site/explore'], 'active' => $activeExplore, 'route' => '/site/index', 'activateParents' => true ],
                ['label' => 'Set up blogs', 'url' => ['site/blogs'], 'active' => $activeBlog, 'route' => '/site/index', 'activateParents' => true, 'options' => ['class' => 'setup-blog'] ],
            ],
            'options' => $options
        ]);
        ?>

        <div class="descovery-search"  <?= (trim($textToSearch) != "") ? "style='width: 100%;'" : ""?>>
            <form role="search" action="/site/videosearch">
                <?= Html::submitButton('<i class="fa fa-search"></i>', ['style' => (trim($textToSearch) != "") ? $buttonStyles : "", 'class' => '']) ?>
                <div class="search-text-wp" <?= (trim($textToSearch) != "") ? "style='display: block;'" : ""?> >
                    <?= Html::input("text", "textToSearch", !empty($_GET['textToSearch'])?$_GET['textToSearch']:'',
                        ['placeholder' => 'Enter a topic, video URL or channel name'])?>
                </div>

            </form>
            <div class="mobile-icon-closed">
                <i class="fa fa-search"></i>
            </div>
        </div>



    </div>
    <?php
    $template = "categories";
    $params =
        [
            'urlSearch' => $urlSearch,
        ];



    $urlSearch = explode("?", $urlSearch)[0];
    switch ($urlSearch){
        case "/site":
        case "/site/":
        case "/site/index":
        case "/site/explore":
            $template = "categories";
            $params['categories'] = $categories;
            $params['videos'] = $videos;
            $params['jsonChannels'] = $jsonChannels;
            break;
        case "/site/trending":
            $template = "video_list";
            $params['videos'] = $videos;
            $params['jsonChannels'] = $jsonChannels;
            break;
        case "/site/myfeed":
            $template = "video_list";
            $params['videos'] = $videos;
            $params['jsonChannels'] = $jsonChannels;
            break;
        case "/site/videosearch":
            $template = "video_explore";
            $params['query'] = $query;
            $params['videos'] = $videos;
            $params['jsonChannels'] = $jsonChannels;
            break;
        case "/site/channelvideos":
            $template = "video_list";
            $params['videos'] = $videos;
            $params['jsonChannels'] = $jsonChannels;
            $params['jsonChannelInfo'] = $jsonChannelInfo;
            $params['categoryName'] = $categoryName;
            break;
        case "/site/category":
            $template = "category";
            $params['channels'] = $channels;
            $params['jsonChannels'] = $jsonChannels;
            $params['name'] = $name;
            $params['imgs'] = $imgs;
            break;
    }

    echo $this->render(
        $template,
        $params
    );
    ?>

    <div class="pocket"></div>

</div>

<style type="text/css">
    .visib{
        display: block;
    }
    hr.blog-line {
        border-bottom: 2px dashed #edf3f4;
        border-top: medium none;
    }
    .inline-btn.ctrl {
        transform: rotate(0deg);
        transition: transform 100ms ease 0s, border-color 100ms ease 0s, color 100ms ease 0s;
    }
    .inline-btn {
        background: transparent none repeat scroll 0 0;
        border: 1px solid rgba(0, 0, 0, 0.44);
        border-radius: 999em;
        box-sizing: border-box;
        color: rgba(0, 0, 0, 0.44);
        cursor: pointer;
        display: inline-block;
        font-family: "jaf-bernino-sans","Open Sans","Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Verdana,sans-serif;
        font-feature-settings: "liga";
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        height: 32px;
        letter-spacing: -0.02em;
        line-height: 32px;
        outline: 0 none;
        padding: 0;
        position: relative;
        text-align: center;
        text-decoration: none;
        text-rendering: optimizelegibility;
        transition: border-color 100ms ease 0s, color 100ms ease 0s;
        vertical-align: bottom;
        white-space: nowrap;
        width: 32px;
    }
    .added-tag {
        background: #eef4f4 none repeat scroll 0 0;
        border: 1px solid #ccc;
        border-radius: 5px;
        display: inline-block;
        margin-right: 5px;
        margin-bottom: 5px;
        padding: 1px;
    }
    .del-blog-tag {
        cursor: pointer;
    }
</style>

<div id="setupBlog" class="bim-wrapper onlyupload" style="display: none">
    <div class="bim-modal bim-modal--open" style="opacity: 1; min-height: 470px; height: auto;">
        <span class="modal-close"></span>
        <div class="modal-media-title">Howdy! Let's get started by creating your personal blog</div>
        <hr class="blog-line" />
        <form id="blogForm" class="form-horizontal" role="form">
            <div class="form-group">
                <label for="inputBlogName" class="col-sm-2 control-label">Name</label>
                <div class="col-sm-3 col-sm-offset-0">
                    <input name="Blog[blog-name]" type="text" class="form-control blogCreateInput" id="inputBlogName" placeholder="Name">
                </div>
                <div class="col-sm-3">
                    <span class="blogCreatePostfix">.trendsquare.com</span>
                </div>
                <div class="col-sm-3">
                </div>
            </div>

            <div class="form-group">
                <label for="inputBlogTitle" class="col-sm-2 control-label">Title</label>
                <div class="col-sm-9 col-sm-offset-0">
                    <input name="Blog[blog-title]" type="text" class="form-control blogCreateInput" id="inputBlogTitle" placeholder="Title">
                </div>
            </div>

            <div class="form-group">
                <label for="blogCreateInputArea" class="col-sm-2 control-label">Description</label>
                <div class="col-sm-9 col-sm-offset-0">
                    <textarea name="Blog[blog-descr]" class="form-control blogCreateInput" id="blogCreateInputArea" rows="3"></textarea>
                </div>
            </div>

            <div class="form-group">
                <label class="col-sm-2 control-label" id="blogTagLabel">Tags</label>

                <div id="blogTags" class="col-sm-9">
                    <div data-tags-input-name="tag" id="tagBox"></div>
                </div>

            </div>

            <div class="form-group" id="blogCreateControls">
                <div class="action-buttons-panel text-right">
                    <button class="app-btn-default pink action-add">Create</button>
                    <button class="app-btn-default action-cancel">Cancel</button>
                </div>
            </div>
            <br>
            <br>
        </form>
    </div>
</div>

<script type="text/javascript">

    $("#tagBox").tagging("emptyInput");

    $(document).ready(function() {

        $('.setup-blog').bind('click', function(e) {
            console.log('aaaaa');
            e.preventDefault();
            $('#setupBlog').fadeIn(200);
        });

        $('#setupBlog').bind('click', function(e){
            if( $(e.target).hasClass('bim-wrapper') ) {
                $(this).fadeOut(200);
            } else {
                e.stopPropagation();
            }
        });
        $('.modal-close, .action-cancel').bind('click', function(e){
            $('.bim-wrapper').fadeOut(200);
        });


        $('.blog-add-tag').bind('click', function(e) {
            e.preventDefault();
            $('.blog-add-tag-input').fadeIn();
        });
        
        
        $('#inputBlogName').bind('change', function() {
            $.ajax({
                url: '/blog/checkname',
                method: 'POST',
                dataType: 'JSON',
                data: { blogName: $(this).val() },
                success: function(response) {
                    console.log(response);
                }
            });
        })
        

    });
</script>
