<?
use yii\helpers\Html;
use yii\helpers\Url;
?>
<div id="post-categories-wp">
    <ul class="posts-menu">
        <li>
            <a href="/post/index">Posts</a>
        </li>
        <li>
            <a href="/post/pages">Pages</a>
        </li>
        <li>
            <a href="#Comments">Comments</a>
        </li>
        <li class="active">
            <a href="/post/categories">Categories</a>
        </li>
    </ul>
    <div id="post-cvategories-menu-all-wp">
        <div id="no-one-category" <?= ( $allCount > 0 ) ? "style='display: none;'" : "" ?> >
            <h2>You haven't got any categories yet</h2>
            <span>Click the button below to start</span>
            <button>New category</button>
            <div class="steacker"></div>
        </div>
        <div class="menu-categories-wp" <?= ( $allCount == 0 ) ? "style='display: none;'" : "" ?> >
            <ul class="menu-categories">
                <li><a href="#All" class="all active" >All (3)</a></li>
                <li><a href="#Deleted" class="deleted" >Deleted (1)</a></li>
                <li><a href="#Delete" class="delete-category">Delete</a></li>
            </ul>
            <div class="new-category">
                <a href="#newCategory">new category</a>
            </div>
            <div class="categories-search">
                <?= Html::submitButton('<i class="fa fa-search"></i>', ['style' => (trim($textToSearch) != "") ? $buttonStyles : "", 'class' => 'post-search-title']) ?>
                <div class="search-text-wp">
                    <?php
                    $searchPostTitle = (isset($_GET['PostSearch']['title']) &&
                        !empty($_GET['PostSearch']['title'])) ? $_GET['PostSearch']['title'] : '';
                    ?>
                    <?= Html::input("text", "textToSearch", $searchPostTitle, ['class' => 'search-post', 'placeholder' => 'Search category'])?>
                </div>
            </div>
        </div>
    </div>
    <div class="post-categories-filters" <?= ( $allCount == 0 ) ? "style='display: none;'" : "" ?> >
        <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="dropdownMenu" data-toggle="dropdown">
                All time<span class="caret"></span>
            </button>
            <ul class="dropdown-menu select-time-dropdown" role="menu" aria-labelledby="dropdownMenu" selected>
                <div class="arrow"></div>
                <li role="presentation"><a role="menuitem" tabindex="1" data-select-time="all" id="">All time</a></li>
                <li role="presentation"><a role="menuitem" tabindex="2" data-select-time="today" id="">Today</a></li>
                <li role="presentation"><a role="menuitem" tabindex="3" data-select-time="yesterday" id="yesterday">Yesterday</a></li>
                <li role="presentation"><a role="menuitem" tabindex="4" data-select-time="week" id="this-week">This week</a></li>
                <li role="presentation"><a role="menuitem" tabindex="5" data-select-time="month" id="this-month">This month</a></li>
            </ul>
        </div>
    </div>
    <div id="grid-view" <?= ( $allCount == 0 ) ? "style='display: none;'" : "" ?> >

    </div>

    <div class="test-backgrid-view"></div>
</div>

<script>
$(document).ready(function() {

    var beutifyCheckbox = function() {

        var beautyCheckboxes = '<span class="my-checked-on fa fa-check-square" style="display: none;"></span>' +
            '<span class="my-checked-off fa fa-square-o" style="display: inline-block;"></span>';

        $(".post-categories-table .header-categories-checkbox, .post-categories-table .category-checkbox").each(function(){
            var self = $(this);
            if (self.find(".my-checked-off, my-checked-on").length == 0 && self.find("input").val() != 0){
                self.append(beautyCheckboxes);
            }
        });

        $(document).on("click", ".post-categories-table .header-categories-checkbox span, " +
            ".post-categories-table .category-checkbox span",
            function (e) {
                var self = $(e.target);
                var headerCheckbox = $(".post-categories-table .header-categories-checkbox");
                if (self.hasClass("my-checked-on")) {
                    self.parent().find(".my-checked-off").show();
                    self.parent().find(".my-checked-on").hide();
                    self.parent().find("input[type='checkbox']").prop("checked", false);

                    headerCheckbox.find(".my-checked-off").show();
                    headerCheckbox.find(".my-checked-on").hide();
                    headerCheckbox.find("input[type='checkbox']").prop("checked", false);

                }
                if (self.hasClass("my-checked-off")) {
                    self.parent().find(".my-checked-off").hide();
                    self.parent().find(".my-checked-on").show();
                    self.parent().find("input[type='checkbox']").prop("checked", true);
                }
                viewTrashButtonHandler();
            });
        $(document).on("click", ".post-categories-table .header-categories-checkbox span", function (e) {
            var self = $(e.target);
            var groupCheckbox = $(".post-categories-table .category-checkbox");
            if (self.hasClass("my-checked-on")) {
                groupCheckbox.find(".my-checked-off").show();
                groupCheckbox.find(".my-checked-on").hide();
                groupCheckbox.find("input[type='checkbox']").prop("checked", false);
            }
            if (self.hasClass("my-checked-off")) {
                groupCheckbox.find(".my-checked-off").hide();
                groupCheckbox.find(".my-checked-on").show();
                groupCheckbox.find("input[type='checkbox']").prop("checked", true);
            }
            viewTrashButtonHandler();
        });
        var viewTrashButtonHandler = function () {
            if ($('.post-categories-table .header-categories-checkbox :checkbox:checked, .post-categories-table .category-checkbox :checkbox:checked').size() > 0)
                $('.delete-category').css('display', 'inline-block');
            else
                $('.delete-category').css('display', 'none');
        };
    };

    VideoEssenceApp.beutifyCheckbox = beutifyCheckbox;
    VideoEssenceApp.start();
    VideoEssenceApp.Pocket.start();
    VideoEssenceApp.PostCategories.start();

    VideoEssenceApp.PostCategories.uncategorisedPostsCount = '<?= $uncategorisedPostsCount ?>';

    beutifyCheckbox();

    $(document).on("click", ".post-categories-filters .select-time-dropdown li a", function(e){
        var self = $(e.target);

        $("#dropdownMenu").html(self.text() + '<span class="caret"></span>');

        var ourDateLimiter = 0;

        switch(self.data("select-time")){
            case "all" :
                ourDateLimiter = 0;
                console.log("all select-time", ourDateLimiter);
                break;
            case "today" :
                ourDateLimiter = (new Date()).setHours(0, 0, 0, 0);
                console.log("today select-time", ourDateLimiter);
                break;
            case "yesterday" :
                var ourDateLimiter = new Date();
                ourDateLimiter.setHours(0, 0, 0, 0);
                ourDateLimiter.setDate(ourDateLimiter.getDate() - 1);
                console.log("yesterday select-time", ourDateLimiter);
                break;
            case "week" :
                ourDateLimiter = new Date();
                ourDateLimiter.setHours(0, 0, 0, 0);
                ourDateLimiter.setDate(ourDateLimiter.getDate() - ourDateLimiter.getDay() + 1);
                console.log("week select-time", ourDateLimiter);
                break;
            case "month" :
                ourDateLimiter = new Date();
                ourDateLimiter.setHours(0, 0, 0, 0);
                ourDateLimiter.setDate(1);
                console.log("month select-time", ourDateLimiter);
                break;
        }

        if (VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection != undefined) {
            VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.fetch({
                remove: false,
                add: true,
                merge: false,
                data: {"post_id": 0},
                success: function(){
                    var resultOfSearch = _.filter(
                        VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models,
                        function (el) {
                            if (ourDateLimiter == 0){
                                return true;
                            }
                            else{
                                var catDate = new Date (el.attributes.last_modified);
                                return catDate >= ourDateLimiter
                            }
                        }
                    );
                    VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.set(resultOfSearch);
                }
            });
        }
    });
});
</script>