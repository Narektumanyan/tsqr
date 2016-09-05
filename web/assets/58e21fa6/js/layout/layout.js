(function($ , undefined) {
    $(document).on("click", function(e){
        var self = $(e.target);
        var header = $("#header");
        // console.log("self", self);
        if (header.find(".popover").length > 0 &&
            !self.hasClass("profile") &&
            !self.parents().hasClass("profile")
        ){
            header.find(".profile").popover('hide').popover('destroy');
        }
    });

    //close popover im image library
    $(document).on('click', function (e) {
        var target = $(e.target);
        if (target.hasClass('image-actions') || target.hasClass('popover'))
            return;

        var el = $(document).find('.popover').siblings('.image-actions');

        $(el).popover('hide');
    });

    $(document).on("click", "#header .profile", function(){
        var self = $(this);

        //console.log("self", self, self.parent().find(".popover").length);
        if (self.parent().find(".popover").length == 0){
            self.popover({
                placement: 'bottom',
                content: 'info about user',
                viewport: {
                    "selector": "#header",
                    padding: 28
                },
                template:
                    '<div class="popover" role="tooltip">' +
                        '<div class="arrow"></div>' +
                        '<h3 class="popover-title"></h3>' +
                        //'<div class="popover-content"></div>' +
                        $(".profile-menu-wp").html() +
                    '</div>'
            })
            .popover('show');
            //$("#header .popover").hover(function(){}, function(e){
            //    var self = $(e.target);
            //    self.parent().find(".profile").popover('hide').popover('destroy');
            //});
        }
        else{
            self.popover('hide').popover('destroy');
        }
    });

    var openMobileMenu = function(body){
        body.not(":animated").animate({
            "left": "273"
        }, 500);

        //var maxHeight = Math.max($("#mobile-view-menu").height(), 480) + "px";

        //body.css("overflow", "hidden");
        //$("#main-view").css("overflow", "hidden");
        //body.css("height", maxHeight);
        //$("#main-view").css("height", maxHeight);
    };
    var closeMobileMenu = function(body){
        body.not(":animated").animate({
            "left": "0"
        }, 500);
        return false;
    };

    $(document).on("click", "#main-view", function(e){
        var body = $("body");
        if (parseInt(body.css("left"), 10) == 273){
            e.preventDefault();
            closeMobileMenu(body);
            return false;
        }

        return true;
    });

    $(document).on("click", "#header .menu-icon", function(e){
        var body = $("body");
        if (body.css("left") != "273px") {
            openMobileMenu(body);
        }
        else{
            closeMobileMenu(body);
        }
    })

    $(document).on("click", "#mobile-view-menu .profile-full-name", function(e){
        var self = $(this);
        $("#mobile-view-menu .profile-menu").slideToggle();
    });

    $(document).on("click", ".mobile-icon-closed", function(e){
        //console.log(".mobile-icon-closed");
        e.preventDefault();
        var self = $(this);
        var descoverySearch = $(".descovery-search");
        var pageMenu = $(".page-menu");

        self.hide();

        descoverySearch
            .css("width", "inherit")
            .addClass("showed")
            .find("form").show()
        ;

        descoverySearch.find("button[type='submit']")
            .css({
                "background-color": "#fc3768",
                "position": "absolute"
            })
        ;

        pageMenu.css("display", "none");

        descoverySearch
            .find("input[type='text']").focus()
        ;

        return false;
    });

    var showMobileSearch = function(e){
        //console.log("showMobileSearch");
        var searchIcon = $(".mobile-icon-closed");
        var descoverySearch = $(".descovery-search");
        var windowInnerWidth = window.innerWidth;
        var pageMenu = $(".page-menu");
        var searchInput = descoverySearch.find("input[type='text']");

        if (searchInput.length == 0 ) {
            return;
        }

        if (descoverySearch.find("form").css("display") == "block" && windowInnerWidth < 800 && searchInput.val().length == 0){
            e.preventDefault();
            pageMenu.css("display", "block");
            descoverySearch.css("width", "40px");
            descoverySearch.find("form").css("display", "");
            searchIcon.show();
            return false;
        }
        if (searchInput.length > 0 && searchInput.val().length > 0){
            if (windowInnerWidth < 800) {
                searchIcon.hide();
                descoverySearch
                    .css("width", "inherit")
                    .addClass("showed")
                    .find("form").show()
                ;
                descoverySearch.find("button[type='submit']")
                    .css({
                        "background-color": "#fc3768",
                        "position": "absolute"
                    })
                ;
                pageMenu.css("display", "none");
                if (e.type != "focusout")
                    searchInput.focus();
            }
            else{
                searchIcon.hide();
                descoverySearch
                    .css("width", "100%")
                    .addClass("showed")
                    .find("form").show()
                ;
                descoverySearch.find("button[type='submit']")
                    .css({
                        "background-color": "#fc3768",
                        "position": "absolute"
                    })
                ;
                pageMenu.css("display", "block");
                if (e.type != "focusout")
                   searchInput.focus();
            }
        }

        return true;
    };

    $(document).on("submit", ".descovery-search form", function(e){
        //console.log("submit");
        //if (window.innerWidth < 800) {
            showMobileSearch(e);
        //}
    });

    $(document).on("focusout", ".descovery-search form input[type='text']", function(e){
        //console.log("focusout");
        //console.log("focusout", e);
        //if (window.innerWidth < 800) {
            showMobileSearch(e);
        //}
    });

    $(window).resize(function(e){
        //console.log("resize");
        var searchIcon = $(".mobile-icon-closed");
        var windowInnerWidth = window.innerWidth;
        var descoverySearch = $(".descovery-search");
        var pageMenu = $(".page-menu");
        var searchInput = descoverySearch.find("input[type='text']");
        showMobileSearch(e);

        if (windowInnerWidth >= 800){
            pageMenu.css("display", "block");
            descoverySearch.css("width", "100%");
            descoverySearch.find("form").show();
            searchIcon.hide();
        }
        else if(searchInput.val().length == 0) {
            pageMenu.css("display", "block");
            descoverySearch.find("form").hide();
            descoverySearch.css("width", "40px");
            searchIcon.show();
        }
    });

    $(document).ready(function(e){
        showMobileSearch(e);
    });

    $(document).on("mouseenter", ".category-barge .author-image", function(e){
        e.preventDefault();
        var self = $(this);
        self.popover({
            placement: 'bottom',
            content: self.data("label")
        })
        .popover('show');
        return false;
    });

    $(document).on("mouseleave", ".category-barge .author-image", function(e){
        var self = $(this);
        self.popover('hide').popover('destroy');
    });

    $(document).on("mouseenter", ".category-parent-wp .first-letter", function(e){
        e.preventDefault();
        var self = $(this);
        self.popover({
            placement: 'bottom',
            content: self.data("parent")
        })
        .popover('show');
        return false;
    });

    $(document).on("mouseleave", ".category-parent-wp .first-letter", function(e){
        var self = $(this);
        self.popover('hide').popover('destroy');
    });

})(window.jQuery);
