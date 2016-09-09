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
/*        .wrapper{
            overflow-x: hidden;
        }
        .row{
            margin-bottom: 10px;
        }
        .block{
            display: block;
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
        .image-block{
            width: 55%;
            display: inline-block;
            padding-top: 15px;
            float: left;
            height: 90px;
        }
        .image-block-checkbox{
            float: left;
        }
        .profile-img-div{
            width: 30%;
            display: inline-block;
            float: left;
        }
        .profile-input{
            width: 90%;
            height: 40px;
            border-radius: 6px;
            border: none;
            border: 1px solid lightgrey;
        }
        .save-changes{
            background: white;
            border-radius: 43px;
            color: #FD3768;
            font-size: 20px;
            text-align: center;
            padding: 7px;
            width: 200px;
            border: 2px solid #FD3768;
        }
        .profile-save-changes{
            margin-top: 40px;
            cursor: pointer;
        }
        .profile-save-changes:hover{
            background: #FD3768;
            color: white;
        }
        .timezone-margin{
            margin-top: 8px;
        }
        .left-brd{
            border-left: 1px dotted gray;
            min-height: 1000px;
        }
        .active, .input-title{
            font-weight: 600;
        }
        .pink-text{
            color: #FD3768 !important;
        }
        .gray-text{
            color: gray !important;
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
                <div class="col-md-10 col-md-offset-1">
                    <h4 class="profile-block-title">ACCOUNT INFORMATION</h4>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-5 col-md-5 col-md-offset-1">
                    <label for="firstname" class="block">First name</label>
                    <input type="text" name="firstname" id="firstname" class="profile-input">
                </div>
                <div class="col-xs-5 col-md-5">
                    <label for="lastname" class="block">Last name</label>
                    <input type="text" name="lastname" id="lastname" class="profile-input">
                </div>
            </div>

            <div class="row">
                <div class="col-xs-5 col-md-5 col-md-offset-1">
                    <label for="email" class="block">Email</label>
                    <input type="email" name="email" id="email" class="profile-input">
                    <label for="timezone" class="block timezone-margin">Your time-zone</label>
                    <input type="date" name="timezone" id="timezone" class="profile-input">
                </div>
                <div class="col-xs-5 col-md-5">
                    <span class="input-title">Profile image</span>
                    <div class="profile-img">
                        <div class="profile-img-div">
                            <img src="http://wpidiots.com/html/writic/red-writic-template/css/img/demo-images/avatar1.jpg" alt="user image">
                        </div>
                        <div class="image-block">
                            <p >
                                <a href="" class="pink-text">Change image</a>
                            </p>
                            <p>
                                <a href="" class="gray-text">Delete</a>
                            </p>
                        </div>
                        <p class="image-block-checkbox">
                            <input type="checkbox">
                            Show my profile image on my posts</p>
                    </div>
                </div>
            </div>

            <div class="row profile-menu-block">
                <div class="col-md-10 col-md-offset-1">
                    <h4 class="profile-block-title">CHANGE PASSWORD</h4>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-5 col-md-5 col-md-offset-1">
                    <label for="currentpass" class="block">Current Password</label>
                    <input type="password" name="currentpass" id="currentpass" class="profile-input">
                </div>
                <div class="col-xs-5 col-md-5">
                    <label for="newpass" class="block">New Password</label>
                    <input type="password" name="newpass" id="newpass" class="profile-input">
                </div>
            </div>

            <div class="row profile-menu-block">
                <div class="col-md-10 col-md-offset-1">
                    <h4 class="profile-block-title">CONTACT INFORMATION</h4>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-5 col-md-5 col-md-offset-1">
                    <label for="address" class="block">Address</label>
                    <input type="text" name="address" id="address" class="profile-input">
                </div>
                <div class="col-xs-5 col-md-5">
                    <label for="city" class="block">City</label>
                    <input type="text" name="city" id="city" class="profile-input">
                </div>
            </div>
            <div class="row">
                <div class="col-xs-5 col-md-5 col-md-offset-1">
                    <label for="state" class="block">State</label>
                    <input type="text" name="state" id="state" class="profile-input">
                </div>
                <div class="col-xs-5 col-md-5">
                    <label for="zip" class="block">Zip</label>
                    <input type="text" name="zip" id="zip" class="profile-input">
                </div>
            </div>
            <div class="row">
                <div class="col-xs-5 col-md-5 col-md-offset-1">
                    <label for="country" class="block">Country</label>
                    <select name="country" id="country" class="profile-input">
                        <option value="usa">USA</option>
                        <option value="russia">Russia</option>
                        <option value="poland">Poland</option>
                    </select>
                </div>
                <div class="col-xs-5 col-md-5">
                    <label for="phone" class="block">Phone</label>
                    <input type="text" name="phone" id="phone" class="profile-input">
                </div>
            </div>

            <div class="col-md-1 col-md-offset-1">
                <div class="save-changes profile-save-changes">Save Changes</div>
            </div>
        </div>

    </div>
</div>
<!--


<script src="https://code.jquery.com/jquery-3.1.0.slim.min.js" integrity="sha256-cRpWjoSOw5KcyIOaZNo4i6fZ9tKPhYYb6i5T9RSVJG8=" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</body>
</html>-->