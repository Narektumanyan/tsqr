/**
 * login page
 */
(function($ , undefined) {

    var selPass = '.field-login-form-password input[type="password"]';
    var selText = '.field-login-form-password input[type="text"]';
    var emailText = '.field-login-form-email input[type="text"]';

    //$(selPass).popover({
    //    placement: window.innerWidth > 750 ? 'right' : 'bottom'
    //});

    //$(selText).popover({
    //    placement: window.innerWidth > 750 ? 'right' : 'bottom'
    //});

    $(document).on("keyup", emailText, function(e){
        var self = $(this);
        self.parents(".form-group").removeClass("has-error").find(".help-block").text("");

        //self.popover('destroy');
    });

    $(document).on("keyup", selPass+', '+selText, function(){
        var self = $(this);
        var selfPass = self.parent().find("input[type='password']");
        var selfText = self.parent().find("input[type='text']");

        if (self.val().length > 0 && self.val().length < 8){
            //self.popover({
            //    placement: window.innerWidth > 750 ? 'right' : 'bottom'
            //});
            //self.popover('show');
            self.parents(".form-group").addClass("has-error");
        }
        if(self.val().length == 0 || self.val().length >= 8){
            //self.popover('hide');
            //self.popover('destroy');
            self.parents(".form-group").removeClass("has-error").find(".help-block").text("");
        }
    });

    //$(window).resize(function(e){
    //    $(selPass).popover('destroy');
    //    $(selText).popover('destroy');
    //});
    //
    //$(document).on("focusout", selPass+', '+selText, function(){
    //    $(selPass).popover('destroy');
    //    $(selText).popover('destroy');
    //});



    $(document).on("click", ".forgot-wp .lbl label", function(e){
        e.preventDefault();
        if ($(".my-checked-on").css("display") != "none"){
            var selfOn = $(".my-checked-on");
            //console.log("selfOn", selfOn.css("display"));
            selfOn.hide()
                .parent().find("input[type='checkbox']").prop("checked", false)
                .parent().find(".my-checked-off").addClass("fa fa-square-o").css("display", "inline-block");
        }
        else if ($(".my-checked-off").css("display") != "none"){
            var selfOff = $(".my-checked-off");
            //console.log("selfOff", selfOff.css("display"));
            selfOff.hide()
                .parent().find("input[type='checkbox']").prop("checked", true)
                .parent().find(".my-checked-on").addClass("fa fa-check-square").css("display", "inline-block");
        }
    });

    $(document).on("click", ".my-checked-on", function(e){
        e.preventDefault();
        var self = $(this);
        self.hide()
            .parent().find("input[type='checkbox']").prop("checked", false)
            .parent().find(".my-checked-off").addClass("fa fa-square-o").css("display", "inline-block");
        //console.log("my-checked-on", self.parent().find("input[type='checkbox']").prop("checked"));
        return false;
    });

    $(document).on("click", ".my-checked-off", function(e){
        e.preventDefault();
        var self = $(this);
        self.hide()
            .parent().find("input[type='checkbox']").prop("checked", true)
            .parent().find(".my-checked-on").addClass("fa fa-check-square").css("display", "inline-block");
        //console.log("my-checked-off", self.parent().find("input[type='checkbox']").prop("checked"));
        return false;
    });

    $(document).ready(function(){
        $(".help-block").each(function(val){
            var self = $(this);

            if (self.text().length != 0 ){
                var inp = self.parent().find("input:visible");
                //inp.popover({
                //    placement: window.innerWidth > 750 ? 'right' : 'bottom',
                //    content: self.text()
                //});
                //inp.popover('show');
            }
        });

        //if(window.devicePixelRatio > 1){
            var src = $(".login-container h1 img").attr("src");
            var res = src.replace("logo", "logo2x");
            $(".login-container h1 img").attr("src", res);
            console.log("res", res, src);
        //}
    });

})(window.jQuery);

/**
 * register page
 */
(function($ , undefined) {

    $(document).on("keyup", 'input[type="password"], input[type="text"]', function(e){
        var self = $(this);
        self.parents(".form-group").removeClass("has-error").find(".help-block").text("");
        //self.popover('destroy');
    });

    //$(window).resize(function(e){
    //    $("#registration-form input").popover('destroy');
    //});

    $(document).on("afterValidate", "#login-form, #registration-form, #password-recovery-form", function(form,data,hasError){
        var form = $(form);
        var error = 0;
        var pos = '';
        var from = '';
        var to = '';

        var selfForm = $(this);
        var isValid = 1;
        for(var prop in data) {
            if (!data.hasOwnProperty(prop)) continue
            console.log("prop", prop);
            if (data[prop].length == 0){
                $(document).find("#"+prop).parent().parent().find(".validate-icon").show();
                isValid *= 1;
            }
            else{
                $(document).find("#"+prop).parent().parent().find(".validate-icon").hide();
                isValid *= 0;
            }
        }

        //console.log("isValid", isValid, selfForm);

        if (!isValid){
            $(".widget-body").effect("shake", {
                direction: "left",
                distance: 15,
                times: 4
            }, 1000);
        }

        $(".help-block").each(function(val){
            var self = $(this);

            if (self.text().length != 0 ){
                self.html(/*"<b>Oops: </b>"+*/self.text());

                var inp = self.parent().find("input:visible");
                //inp.popover({
                //    placement: function(){
                //        var res = window.innerWidth > 750 ? 'right' : 'bottom';
                //        if (
                //            self.parents(".field-register-form-firstname").length > 0
                //        ){
                //            res = window.innerWidth > 750 ? 'left' : "top";
                //        }
                //        return res;
                //    },
                //    content: self.text()
                //});
                //inp.popover('show');
            }
        });

        return true;
    });

})(window.jQuery);