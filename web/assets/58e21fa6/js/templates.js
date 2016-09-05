this["VideoEssenceApp"] = this["VideoEssenceApp"] || {};
this["VideoEssenceApp"]["templates"] = this["VideoEssenceApp"]["templates"] || {};

this["VideoEssenceApp"]["templates"]["category-template"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.imgs : depth0)) != null ? stack1.retina : stack1), depth0));
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.imgs : depth0)) != null ? stack1.normal : stack1), depth0));
},"5":function(container,depth0,helpers,partials,data) {
    return "hidden";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"category-banner-wp\">\n    <div class=\"category-banner\" style=\"background: url('"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.retina : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "') -5px -5px no-repeat;\"></div>\n    <div class=\"info\">\n        <a class=\"back-to-category-list\" href=\"/site/explore\"><span class=\"arrow-back\"></span>Categories</a>\n        <h3 class=\"title\">"
    + container.escapeExpression(((helper = (helper = helpers.nameCat || (depth0 != null ? depth0.nameCat : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"nameCat","hash":{},"data":data}) : helper)))
    + "</h3>\n    </div>\n</div>\n<div class=\"video-list-controls\">\n    <!--<div class=\"btn-group\">-->\n        <!--<i class=\"my-sort-icon desc\"></i>-->\n        <!--<button class=\"dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">-->\n            <!--Popular<span class=\"caret\"></span>-->\n        <!--</button>-->\n        <!--<ul class=\"dropdown-menu\">-->\n            <!--<li><a href=\"#\">Popular</a></li>-->\n            <!--<li><a href=\"#\">Date</a></li>-->\n        <!--</ul>-->\n    <!--</div>-->\n</div>\n<div class=\"list\"></div>\n<div class=\"text-center "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.gettingIsStop : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n    <img src=\"/preloader.gif\"/>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["facebook-editor-template"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"videoessenceFacebookPost\" spellcheck=\"false\">\n    <a href=\"#\" class=\"close-button\"><i class=\"ace-icon fa fa-times\"></i></a>\n    <div class=\"social-embed-item facebook\">\n        <div class=\"social-embed-header\">\n            <div>\n                <i class=\"fa fa-facebook\" style=\"height: 32px;line-height: 32px;color: #45619d;\"></i>\n            </div>\n            <div class=\"author\"><a href=\""
    + alias4(((helper = (helper = helpers.author_url || (depth0 != null ? depth0.author_url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author_url","hash":{},"data":data}) : helper)))
    + "\" class=\"author-link\">"
    + alias4(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data}) : helper)))
    + "</a></div>\n            <div class=\"time-ago\">"
    + alias4((helpers.moment || (depth0 && depth0.moment) || alias2).call(alias1,{"name":"moment","hash":{"from":(depth0 != null ? depth0.published : depth0)},"data":data}))
    + "</div>\n        </div>\n        <div class=\"social-embed-content\">\n			"
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n        </div>\n        <div class=\"social-embed-footer\">\n            <a class=\"facebook-share\" target=\"_blank\" href=\"https://www.facebook.com/sharer.php?u="
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\"></a>\n        </div>\n    </div>\n</div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["facebook-template"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "gray";
},"3":function(container,depth0,helpers,partials,data) {
    return "            <button type=\"submit\" class=\"remove-btn btn-post-embed\">Remove</button>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "            <button type=\"submit\" class=\"embed-btn btn-post-embed\">Embed</button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"videoessenceFacebookPost "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.saved : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n    <div class=\"social-embed-item facebook\">\n        <div class=\"social-embed-header\">\n            <div>\n                <i class=\"fa fa-facebook\" style=\"height: 32px;line-height: 32px;color: #45619d;  font-size: 20px;\"></i>\n            </div>\n            <div class=\"author\"><a href=\""
    + alias4(((helper = (helper = helpers.author_url || (depth0 != null ? depth0.author_url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author_url","hash":{},"data":data}) : helper)))
    + "\" class=\"author-link\">"
    + alias4(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data}) : helper)))
    + "</a></div>\n            <div class=\"time-ago\">"
    + alias4((helpers.moment || (depth0 && depth0.moment) || alias2).call(alias1,{"name":"moment","hash":{"from":(depth0 != null ? depth0.published : depth0)},"data":data}))
    + "</div>\n        </div>\n        <div class=\"social-embed-content\">\n			"
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n        </div>\n        <div class=\"social-embed-footer\">\n            <a class=\"facebook-share\" target=\"_blank\" href=\"https://www.facebook.com/sharer.php?u="
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\"></a>\n        </div>\n    </div>\n    <div class=\"btn-wrapper\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.saved : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["followed-video-template"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <i class=\"channel-img\" style=\"background: url('"
    + container.escapeExpression(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"image","hash":{},"data":data}) : helper)))
    + "') 0 0 / 30px 30px no-repeat;\"></i>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "        <!--<i class=\"fa fa-circle-thin\"></i>-->\n        <i class=\"channel-img\" style=\""
    + alias3(((helper = (helper = helpers.randomBackgroundColor || (depth0 != null ? depth0.randomBackgroundColor : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"randomBackgroundColor","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3((helpers["firstСharacter"] || (depth0 && depth0["firstСharacter"]) || alias2).call(alias1,(depth0 != null ? depth0.title : depth0),{"name":"firstСharacter","hash":{},"data":data}))
    + "</i>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"followed-item new\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.image : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "    <div class=\"link-wp\">\n        <a class=\"url\" href=\"/site/channelvideos?channel_type="
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "&channel_id="
    + ((stack1 = ((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\" title=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n    </div>&nbsp;<span>(1)</span><div class=\"dot\"></div>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["follower-search-template"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "        <a class=\"fa fa-check\"></a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "        <a class=\"fa fa-heart\"></a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<span class=\"search-follower\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.followed : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</span>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["found-channel-template"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <a class=\"topic-image\" href=\""
    + alias4(((helper = (helper = helpers.ourUrl || (depth0 != null ? depth0.ourUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ourUrl","hash":{},"data":data}) : helper)))
    + "\" style=\"background: url('"
    + alias4(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data}) : helper)))
    + "') 0 0 / 30px 30px no-repeat;\"></a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <a class=\"topic-image\" href=\""
    + alias4(((helper = (helper = helpers.ourUrl || (depth0 != null ? depth0.ourUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ourUrl","hash":{},"data":data}) : helper)))
    + "\" style=\""
    + alias4(((helper = (helper = helpers.randomBackgroundColor || (depth0 != null ? depth0.randomBackgroundColor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"randomBackgroundColor","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4((helpers["firstСharacter"] || (depth0 && depth0["firstСharacter"]) || alias2).call(alias1,(depth0 != null ? depth0.title : depth0),{"name":"firstСharacter","hash":{},"data":data}))
    + "</a>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "followed";
},"7":function(container,depth0,helpers,partials,data) {
    return "Following";
},"9":function(container,depth0,helpers,partials,data) {
    return "Follow";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"topic-channel\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.image : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "    <div class=\"title\">\n       <a class=\"topic-content\" href=\""
    + alias4(((helper = (helper = helpers.ourUrl || (depth0 != null ? depth0.ourUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ourUrl","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n    </div>\n    <div class=\"following found-channel-like\">\n        <a class=\"follow-this "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.followed : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" href=\"#follow-this\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.followed : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "</a>\n    </div>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["gallery-image-template"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "error";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"unless","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    return "\n				<span class=\"ajax-image-loader\"></span>\n			";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.preview || (depth0 != null ? depth0.preview : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"preview","hash":{},"data":data}) : helper)));
},"8":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"path","hash":{},"data":data}) : helper)));
},"10":function(container,depth0,helpers,partials,data) {
    return "img-blur";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"unless","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"13":function(container,depth0,helpers,partials,data) {
    var helper;

  return "\n			<div class=\"upload-progress\">\n				<span style=\"width:"
    + container.escapeExpression(((helper = (helper = helpers.progress || (depth0 != null ? depth0.progress : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"progress","hash":{},"data":data}) : helper)))
    + "%;\"></span>\n			</div>\n		";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	<span class=\"checkbox\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.program(18, data, 0),"data":data})) != null ? stack1 : "")
    + "	</span>\n";
},"16":function(container,depth0,helpers,partials,data) {
    return "			<span class=\"fa fa-check-square\"></span>\n			<input name=\"selected-item\" type=\"checkbox\" checked=\"checked\"/>\n";
},"18":function(container,depth0,helpers,partials,data) {
    return "			<span class=\"fa fa-square-o\"></span>\n			<input name=\"selected-item\" type=\"checkbox\"/>\n";
},"20":function(container,depth0,helpers,partials,data) {
    return "uploading";
},"22":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<span class=\"image-actions\"></span>\n		<p class=\"t\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n		<p class=\"d\">Uploaded "
    + alias4(((helper = (helper = helpers.date_text || (depth0 != null ? depth0.date_text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date_text","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"24":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"unless","hash":{},"fn":container.program(25, data, 0),"inverse":container.program(27, data, 0),"data":data})) != null ? stack1 : "");
},"25":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "			<p class=\"t\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</p>\n			<p class=\"uploading-status\">Uploading <span>"
    + alias4(((helper = (helper = helpers.progress || (depth0 != null ? depth0.progress : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"progress","hash":{},"data":data}) : helper)))
    + "</span>%...</p>\n			<span class=\"app-btn-round min gray cancel cancel-upload\"></span>\n";
},"27":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "			<p class=\"t\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</p>\n			<p class=\"uploading-status\">"
    + alias4(((helper = (helper = helpers.errorText || (depth0 != null ? depth0.errorText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"errorText","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"image-gallery-item view-library\">\n<div class=\"img-wrap "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n	<div class=\"valign\">\n		<div class=\"img\">\n			"
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.uploaded : depth0),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n			<img src=\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.preview : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "\" alt=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\""
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.uploaded : depth0),{"name":"unless","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n		</div>\n		"
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.uploaded : depth0),{"name":"unless","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n	</div>\n</div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.uploaded : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<div class=\"img-desc "
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.uploaded : depth0),{"name":"unless","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.uploaded : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.program(24, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n</div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["gallery-template"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div id=\"gallery-media-region\">\n<div class=\"tabs col-md-8 col-xs-12\">\n	<div class=\"ve-tab tab-image-library\">Image library (<span>"
    + container.escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"count","hash":{},"data":data}) : helper)))
    + "</span>)</div>\n	<div class=\"ve-tab tab-image-posts\">All the images in-use in your posts</div>\n</div>\n<div class=\"actions col-md-4 col-xs-12\">\n	<button class=\"app-btn-default pink pull-right action-add\">Add new</button>\n	<button class=\"app-btn-default pinkbg pull-right action-delete\">Delete</button>\n</div>\n<div class=\"clearfix\"></div>\n<hr class=\"dashed\">\n<div id=\"tab-image-library\" class=\"tab-content-gallery\">\n	<div class=\"tab-image-library-result result-wrapper-scroll\"></div>\n	<div class=\"clearfix\"></div>\n</div>\n<div id=\"tab-image-posts\" class=\"tab-content-gallery\">\n	<div class=\"tab-image-posts-result result-wrapper-scroll\"></div>\n	<div class=\"clearfix\"></div>\n</div>\n</div>\n<div id=\"gallery-empty-region\" class=\"no-posts no-images\">\n	<h2>Your image library is empty</h2>\n	<div class=\"announce\">Click the button below to upload images</div>\n	<a href=\"#\" class=\"post-create action-add\">Add new</a>\n	<div class=\"image-library-empty\">\n		<img src=\"/images/posts/image-library-empty.png\" alt=\" \"/>\n	</div>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["image-search-template"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<img src=\""
    + container.escapeExpression(((helper = (helper = helpers.previewURL || (depth0 != null ? depth0.previewURL : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"previewURL","hash":{},"data":data}) : helper)))
    + "\">\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["image-template"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.preview || (depth0 != null ? depth0.preview : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"preview","hash":{},"data":data}) : helper)));
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"path","hash":{},"data":data}) : helper)));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"img-wrap\">\n	<div class=\"valign\">\n		<img src=\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.preview : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\" data-path=\""
    + alias4(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"path","hash":{},"data":data}) : helper)))
    + "\">\n	</div>\n</div>\n<div class=\"img-desc\">\n	<p class=\"t\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</p>\n	<p>"
    + alias4(((helper = (helper = helpers.loaded_date || (depth0 != null ? depth0.loaded_date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"loaded_date","hash":{},"data":data}) : helper)))
    + "</p>\n</div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-image-details-template"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<span class=\"modal-close\"></span>\n<div class=\"modal-media-title add-border\">Image details</div>\n<div class=\"image-details-content default-padding\">\n    <div class=\"align-wrapper\">\n        <div class=\"image-preview\">\n            <img src=\""
    + alias4(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"path","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\"/>\n        </div>\n        <div class=\"image-info\">\n            <div class=\"min-block-title\">Info</div>\n            <div class=\"info\">\n                <div class=\"t\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "."
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.type : stack1), depth0))
    + "</div>\n                <div class=\"d\">"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.width : stack1), depth0))
    + "x"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.height : stack1), depth0))
    + "px ("
    + alias4(((helper = (helper = helpers.size_str || (depth0 != null ? depth0.size_str : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"size_str","hash":{},"data":data}) : helper)))
    + ")</div>\n            </div>\n            <div class=\"form form-default\">\n                <input placeholder=\"Add title\" type=\"text\" name=\"image-details-name\" value=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\"/>\n                <textarea placeholder=\"Add a description (optional)\" name=\"image-details-description\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</textarea>\n            </div>\n            <div class=\"actions\">\n                <button class=\"app-btn-default pinkbg action-update\">Update</button>\n            </div>\n        </div>\n    </div>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-media-manager-template"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"ve-tab tab-library\">Image library</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "            <button class=\"app-btn-default pink action-add\">Add to post</button>\n            <button class=\"app-btn-default action-cancel\">Cancel</button>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "            <button class=\"app-btn-default action-cancel\">Close</button>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "    <div id=\"media-library-image-collection\" class=\"image-library-wrapper media-library-image-content\">\n        <div class=\"media-gallery-wrapper\"></div>\n        <div class=\"action-buttons-panel text-right\">\n            <button class=\"app-btn-default pink action-add\">Add to post</button>\n            <button class=\"app-btn-default action-cancel\">Cancel</button>\n        </div>\n    </div>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "            <button class=\"app-btn-default pink action-add-library\">Add in library</button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<span class=\"modal-close\"></span>\n<div class=\"modal-media-title\">Insert image</div>\n<div class=\"tabs image-media-library\">\n    <div class=\"ve-tab tab-upload\">Upload</div>\n    <div class=\"ve-tab tab-url\">By URL</div>\n\n"
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.onlyupload : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    <div class=\"ve-tab tab-search\">Search</div>\n</div>\n<div id=\"media-library-image-load\" class=\"dropzone-wrapper media-library-image-content\">\n    <div class=\"dropzone\">\n        <div class=\"gallery-upload-images\"></div>\n        <div class=\"dz-default dz-message\"><span>Drag an image here<br><span class=\"dzm\">Or, if you prefer...</span><br><button class=\"app-btn-default pink action-upload\">Choose an image to upload</button></span><input type=\"file\" id=\"upload-gallery-images\" class=\"hidden\" multiple=\"true\"/></div>\n    </div>\n    <div class=\"action-buttons-panel text-right\">\n"
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.onlyupload : depth0),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>\n<div id=\"media-library-image-url\" class=\"image-url-wrapper media-library-image-content\">\n    <div class=\"image-url-field\">\n        <div class=\"form-group\">\n            <input type=\"text\" placeholder=\"Paste an image URL here\" class=\"form-control insert-url\">\n        </div>\n    </div>\n    <div class=\"url-search-result\">\n        <div class=\"message text-center\">\n            <p class=\"large\">If your URL is correct, you’ll see an image preview here</p>\n            <p class=\"small\">Large images may take a few minutes to appear</p>\n        </div>\n    </div>\n    <div class=\"action-buttons-panel text-right\">\n"
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.onlyupload : depth0),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>\n\n"
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.onlyupload : depth0),{"name":"unless","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n<div id=\"media-library-image-search\" class=\"image-search-wrapper media-library-image-content\">\n    <div class=\"image-search-field\">\n        <div class=\"form-inline clearfix\">\n            <div class=\"form-group col-sm-12\">\n                <div class=\"col-sm-11 col-xs-10\">\n                    <input type=\"text\" placeholder=\"Enter a search keyword\" class=\"form-control search-url\">\n                </div>\n                <div class=\"col-sm-1 col-xs-2\">\n                    <button class=\"app-btn-round pink search search-images-button\"><i class=\"fa fa-search\"></i></button>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"image-search-result\">\n        <div class=\"message text-center\">\n            <p class=\"small\">Use the Creative Commons search for images you can use for commercial purposes.</p>\n        </div>\n    </div>\n    <div class=\"action-buttons-panel text-right\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.onlyupload : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-social-search-component"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<span class=\"modal-close\"></span>\n<div class=\"modal-media-title\">"
    + alias4(((helper = (helper = helpers.embedded_title || (depth0 != null ? depth0.embedded_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"embedded_title","hash":{},"data":data}) : helper)))
    + "</div>\n\n<div class=\"modal-social-search-input\">\n    <div class=\"modal-social-search-input-inner\">\n        <input type=\"text\" class=\"post-search-field\" placeholder=\""
    + alias4(((helper = (helper = helpers.placeholder || (depth0 != null ? depth0.placeholder : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"placeholder","hash":{},"data":data}) : helper)))
    + "\">\n        <a href=\"#\" class=\"btn btn-app btn-primary no-radius\">\n            <i class=\"fa fa-search\"></i>\n        </a>\n    </div>\n</div>\n<div class=\"modal-social-search-result\"></div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-social-search"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<span class=\"modal-close\"></span>\n<div class=\"modal-media-title\">"
    + alias4(((helper = (helper = helpers.embedded_title || (depth0 != null ? depth0.embedded_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"embedded_title","hash":{},"data":data}) : helper)))
    + "</div>\n<div class=\"modal-social-search\">\n    <div class=\"modal-social-search-input\">\n        <div class=\"tabs col-md-6 col-xs-12\">\n            <div class=\"ve-tab tab-all-posts-social\">All "
    + alias4(((helper = (helper = helpers.embedded_name || (depth0 != null ? depth0.embedded_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"embedded_name","hash":{},"data":data}) : helper)))
    + "</div>\n            <div class=\"ve-tab tab-embedded-posts-social\">Embedded "
    + alias4(((helper = (helper = helpers.embedded_name || (depth0 != null ? depth0.embedded_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"embedded_name","hash":{},"data":data}) : helper)))
    + " (<span>"
    + alias4(((helper = (helper = helpers.count_embedded_posts || (depth0 != null ? depth0.count_embedded_posts : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"count_embedded_posts","hash":{},"data":data}) : helper)))
    + "</span>)</div>\n        </div>\n        <div class=\"search-panel col-md-6 col-xs-12\">\n            <input type=\"text\" class=\"post-search-field\" placeholder=\""
    + alias4(((helper = (helper = helpers.placeholder || (depth0 != null ? depth0.placeholder : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"placeholder","hash":{},"data":data}) : helper)))
    + "\">\n            <button class=\"app-btn-round pink search search-images-button\"><i class=\"fa fa-search\"></i></button>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n    <div id=\"modal-social-posts-search\" class=\"modal-social-tab\">\n        <div class=\"modal-social-search-result\"></div>\n    </div>\n    <div id=\"modal-social-posts-embedded\" class=\"modal-social-tab\">\n        <div class=\"modal-social-embeded-result\"></div>\n    </div>\n    <div class=\"action-buttons-panel text-right\">\n        <button class=\"app-btn-default pink action-add\">Done</button>\n        <button class=\"app-btn-default action-cancel\">Cancel</button>\n    </div>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-template-post-categories-barge"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"modal-post-category-barge\">\n    <div class=\"post-header\">\n        <h3 class=\"related-posts margin1\">Choose Image</h3>\n        <a href=\"#\" class=\"bbm-button close-button\"></a>\n    </div>\n    <div class=\"post-middle\">\n        <!-- Upload image and data -->\n        <form class=\"avatar-form\" action=\"/post/save-barge\" enctype=\"multipart/form-data\" method=\"post\">\n            <div class=\"modal-body\">\n                <div class=\"avatar-body\">\n\n                    <!-- Upload image and data -->\n                    <div class=\"avatar-upload\">\n                        <input type=\"hidden\" class=\"avatar-src\" name=\"avatar_src\">\n                        <input type=\"hidden\" class=\"avatar-data\" name=\"avatar_data\">\n                        <label for=\"avatarInput\">Local upload</label>\n                        <input type=\"file\" class=\"avatar-input\" id=\"avatarInput\" name=\"avatar_file\">\n                    </div>\n\n                    <!-- Crop and preview -->\n                    <div class=\"row\">\n                        <div class=\"col-md-12\">\n                            <div class=\"avatar-wrapper\"></div>\n                        </div>\n                        <div class=\"\">\n                            <!--<div class=\"avatar-preview preview-lg\"></div>-->\n                            <!--<div class=\"avatar-preview preview-md\"></div>-->\n                            <!--<div class=\"avatar-preview preview-sm\"></div>-->\n                        </div>\n                    </div>\n\n                    <!--<div class=\"row avatar-btns\">-->\n                        <!--<div class=\"col-md-3\">-->\n                            <!--<button type=\"submit\" class=\"btn btn-primary btn-block avatar-save\">Done</button>-->\n                        <!--</div>-->\n                    <!--</div>-->\n                </div>\n            </div>\n        </form>\n    </div>\n    <!--<button type=\"submit\" class=\"post-btn btn-post-add\">Close</button>-->\n    <a href=\"#\" class=\"post-category-add-create-barge\">create</a>\n    <a href=\"#\" class=\"post-category-add-close-barge\">cancel</a>\n</div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-template-post-categories"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                        <option value=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.child : depth0)) != null ? stack1.attributes : stack1)) != null ? stack1.id : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.child : depth0)) != null ? stack1.attributes : stack1)) != null ? stack1.label : stack1), depth0))
    + "</option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"modal-post-category-add\">\n    <div class=\"post-header\">\n        <h3 class=\"related-posts margin1\">Add a new category</h3>\n        <a href=\"#\" class=\"bbm-button close-button\"></a>\n    </div>\n    <div class=\"post-middle\">\n        <div class=\"post-category-row\">\n            <label for=\"category-name\">\n                Name\n            </label>\n            <div class=\"category-name-wp\">\n                <input id=\"category-name\" name=\"category-name\" type=\"text\"/>\n            </div>\n            <div class=\"category-img-wp\">\n                <span class=\"first-letter\" style=\""
    + container.escapeExpression(((helper = (helper = helpers.randomBackgroundColor || (depth0 != null ? depth0.randomBackgroundColor : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"randomBackgroundColor","hash":{},"data":data}) : helper)))
    + "\">N</span>\n                <input type=\"hidden\" id=\"category-image\" name=\"category-image\" />\n                <input type=\"hidden\" id=\"category-barge\" name=\"category-barge\" />\n                <a href=\"#\" class=\"change-barge\">Change barge...</a>\n            </div>\n        </div>\n        <div class=\"post-category-row\">\n            <label for=\"category-desc\">\n                Description <span>(optional)</span>\n            </label>\n            <div class=\"category-desc-wp\">\n                <textarea name=\"category-desc\" id=\"category-desc\" cols=\"30\" rows=\"10\"></textarea>\n            </div>\n        </div>\n        <div class=\"post-category-row\">\n            <label for=\"category-parent\">\n                Parent category\n            </label>\n            <div class=\"category-parent-wp\">\n                <select name=\"category-parent\" id=\"category-parent\" class=\"selectpicker\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.parentCategories : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </select>\n            </div>\n        </div>\n    </div>\n    <!--<button type=\"submit\" class=\"post-btn btn-post-add\">Close</button>-->\n    <a href=\"#\" class=\"post-category-add-create\">create</a>\n    <a href=\"#\" class=\"post-category-add-close\">cancel</a>\n</div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-template-related-posts"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.headline || (depth0 != null ? depth0.headline : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"headline","hash":{},"data":data}) : helper)));
},"3":function(container,depth0,helpers,partials,data) {
    return "Recommended for you";
},"5":function(container,depth0,helpers,partials,data) {
    return "                <a href=\"#\" class=\"gray-modal-post selected all-posts\">All posts</a>\n                <a href=\"#\" class=\"space gray-modal-post related-posts\">Related posts</a>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "                <a href=\"#\" class=\"gray-modal-post all-posts\">All posts</a>\n                <a href=\"#\" class=\"space gray-modal-post selected related-posts\">Related posts</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<div class=\"modal-related-posts\">\n    <div class=\"post-header\">\n        <h3 id=\"post-header-editable\" class=\"\" contenteditable=\"true\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.headline : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</h3>\n        <a href=\"#\" class=\"post-header-edit\" onClick=\"$('#post-header-editable').focus(); return false;\" ></a>\n        <a href=\"#\" class=\"bbm-button close-button\"></a>\n    </div>\n    <div class=\"modal-related-posts-tabs-wp\">\n        <div class=\"modal-related-posts-tabs\">\n"
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.listType : depth0),"all",{"name":"equal","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "        </div>\n        <div class=\"modal-related-posts-search-wp\">\n            <input type=\"text\" class=\"modal-related-posts-search-input search-post\" placeholder=\"input your search\" value=\""
    + container.escapeExpression(((helper = (helper = helpers.keyword || (depth0 != null ? depth0.keyword : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"keyword","hash":{},"data":data}) : helper)))
    + "\">\n        </div>\n        <div class=\"modal-related-posts-search-button\" id=\"post-search\">\n            <i class=\"fa fa-search\"></i>\n        </div>\n    </div>\n    <div class=\"post-container\"></div>\n    <div class=\"modal-related-posts-controls\">\n        <span>Select up to 5 previous posts to current post</span>\n        <a class=\"modal-related-posts-controls-add\" href=\"#\">add</a>\n        <a class=\"modal-related-posts-controls-cancel\" href=\"#\">cancel</a>\n    </div>\n    <!--<button type=\"submit\" class=\"post-btn btn-post-add\">Close</button>-->\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-template"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<span class=\"modal-close\"></span>\n<div class=\"modal-media-title add-border\">"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)))
    + "</div>\n<div class=\"popup-region\">\n    <div class=\"video-frame-popup\"></div>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-twitter-manager-template"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"tabs\">\n    <input/>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-video-custom-annotation"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                            <option value=\""
    + alias2(alias1(depth0, depth0))
    + "\">"
    + alias2(alias1(depth0, depth0))
    + "px</option>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                            <input type=\"radio\" name=\"backgroundColor\" class=\"color-pick\" value=\""
    + alias2(alias1(depth0, depth0))
    + "\">\n                            <a class=\"color-picking\"><i class=\"fa fa-check\" style=\"background: "
    + alias2(alias1(depth0, depth0))
    + "\"></i></a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"customization_content\" style=\"display: block;\" campaign-id=\"1\">\n    <div class=\"welcome-header clearfix\">\n        <h3 class=\"pull-left\">Create a new annotation</h3>\n    </div>\n    <div class=\"clearfix row\">\n        <div class=\"col-md-6 column\">\n            <div class=\"form-group\">\n                <label for=\"text\">Text:</label>\n                <textarea id=\"text\" rows=\"2\" class=\"from-control special\"></textarea>\n            </div>\n            <div class=\"form-group\">\n                <div id=\"textColor\" class=\"nested\">\n                    <div class=\"color-picks clearfix colorHolder\">\n                        <div class=\"colorSelector tick\" style=\"width: 101px; margin-top: -5px;\">\n                            <input type=\"radio\" name=\"colorText\" class=\"color-pick\" value=\"#000000\">\n                            <a class=\"color-picking round color-holder\"><i class=\"fa fa-check\" style=\"background: #000000; margin-top: 5px;\"></i></a>\n                            <span class=\"color-picking no-color-holder\">#000000</span>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"nested\">\n                    <select id=\"textFontSize\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.fontSizes : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </select>\n                </div>\n            </div>\n            <div class=\"form-group colors\">\n                <label for=\"backgroundColor\">Background color:</label>\n                <div id=\"backgroundColor\">\n                    <div class=\"color-picks clearfix colorHolder\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.colors : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                        <div class=\"colorSelector pull-right\" style=\"width: 101px; margin-top: -5px;\">\n                            <input type=\"radio\" name=\"backgroundColor\" class=\"color-pick\" value=\"#FFFFFF\">\n                            <a class=\"color-picking color-holder\"><i class=\"fa fa-check\" style=\"background: #FFFFFF; margin-top: 5px;\"></i></a>\n                            <span class=\"color-picking no-color-holder\">#FFFFFF</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"targetUrl\">Target URL:</label>\n                <input type=\"text\" class=\"form-control special\" id=\"targetUrl\" value=\"\">\n                <div class=\"helper\">This URL will open then annotation is clicked</div>\n            </div>\n        </div>\n\n        <div class=\"col-md-6 column\">\n            <div class=\"clearfix preview-wrapper\">\n                <div class=\"col-md-12 column thumbnail-wrapper\">\n                    <img src=\""
    + container.escapeExpression(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "\" alt=\"\" class=\"col-md-12 column popup-thumbnail pushOver\">\n                    <div class=\"compaig-wrapper\" id=\"previewAnnotation\">\n                        <div class=\"annotation draggable\">\n                            <a href=\"#\" class=\"closeAnnotation\">&times;</a>\n                            <span class=\"text\"></span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"clearfix top2 select_range_wrapper\">\n                CTA button will appear at\n                <div class=\"select_range\">\n                    <input class=\"select_value\" id=\"timeStart\" type=\"text\" value=\"\" data-toggle=\"dropdown\">\n                    <div class=\"dropdown-menu\" aria-labelledby=\"timeStart\">\n                        <div class=\"sliderWidget\" id=\"timeStartSlider\"></div>\n                    </div>\n                </div>\n                and disappear at\n                <div class=\"select_range\">\n                    <input class=\"select_value secondSelect\" id=\"timeStop\" type=\"text\" value=\"\" data-toggle=\"dropdown\">\n                    <div class=\"dropdown-menu\" aria-labelledby=\"timeStop\">\n                        <div class=\"sliderWidget\" id=\"timeStopSlider\"></div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"clearfix top2\">\n                <div class=\"col-md-6 column\" style=\"padding: 0\">\n                    <input type=\"checkbox\" class=\"special\" id=\"displayOnPause\"><label for=\"displayOnPause\"><span></span><span>Display if video is paused</span></label>\n                </div>\n            </div>\n            <div class=\"clearfix top2\">\n                <div class=\"col-md-6 column\" style=\"padding: 0\">\n                    <input type=\"checkbox\" class=\"special\" id=\"showCloseButton\"><label for=\"showCloseButton\"><span></span><span>Show close button</span></label>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-12 column top2\">\n            <input class=\"btn btn-lg btn-danger submitMarketing\" id=\"addCompaign\" type=\"button\" value=\"Add campaign to video\">\n        </div>\n    </div>\n</div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-video-custom-cta"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                            <input type=\"radio\" name=\"buttonColor\" class=\"color-pick\" value=\""
    + alias2(alias1(depth0, depth0))
    + "\">\n                            <a class=\"color-picking\"><i class=\"fa fa-check\" style=\"background: "
    + alias2(alias1(depth0, depth0))
    + "\"></i></a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"customization_content\" style=\"display: block;\" campaign-id=\"1\">\n    <div class=\"welcome-header clearfix\">\n        <h3 class=\"pull-left\">Create a new Call To Action button</h3>\n    </div>\n    <div class=\"clearfix row\">\n        <div class=\"col-md-6 column\">\n            <div class=\"form-group\">\n                <label for=\"buttonText\">Button text:</label>\n                <input type=\"text\" class=\"form-control special\" id=\"buttonText\" value=\"\">\n            </div>\n            <div class=\"form-group\">\n                <label for=\"targetUrl\">Target URL:</label>\n                <input type=\"text\" class=\"form-control special\" id=\"targetUrl\" value=\"\">\n                <div class=\"helper\">This URL will open then button is clicked</div>\n            </div>\n            <div class=\"form-group colors\">\n                <label for=\"buttonColor\">Button color:</label>\n                <div id=\"buttonColor\">\n                    <div class=\"color-picks clearfix colorHolder\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.colors : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                        <div class=\"colorSelector pull-right\" style=\"width: 101px; margin-top: -5px;\">\n                            <input type=\"radio\" name=\"buttonColor\" class=\"color-pick\" value=\"#000000\">\n                            <a class=\"color-picking color-holder\"><i class=\"fa fa-check\" style=\"background: black; margin-top: 5px;\"></i></a>\n                            <span class=\"color-picking no-color-holder\">#000000</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"col-md-6 column\">\n            <div class=\"clearfix preview-wrapper\">\n                <div class=\"col-md-12 column thumbnail-wrapper\">\n                    <img src=\""
    + container.escapeExpression(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "\" alt=\"\" class=\"col-md-12 column popup-thumbnail pushOver\">\n                    <div class=\"compaig-wrapper\" id=\"previewCta\">\n                        <div class=\"cta draggable\">\n                            <a href=\"#\" class=\"button\"></a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"clearfix top2 select_range_wrapper\">\n                CTA button will appear at\n                <div class=\"select_range\">\n                    <input class=\"select_value\" id=\"timeStart\" type=\"text\" value=\"\" data-toggle=\"dropdown\">\n                    <div class=\"dropdown-menu\" aria-labelledby=\"timeStart\">\n                        <div class=\"sliderWidget\" id=\"timeStartSlider\"></div>\n                    </div>\n                </div>\n                and disappear at\n                <div class=\"select_range\">\n                    <input class=\"select_value secondSelect\" id=\"timeStop\" type=\"text\" value=\"\" data-toggle=\"dropdown\">\n                    <div class=\"dropdown-menu\" aria-labelledby=\"timeStop\">\n                        <div class=\"sliderWidget\" id=\"timeStopSlider\"></div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"clearfix top2\">\n                <div class=\"col-md-6 column\" style=\"padding: 0\">\n                    <input type=\"checkbox\" class=\"special\" id=\"displayOnPause\"><label for=\"displayOnPause\"><span></span><span>Display if video is paused</span></label>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-12 column top2\">\n            <input class=\"btn btn-lg btn-danger submitMarketing\" id=\"addCompaign\" type=\"button\" value=\"Add campaign to video\">\n        </div>\n    </div>\n</div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-video-custom-lead"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                            <input type=\"radio\" name=\"buttonColor\" class=\"color-pick\" value=\""
    + alias2(alias1(depth0, depth0))
    + "\">\n                            <a class=\"color-picking\"><i class=\"fa fa-check\" style=\"background: "
    + alias2(alias1(depth0, depth0))
    + "\"></i></a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                            <input type=\"radio\" name=\"backgroundColor\" class=\"color-pick\" value=\""
    + alias2(alias1(depth0, depth0))
    + "\">\n                            <a class=\"color-picking\"><i class=\"fa fa-check\" style=\"background: "
    + alias2(alias1(depth0, depth0))
    + "\"></i></a>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                        <option value=\""
    + alias2(alias1(depth0, depth0))
    + "\">"
    + alias2(alias1(depth0, depth0))
    + "</option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"customization_content\" style=\"display: block;\" campaign-id=\"1\">\n    <div class=\"welcome-header clearfix\">\n        <h3 class=\"pull-left\">Create a new lead capture form</h3>\n    </div>\n    <div class=\"clearfix row\">\n        <div class=\"col-md-6 column\">\n            <div class=\"form-group\">\n                <label for=\"headline\">Headline:</label>\n                <input type=\"text\" class=\"form-control special\" id=\"headline\" value=\"\">\n            </div>\n            <div class=\"form-group\">\n                <label for=\"subHeadline\">Sub-headline:</label>\n                <textarea id=\"subHeadline\" rows=\"2\" class=\"from-control special\"></textarea>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"buttonText\">Button text:</label>\n                <input type=\"text\" class=\"form-control special\" id=\"buttonText\" value=\"\">\n            </div>\n            <div class=\"form-group colors\">\n                <label for=\"buttonColor\">Button color:</label>\n                <div id=\"buttonColor\">\n                    <div class=\"color-picks clearfix colorHolder\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.colors : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                        <div class=\"colorSelector pull-right\" style=\"width: 101px; margin-top: -5px;\">\n                            <input type=\"radio\" name=\"buttonColor\" class=\"color-pick\" value=\"#FFFFFF\">\n                            <a class=\"color-picking color-holder\"><i class=\"fa fa-check\" style=\"background: #FFFFFF; margin-top: 5px;\"></i></a>\n                            <span class=\"color-picking no-color-holder\">#FFFFFF</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"form-group colors\">\n                <label for=\"backgroundColor\">Background color:</label>\n                <div id=\"backgroundColor\">\n                    <div class=\"color-picks clearfix colorHolder\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.colors : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                        <div class=\"colorSelector pull-right\" style=\"width: 101px; margin-top: -5px;\">\n                            <input type=\"radio\" name=\"backgroundColor\" class=\"color-pick\" value=\"#FFFFFF\">\n                            <a class=\"color-picking color-holder\"><i class=\"fa fa-check\" style=\"background: #FFFFFF; margin-top: 5px;\"></i></a>\n                            <span class=\"color-picking no-color-holder\">#FFFFFF</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <span class=\"beforeSelector\"><span id=\"opacity\"></span>% opacity</span>\n                <div class=\"sliderWidget\" id=\"opacitySlider\"></div>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"emailServiceProvider\">Email service provider:</label>\n                <select id=\"emailServiceProvider\" class=\"form-control special\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.emailProviders : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </select>\n            </div>\n        </div>\n\n        <div class=\"col-md-6 column\">\n            <div class=\"clearfix preview-wrapper\">\n                <div class=\"col-md-12 column thumbnail-wrapper\">\n                    <img src=\""
    + container.escapeExpression(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "\" alt=\"\" class=\"col-md-12 column popup-thumbnail pushOver\">\n                    <div class=\"compaig-wrapper previewLead\" id=\"previewLead\">\n                        <div class=\"background\"></div>\n                        <div class=\"headline\"></div>\n                        <div class=\"subheadline\"></div>\n                        <div class=\"form\">\n                            <input type=\"text\" class=\"form-name\" placeholder=\"Your name\" value=\"\">\n                            <input type=\"text\" class=\"form-email\" placeholder=\"Your mail\" value=\"\">\n                            <button type=\"submit\" class=\"button\" value=\"\"></button>\n                        </div>\n                        <div class=\"skip\">skip</div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"clearfix top2 select_range_wrapper\">\n                CTA button will appear at\n                <div class=\"select_range\">\n                    <input class=\"select_value\" id=\"timeStart\" type=\"text\" value=\"\" data-toggle=\"dropdown\">\n                    <div class=\"dropdown-menu\" aria-labelledby=\"timeStart\">\n                        <div class=\"sliderWidget\" id=\"timeStartSlider\"></div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"clearfix top2\">\n                <div class=\"col-md-6 column\" style=\"padding: 0\">\n                    <input type=\"checkbox\" class=\"special\" id=\"displayOnPause\"><label for=\"displayOnPause\"><span></span><span>Display if video is paused</span></label>\n                </div>\n                <div class=\"col-md-6 column\" style=\"padding: 0\">\n                    <input type=\"checkbox\" class=\"special\" id=\"allowSkip\"><label for=\"allowSkip\"><span></span><span>Allow skip</span></label>\n                </div>\n                <div class=\"col-md-6 column\" style=\"padding: 0\">\n                    <input type=\"checkbox\" class=\"special\" id=\"askNames\"><label for=\"askNames\"><span></span><span>Ask for their names</span></label>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-12 column top2\">\n            <input class=\"btn btn-lg btn-danger submitMarketing\" id=\"addCompaign\" type=\"button\" value=\"Add campaign to video\">\n        </div>\n    </div>\n</div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-video-custom-select"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <label class=\"tab_label\">\n                <input class=\"tab_radio\" type=\"radio\" name=\"tab\" value=\""
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">\n                "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\n            </label>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <div class=\"campaign-preview hide-on-select\" id=\""
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">\n                    <img src=\""
    + alias4(((helper = (helper = helpers.img || (depth0 != null ? depth0.img : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img","hash":{},"data":data}) : helper)))
    + "\" height=\"220\" alt=\"\">\n                </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<h4>Select a ROI campaign</h4>\n<div class=\"row\">\n    <div class=\"col-md-4 column menu-tabs \">\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.types : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <input type=\"button\" class=\"btn customize_button\" id=\"customize\" value=\"Customize\">\n    </div>\n\n    <div class=\"popup-content col-md-8 column pull-right\">\n        <div class=\"campaign_content\">\n            <span>Sample preview</span>\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.types : stack1),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n    </div>\n\n</div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-video-custom"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"close\">\n    <i class=\"fa fa-times\"></i>\n</div>\n<div class=\"my-container\"></div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-video-pocket-template"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"pocket-item\">\n    <div class=\"video-thumbnail-container\">\n        <img src=\""
    + alias4(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data}) : helper)))
    + "\" class=\"thumbnail\" style=\"width: 92px; height: 92px\"/>\n    </div>\n    <div class=\"info\">\n        <div class=\"title\">\n            <a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n        </div>\n        <a class=\"new-post-link\" href=\"/post/publish?video_id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "&type="
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "\">Create a post</a>\n    </div>\n    <i class=\"fa fa-times\"></i>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-video-search"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<span class=\"modal-close\"></span>\n<div class=\"modal-media-title\">Insert video</div>\n<div class=\"modal-social-search\">\n    <div class=\"modal-social-search-input\">\n        <div class=\"tabs col-md-6 col-xs-12\">\n            <div class=\"ve-tab tab-video-pocket\">Pocket (<span>"
    + container.escapeExpression(((helper = (helper = helpers.video_count || (depth0 != null ? depth0.video_count : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"video_count","hash":{},"data":data}) : helper)))
    + "</span>)</div>\n            <div class=\"ve-tab tab-video-search\">Search</div>\n        </div>\n        <div class=\"search-panel col-md-6 col-xs-12\">\n            <input type=\"text\" class=\"post-search-field\" placeholder=\"Enter a title or keyword\">\n            <button class=\"app-btn-round pink search search-video-button\"><i class=\"fa fa-search\"></i></button>\n        </div>\n        <div class=\"clearfix\"></div>\n    </div>\n    <div id=\"modal-video-pocket\" class=\"modal-social-tab\">\n        <div class=\"modal-video-pocket-result result-wrapper-scroll\"></div>\n    </div>\n    <div id=\"modal-video-search\" class=\"modal-social-tab\">\n        <div class=\"modal-video-search-result result-wrapper-scroll\"></div>\n    </div>\n    <div class=\"action-buttons-panel text-right\">\n        <button class=\"app-btn-default pink action-add\">Done</button>\n        <button class=\"app-btn-default action-cancel\">Cancel</button>\n    </div>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["page-editor"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"action-buttons-page\">\n    <!-- <a href=\"#\" id=\"post-draft-saved\">Draft saved</a> -->\n    <span class=\"pageDraftSaved\">Draft saved</span>\n    <a href=\"#\" id=\"page-submit\" class=\"app-btn-default pink\">publish</a>\n    <a href=\"#\" id=\"page-cancel\" class=\"app-btn-default\">cancel</a>\n</div>\n<form id=\"page-form\">\n    <div class=\"title\">\n        <input name=\"title\" autocomplete=\"off\" class=\"title-input\" placeholder=\""
    + alias4(((helper = (helper = helpers.placeholder || (depth0 != null ? depth0.placeholder : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"placeholder","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\">\n    </div>\n    <div class=\"content\">\n        <div id=\"editor\"></div>\n    </div>\n</form>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["pocket"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "block";
},"3":function(container,depth0,helpers,partials,data) {
    return "none";
},"5":function(container,depth0,helpers,partials,data) {
    return "maximize";
},"7":function(container,depth0,helpers,partials,data) {
    return "minimize";
},"9":function(container,depth0,helpers,partials,data) {
    return "style=\"max-height:0;\"";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"pocket-inner \" style=\"display: "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.countVideo : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + ";\"  >\n    <div class=\"header-window "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isMinification : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "\">\n        <div class=\"header-title\"><b>Pocket</b><br/>"
    + container.escapeExpression(((helper = (helper = helpers.countVideo || (depth0 != null ? depth0.countVideo : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"countVideo","hash":{},"data":data}) : helper)))
    + " videos</div>\n        <i class=\"header-control \"></i>\n    </div>\n    <div class=\"pocket-wrapper\" "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isMinification : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n\n    </div>\n</div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["post-categories-list-template"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<table class=\"table post-categories-table\">\n    <thead>\n    <tr class=\"first\">\n        <th class=\"header-categories-checkbox\">\n            <input type=\"checkbox\" class=\"select-on-check-all\" name=\"selection_all\" value=\"1\">\n        </th>\n        <th class=\"header-categories-name\">Name</th>\n        <th class=\"header-categories-description\">Description</th>\n        <th class=\"header-categories-barge\">Barge</th>\n        <th class=\"header-categories-parent\">Parent category</th>\n        <th class=\"header-categories-posts-count\">Post count</th>\n    </tr>\n    </thead>\n    <tbody>\n\n    </tbody>\n</table>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["post-categories-template"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"post-categories-template\"></div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["post-category-list-template"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <a href=\"#edit\" class=\"cat-edit\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" >Edit</a> &bull;\n        <a href=\"#trash\" class=\"cat-trash "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.trashed : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" >"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.trashed : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "</a> &bull;\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "trashed";
},"4":function(container,depth0,helpers,partials,data) {
    return "Untrash";
},"6":function(container,depth0,helpers,partials,data) {
    return "Trash";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "        <span class=\"author-image\" style=\"background-color: #5ea9f7\" data-label=\""
    + alias3(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "\"> "
    + alias3((helpers["firstСharacter"] || (depth0 && depth0["firstСharacter"]) || alias2).call(alias1,(depth0 != null ? depth0.label : depth0),{"name":"firstСharacter","hash":{},"data":data}))
    + " </span>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <span class=\"author-image\" style=\"\">\n            <img src=\""
    + container.escapeExpression(((helper = (helper = helpers.barge || (depth0 != null ? depth0.barge : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"barge","hash":{},"data":data}) : helper)))
    + "\" alt=\"\" width=\"30\" height=\"30\" />\n        </span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n\n<td class=\"category-checkbox\">\n    <input type=\"checkbox\" name=\"selection[]\" value=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n</td>\n\n<td class=\"category-name\" >\n    <div class=\"cat-edit\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</div>\n    <div class=\"category-links\" >\n"
    + ((stack1 = (helpers.ifNotCond || (depth0 && depth0.ifNotCond) || alias2).call(alias1,(depth0 != null ? depth0.parent_id : depth0),-1,{"name":"ifNotCond","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <a href=\"#view\" class=\"cat-view\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" >View</a>\n    </div>\n\n</td>\n\n<td class=\"category-description\">\n    "
    + alias4(((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"desc","hash":{},"data":data}) : helper)))
    + "\n</td>\n\n<td class=\"category-barge\">\n"
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.barge : depth0),{"name":"unless","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + "</td>\n\n<td class=\"category-parent\">\n    <div class=\"category-parent-wp\" >\n        <span class=\"first-letter\" data-parent=\""
    + alias4(((helper = (helper = helpers.parent || (depth0 != null ? depth0.parent : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"parent","hash":{},"data":data}) : helper)))
    + "\" style=\""
    + alias4(((helper = (helper = helpers.randomBackgroundColor || (depth0 != null ? depth0.randomBackgroundColor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"randomBackgroundColor","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4((helpers["firstСharacter"] || (depth0 && depth0["firstСharacter"]) || alias2).call(alias1,(depth0 != null ? depth0.parent : depth0),{"name":"firstСharacter","hash":{},"data":data}))
    + "</span>\n    </div>\n</td>\n\n<td class=\"category-posts-count\">"
    + alias4(((helper = (helper = helpers.posts_count || (depth0 != null ? depth0.posts_count : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"posts_count","hash":{},"data":data}) : helper)))
    + "</td>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["post-category-template"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "            <span class=\"my-checked-on fa fa-check-square\" style=\"display: inline-block;\"></span>\n            <span class=\"my-checked-off fa fa-square-o\" style=\"display: none;\"></span>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "            <span class=\"my-checked-on fa fa-check-square\" style=\"display: none;\"></span>\n            <span class=\"my-checked-off fa fa-square-o\" style=\"display: inline-block;\"></span>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "checked=\"checked\"";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "    <span class=\"cat-icon\" style=\""
    + alias3(((helper = (helper = helpers.randomBackgroundColor || (depth0 != null ? depth0.randomBackgroundColor : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"randomBackgroundColor","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3((helpers["firstСharacter"] || (depth0 && depth0["firstСharacter"]) || alias2).call(alias1,(depth0 != null ? depth0.label : depth0),{"name":"firstСharacter","hash":{},"data":data}))
    + "</span>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <span class=\"cat-icon\" style=\"\">\n            <img src=\""
    + container.escapeExpression(((helper = (helper = helpers.barge || (depth0 != null ? depth0.barge : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"barge","hash":{},"data":data}) : helper)))
    + "\" alt=\"\" width=\"30\" height=\"30\" />\n        </span>\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "    <span class=\"delete-image\" ></span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n<div class=\"cat\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n    <div class=\"cat-checkbox-wp\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.checked : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "        <input type=\"checkbox\" "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.checked : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " style=\"display: none;\"/>\n    </div>\n\n"
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.barge : depth0),{"name":"unless","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "\n    <span class=\"cat-title\">"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</span>\n\n"
    + ((stack1 = (helpers.ifNotCond || (depth0 && depth0.ifNotCond) || alias2).call(alias1,(depth0 != null ? depth0.id : depth0),1,{"name":"ifNotCond","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["post-editor-google"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col-md-6 col-xs-12 edit-wrap sp \" contenteditable=\"false\">\n    <div class=\"videoessenceGooglePost social-post-item-wrap mmp-style\" spellcheck=\"false\">\n        <a href=\"#\" class=\"close-button-socials\"></a>\n        <div class=\"social-embed-item googleplus\">\n            <div class=\"social-embed-header\">\n                <a target=\"_blank\" href=\""
    + alias4(((helper = (helper = helpers.author_url || (depth0 != null ? depth0.author_url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author_url","hash":{},"data":data}) : helper)))
    + "\" class=\"social-icon-post\"></a>\n                <div class=\"post-desc\">\n                    <div class=\"author\"><a target=\"_blank\" href=\""
    + alias4(((helper = (helper = helpers.author_url || (depth0 != null ? depth0.author_url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author_url","hash":{},"data":data}) : helper)))
    + "\" class=\"author-link\">"
    + alias4(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data}) : helper)))
    + "</a></div>\n                    <div class=\"time-ago\">"
    + alias4(((helper = (helper = helpers.published || (depth0 != null ? depth0.published : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"published","hash":{},"data":data}) : helper)))
    + "</div>\n                    <div class=\"clearfix\"></div>\n                </div>\n            </div>\n            <div class=\"social-embed-content\">\n                "
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n            </div>\n        </div>\n    </div>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["post-editor"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"action-buttons-post\">\n	<!-- <a href=\"#\" id=\"post-draft-saved\">Draft saved</a> -->\n	<a href=\"#\" id=\"post-submit\" class=\"app-btn-default pink\">preview / publish</a>\n</div>\n<form id=\"post-form\">\n    <div class=\"title\">\n        <input name=\"title\" class=\"title-input\" autocomplete=\"off\" placeholder=\"Post title\" value=\""
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)))
    + "\">\n    </div>\n    <div class=\"content\">\n        <div id=\"editor\"></div>\n    </div>\n    <div id=\"postsRelatedShow\"></div>\n</form>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["post-google"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <button type=\"submit\" class=\"remove-btn btn-post-embed "
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.onhover : depth0),{"name":"unless","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"></button>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "nonhover";
},"4":function(container,depth0,helpers,partials,data) {
    return "            <button type=\"submit\" class=\"embed-btn btn-post-embed\"></button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"videoessenceGooglePost wm-style social-post-item-wrap\">\n    <div class=\"social-embed-item googleplus\">\n        <div class=\"social-embed-header\">\n            <a target=\"_blank\" href=\""
    + alias4(((helper = (helper = helpers.author_url || (depth0 != null ? depth0.author_url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author_url","hash":{},"data":data}) : helper)))
    + "\" class=\"social-icon-post\"></a>\n            <div class=\"post-desc\">\n                <div class=\"author\"><a target=\"_blank\" href=\""
    + alias4(((helper = (helper = helpers.author_url || (depth0 != null ? depth0.author_url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author_url","hash":{},"data":data}) : helper)))
    + "\" class=\"author-link\">"
    + alias4(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data}) : helper)))
    + "</a></div>\n                <div class=\"time-ago\">"
    + alias4(((helper = (helper = helpers.published || (depth0 != null ? depth0.published : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"published","hash":{},"data":data}) : helper)))
    + "</div>\n                <div class=\"clearfix\"></div>\n            </div>\n        </div>\n        <div class=\"social-embed-content\">\n            "
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n        </div>\n    </div>\n    <div class=\"btn-wrapper\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.saved : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["post-page-list-template"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <a href=\"#publish\" class=\"page-publish\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">Publish</a> &bull;\n            <a href=\"#trash\" class=\"page-trash\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">Trash</a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <a href=\"#draft\" class=\"page-draft\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">Draft</a> &bull;\n            <a href=\"#trash\" class=\"page-trash\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">Trash</a>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <a href=\"#restore\" class=\"page-restore\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">Restore to draft</a> &bull;\n            <a href=\"#delete\" class=\"page-delete\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">Delete</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n<td class=\"pages-checkbox\">\n    <input type=\"checkbox\" name=\"selection[]\" value=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" style=\"display: none;\">\n    <span class=\"my-checked-on fa fa-check-square\" style=\"display: none;\"></span>\n    <span class=\"my-checked-off fa fa-square-o\" style=\"display: inline-block;\"></span>\n</td>\n\n<td class=\"pages-name\">\n    <div class=\"page-edit\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</div>\n    <div class=\"page-links\">\n        <a href=\"#edit\" class=\"page-edit\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">Edit</a> &bull;\n        <a href=\"#view\" class=\"page-view\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">View</a> &bull;\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.status : depth0),1,{"name":"ifCond","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.status : depth0),2,{"name":"ifCond","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.status : depth0),3,{"name":"ifCond","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n</td>\n\n<td class=\"pages-author\">\n    <span class=\"author-image\" style=\"background-color: #5ea9f7\" data-label=\"123123\">"
    + alias4((helpers["firstСharacter"] || (depth0 && depth0["firstСharacter"]) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1.name : stack1),{"name":"firstСharacter","hash":{},"data":data}))
    + alias4((helpers["firstСharacter"] || (depth0 && depth0["firstСharacter"]) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1.lastname : stack1),{"name":"firstСharacter","hash":{},"data":data}))
    + "</span>\n</td>\n\n<td class=\"pages-comments\">\n    "
    + alias4(((helper = (helper = helpers.comments_count || (depth0 != null ? depth0.comments_count : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"comments_count","hash":{},"data":data}) : helper)))
    + "\n</td>\n\n<td class=\"pages-timestamp\">\n    "
    + alias4(((helper = (helper = helpers.created_at || (depth0 != null ? depth0.created_at : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"created_at","hash":{},"data":data}) : helper)))
    + "\n</td>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["post-page-mini-list-template"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "!@#";
},"useData":true});

this["VideoEssenceApp"]["templates"]["post-pages-list-template"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<table class=\"table post-pages-table\">\n    <thead>\n    <tr class=\"first\">\n        <th class=\"header-pages-checkbox\">\n            <input type=\"checkbox\" class=\"select-on-check-all\" name=\"selection_all\" value=\"-2\"><span class=\"my-checked-on fa fa-check-square\" style=\"display: none;\"></span><span class=\"my-checked-off fa fa-square-o\" style=\"display: inline-block;\"></span></th>\n        <th class=\"header-pages-name\">Title</th>\n        <th class=\"header-pages-description\">Author</th>\n        <th class=\"header-pages-barge\">Comments</th>\n        <th class=\"header-pages-parent\">Created</th>\n    </tr>\n    </thead>\n    <tbody>\n\n    </tbody>\n</table>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["post-publish"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " checked=\"checked\" ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<span class=\"post-page-label\">Tags</span>\n<input type=\"text\" class=\"input-post-tags\" data-role=\"tagsinput\" style=\"display: none;\" placeholder=\"Add tag\" value=\""
    + alias4(((helper = (helper = helpers.postInformationTags || (depth0 != null ? depth0.postInformationTags : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"postInformationTags","hash":{},"data":data}) : helper)))
    + "\">\n\n<div class=\"related-post-block\">\n    <span class=\"post-page-label\">Related posts</span>\n    <label class=\"customize-switcher\">\n        <input name=\"switch-field-1\" class=\"ace ace-switch ace-switch-6\" type=\"checkbox\"  "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.postInformationShowRelated : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n        <span class=\"lbl\" data-lbl=\"\"></span>\n    </label>\n    <a class=\"relations-popup\">Customize</a>\n</div>\n\n<div class=\"categories-block\">\n    <span class=\"post-page-label\">Post categories</span><span class=\"post-add-category\">Add new</span>\n    <div>\n        <div id=\"tree\" class=\"aciTree aciTree0 categories-wp\">\n            <div class=\"cat\" data-id=\"0\">\n                <div class=\"cat-checkbox-wp\">\n                    <span class=\"my-checked-on fa fa-check-square\" style=\"display: none;\"></span>\n                    <span class=\"my-checked-off fa fa-square-o\" style=\"display: inline-block;\"></span>\n                    <input type=\"checkbox\" checked=\"checked\" style=\"display: none;\"/>\n                </div>\n                <span class=\"cat-icon\" style=\""
    + alias4(((helper = (helper = helpers.randomBackgroundColor || (depth0 != null ? depth0.randomBackgroundColor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"randomBackgroundColor","hash":{},"data":data}) : helper)))
    + "\">G</span>\n                <span class=\"cat-title\">General</span>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"cat-buttons\">\n\n    <form action=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.additinonalInfo : depth0)) != null ? stack1.route : stack1), depth0))
    + "\" id=\"post-publish\">\n        <input name='relations' id='post-publish-relations' type=\"hidden\">\n        <input name='selectedCategories' id='post-publish-selected-categories' type=\"hidden\">\n        <input name='tags' id='post-publish-tags' type=\"hidden\">\n        <input type=\"hidden\" name=\""
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.additinonalInfo : depth0)) != null ? stack1.csrf : stack1)) != null ? stack1.param : stack1), depth0))
    + "\"\n               value=\""
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.additinonalInfo : depth0)) != null ? stack1.csrf : stack1)) != null ? stack1.tocken : stack1), depth0))
    + "\"/>\n        <input type=\"hidden\" name=\"show_related\" id=\"post-publish-show_related\" value=\"\"/>\n        <input type=\"hidden\" name=\"related_headline\" value=\""
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.additinonalInfo : depth0)) != null ? stack1.post : stack1)) != null ? stack1.related_headline : stack1), depth0))
    + "\"/>\n        <input id='post-publish-submit' type=\"submit\" class=\"btn\" value=\"Publish\">\n    </form>\n    <a href=\"/post/index\" class=\"post-close\">Close</a>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["related-post"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "            <span class=\"chain\"></span>\n            <!--<i class=\"fa fa-link\"></i>-->\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "            <span class=\"chain-broken\"><i class=\"fa fa-unlink\"></i></span>\n            <!--<i class=\"fa fa-unlink\"></i>-->\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function";

  return "<div class=\"link-conteiner\">\n    <div class=\"post-video\">\n        <img src=\""
    + container.escapeExpression(((helper = (helper = helpers.video_image_url || (depth0 != null ? depth0.video_image_url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"video_image_url","hash":{},"data":data}) : helper)))
    + "\" class=\"thumbnail\">\n    </div>\n    <div class=\"post-description\">\n        <div class=\"post-title\"> "
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n        <div class=\"post-content\">\n            "
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n        </div>\n    </div>\n    <div class=\"post-link\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.linked : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["row-category-template"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression((helpers["firstСharacter"] || (depth0 && depth0["firstСharacter"]) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.title : depth0),{"name":"firstСharacter","hash":{},"data":data}));
},"3":function(container,depth0,helpers,partials,data) {
    return "            <a class=\"following followed\">Following</a>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "            <a class=\"following\">Follow</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"video-item "
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "\" >\n    <div class=\"video-item-inner\">\n        <div class=\"video-thumbnail-container\" style=\""
    + alias4(((helper = (helper = helpers.randomBackgroundColor || (depth0 != null ? depth0.randomBackgroundColor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"randomBackgroundColor","hash":{},"data":data}) : helper)))
    + "\">\n            <a href=\"/site/channelvideos?channel_type="
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "&channel_id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n                <div class=\"video-thumbnail\"\n                 style=\"background:  url("
    + alias4(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data}) : helper)))
    + ") center center no-repeat;\">"
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.image : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n            </a>\n        </div>\n        <div class=\"info\">\n            <div class=\"title\">\n                <a href=\"/site/channelvideos?channel_type="
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "&channel_id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n            </div>\n            <div class=\"statistic\">\n                "
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.statistic : depth0)) != null ? stack1.lastActivity : stack1), depth0))
    + " &bull; "
    + alias4((helpers.formatCommDelimiter || (depth0 && depth0.formatCommDelimiter) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.statistic : depth0)) != null ? stack1.videoCount : stack1),{"name":"formatCommDelimiter","hash":{},"data":data}))
    + " videos\n            </div>\n            <div class=\"description\">\n                "
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "\n            </div>\n\n        </div>\n    </div>\n    <div class=\"button-like\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.followed : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "\n    </div>\n\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["twitter-editor-template"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col-md-6 col-xs-12 edit-wrap sp\" contenteditable=\"false\">\n    <div class=\"videoessenceTwitterPost mmp-style social-post-item-wrap\" spellcheck=\"false\">\n        <a href=\"#\" class=\"close-button-socials\"></a>\n        <div class=\"social-embed-item tweet\">\n            <div class=\"social-embed-header\">\n                <a target=\"_blank\" href=\"https://twitter.com/"
    + alias4(((helper = (helper = helpers.screen_name || (depth0 != null ? depth0.screen_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"screen_name","hash":{},"data":data}) : helper)))
    + "\" class=\"social-icon-post\"></a>\n                <div class=\"post-desc\">\n                    <div class=\"author\">\n                        <a target=\"_blank\" href=\"https://twitter.com/"
    + alias4(((helper = (helper = helpers.screen_name || (depth0 != null ? depth0.screen_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"screen_name","hash":{},"data":data}) : helper)))
    + "\" class=\"author-link\">"
    + alias4(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"user","hash":{},"data":data}) : helper)))
    + "</a><br>\n                        <a target=\"_blank\" href=\"https://twitter.com/"
    + alias4(((helper = (helper = helpers.screen_name || (depth0 != null ? depth0.screen_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"screen_name","hash":{},"data":data}) : helper)))
    + "\" class=\"profile-link\">@"
    + alias4(((helper = (helper = helpers.screen_name || (depth0 != null ? depth0.screen_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"screen_name","hash":{},"data":data}) : helper)))
    + "</a>\n                    </div>\n                    <div class=\"time-ago\">"
    + alias4(((helper = (helper = helpers.created_at || (depth0 != null ? depth0.created_at : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"created_at","hash":{},"data":data}) : helper)))
    + "</div>\n                    <div class=\"clearfix\"></div>\n                </div>\n            </div>\n            <div class=\"social-embed-content\">\n                "
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "\n            </div>\n        </div>\n    </div>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["twitter-template"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<button type=\"submit\" class=\"remove-btn btn-post-embed "
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.onhover : depth0),{"name":"unless","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"></button>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "nonhover";
},"4":function(container,depth0,helpers,partials,data) {
    return "        	<button type=\"submit\" class=\"embed-btn btn-post-embed\"></button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"videoessenceTwitterPost wm-style social-post-item-wrap\">\n    <div class=\"social-embed-item tweet\">\n        <div class=\"social-embed-header\">\n            <a target=\"_blank\" href=\"https://twitter.com/"
    + alias4(((helper = (helper = helpers.screen_name || (depth0 != null ? depth0.screen_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"screen_name","hash":{},"data":data}) : helper)))
    + "\" class=\"social-icon-post\"></a>\n            <div class=\"post-desc\">\n                <div class=\"author\">\n                    <a target=\"_blank\" href=\"https://twitter.com/"
    + alias4(((helper = (helper = helpers.screen_name || (depth0 != null ? depth0.screen_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"screen_name","hash":{},"data":data}) : helper)))
    + "\" class=\"author-link\">"
    + alias4(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"user","hash":{},"data":data}) : helper)))
    + "</a><br>\n                    <a target=\"_blank\" href=\"https://twitter.com/"
    + alias4(((helper = (helper = helpers.screen_name || (depth0 != null ? depth0.screen_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"screen_name","hash":{},"data":data}) : helper)))
    + "\" class=\"profile-link\">@"
    + alias4(((helper = (helper = helpers.screen_name || (depth0 != null ? depth0.screen_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"screen_name","hash":{},"data":data}) : helper)))
    + "</a>\n                </div>\n                <div class=\"time-ago\">"
    + alias4(((helper = (helper = helpers.created_at || (depth0 != null ? depth0.created_at : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"created_at","hash":{},"data":data}) : helper)))
    + "</div>\n                <div class=\"clearfix\"></div>\n            </div>\n        </div>\n        <div class=\"social-embed-content\">\n			"
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "\n        </div>\n    </div>\n	<div class=\"btn-wrapper\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.saved : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "	</div>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["twitters-template"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"list\"></div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["upload-image-template"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "error";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"unless","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    return "\n				<span class=\"ajax-image-loader\"></span>\n			";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.preview || (depth0 != null ? depth0.preview : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"preview","hash":{},"data":data}) : helper)));
},"8":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"path","hash":{},"data":data}) : helper)));
},"10":function(container,depth0,helpers,partials,data) {
    return "img-blur";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"unless","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"13":function(container,depth0,helpers,partials,data) {
    var helper;

  return "\n			<div class=\"upload-progress\">\n				<span style=\"width:"
    + container.escapeExpression(((helper = (helper = helpers.progress || (depth0 != null ? depth0.progress : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"progress","hash":{},"data":data}) : helper)))
    + "%;\"></span>\n			</div>\n		";
},"15":function(container,depth0,helpers,partials,data) {
    return "uploading";
},"17":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<p class=\"t\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</p>\n		<p class=\"d\">"
    + alias4(((helper = (helper = helpers.loaded_date || (depth0 != null ? depth0.loaded_date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"loaded_date","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"unless","hash":{},"fn":container.program(20, data, 0),"inverse":container.program(22, data, 0),"data":data})) != null ? stack1 : "");
},"20":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "			<p class=\"t\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</p>\n			<p class=\"uploading-status\">Uploading <span>"
    + alias4(((helper = (helper = helpers.progress || (depth0 != null ? depth0.progress : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"progress","hash":{},"data":data}) : helper)))
    + "</span>%...</p>\n			<span class=\"app-btn-round min gray cancel cancel-upload\"></span>\n";
},"22":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "			<p class=\"t\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</p>\n			<p class=\"uploading-status\">"
    + alias4(((helper = (helper = helpers.errorText || (depth0 != null ? depth0.errorText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"errorText","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"image-gallery-item view-library\">\n<div class=\"img-wrap "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n	<div class=\"valign\">\n		<div class=\"img\">\n			"
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.uploaded : depth0),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n			<img src=\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.preview : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "\" data-path=\""
    + alias4(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"path","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\""
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.uploaded : depth0),{"name":"unless","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n		</div>\n		"
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.uploaded : depth0),{"name":"unless","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n	</div>\n</div>\n<div class=\"img-desc "
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.uploaded : depth0),{"name":"unless","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.uploaded : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.program(19, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n</div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["video-lead-preview"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"clearfix preview\" style=\"position: relative; overflow: hidden;\">\n    <div class=\"col-md-12 column thumbnail_wrapper\" style=\"padding:0\">\n        <img src=\"http://i.vimeocdn.com/video/517707142_1280.jpg\" class=\"col-md-12 column popup_thumbnail\" style=\"padding: 0\" alt=\"\">\n    </div>\n    <div style=\"position: absolute; width: 100%; height: 800px; overflow: hidden; \">\n        <div style=\"z-index: 20; position: absolute; padding: 40px;width: 100%;\">\n            <h1 id=\"previewHeadline\" style=\"color: #ffffff; font-size:26px\">"
    + alias4(((helper = (helper = helpers.headline || (depth0 != null ? depth0.headline : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"headline","hash":{},"data":data}) : helper)))
    + "</h1>\n            <div id=\"previewSubheadline1\" style=\"color: #b5cfd8;height:58px; line-height: 1.5; font-weight: 400; margin-bottom: 0; white-space: nowrap; overflow:hidden;zoom:0.75\">"
    + alias4(((helper = (helper = helpers.subheadline || (depth0 != null ? depth0.subheadline : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subheadline","hash":{},"data":data}) : helper)))
    + "</div>\n            <div style=\" margin-top: 20px;\">\n                <div class=\"col-md-8 column\" style=\"padding-left: 0; margin-top: 1px;\">\n                    <input class=\"form-control col-md-4 column pull-left nameInput\" id=\"nameInputPreview\" type=\"text\" placeholder=\"Your name\" style=\"padding: 20px;width: 48%; margin-top: 1px; margin-right: 10px; display: none;\">\n                    <input class=\"form-control pull-left col-md-4 column\" type=\"email\" placeholder=\"Your mail\" style=\"padding: 20px;margin-top:1px; display: inline-block\">\n                </div>\n                <a class=\"btn btn-danger btn-lg\" href=\"#\" id=\"previewSubmitButton\">"
    + alias4(((helper = (helper = helpers.buttonText || (depth0 != null ? depth0.buttonText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"buttonText","hash":{},"data":data}) : helper)))
    + "</a>\n                <div style=\"color: rgb(181, 207, 216);display: block;margin-top:40px;z-index: 20;\" id=\"skipPreview\">\n                    Skip\n                </div>\n            </div>\n        </div>\n\n        <div id=\"previewBackground\" style=\"position: absolute; top:0;left:0;width:800px;height:800px;z-index: 2; background: "
    + alias4(((helper = (helper = helpers.backgroundColor || (depth0 != null ? depth0.backgroundColor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"backgroundColor","hash":{},"data":data}) : helper)))
    + "; opacity: "
    + alias4(((helper = (helper = helpers.backgroundOpacity || (depth0 != null ? depth0.backgroundOpacity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"backgroundOpacity","hash":{},"data":data}) : helper)))
    + "\"></div>\n    </div>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["video-pocket-template"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"pocket-item\">\n    <div class=\"video-thumbnail-container\">\n        <img src=\""
    + alias4(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data}) : helper)))
    + "\" class=\"thumbnail\" style=\"width: 92px; height: 92px\"/>\n    </div>\n    <div class=\"info\">\n        <div class=\"title\">\n            <a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n        </div>\n        <div class=\"channel-link\">From <a href=\""
    + alias4(((helper = (helper = helpers.channel_url || (depth0 != null ? depth0.channel_url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channel_url","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + alias4(((helper = (helper = helpers.channel_title || (depth0 != null ? depth0.channel_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channel_title","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.channel_title || (depth0 != null ? depth0.channel_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channel_title","hash":{},"data":data}) : helper)))
    + "</a></div>\n        <div class=\"video-detail\">"
    + alias4(((helper = (helper = helpers.view_count || (depth0 != null ? depth0.view_count : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"view_count","hash":{},"data":data}) : helper)))
    + " views <span>"
    + alias4((helpers.moment || (depth0 && depth0.moment) || alias2).call(alias1,{"name":"moment","hash":{"from":(depth0 != null ? depth0.published_at : depth0)},"data":data}))
    + "</span></div>\n        <a class=\"new-post-link\" href=\"/post/publish?video_id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "&type="
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "&width="
    + alias4(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"width","hash":{},"data":data}) : helper)))
    + "&height="
    + alias4(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"height","hash":{},"data":data}) : helper)))
    + "\">Create a post</a>\n        <i class=\"delete-from-pocket\"></i>\n    </div>\n\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["video-roi-collection"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"custom-roi-collection\"></div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["video-roi"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <div class=\"compaig-wrapper compaig-lead\">\n            <div class=\"background\" style=\"background-color: "
    + alias4(((helper = (helper = helpers.backgroundColor || (depth0 != null ? depth0.backgroundColor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"backgroundColor","hash":{},"data":data}) : helper)))
    + "; opacity: "
    + alias4(((helper = (helper = helpers.opacity || (depth0 != null ? depth0.opacity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"opacity","hash":{},"data":data}) : helper)))
    + "\"></div>\n            <div class=\"headline\">"
    + alias4(((helper = (helper = helpers.headline || (depth0 != null ? depth0.headline : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"headline","hash":{},"data":data}) : helper)))
    + "</div>\n            <div class=\"subheadline\">"
    + alias4(((helper = (helper = helpers.subHeadline || (depth0 != null ? depth0.subHeadline : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subHeadline","hash":{},"data":data}) : helper)))
    + "</div>\n            <div class=\"form "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.askNames : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n                <input type=\"text\" class=\"form-name\" placeholder=\"Your name\" value=\"\">\n                <input type=\"text\" class=\"form-email\" placeholder=\"Your mail\" value=\"\">\n                <button type=\"submit\" class=\"button\" style=\"background-color: "
    + alias4(((helper = (helper = helpers.buttonColor || (depth0 != null ? depth0.buttonColor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"buttonColor","hash":{},"data":data}) : helper)))
    + ";\">"
    + alias4(((helper = (helper = helpers.buttonText || (depth0 != null ? depth0.buttonText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"buttonText","hash":{},"data":data}) : helper)))
    + "</button>\n            </div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.allowSkip : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "with-name";
},"4":function(container,depth0,helpers,partials,data) {
    return "                <div class=\"skip\">Skip</div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <div class=\"compaig-wrapper compaig-cta\">\n            <div class=\"cta\" style=\"background-color: "
    + alias4(((helper = (helper = helpers.buttonColor || (depth0 != null ? depth0.buttonColor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"buttonColor","hash":{},"data":data}) : helper)))
    + "; left: "
    + alias4(((helper = (helper = helpers.left || (depth0 != null ? depth0.left : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"left","hash":{},"data":data}) : helper)))
    + "px; top: "
    + alias4(((helper = (helper = helpers.top || (depth0 != null ? depth0.top : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"top","hash":{},"data":data}) : helper)))
    + "px;\">\n                <a href=\""
    + alias4(((helper = (helper = helpers.targetUrl || (depth0 != null ? depth0.targetUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"targetUrl","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" class=\"button\">"
    + alias4(((helper = (helper = helpers.buttonText || (depth0 != null ? depth0.buttonText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"buttonText","hash":{},"data":data}) : helper)))
    + "</a>\n            </div>\n        </div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <div class=\"compaig-wrapper compaig-annotation\">\n            <div class=\"annotation\" style=\"background-color: "
    + alias4(((helper = (helper = helpers.backgroundColor || (depth0 != null ? depth0.backgroundColor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"backgroundColor","hash":{},"data":data}) : helper)))
    + "; left: "
    + alias4(((helper = (helper = helpers.left || (depth0 != null ? depth0.left : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"left","hash":{},"data":data}) : helper)))
    + "px; top: "
    + alias4(((helper = (helper = helpers.top || (depth0 != null ? depth0.top : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"top","hash":{},"data":data}) : helper)))
    + "px;\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.showCloseButton : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                <a class=\"text\" href=\""
    + alias4(((helper = (helper = helpers.targetUrl || (depth0 != null ? depth0.targetUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"targetUrl","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" style=\"color: "
    + alias4(((helper = (helper = helpers.textColor || (depth0 != null ? depth0.textColor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"textColor","hash":{},"data":data}) : helper)))
    + "; font-size: "
    + alias4(((helper = (helper = helpers.textFontSize || (depth0 != null ? depth0.textFontSize : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"textFontSize","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "</a>\n            </div>\n        </div>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "                    <a href=\"#\" class=\"closeAnnotation\">&times;</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"custom-roi\" data-start=\""
    + alias4(((helper = (helper = helpers.timeStart || (depth0 != null ? depth0.timeStart : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timeStart","hash":{},"data":data}) : helper)))
    + "\" data-stop=\""
    + alias4(((helper = (helper = helpers.timeStop || (depth0 != null ? depth0.timeStop : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timeStop","hash":{},"data":data}) : helper)))
    + "\" data-displayOnPause=\""
    + alias4(((helper = (helper = helpers.display || (depth0 != null ? depth0.display : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"display","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.typeIsLead : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.typeIsCta : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.typeIsAnnotation : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["video-search-template"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "action-unselect";
},"3":function(container,depth0,helpers,partials,data) {
    return "action-select";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"video-thumbnail-container\">\n    <img src=\""
    + alias4(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data}) : helper)))
    + "\"/>\n    <div class=\"video-length\">"
    + alias4(((helper = (helper = helpers.duration || (depth0 != null ? depth0.duration : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"duration","hash":{},"data":data}) : helper)))
    + "</div>\n</div>\n<div class=\"info\">\n    <div class=\"title\">\n        <a target=\"_blank\" href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n    </div>\n    <div class=\"description\">\n        From <a target=\"_blank\" href=\""
    + alias4(((helper = (helper = helpers.channel_url || (depth0 != null ? depth0.channel_url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channel_url","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.channel_title || (depth0 != null ? depth0.channel_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channel_title","hash":{},"data":data}) : helper)))
    + "</a>\n    </div>\n    <div class=\"video-info\">\n        <span class=\"views-count\">"
    + alias4(((helper = (helper = helpers.view_count || (depth0 != null ? depth0.view_count : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"view_count","hash":{},"data":data}) : helper)))
    + " views</span>\n        <span class=\"added-time\">"
    + alias4(((helper = (helper = helpers.published_at || (depth0 != null ? depth0.published_at : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"published_at","hash":{},"data":data}) : helper)))
    + "</span>\n    </div>\n</div>\n<div class=\"actions pull-right\">\n    <button class=\"app-btn-default pink "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\">Add to post</button>\n</div>\n<div class=\"clearfix\"></div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["video-template"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " gray";
},"3":function(container,depth0,helpers,partials,data) {
    return " added";
},"5":function(container,depth0,helpers,partials,data) {
    return "-->\n                <!--<a class=\"fa fa-check\"></a>-->\n            <!--";
},"7":function(container,depth0,helpers,partials,data) {
    return "-->\n                <!--<i class=\"fa fa-heart\"></i>-->\n            <!--";
},"9":function(container,depth0,helpers,partials,data) {
    return " showed ";
},"11":function(container,depth0,helpers,partials,data) {
    return " hidden ";
},"13":function(container,depth0,helpers,partials,data) {
    return "-->\n                            <!--<a class=\"fa fa-check\"></a>-->\n                        <!--";
},"15":function(container,depth0,helpers,partials,data) {
    return "-->\n                            <!--<i class=\"fa fa-heart\"></i>-->\n                        <!--";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"video-container "
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.saved : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n    <div class=\"thumbnail-wrapper\">\n        <div class=\"video-frame\">\n            <span class=\"icon-play\"></span>\n            <img src=\""
    + alias4(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data}) : helper)))
    + "\" class=\"image-view\" />\n            <div class=\"duration-video\">\n                <div class=\"background-opa\">\n                </div>\n\n                <div class=\"duration-text\">\n                    "
    + alias4(((helper = (helper = helpers.duration || (depth0 != null ? depth0.duration : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"duration","hash":{},"data":data}) : helper)))
    + "\n                </div>\n            </div>\n        </div>\n        <a class=\"to-add-video "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.saved : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"></a>\n    </div>\n    <div class=\"video-description\">\n        <h3 class=\"lockup-title\">\n            <a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n        </h3>\n\n        <div class=\"channel-link\">\n            From <a href=\""
    + alias4(((helper = (helper = helpers.channel_url || (depth0 != null ? depth0.channel_url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channel_url","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + alias4(((helper = (helper = helpers.channel_title || (depth0 != null ? depth0.channel_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channel_title","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.channel_title || (depth0 != null ? depth0.channel_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channel_title","hash":{},"data":data}) : helper)))
    + "</a>\n        </div>\n        <div class=\"video-detail\">\n            "
    + alias4((helpers.formatCommDelimiter || (depth0 && depth0.formatCommDelimiter) || alias2).call(alias1,(depth0 != null ? depth0.view_count : depth0),{"name":"formatCommDelimiter","hash":{},"data":data}))
    + " views &bull; "
    + alias4((helpers.moment || (depth0 && depth0.moment) || alias2).call(alias1,{"name":"moment","hash":{"from":(depth0 != null ? depth0.published_at : depth0)},"data":data}))
    + "\n        </div>\n        <!--<div class=\"button-like\">-->\n            <!--"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.followed : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "-->\n        <!--</div>-->\n        <!--<a class=\"fa fa-plus-circle\"></a>-->\n\n        <!--<i class=\"fa fa-ellipsis-v\"></i>-->\n        <!--<i class=\"elipse-menu\"></i>-->\n        <button type=\"button\" class=\"hide-video-block "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.showButtonVideoHide : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "")
    + "\">Don’t show me this</button>\n\n        <!--<div class=\"btn-group dropleft elipse-menu-wp\">-->\n            <!--<i class=\"elipse-menu dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"></i>-->\n            <!--<ul class=\"dropdown-menu dropdown-menu-right\">-->\n                <!--<li>-->\n                    <!--<div class=\"button-like\">-->\n                        <!--"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.followed : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(15, data, 0),"data":data})) != null ? stack1 : "")
    + "-->\n                    <!--</div>-->\n                <!--</li>-->\n            <!--</ul>-->\n        <!--</div>-->\n    </div>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["videos-template"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "    <div class=\"channel-wp\">\n        <div class=\"channel\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.noBanner : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "\n            <div class=\"channel-info\">\n                <a class=\"back-to-category\" href=\""
    + alias4(((helper = (helper = helpers.categoryLink || (depth0 != null ? depth0.categoryLink : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"categoryLink","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = ((helper = (helper = helpers.categoryName || (depth0 != null ? depth0.categoryName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"categoryName","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</a><br/>\n                <h3 class=\"title\">"
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.channelInfo : depth0)) != null ? stack1.snippet : stack1)) != null ? stack1.title : stack1), depth0))
    + " <div class=\"following "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.followed : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.followed : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.followed : depth0),{"name":"unless","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div></h3>\n                <div class=\"channel-statistic\">"
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.channelInfo : depth0)) != null ? stack1.statistics : stack1)) != null ? stack1.videoCount : stack1), depth0))
    + " videos &bull; "
    + alias4((helpers.formatCommDelimiter || (depth0 && depth0.formatCommDelimiter) || alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? depth0.channelInfo : depth0)) != null ? stack1.statistics : stack1)) != null ? stack1.viewCount : stack1),{"name":"formatCommDelimiter","hash":{},"data":data}))
    + " views </div>\n            </div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.showLink : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "                <div class=\"banner-img\" style=\"background: #bcc4c5 url('"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.retina : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "') -5px -5px no-repeat;\"></div>\n                <div class=\"thumbinal-img\" style=\"background: #bcc4c5 url('') center center no-repeat; "
    + alias3(((helper = (helper = helpers.randomBackgroundColor || (depth0 != null ? depth0.randomBackgroundColor : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"randomBackgroundColor","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3((helpers["firstСharacter"] || (depth0 && depth0["firstСharacter"]) || alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? depth0.channelInfo : depth0)) != null ? stack1.snippet : stack1)) != null ? stack1.title : stack1),{"name":"firstСharacter","hash":{},"data":data}))
    + "</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.bigBanner || (depth0 != null ? depth0.bigBanner : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"bigBanner","hash":{},"data":data}) : helper)));
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.normalBanner || (depth0 != null ? depth0.normalBanner : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"normalBanner","hash":{},"data":data}) : helper)));
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                <div class=\"banner-img\" style=\"background: transparent url('"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.retina : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "') -5px -5px no-repeat;\"></div>\n                <div class=\"thumbinal-img\" style=\"background: transparent url('"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.channelInfo : depth0)) != null ? stack1.snippet : stack1)) != null ? stack1.thumbnails : stack1)) != null ? stack1["default"] : stack1), depth0))
    + "') center center no-repeat; \"></div>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "followed";
},"11":function(container,depth0,helpers,partials,data) {
    return "Following";
},"13":function(container,depth0,helpers,partials,data) {
    return "Follow";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression;

  return "                <a class=\"channel-link\" target=\"_blank\" "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.channelInfo : depth0)) != null ? stack1.type : stack1), depth0))
    + "\" href=\""
    + alias2(((helper = (helper = helpers.channelTypeLink || (depth0 != null ? depth0.channelTypeLink : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"channelTypeLink","hash":{},"data":data}) : helper)))
    + "\" > "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.channelInfo : depth0)) != null ? stack1.type : stack1), depth0))
    + "</a>\n";
},"17":function(container,depth0,helpers,partials,data) {
    return "video-list-search";
},"19":function(container,depth0,helpers,partials,data) {
    return "active";
},"21":function(container,depth0,helpers,partials,data) {
    return "large";
},"23":function(container,depth0,helpers,partials,data) {
    return "hidden";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"category-info\"></div>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.channelInfo : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n\n\n    <div class=\"video-list-controls "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isSearch : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n\n            <div class=\"btn-group\">\n                <i class=\"my-sort-icon desc\"></i>\n                <button class=\"dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                    Popular<span class=\"caret\"></span>\n                </button>\n                <ul class=\"dropdown-menu\">\n                    <li><a href=\"#\">Popular</a></li>\n                    <li><a href=\"#\">Date</a></li>\n                </ul>\n            </div>\n\n\n        <!--<button type=\"button\" class=\"btn btn-white btn-sm btn-primary do-big\">-->\n        <button type=\"button\" class=\"do-small  "
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.bigView : depth0),{"name":"unless","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n            <!--<i class=\"icon-only ace-icon fa fa-th-large\"></i>-->\n        </button>\n        <button type=\"button\" class=\"do-big "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.bigView : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n            <!--<i class=\"icon-only ace-icon fa fa-align-justify\"></i>-->\n            <!--<i class=\"icon-only ace-icon fa fa-th\"></i>-->\n        </button>\n\n    </div>\n\n\n<div class=\"list "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.bigView : depth0),{"name":"if","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " row\"></div>\n<div class=\"text-center "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.gettingIsStop : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n    <img src=\"/preloader.gif\"/>\n</div>";
},"useData":true});