<!--<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">-->
    <style>
/*        .wrapper-blog{
            overflow-x: hidden;
            margin-top: 100px;
        }
        .row{
            margin-bottom: 10px;
        }
        .brd{
            border: 1px solid #000;
        }
        .profile-menu-list{
            list-style-type: none;
            padding-left: 15px;
        }
        .profile-menu-title{
            color: #BBC3C5;
            padding-left: 0;
        }
        .user-icon{
            margin-right: 10px;
        }
        .profile-menu-block{
            margin-top: 30px;
        }
        .profile-img img{
            border-radius: 50px;
            width: 80px;
        }
        .add-new{
            background: white;
            border-radius: 43px;
            color: #FD3768;
            font-size: 16px;
            text-align: center;
            padding: 6px;
            width: 115px;
            border: 2px solid #FD3768;
        }
        .profile-add-new{
            cursor: pointer;
        }
        .profile-add-new:hover{
            background: #FD3768;
            color: white;
        }
        .blog-screenshot{
            padding-top: 5px;
        }
        .blog-screenshot img{
            width: 100%;
            height: 90px;
        }
        .blog-screenshot-div{
            border: 1px solid #EEF4F4;
            padding: 23px 12px 23px 12px;
            margin-bottom: 20px;
        }
        .blog-screenshot-div p{
            margin: 0 0 2px 0;
        }
        .blog-divs{
            padding-right: 10px;
            min-height: 1000px;
        }

        .left-brd{
            border-left: 1px dotted gray;
        }
        .active, .input-title{
            font-weight: 600;
        }
        .pink-text{
            color: #FD3768 !important;
        }
        .gray-text{
            color: lightgrey !important;
        }*/

    </style>
<!--</head>
<body>-->

<div class="wrapper-blog">
    <div class="row">
        <div class="col-xs-2 col-md-2 col-md-offset-2">
            <!-- PROFILE SIDEBAR --> 
            <?= $this->render('//blocks/_profileSidebar'); ?>
        </div>





        <div class="col-xs-6 col-md-6 left-brd">

            <div class="row profile-menu-block">
                <div class="col-md-7 col-md-offset-1">
                    <p class="input-title">BLOGS (<?= count($blogs); ?>)</p>
                </div>
                <div class="col-md-2 pull-right">
                    <div class="add-new profile-add-new setup-blog">ADD NEW</div>
                </div>
            </div>
            
            
            <div class="blog-divs">
                <?php foreach($blogs as $blog): ?>

                <!--Block template-->
                <div class="col-md-5 col-md-offset-1 blog-screenshot-div">
                    <div class="col-md-4 blog-screenshot">
                        <a href="#"><img src="http://img.informer.com/screenshots/2941/2941717_2.jpg" alt="Screenshot"></a>
                    </div>
                    <div class="col-md-7">
                        <p><a href="#"><?= $blog->name ?>.Trendsquare.com</a></p>
                        <p class="gray-text">Created <?= Yii::$app->formatter->asDate($blog->create_date, 'medium'); ?></p>
                        <br>
                        <p class="gray-text">20 pages • 320posts</p>
                        <p class="gray-text">37 208 664 visitors</p>
                    </div>
                    <div class="col-md-1" style="position: relative;">

                        <span class="image-actions" data-original-title="" title="" aria-describedby=""></span>
<!--                        <div class="popover fade bottom in" role="tooltip" id="popover928460" style="top: 16px; left: 170.5px; display: block;">
                            <div class="arrow" style="left: 50%;"></div>
                            <h3 class="popover-title" style="display: none;"></h3>
                            <div class="popover-content">
                                <span class="open-image-details">Details</span><span class="delete-image">Delete</span>
                            </div>
                        </div>-->
                    </div>
                </div>
                <!--End block template-->

                <?php endforeach; ?>

            </div>


        </div>
    </div>
</div>

    <!-- BLOG POPUP --> 
    <?= $this->render('//blocks/_setupBlogs'); ?>

<!--
<script src="https://code.jquery.com/jquery-3.1.0.slim.min.js" integrity="sha256-cRpWjoSOw5KcyIOaZNo4i6fZ9tKPhYYb6i5T9RSVJG8=" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</body>
</html>-->