'use strict';

var Marionette = require('backbone.marionette');
window.VideoEssenceApp = new Marionette.Application();
window.VideoEssenceApp.on('start', function() {
	console.log('Application start');
});

module.exports = window.VideoEssenceApp;
;
this["VideoEssenceApp"] = this["VideoEssenceApp"] || {};
this["VideoEssenceApp"]["templates"] = this["VideoEssenceApp"]["templates"] || {};

this["VideoEssenceApp"]["templates"]["category-template"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "hidden";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"list\"></div>\n<div class=\"text-center "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.gettingIsStop : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n    <img src=\"/preloader.gif\"/>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["facebook-editor-template"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"videoessenceFacebookPost\" spellcheck=\"false\">\n    <a href=\"#\" class=\"close-button\"><i class=\"ace-icon fa fa-times\"></i></a>\n    <div class=\"social-embed-item facebook\">\n        <div class=\"social-embed-header\">\n            <div>\n                <i class=\"fa fa-facebook\" style=\"height: 32px;line-height: 32px;color: #45619d;\"></i>\n            </div>\n            <div class=\"author\"><a href=\""
    + alias3(((helper = (helper = helpers.author_url || (depth0 != null ? depth0.author_url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"author_url","hash":{},"data":data}) : helper)))
    + "\" class=\"author-link\">"
    + alias3(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"author","hash":{},"data":data}) : helper)))
    + "</a></div>\n            <div class=\"time-ago\">"
    + alias3((helpers.moment || (depth0 && depth0.moment) || alias1).call(depth0,{"name":"moment","hash":{"from":(depth0 != null ? depth0.published : depth0)},"data":data}))
    + "</div>\n        </div>\n        <div class=\"social-embed-content\">\n			"
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n        </div>\n        <div class=\"social-embed-footer\">\n            <a class=\"facebook-share\" target=\"_blank\" href=\"https://www.facebook.com/sharer.php?u="
    + alias3(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"url","hash":{},"data":data}) : helper)))
    + "\"></a>\n        </div>\n    </div>\n</div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["facebook-template"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "gray";
},"3":function(depth0,helpers,partials,data) {
    return "            <button type=\"submit\" class=\"remove-btn btn-post-embed\">Remove</button>\n";
},"5":function(depth0,helpers,partials,data) {
    return "            <button type=\"submit\" class=\"embed-btn btn-post-embed\">Embed</button>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"videoessenceFacebookPost "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.saved : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n    <div class=\"social-embed-item facebook\">\n        <div class=\"social-embed-header\">\n            <div>\n                <i class=\"fa fa-facebook\" style=\"height: 32px;line-height: 32px;color: #45619d;  font-size: 20px;\"></i>\n            </div>\n            <div class=\"author\"><a href=\""
    + alias3(((helper = (helper = helpers.author_url || (depth0 != null ? depth0.author_url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"author_url","hash":{},"data":data}) : helper)))
    + "\" class=\"author-link\">"
    + alias3(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"author","hash":{},"data":data}) : helper)))
    + "</a></div>\n            <div class=\"time-ago\">"
    + alias3((helpers.moment || (depth0 && depth0.moment) || alias1).call(depth0,{"name":"moment","hash":{"from":(depth0 != null ? depth0.published : depth0)},"data":data}))
    + "</div>\n        </div>\n        <div class=\"social-embed-content\">\n			"
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n        </div>\n        <div class=\"social-embed-footer\">\n            <a class=\"facebook-share\" target=\"_blank\" href=\"https://www.facebook.com/sharer.php?u="
    + alias3(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"url","hash":{},"data":data}) : helper)))
    + "\"></a>\n        </div>\n    </div>\n    <div class=\"btn-wrapper\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.saved : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["followed-video-template"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"followed-item\">\n    <i class=\"fa fa-circle-thin\"></i><a class=\"url\" href=\""
    + alias3(((helper = (helper = helpers['urlСhannel'] || (depth0 != null ? depth0['urlСhannel'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"urlСhannel","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["follower-search-template"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "        <a class=\"fa fa-check\"></a>\n";
},"3":function(depth0,helpers,partials,data) {
    return "        <a class=\"fa fa-heart\"></a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<span class=\"search-follower\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.followed : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</span>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["found-channel-template"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "            <a class=\"fa fa-check\"></a>\n";
},"3":function(depth0,helpers,partials,data) {
    return "            <a class=\"fa fa-heart\"></a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"followed-item\">\n    <i class=\"fa fa-circle-thin\"></i>\n    <a class=\"url\" href=\""
    + alias3(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n    <div class=\"found-channel-like\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.followed : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["image-search-template"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<img src=\""
    + this.escapeExpression(((helper = (helper = helpers.previewURL || (depth0 != null ? depth0.previewURL : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"previewURL","hash":{},"data":data}) : helper)))
    + "\">\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["image-template"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<a href=\"#\" class=\"close-button\">\n    <i class=\"ace-icon fa fa-times\"></i>\n</a>\n<img src=\""
    + this.escapeExpression(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"path","hash":{},"data":data}) : helper)))
    + "\">\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-media-manager-template"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"tabs\">\n    <div class=\"ve-tab tab-upload\"> UPLOAD</div>\n    <div class=\"ve-tab tab-library\"> IMAGE LIBRARY</div>\n    <div class=\"ve-tab tab-search\"> SEARCH </div>\n    <div class=\"ve-tab tab-url\"> URL </div>\n</div>\n<div class=\"dropzone-wrapper\">\n    <div class=\"dropzone\"></div>\n</div>\n<div class=\"image-library-wrapper\"></div>\n<div class=\"image-search-wrapper\">\n    <div class=\"image-search-field\">\n        <div class=\"form-group\">\n            <input type=\"text\" placeholder=\"Search\" class=\"form-control search-url\">\n        </div>\n    </div>\n    <div class=\"image-search-result\">\n\n    </div>\n</div>\n\n<div class=\"image-url-wrapper\">\n    <div class=\"image-url-field\">\n        <div class=\"form-group\">\n            <input type=\"text\" placeholder=\"Insert URL\" class=\"form-control insert-url\">\n        </div>\n    </div>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-social-search-component"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"modal-social-header\">\n    <span>"
    + alias3(((helper = (helper = helpers.embedded_title || (depth0 != null ? depth0.embedded_title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"embedded_title","hash":{},"data":data}) : helper)))
    + " -"
    + alias3(((helper = (helper = helpers.count_select || (depth0 != null ? depth0.count_select : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"count_select","hash":{},"data":data}) : helper)))
    + "</span>\n    <a href=\"#\" class=\"bbm-button close-button\"><i class=\"fa fa-times\"></i></a>\n</div>\n\n<div class=\"modal-social-search-input\">\n    <div class=\"modal-social-search-input-inner\">\n        <input type=\"text\" class=\"post-search-field\" placeholder=\""
    + alias3(((helper = (helper = helpers.placeholder || (depth0 != null ? depth0.placeholder : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"placeholder","hash":{},"data":data}) : helper)))
    + "\">\n        <a href=\"#\" class=\"btn btn-app btn-primary no-radius\">\n            <i class=\"fa fa-search\"></i>\n        </a>\n    </div>\n</div>\n<div class=\"modal-social-search-result\"></div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-social-search"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"modal-social-search\">\n\n    <div class=\"modal-social-header\">\n        <span>"
    + alias3(((helper = (helper = helpers.embedded_title || (depth0 != null ? depth0.embedded_title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"embedded_title","hash":{},"data":data}) : helper)))
    + " - "
    + alias3(((helper = (helper = helpers.count_select || (depth0 != null ? depth0.count_select : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"count_select","hash":{},"data":data}) : helper)))
    + "</span>\n        <button type=\"submit\" class=\"post-btn btn-post-add\">Done</button>\n        <a href=\"#\" class=\"bbm-button close-button\"><i class=\"fa fa-times\"></i></a>\n    </div>\n\n    <div class=\"modal-social-search-input\">\n        <div class=\"modal-social-search-input-inner\">\n            <input type=\"text\" class=\"post-search-field\" placeholder=\""
    + alias3(((helper = (helper = helpers.placeholder || (depth0 != null ? depth0.placeholder : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"placeholder","hash":{},"data":data}) : helper)))
    + "\">\n            <a href=\"#\" class=\"btn btn-app btn-primary no-radius\">\n                <i class=\"fa fa-search\"></i>\n            </a>\n        </div>\n    </div>\n    <div class=\"modal-social-search-result\"></div>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-template-related-posts"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "            <a href=\"#\" class=\"gray-modal-post selected all-posts\">All posts</a>\n            <a href=\"#\" class=\"space gray-modal-post related-posts\">Related posts</a>\n";
},"3":function(depth0,helpers,partials,data) {
    return "            <a href=\"#\" class=\"gray-modal-post all-posts\">All posts</a>\n            <a href=\"#\" class=\"space gray-modal-post selected related-posts\">Related posts</a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"modal-related-posts\">\n    <div class=\"post-header\">\n        <h3 class=\"related-posts margin1\">Related posts</h3>\n        <a href=\"#\" class=\"bbm-button close-button\"><i class=\"fa fa-times\"></i></a>\n    </div>\n    <hr>\n    <div>\n        <h3 id=\"headline\" class=\"margin1\" contenteditable=\"true\">"
    + alias3(((helper = (helper = helpers.headline || (depth0 != null ? depth0.headline : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"headline","hash":{},"data":data}) : helper)))
    + "</h3>\n        <a href=\"#\" onClick=\"$('#headline').focus(); return false;\" class=\"headline space gray-modal-post\">[Headline (editable)]</a>\n    </div>\n    <div class=\"line gray-modal-post margin1\">\n        Select up to 5 previouspost to link current post\n    </div>\n    <div class=\"line\">\n"
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias1).call(depth0,(depth0 != null ? depth0.listType : depth0),"all",{"name":"equal","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "        <input type=\"text\" class=\"input-large search-post\" placeholder=\"input your search\" value=\""
    + alias3(((helper = (helper = helpers.keyword || (depth0 != null ? depth0.keyword : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"keyword","hash":{},"data":data}) : helper)))
    + "\">\n        <div class=\"fa fa-circle-thin\" id=\"post-search\">\n            <i class=\"fa fa-search\"></i>\n        </div>\n    </div>\n    <div class=\"post-container\">\n    </div>\n    <!--<button type=\"submit\" class=\"post-btn btn-post-add\">Close</button>-->\n</div>\n<div class=\"popup-region\">\n    <div class=\"bbm-modal__section\">\n\n    </div>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-template"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "        <div class=\"bbm-modal__section\">\n            <iframe width=\"640\" height=\"390\" src=\"https://player.vimeo.com/video/"
    + this.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "?autoplay=1\" frameborder=\"0\"\n                    class=\"video-show\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\n        </div>\n";
},"3":function(depth0,helpers,partials,data) {
    var helper;

  return "        <div class=\"bbm-modal__section\">\n            <iframe width=\"640\" height=\"390\" src=\"https://www.youtube.com/embed/"
    + this.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "?autoplay=1\" frameborder=\"0\"\n                    allowfullscreen class=\"video-show\"></iframe>\n        </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"bbm-modal__bottombar\">\n    <a href=\"#\" class=\"bbm-button\"><i class=\"fa fa-times\"></i></a>\n</div>\n<div class=\"popup-region\">\n"
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.type : depth0),"vimeo",{"name":"equal","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-twitter-manager-template"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"tabs\">\n    <input/>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-video-custom-annotation"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "                            <option value=\""
    + alias2(alias1(depth0, depth0))
    + "\">"
    + alias2(alias1(depth0, depth0))
    + "px</option>\n";
},"3":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "                            <input type=\"radio\" name=\"backgroundColor\" class=\"color-pick\" value=\""
    + alias2(alias1(depth0, depth0))
    + "\">\n                            <a class=\"color-picking\"><i class=\"fa fa-check\" style=\"background: "
    + alias2(alias1(depth0, depth0))
    + "\"></i></a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"customization_content\" style=\"display: block;\" campaign-id=\"1\">\n    <div class=\"welcome-header clearfix\">\n        <h3 class=\"pull-left\">Create a new annotation</h3>\n    </div>\n    <div class=\"clearfix row\">\n        <div class=\"col-md-6 column\">\n            <div class=\"form-group\">\n                <label for=\"text\">Text:</label>\n                <textarea id=\"text\" rows=\"2\" class=\"from-control special\"></textarea>\n            </div>\n            <div class=\"form-group\">\n                <div id=\"textColor\" class=\"nested\">\n                    <div class=\"color-picks clearfix colorHolder\">\n                        <div class=\"colorSelector tick\" style=\"width: 101px; margin-top: -5px;\">\n                            <input type=\"radio\" name=\"colorText\" class=\"color-pick\" value=\"#000000\">\n                            <a class=\"color-picking round color-holder\"><i class=\"fa fa-check\" style=\"background: #000000; margin-top: 5px;\"></i></a>\n                            <span class=\"color-picking no-color-holder\">#000000</span>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"nested\">\n                    <select id=\"textFontSize\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.fontSizes : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "                    </select>\n                </div>\n            </div>\n            <div class=\"form-group colors\">\n                <label for=\"backgroundColor\">Background color:</label>\n                <div id=\"backgroundColor\">\n                    <div class=\"color-picks clearfix colorHolder\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.colors : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n                        <div class=\"colorSelector pull-right\" style=\"width: 101px; margin-top: -5px;\">\n                            <input type=\"radio\" name=\"backgroundColor\" class=\"color-pick\" value=\"#FFFFFF\">\n                            <a class=\"color-picking color-holder\"><i class=\"fa fa-check\" style=\"background: #FFFFFF; margin-top: 5px;\"></i></a>\n                            <span class=\"color-picking no-color-holder\">#FFFFFF</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"targetUrl\">Target URL:</label>\n                <input type=\"text\" class=\"form-control special\" id=\"targetUrl\" value=\"\">\n                <div class=\"helper\">This URL will open then annotation is clicked</div>\n            </div>\n        </div>\n\n        <div class=\"col-md-6 column\">\n            <div class=\"clearfix preview-wrapper\">\n                <div class=\"col-md-12 column thumbnail-wrapper\">\n                    <img src=\""
    + this.escapeExpression(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "\" alt=\"\" class=\"col-md-12 column popup-thumbnail pushOver\">\n                    <div class=\"compaig-wrapper\" id=\"previewAnnotation\">\n                        <div class=\"annotation draggable\">\n                            <a href=\"#\" class=\"closeAnnotation\">&times;</a>\n                            <span class=\"text\"></span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"clearfix top2 select_range_wrapper\">\n                CTA button will appear at\n                <div class=\"select_range\">\n                    <input class=\"select_value\" id=\"timeStart\" type=\"text\" value=\"\" data-toggle=\"dropdown\">\n                    <div class=\"dropdown-menu\" aria-labelledby=\"timeStart\">\n                        <div class=\"sliderWidget\" id=\"timeStartSlider\"></div>\n                    </div>\n                </div>\n                and disappear at\n                <div class=\"select_range\">\n                    <input class=\"select_value secondSelect\" id=\"timeStop\" type=\"text\" value=\"\" data-toggle=\"dropdown\">\n                    <div class=\"dropdown-menu\" aria-labelledby=\"timeStop\">\n                        <div class=\"sliderWidget\" id=\"timeStopSlider\"></div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"clearfix top2\">\n                <div class=\"col-md-6 column\" style=\"padding: 0\">\n                    <input type=\"checkbox\" class=\"special\" id=\"displayOnPause\"><label for=\"displayOnPause\"><span></span><span>Display if video is paused</span></label>\n                </div>\n            </div>\n            <div class=\"clearfix top2\">\n                <div class=\"col-md-6 column\" style=\"padding: 0\">\n                    <input type=\"checkbox\" class=\"special\" id=\"showCloseButton\"><label for=\"showCloseButton\"><span></span><span>Show close button</span></label>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-12 column top2\">\n            <input class=\"btn btn-lg btn-danger submitMarketing\" id=\"addCompaign\" type=\"button\" value=\"Add campaign to video\">\n        </div>\n    </div>\n</div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-video-custom-cta"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "                            <input type=\"radio\" name=\"buttonColor\" class=\"color-pick\" value=\""
    + alias2(alias1(depth0, depth0))
    + "\">\n                            <a class=\"color-picking\"><i class=\"fa fa-check\" style=\"background: "
    + alias2(alias1(depth0, depth0))
    + "\"></i></a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"customization_content\" style=\"display: block;\" campaign-id=\"1\">\n    <div class=\"welcome-header clearfix\">\n        <h3 class=\"pull-left\">Create a new Call To Action button</h3>\n    </div>\n    <div class=\"clearfix row\">\n        <div class=\"col-md-6 column\">\n            <div class=\"form-group\">\n                <label for=\"buttonText\">Button text:</label>\n                <input type=\"text\" class=\"form-control special\" id=\"buttonText\" value=\"\">\n            </div>\n            <div class=\"form-group\">\n                <label for=\"targetUrl\">Target URL:</label>\n                <input type=\"text\" class=\"form-control special\" id=\"targetUrl\" value=\"\">\n                <div class=\"helper\">This URL will open then button is clicked</div>\n            </div>\n            <div class=\"form-group colors\">\n                <label for=\"buttonColor\">Button color:</label>\n                <div id=\"buttonColor\">\n                    <div class=\"color-picks clearfix colorHolder\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.colors : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n                        <div class=\"colorSelector pull-right\" style=\"width: 101px; margin-top: -5px;\">\n                            <input type=\"radio\" name=\"buttonColor\" class=\"color-pick\" value=\"#000000\">\n                            <a class=\"color-picking color-holder\"><i class=\"fa fa-check\" style=\"background: black; margin-top: 5px;\"></i></a>\n                            <span class=\"color-picking no-color-holder\">#000000</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"col-md-6 column\">\n            <div class=\"clearfix preview-wrapper\">\n                <div class=\"col-md-12 column thumbnail-wrapper\">\n                    <img src=\""
    + this.escapeExpression(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "\" alt=\"\" class=\"col-md-12 column popup-thumbnail pushOver\">\n                    <div class=\"compaig-wrapper\" id=\"previewCta\">\n                        <div class=\"cta draggable\">\n                            <a href=\"#\" class=\"button\"></a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"clearfix top2 select_range_wrapper\">\n                CTA button will appear at\n                <div class=\"select_range\">\n                    <input class=\"select_value\" id=\"timeStart\" type=\"text\" value=\"\" data-toggle=\"dropdown\">\n                    <div class=\"dropdown-menu\" aria-labelledby=\"timeStart\">\n                        <div class=\"sliderWidget\" id=\"timeStartSlider\"></div>\n                    </div>\n                </div>\n                and disappear at\n                <div class=\"select_range\">\n                    <input class=\"select_value secondSelect\" id=\"timeStop\" type=\"text\" value=\"\" data-toggle=\"dropdown\">\n                    <div class=\"dropdown-menu\" aria-labelledby=\"timeStop\">\n                        <div class=\"sliderWidget\" id=\"timeStopSlider\"></div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"clearfix top2\">\n                <div class=\"col-md-6 column\" style=\"padding: 0\">\n                    <input type=\"checkbox\" class=\"special\" id=\"displayOnPause\"><label for=\"displayOnPause\"><span></span><span>Display if video is paused</span></label>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-12 column top2\">\n            <input class=\"btn btn-lg btn-danger submitMarketing\" id=\"addCompaign\" type=\"button\" value=\"Add campaign to video\">\n        </div>\n    </div>\n</div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-video-custom-lead"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "                            <input type=\"radio\" name=\"buttonColor\" class=\"color-pick\" value=\""
    + alias2(alias1(depth0, depth0))
    + "\">\n                            <a class=\"color-picking\"><i class=\"fa fa-check\" style=\"background: "
    + alias2(alias1(depth0, depth0))
    + "\"></i></a>\n";
},"3":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "                            <input type=\"radio\" name=\"backgroundColor\" class=\"color-pick\" value=\""
    + alias2(alias1(depth0, depth0))
    + "\">\n                            <a class=\"color-picking\"><i class=\"fa fa-check\" style=\"background: "
    + alias2(alias1(depth0, depth0))
    + "\"></i></a>\n";
},"5":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "                        <option value=\""
    + alias2(alias1(depth0, depth0))
    + "\">"
    + alias2(alias1(depth0, depth0))
    + "</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"customization_content\" style=\"display: block;\" campaign-id=\"1\">\n    <div class=\"welcome-header clearfix\">\n        <h3 class=\"pull-left\">Create a new lead capture form</h3>\n    </div>\n    <div class=\"clearfix row\">\n        <div class=\"col-md-6 column\">\n            <div class=\"form-group\">\n                <label for=\"headline\">Headline:</label>\n                <input type=\"text\" class=\"form-control special\" id=\"headline\" value=\"\">\n            </div>\n            <div class=\"form-group\">\n                <label for=\"subHeadline\">Sub-headline:</label>\n                <textarea id=\"subHeadline\" rows=\"2\" class=\"from-control special\"></textarea>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"buttonText\">Button text:</label>\n                <input type=\"text\" class=\"form-control special\" id=\"buttonText\" value=\"\">\n            </div>\n            <div class=\"form-group colors\">\n                <label for=\"buttonColor\">Button color:</label>\n                <div id=\"buttonColor\">\n                    <div class=\"color-picks clearfix colorHolder\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.colors : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n                        <div class=\"colorSelector pull-right\" style=\"width: 101px; margin-top: -5px;\">\n                            <input type=\"radio\" name=\"buttonColor\" class=\"color-pick\" value=\"#FFFFFF\">\n                            <a class=\"color-picking color-holder\"><i class=\"fa fa-check\" style=\"background: #FFFFFF; margin-top: 5px;\"></i></a>\n                            <span class=\"color-picking no-color-holder\">#FFFFFF</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"form-group colors\">\n                <label for=\"backgroundColor\">Background color:</label>\n                <div id=\"backgroundColor\">\n                    <div class=\"color-picks clearfix colorHolder\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.colors : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n                        <div class=\"colorSelector pull-right\" style=\"width: 101px; margin-top: -5px;\">\n                            <input type=\"radio\" name=\"backgroundColor\" class=\"color-pick\" value=\"#FFFFFF\">\n                            <a class=\"color-picking color-holder\"><i class=\"fa fa-check\" style=\"background: #FFFFFF; margin-top: 5px;\"></i></a>\n                            <span class=\"color-picking no-color-holder\">#FFFFFF</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <span class=\"beforeSelector\"><span id=\"opacity\"></span>% opacity</span>\n                <div class=\"sliderWidget\" id=\"opacitySlider\"></div>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"emailServiceProvider\">Email service provider:</label>\n                <select id=\"emailServiceProvider\" class=\"form-control special\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.emailProviders : depth0),{"name":"each","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "                </select>\n            </div>\n        </div>\n\n        <div class=\"col-md-6 column\">\n            <div class=\"clearfix preview-wrapper\">\n                <div class=\"col-md-12 column thumbnail-wrapper\">\n                    <img src=\""
    + this.escapeExpression(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "\" alt=\"\" class=\"col-md-12 column popup-thumbnail pushOver\">\n                    <div class=\"compaig-wrapper previewLead\" id=\"previewLead\">\n                        <div class=\"background\"></div>\n                        <div class=\"headline\"></div>\n                        <div class=\"subheadline\"></div>\n                        <div class=\"form\">\n                            <input type=\"text\" class=\"form-name\" placeholder=\"Your name\" value=\"\">\n                            <input type=\"text\" class=\"form-email\" placeholder=\"Your mail\" value=\"\">\n                            <button type=\"submit\" class=\"button\" value=\"\"></button>\n                        </div>\n                        <div class=\"skip\">skip</div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"clearfix top2 select_range_wrapper\">\n                CTA button will appear at\n                <div class=\"select_range\">\n                    <input class=\"select_value\" id=\"timeStart\" type=\"text\" value=\"\" data-toggle=\"dropdown\">\n                    <div class=\"dropdown-menu\" aria-labelledby=\"timeStart\">\n                        <div class=\"sliderWidget\" id=\"timeStartSlider\"></div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"clearfix top2\">\n                <div class=\"col-md-6 column\" style=\"padding: 0\">\n                    <input type=\"checkbox\" class=\"special\" id=\"displayOnPause\"><label for=\"displayOnPause\"><span></span><span>Display if video is paused</span></label>\n                </div>\n                <div class=\"col-md-6 column\" style=\"padding: 0\">\n                    <input type=\"checkbox\" class=\"special\" id=\"allowSkip\"><label for=\"allowSkip\"><span></span><span>Allow skip</span></label>\n                </div>\n                <div class=\"col-md-6 column\" style=\"padding: 0\">\n                    <input type=\"checkbox\" class=\"special\" id=\"askNames\"><label for=\"askNames\"><span></span><span>Ask for their names</span></label>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-12 column top2\">\n            <input class=\"btn btn-lg btn-danger submitMarketing\" id=\"addCompaign\" type=\"button\" value=\"Add campaign to video\">\n        </div>\n    </div>\n</div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-video-custom-select"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "            <label class=\"tab_label\">\n                <input class=\"tab_radio\" type=\"radio\" name=\"tab\" value=\""
    + alias3(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">\n                "
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "\n            </label>\n";
},"3":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "                <div class=\"campaign-preview hide-on-select\" id=\""
    + alias3(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">\n                    <img src=\""
    + alias3(((helper = (helper = helpers.img || (depth0 != null ? depth0.img : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"img","hash":{},"data":data}) : helper)))
    + "\" height=\"220\" alt=\"\">\n                </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<h4>Select a ROI campaign</h4>\n<div class=\"row\">\n    <div class=\"col-md-4 column menu-tabs \">\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.types : stack1),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        <input type=\"button\" class=\"btn customize_button\" id=\"customize\" value=\"Customize\">\n    </div>\n\n    <div class=\"popup-content col-md-8 column pull-right\">\n        <div class=\"campaign_content\">\n            <span>Sample preview</span>\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.types : stack1),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n    </div>\n\n</div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["modal-video-custom"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"close\">\n    <i class=\"fa fa-times\"></i>\n</div>\n<div class=\"my-container\"></div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["pocket"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "block";
},"3":function(depth0,helpers,partials,data) {
    return "none";
},"5":function(depth0,helpers,partials,data) {
    return "maximize";
},"7":function(depth0,helpers,partials,data) {
    return "minimize";
},"9":function(depth0,helpers,partials,data) {
    return "style=\"height:0;\"";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"pocket-inner\" style=\"display: "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.countVideo : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + ";\" >\n    <div class=\"header-window\">\n        <div class=\"header-title\">"
    + this.escapeExpression(((helper = (helper = helpers.countVideo || (depth0 != null ? depth0.countVideo : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"countVideo","hash":{},"data":data}) : helper)))
    + " videos in Pocket</div>\n        <i class=\"header-control "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isMinification : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "\"></i>\n    </div>\n    <div class=\"pocket-wrapper\" "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isMinification : depth0),{"name":"if","hash":{},"fn":this.program(9, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">\n\n    </div>\n</div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["post-editor-google"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"videoessenceGooglePost\" spellcheck=\"false\">\n    <a href=\"#\" class=\"close-button\"><i class=\"ace-icon fa fa-times\"></i></a>\n    <div class=\"social-embed-item googleplus\">\n        <div class=\"social-embed-header\">\n            <div>\n                <img src=\"https://developers.google.com/+/images/branding/sign-in-buttons/Red-signin_Short_base_44dp.png\"\n                     height=\"32px\" alt=\"\">\n            </div>\n            <div class=\"author\"><a href=\""
    + alias3(((helper = (helper = helpers.author_url || (depth0 != null ? depth0.author_url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"author_url","hash":{},"data":data}) : helper)))
    + "\" class=\"author-link\">"
    + alias3(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"author","hash":{},"data":data}) : helper)))
    + "</a></div>\n            <div class=\"time-ago\">"
    + alias3((helpers.moment || (depth0 && depth0.moment) || alias1).call(depth0,{"name":"moment","hash":{"from":(depth0 != null ? depth0.published : depth0)},"data":data}))
    + "</div>\n        </div>\n        <div class=\"social-embed-content\">\n            "
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n        </div>\n        <div class=\"social-embed-footer\">\n            <a class=\"twitter-icon google-plus-share\" target=\"_blank\" href=\"https://plus.google.com/share?url="
    + alias3(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"url","hash":{},"data":data}) : helper)))
    + "\"></a>\n        </div>\n    </div>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["post-editor"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<form id=\"post-form\">\n    <div class=\"title\">\n        <input name=\"title\" class=\"title-input\" placeholder=\"Title\" value=\""
    + this.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "\">\n    </div>\n    <div class=\"content\">\n        <div id=\"editor\"></div>\n    </div>\n    <input id='post-submit' class=\"btn\" value=\"Save it\">\n</form>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["post-google"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "gray";
},"3":function(depth0,helpers,partials,data) {
    return "            <button type=\"submit\" class=\"remove-btn btn-post-embed\">Remove</button>\n";
},"5":function(depth0,helpers,partials,data) {
    return "            <button type=\"submit\" class=\"embed-btn btn-post-embed\">Embed</button>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"videoessenceGooglePost "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.saved : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n    <div class=\"social-embed-item googleplus\">\n        <div class=\"social-embed-header\">\n            <div>\n                <img src=\"https://developers.google.com/+/images/branding/sign-in-buttons/Red-signin_Short_base_44dp.png\"\n                     height=\"32px\" alt=\"\">\n            </div>\n            <div class=\"author\"><a href=\""
    + alias3(((helper = (helper = helpers.author_url || (depth0 != null ? depth0.author_url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"author_url","hash":{},"data":data}) : helper)))
    + "\" class=\"author-link\">"
    + alias3(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"author","hash":{},"data":data}) : helper)))
    + "</a></div>\n            <div class=\"time-ago\">"
    + alias3((helpers.moment || (depth0 && depth0.moment) || alias1).call(depth0,{"name":"moment","hash":{"from":(depth0 != null ? depth0.published : depth0)},"data":data}))
    + "</div>\n        </div>\n        <div class=\"social-embed-content\">\n            "
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n        </div>\n        <div class=\"social-embed-footer\">\n            <a class=\"twitter-icon google-plus-share\" target=\"_blank\" href=\"https://plus.google.com/share?url="
    + alias3(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"url","hash":{},"data":data}) : helper)))
    + "\"></a>\n        </div>\n    </div>\n    <div class=\"btn-wrapper\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.saved : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["related-post"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "            <i class=\"fa fa-link\"></i>\n";
},"3":function(depth0,helpers,partials,data) {
    return "            <i class=\"fa fa-unlink\"></i>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function";

  return "<div class=\"link-conteiner\">\n    <div class=\"post-video\">\n        <img src=\"https://i.ytimg.com/vi/cRU9BT9M9Iw/hqdefault.jpg\" class=\"thumbnail\">\n    </div>\n    <div class=\"post-description\">\n        "
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n        <div class=\"post-content\">\n            "
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n        </div>\n    </div>\n    <div class=\"post-link\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.linked : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["row-category-template"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "            <a class=\"fa  fa-check\"></a>\n";
},"3":function(depth0,helpers,partials,data) {
    return "            <a class=\"fa fa-plus-circle\"></a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"video-item "
    + alias3(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"type","hash":{},"data":data}) : helper)))
    + "\" >\n    <div class=\"video-item-inner\">\n        <div class=\"video-thumbnail-container\">\n            <div class=\"video-thumbnail\"\n                 style=\"background-image:  url("
    + alias3(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"image","hash":{},"data":data}) : helper)))
    + ");\"></div>\n        </div>\n        <div class=\"info\">\n            <div class=\"title\">\n                <a href=\"/site/channelvideos?channel_type="
    + alias3(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"type","hash":{},"data":data}) : helper)))
    + "&channel_id="
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n            </div>\n            <div class=\"description\">\n                "
    + alias3(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "\n            </div>\n\n        </div>\n    </div>\n    <div class=\"button-like\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.followed : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n    </div>\n\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["twitter-editor-template"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"videoessenceTwitterPost\" spellcheck=\"false\">\n    <a href=\"#\" class=\"close-button\"><i class=\"ace-icon fa fa-times\"></i></a>\n    <div class=\"social-embed-item tweet\">\n        <div class=\"social-embed-header\">\n            <div>\n                <img src=\"https://g.twimg.com/dev/documentation/image/Twitter_logo_blue_32.png\"\n                     height=\"32px\" alt=\"\">\n            </div>\n            <div class=\"author\">"
    + alias3(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"user","hash":{},"data":data}) : helper)))
    + "</div>\n            <div class=\"time-ago\">"
    + alias3((helpers.moment || (depth0 && depth0.moment) || alias1).call(depth0,{"name":"moment","hash":{"from":(depth0 != null ? depth0.created_at : depth0)},"data":data}))
    + "</div>\n        </div>\n        <div class=\"social-embed-content\">\n            "
    + alias3(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"text","hash":{},"data":data}) : helper)))
    + "\n        </div>\n        <div class=\"social-embed-footer\">\n            <a class=\"twitter-icon twitter-reply\" target=\"_blank\" href=\"https://twitter.com/intent/tweet?in_reply_to="
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"></a>\n            <a class=\"twitter-icon twitter-retweet\" target=\"_blank\" href=\"https://twitter.com/intent/retweet?tweet_id="
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"></a>\n            <a class=\"twitter-icon twitter-favorite\" target=\"_blank\" href=\"https://twitter.com/intent/favorite?tweet_id="
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"></a>\n        </div>\n    </div>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["twitter-template"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "gray";
},"3":function(depth0,helpers,partials,data) {
    return "			<button type=\"submit\" class=\"remove-btn btn-post-embed\">Remove</button>\n";
},"5":function(depth0,helpers,partials,data) {
    return "        	<button type=\"submit\" class=\"embed-btn btn-post-embed\">Embed</button>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"videoessenceTwitterPost "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.saved : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n    <div class=\"social-embed-item tweet\">\n        <div class=\"social-embed-header\">\n            <div>\n                <img src=\"https://g.twimg.com/dev/documentation/image/Twitter_logo_blue_32.png\"\n                     height=\"32px\" alt=\"\">\n            </div>\n            <div class=\"author\">"
    + alias3(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"user","hash":{},"data":data}) : helper)))
    + "</div>\n            <div class=\"time-ago\">"
    + alias3((helpers.moment || (depth0 && depth0.moment) || alias1).call(depth0,{"name":"moment","hash":{"from":(depth0 != null ? depth0.created_at : depth0)},"data":data}))
    + "</div>\n        </div>\n        <div class=\"social-embed-content\">\n			"
    + alias3(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"text","hash":{},"data":data}) : helper)))
    + "\n        </div>\n        <div class=\"social-embed-footer\">\n            <a class=\"twitter-icon twitter-reply\" target=\"_blank\" href=\"https://twitter.com/intent/tweet?in_reply_to="
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"></a>\n            <a class=\"twitter-icon twitter-retweet\" target=\"_blank\" href=\"https://twitter.com/intent/retweet?tweet_id="
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"></a>\n            <a class=\"twitter-icon twitter-favorite\" target=\"_blank\" href=\"https://twitter.com/intent/favorite?tweet_id="
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"></a>\n        </div>\n    </div>\n	<div class=\"btn-wrapper\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.saved : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "	</div>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["twitters-template"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"list\"></div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["video-lead-preview"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"clearfix preview\" style=\"position: relative; overflow: hidden;\">\n    <div class=\"col-md-12 column thumbnail_wrapper\" style=\"padding:0\">\n        <img src=\"http://i.vimeocdn.com/video/517707142_1280.jpg\" class=\"col-md-12 column popup_thumbnail\" style=\"padding: 0\" alt=\"\">\n    </div>\n    <div style=\"position: absolute; width: 100%; height: 800px; overflow: hidden; \">\n        <div style=\"z-index: 20; position: absolute; padding: 40px;width: 100%;\">\n            <h1 id=\"previewHeadline\" style=\"color: #ffffff; font-size:26px\">"
    + alias3(((helper = (helper = helpers.headline || (depth0 != null ? depth0.headline : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"headline","hash":{},"data":data}) : helper)))
    + "</h1>\n            <div id=\"previewSubheadline1\" style=\"color: #b5cfd8;height:58px; line-height: 1.5; font-weight: 400; margin-bottom: 0; white-space: nowrap; overflow:hidden;zoom:0.75\">"
    + alias3(((helper = (helper = helpers.subheadline || (depth0 != null ? depth0.subheadline : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"subheadline","hash":{},"data":data}) : helper)))
    + "</div>\n            <div style=\" margin-top: 20px;\">\n                <div class=\"col-md-8 column\" style=\"padding-left: 0; margin-top: 1px;\">\n                    <input class=\"form-control col-md-4 column pull-left nameInput\" id=\"nameInputPreview\" type=\"text\" placeholder=\"Your name\" style=\"padding: 20px;width: 48%; margin-top: 1px; margin-right: 10px; display: none;\">\n                    <input class=\"form-control pull-left col-md-4 column\" type=\"email\" placeholder=\"Your mail\" style=\"padding: 20px;margin-top:1px; display: inline-block\">\n                </div>\n                <a class=\"btn btn-danger btn-lg\" href=\"#\" id=\"previewSubmitButton\">"
    + alias3(((helper = (helper = helpers.buttonText || (depth0 != null ? depth0.buttonText : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"buttonText","hash":{},"data":data}) : helper)))
    + "</a>\n                <div style=\"color: rgb(181, 207, 216);display: block;margin-top:40px;z-index: 20;\" id=\"skipPreview\">\n                    Skip\n                </div>\n            </div>\n        </div>\n\n        <div id=\"previewBackground\" style=\"position: absolute; top:0;left:0;width:800px;height:800px;z-index: 2; background: "
    + alias3(((helper = (helper = helpers.backgroundColor || (depth0 != null ? depth0.backgroundColor : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"backgroundColor","hash":{},"data":data}) : helper)))
    + "; opacity: "
    + alias3(((helper = (helper = helpers.backgroundOpacity || (depth0 != null ? depth0.backgroundOpacity : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"backgroundOpacity","hash":{},"data":data}) : helper)))
    + "\"></div>\n    </div>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["video-pocket-template"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"pocket-item\">\n    <div class=\"video-thumbnail-container\">\n        <img src=\""
    + alias3(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"image","hash":{},"data":data}) : helper)))
    + "\" class=\"thumbnail\" style=\"width: 92px; height: 92px\"/>\n    </div>\n    <div class=\"info\">\n        <div class=\"title\">\n            <a href=\""
    + alias3(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n        </div>\n        <a class=\"new-post-link\" href=\"/post/create?video_id="
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "&type="
    + alias3(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"type","hash":{},"data":data}) : helper)))
    + "\">Create a post</a>\n    </div>\n    <i class=\"fa fa-times\"></i>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["video-roi-collection"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"custom-roi-collection\"></div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["video-roi"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "        <div class=\"compaig-wrapper compaig-lead\">\n            <div class=\"background\" style=\"background-color: "
    + alias3(((helper = (helper = helpers.backgroundColor || (depth0 != null ? depth0.backgroundColor : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"backgroundColor","hash":{},"data":data}) : helper)))
    + "; opacity: "
    + alias3(((helper = (helper = helpers.opacity || (depth0 != null ? depth0.opacity : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"opacity","hash":{},"data":data}) : helper)))
    + "\"></div>\n            <div class=\"headline\">"
    + alias3(((helper = (helper = helpers.headline || (depth0 != null ? depth0.headline : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"headline","hash":{},"data":data}) : helper)))
    + "</div>\n            <div class=\"subheadline\">"
    + alias3(((helper = (helper = helpers.subHeadline || (depth0 != null ? depth0.subHeadline : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"subHeadline","hash":{},"data":data}) : helper)))
    + "</div>\n            <div class=\"form "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.askNames : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n                <input type=\"text\" class=\"form-name\" placeholder=\"Your name\" value=\"\">\n                <input type=\"text\" class=\"form-email\" placeholder=\"Your mail\" value=\"\">\n                <button type=\"submit\" class=\"button\" style=\"background-color: "
    + alias3(((helper = (helper = helpers.buttonColor || (depth0 != null ? depth0.buttonColor : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"buttonColor","hash":{},"data":data}) : helper)))
    + ";\">"
    + alias3(((helper = (helper = helpers.buttonText || (depth0 != null ? depth0.buttonText : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"buttonText","hash":{},"data":data}) : helper)))
    + "</button>\n            </div>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.allowSkip : depth0),{"name":"if","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n";
},"2":function(depth0,helpers,partials,data) {
    return "with-name";
},"4":function(depth0,helpers,partials,data) {
    return "                <div class=\"skip\">Skip</div>\n";
},"6":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "        <div class=\"compaig-wrapper compaig-cta\">\n            <div class=\"cta\" style=\"background-color: "
    + alias3(((helper = (helper = helpers.buttonColor || (depth0 != null ? depth0.buttonColor : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"buttonColor","hash":{},"data":data}) : helper)))
    + "; left: "
    + alias3(((helper = (helper = helpers.left || (depth0 != null ? depth0.left : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"left","hash":{},"data":data}) : helper)))
    + "px; top: "
    + alias3(((helper = (helper = helpers.top || (depth0 != null ? depth0.top : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"top","hash":{},"data":data}) : helper)))
    + "px;\">\n                <a href=\""
    + alias3(((helper = (helper = helpers.targetUrl || (depth0 != null ? depth0.targetUrl : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"targetUrl","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" class=\"button\">"
    + alias3(((helper = (helper = helpers.buttonText || (depth0 != null ? depth0.buttonText : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"buttonText","hash":{},"data":data}) : helper)))
    + "</a>\n            </div>\n        </div>\n";
},"8":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "        <div class=\"compaig-wrapper compaig-annotation\">\n            <div class=\"annotation\" style=\"background-color: "
    + alias3(((helper = (helper = helpers.backgroundColor || (depth0 != null ? depth0.backgroundColor : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"backgroundColor","hash":{},"data":data}) : helper)))
    + "; left: "
    + alias3(((helper = (helper = helpers.left || (depth0 != null ? depth0.left : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"left","hash":{},"data":data}) : helper)))
    + "px; top: "
    + alias3(((helper = (helper = helpers.top || (depth0 != null ? depth0.top : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"top","hash":{},"data":data}) : helper)))
    + "px;\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.showCloseButton : depth0),{"name":"if","hash":{},"fn":this.program(9, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "                <a class=\"text\" href=\""
    + alias3(((helper = (helper = helpers.targetUrl || (depth0 != null ? depth0.targetUrl : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"targetUrl","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" style=\"color: "
    + alias3(((helper = (helper = helpers.textColor || (depth0 != null ? depth0.textColor : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"textColor","hash":{},"data":data}) : helper)))
    + "; font-size: "
    + alias3(((helper = (helper = helpers.textFontSize || (depth0 != null ? depth0.textFontSize : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"textFontSize","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"text","hash":{},"data":data}) : helper)))
    + "</a>\n            </div>\n        </div>\n";
},"9":function(depth0,helpers,partials,data) {
    return "                    <a href=\"#\" class=\"closeAnnotation\">&times;</a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"custom-roi\" data-start=\""
    + alias3(((helper = (helper = helpers.timeStart || (depth0 != null ? depth0.timeStart : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"timeStart","hash":{},"data":data}) : helper)))
    + "\" data-stop=\""
    + alias3(((helper = (helper = helpers.timeStop || (depth0 != null ? depth0.timeStop : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"timeStop","hash":{},"data":data}) : helper)))
    + "\" data-displayOnPause=\""
    + alias3(((helper = (helper = helpers.display || (depth0 != null ? depth0.display : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"display","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.typeIsLead : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.typeIsCta : depth0),{"name":"if","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.typeIsAnnotation : depth0),{"name":"if","hash":{},"fn":this.program(8, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});

this["VideoEssenceApp"]["templates"]["video-template"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return " gray";
},"3":function(depth0,helpers,partials,data) {
    var helper;

  return "            <iframe width=\"100%\" height=\"100%\" type=\"text/html\" src=\""
    + this.escapeExpression(((helper = (helper = helpers.embeded_url || (depth0 != null ? depth0.embeded_url : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"embeded_url","hash":{},"data":data}) : helper)))
    + "\" frameborder=\"0\"/>\n";
},"5":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "            <img src=\""
    + alias3(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"image","hash":{},"data":data}) : helper)))
    + "\" class=\"image-view\" />\n            <div class=\"duration-video\">\n                "
    + alias3(((helper = (helper = helpers.duration || (depth0 != null ? depth0.duration : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"duration","hash":{},"data":data}) : helper)))
    + "\n            </div>\n";
},"7":function(depth0,helpers,partials,data) {
    return "                <a class=\"fa fa-check\"></a>\n";
},"9":function(depth0,helpers,partials,data) {
    return "                <i class=\"fa fa-heart\"></i>\n";
},"11":function(depth0,helpers,partials,data) {
    return " showed ";
},"13":function(depth0,helpers,partials,data) {
    return " hidden ";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"video-container "
    + alias3(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"type","hash":{},"data":data}) : helper)))
    + " "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.saved : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n    <div class=\"thumbnail-wrapper\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.bigView : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n    <div class=\"video-description\">\n        <h3 class=\"lockup-title\">\n            <a href=\""
    + alias3(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n        </h3>\n\n        <div class=\"channel-link\">\n            From <a href=\""
    + alias3(((helper = (helper = helpers.channel_url || (depth0 != null ? depth0.channel_url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"channel_url","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + alias3(((helper = (helper = helpers.channel_title || (depth0 != null ? depth0.channel_title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"channel_title","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.channel_title || (depth0 != null ? depth0.channel_title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"channel_title","hash":{},"data":data}) : helper)))
    + "</a>\n        </div>\n        <div class=\"video-detail\">\n            "
    + alias3(((helper = (helper = helpers.view_count || (depth0 != null ? depth0.view_count : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"view_count","hash":{},"data":data}) : helper)))
    + " views <br> "
    + alias3((helpers.moment || (depth0 && depth0.moment) || alias1).call(depth0,{"name":"moment","hash":{"from":(depth0 != null ? depth0.published_at : depth0)},"data":data}))
    + "\n        </div>\n        <div class=\"button-like\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.followed : depth0),{"name":"if","hash":{},"fn":this.program(7, data, 0),"inverse":this.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "        </div>\n        <a class=\"fa fa-plus-circle\"></a>\n        <i class=\"fa fa-ellipsis-v\"></i>\n        <button type=\"button\" class=\"hide-video-block "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.showButtonVideoHide : depth0),{"name":"if","hash":{},"fn":this.program(11, data, 0),"inverse":this.program(13, data, 0),"data":data})) != null ? stack1 : "")
    + "\">Don’t show me this</button>\n    </div>\n</div>";
},"useData":true});

this["VideoEssenceApp"]["templates"]["videos-template"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "large";
},"3":function(depth0,helpers,partials,data) {
    return "hidden";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"video-list-controls\">\n    <button type=\"button\" class=\"btn btn-white btn-sm btn-primary do-big\">\n        <i class=\"icon-only ace-icon fa fa-align-justify\"></i>\n    </button>\n    <button type=\"button\" class=\"btn btn-white btn-sm btn-primary do-small\">\n        <i class=\"icon-only ace-icon fa fa-th-large\"></i>\n    </button>\n</div>\n<div class=\"list "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.bigView : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " row\"></div>\n<div class=\"text-center "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.gettingIsStop : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n    <img src=\"/preloader.gif\"/>\n</div>";
},"useData":true});;
var Channel = Backbone.Model.extend({
	defaults: {
	},
	initialize : function(){
		this.bind("change:followed", this.followChannel)
	},
	followChannel:function(){
		var url = !(this.get('followed'))?"/site/unfollow-channel":"/site/follow-channel";

		var jqxhr = $.ajax(url, {

			method: 'post',
			data: {
				id:this.get('id'),
				type:this.get('type'),
				subtype:this.get('subtype'),
				name:this.get('title')
			}
		})
	}
});
module.exports = Channel;;
var Facebook = Backbone.Model.extend({
	defaults: {
		author: "",
		author_id: "",
		author_url: "",
		published: "",
		url: "",
		content: "",
		saved: false
	}
});
module.exports = Facebook;;
var GooglePost = Backbone.Model.extend({
	defaults: {
		author: "",
		author_id: "",
		author_url: "",
		published: "",
		url: "",
		content: "",
		saved: false
	}
});
module.exports = GooglePost;;
var Image = Backbone.Model.extend({
	defaults: {
		"path": ""
	}
});
module.exports = Image;;
VideoEssenceApp.ImageSearch = Backbone.Model.extend({
	defaults: {
		"previewURL": "",
		"webformatURL": ""
	}
});;
var LinkPost = Backbone.Model.extend({
	defaults: {
		video_id: 1,
		type: "youtube",
		title: "this is title",
		description: "this is description"
	}
});
module.exports = LinkPost;;
var Post = Backbone.Model.extend({
    defaults: {
        id: null,
        title: '',
        content: '',
        videos: [],
        author: null,
        date: null,
        saved: false,
	    first_video_id:'',
	    first_video_type:''
    },
    validate: function() {
        // this.checkEmptyTitle();
        // this.checkEmptyLines();
    },
    export: function() {

    },
	save: function () {
		var self = this;
		var jqxhr = $.ajax('/post/save', {
			method: 'post',
			data: {
				id: this.get('id'),
				title: this.get('title'),
				content: this.get('content'),
				video_id: this.get('video_id'),
				video_type: this.get('video_type')
			},
			success: function (data) {
				if (data.status == 'success' && !_.isUndefined(data.data.id)) {
					var id = data.data.id;
					self.set({'id': id});
					window.location.href = "/post/publish/" + id;
				}
				console.log('post save')
			}
		})
	}
});
module.exports = Post;
;
var Channel = require('./Channel.js');
var SimilarKeyword = Channel.extend({
	defaults: {
		type: 'search',
		subtype: 'search'
	}
});
module.exports = SimilarKeyword;;
var Twitter = Backbone.Model.extend({
	defaults: {
		created_at: "",
		id: "",
		text: "",
		user: "",
        saved: false
	}
});
module.exports = Twitter;;
var VideoModel = Backbone.Model.extend({
	defaults: {
        saved: false,
        showButtonVideoHide:false
	},

	initialize : function(){
		this.set('saved', this.isVideoInPocket() );
        if(!_.isUndefined(VideoEssenceApp.FollowPanel)) {
            this.set('followed', VideoEssenceApp.FollowPanel.isHave(this.get('channel_id')));
        }
        this.bind("change:followed", this.followVideo);
	},
    followVideo:function(){
        var url = !(this.get('followed'))?"/site/unfollow-channel":"/site/follow-channel";

        var jqxhr = $.ajax(url, {

            method: 'post',
            data: {
                id:this.get('channel_id'),
                type:this.get('type'),
                subtype:this.get('channel_subtype'),
                name:this.get('channel_title')
            }

        })
    },
    hide:function(){
        var url = "/site/hide-video/?id="+ this.get('id')+'&type='+this.get('type');
        var jqxhr = $.ajax(url)
    },
    isVideoInPocket: function() {
        var videoModelsArr = JSON.parse(localStorage.getItem("pocketVideosCollection"));
        var resultVideos = _.where(videoModelsArr,{
            id:this.get('id')
        });
        return resultVideos.length;
    }
});
module.exports = VideoModel;;
VideoEssenceApp.VideoLead = Backbone.Model.extend({
	defaults: {
		'headline': 'Subscribe to get free access',
		'subheadline': 'We never spam your mailbox, you can unsubscribe from our channel at any time.',

		'buttonText': 'Subscribe',
		'buttonColor': '#FF3333',

		'backgroundColor': '#FF3333',
		'backgroundOpacity': 0.7,

		'allowSkip': true,
		'displayVideoIsPaused': false,
		'askNames': false,
		'timeStop': '0:00'
	}
});;
var VideoROI = Backbone.Model.extend({
    types: {
        'lead': {
            title: 'Lead capture form',
            img: 'http://res.cloudinary.com/diyo0e4ky/image/upload/v1415374378/VideoEssence/campaigns_06.png'
        },
        'annotation': {
            title: 'Annotation',
            img: 'http://res.cloudinary.com/diyo0e4ky/image/upload/v1415374378/VideoEssence/campaigns_08.png'
        },
        'cta': {
            title: 'CTA button',
            img: 'http://res.cloudinary.com/diyo0e4ky/image/upload/v1415374378/VideoEssence/campaigns_12.png'
        }
    },
    colors: ['#FF3333', '#FF6633', '#FFCC33', '#99CC00', '#3399FF', '#003399', '#6633FF', ],
    fontSizes: [12, 14, 16, 18, 20, 22, 24, 26],
    emailProviders: ['aweber', 'getresponse', 'mailchimp', 'constantcontact', 'icontact', 'htmlform'],
    defaults: {
        type: 'lead',
        headline: 'Add keyword',
        subHeadline: 'We never spam your mailbox, you can unsubscribe\n from our channel at any time.',
        buttonText: null,
        targetUrl: 'http://',
        text: null,
        textFontSizenull: 12,
        textColor: '#000000',
        buttonColor: '#FF3333',
        left: 2,
        top: 2,
        backgroundColor: '#3399FF',
        opacity: 70,
        emailServiceProvider: null,
        timeStart: 0,
        timeStop: 0,
        displayOnPause: false,
        askNames: false,
        allowSkip: true,
        showCloseButton: true
    },
    video: {
        length: 500,
        thumbnail: 'http://i.ytimg.com/vi/UKY3scPIMd8/hqdefault.jpg'
    },
    initialize: function(attributes, options) {
        _.extend(this.video, _.result(options, 'video', {}));
        this.defaults.timeStop = this.video.length;
    },
    validate: function() {
        console.log('validation');
        if (this.get('type') === 'lead') {
            this.set({timeStop: 0}, {silent: true});
        }
        return true;
    }
});
module.exports = VideoROI;;
var Backbone  =  require('backbone');
var Channel = require('../models/Channel.js');

var Channels = Backbone.Collection.extend({
	initialize: function (models, options) {
		options = options || {};
		this.category = options.category || '';
        this.youtubeNextPageToken = options.youtubeNextPageToken || '';
	},
	model: Channel,
    parse: function(response) {
        return response.channels;
    },
	url: function () {
		return '/site/category?type=json&name=' + this.category + '&youtubeNextPageToken=' + this.youtubeNextPageToken;
	}
});
module.exports = Channels;;
ChannelsSave = Backbone.Collection.extend({
	model: Channel
});
;
var Facebook = require('../models/Facebook.js');
var FacebookCollection = Backbone.Collection.extend({
	model: Facebook,
	url : '/post/search-facebook-posts'
});
module.exports = FacebookCollection;;
var Channel = require('../models/Channel.js');
var FollowedChannelCollection = Backbone.Collection.extend({
    model: Channel,
    channelProcess: function(isFollowed, data){
        var channel = new Channel();
        channel.set(data);

        if (isFollowed) {
            this.remove(channel);
        } else {
            this.add(channel);
        }
    }
});
module.exports = FollowedChannelCollection;
;
var GooglePost = require('../models/GooglePost.js');
var GooglePostCollection = Backbone.Collection.extend({
	model: GooglePost,
	url : '/post/search-google-posts'
});
module.exports = GooglePostCollection;;
var Image = require('../models/Image.js');
var ImagesGalley = Backbone.Collection.extend({
	model: Image
});
module.exports = ImagesGalley;
;
var LinkPost = require('../models/LinkPost.js');
var LinkPosts = Backbone.Collection.extend({
	initialize: function(models, options){
		try {
		}catch(err){}
	},
	model: LinkPost
});
module.exports = LinkPosts;;
var VideoModel = require('../models/Video.js');
var PocketVideosCollection = Backbone.Collection.extend({
    model: VideoModel
});
module.exports = PocketVideosCollection;
;
var SimilarKeyword = require('../models/SimilarKeyword.js');
var SimilarKeywords = Backbone.Collection.extend({
	model: SimilarKeyword
});
module.exports = SimilarKeywords;;
var Twitter = require('../models/Twitter.js');
var Twitters = Backbone.Collection.extend({
	model: Twitter,
	url: function () {
		return '/post/twitters';
	}
});
module.exports = Twitters;;
var VideoROI = require('../models/VideoROI.js');
var VideoROICollection = Backbone.Collection.extend({
	model: VideoROI
});
module.exports = VideoROICollection;;
var VideoModel = require('../models/Video.js');
var VideosCollection = Backbone.Collection.extend({
	initialize: function(models, options){
		try {
		//	options || (options = {});
			this.urlSearch = options.urlSearch || '';
			this.urlForChannelVideos = options.urlForChannelVideos || '';
			this.youtubeNextPageToken = options.youtubeNextPageToken || '';
		}catch(err){}
	},
	model: VideoModel,
    parse: function(response) {
        return response.videos;
    },
    channelVideos: function(channel_type, channel_id){
        this.urlSearch = this.urlForChannelVideos + '?channel_type=' + channel_type + '&channel_id=' + channel_id;
        this.youtubeNextPageToken = '';
        VideoEssenceApp.VideoExplore.videosView.resetOffset();
    },
	url:function(){
		if(this.urlSearch.indexOf('?') == -1){
			return this.urlSearch + '?youtubeNextPageToken=' + this.youtubeNextPageToken;
		}
		else {
			return this.urlSearch + '&youtubeNextPageToken=' + this.youtubeNextPageToken;
		}
	}
});
module.exports = VideosCollection;;
var Marionette = require('backbone.marionette');

var ChannelView = Marionette.ItemView.extend({
	className: "video-item-wrapper",
	template:  VideoEssenceApp.templates['row-category-template'],
	events: {
		'click .button-like .fa': 'clickedButton'
	},

	clickedButton: function() {
		var isSaved = this.model.get('followed');

		this.model.set('followed', !isSaved);
		this.render();
	}
});
module.exports = ChannelView;;
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var ChannelView = require('./ChannelView.js');

var ChannelsView = Marionette.CompositeView.extend({
    offset: 20,
    limit: 20,
    works: false,
    model: new Backbone.Model({
        gettingIsStop: false
    }),
	childView: ChannelView,
    template:  VideoEssenceApp.templates['category-template'],
    childViewContainer: '.list',
    getItems: function(){
        this.works = true;
        this.collection.fetch({
            remove: false,
            add: true,
            merge: false,
            data: {"offset": this.offset, "limit": this.limit},
            success: _.bind(function(model, response, options){
                if(response.channels.length>0)
                {
                    this.works = false;
                    this.offset += this.limit;
                    this.collection.youtubeNextPageToken = response.youtubeNextPageToken;
                }
                else
                {
                    this.stopGetting();
                }
            }, this),
            error: _.bind(function(){
                this.stopGetting();
            }, this)
        });
    },
    stopGetting: function(){
        this.works = true;
        this.model.set('gettingIsStop', true);
        this.render();
    }
});
module.exports = ChannelsView;
;
var Marionette = require('backbone.marionette');
var FacebookPostView = Marionette.ItemView.extend({
	tagName: "div",
	className: "videoessenceGooglePost",
	template: VideoEssenceApp.templates['facebook-template'],
	events: {
		'click .embed-btn': 'embed',
		'click .remove-btn': 'removeSelect'
	},
	embed: function(){
		this.model.set('saved', true);
		this.render();
	},
	removeSelect: function(){
		this.model.set('saved', false);
		this.render();
	},
	onRender: function () {
		VideoEssenceApp.on('tick', _.bind(this.tick, this));
	},
	tick: function () {
		this.$el.find('.time-ago').html(moment(this.model.get('published')).fromNow());
	}
});
module.exports = FacebookPostView;;
var Marionette = require('backbone.marionette');
var FacebookPostView = require('./FacebookPostView.js');
var FacebookPostsView = Marionette.CollectionView.extend({
	className: 'image-search-result-inner',
	childView: FacebookPostView
});
module.exports = FacebookPostsView;;
var SocialSearchModal = require('./SocialSearchModal.js');

var FacebookSearchModal = SocialSearchModal.extend({
	afterSearch: function (key) {
		var FacebookCollection = require('./../collections/Facebooks.js');
		this.collection = new FacebookCollection();
		this.collection.fetch({
			data: {"keyword": key}
		});

		var FacebookPostsView = require('./FacebookPostsView.js');
		this.resultsRegion.show(new FacebookPostsView({
			collection: this.collection
		}));
		this.model.set('count_select',this.collection.length);
		this.listenTo(this.collection, 'change:saved',this.setCount);
	},
	insertSelectedItems: function () {
		if(!_.isUndefined(this.collection) && !!this.collection.length) {
			var selectedPosts = this.collection.where({saved: true});
			var html = '';
			for (var i in selectedPosts) {
				html += new TwitterView({
						model: selectedPosts[i],
						template: VideoEssenceApp.templates['facebook-editor-template']
					}
				).render().$el.html();
			}
			VideoEssenceApp.PostCreate.editor.btnFаcebook.insertHtml(html);
		}
	},
	setCount: function() {
		this.model.set('count_select',this.collection.where({saved: true}).length);
		this.$el.find('.modal-social-header span').html(this.model.get('embedded_title') + ' - ' + this.model.get('count_select'));
	}
});
module.exports = FacebookSearchModal;
;
var Marionette = require('backbone.marionette');
var FollowSearchChannel = Marionette.ItemView.extend({
	template: VideoEssenceApp.templates['followed-video-template'],
	events: {
		'click .url': 'showChannelVideos'
	},
	showChannelVideos: function(){
		VideoEssenceApp.VideoExplore.videosCollection.channelVideos(this.model.get('type'), this.model.get('id'));
		VideoEssenceApp.VideoExplore.videosView.getItems();
		return false;
	}
});
module.exports = FollowSearchChannel;
;
var Marionette = require('backbone.marionette');
var FollowSearchChannel = require('./FollowSearchChannel.js');
FollowSearchChannels = Marionette.CollectionView.extend({
	childView: FollowSearchChannel
});
;
var Marionette = require('backbone.marionette');
var FollowVideoView = Marionette.ItemView.extend({
	template:  VideoEssenceApp.templates['followed-video-template'],
	events: {
		'click .url': 'showChannelVideos'
	},
	showChannelVideos: function(){
		VideoEssenceApp.VideoExplore.videosCollection.channelVideos(this.model.get('type'), this.model.get('id'));
		VideoEssenceApp.VideoExplore.videosView.getItems();
		return false;
	}
});
module.exports = FollowVideoView;;
var Marionette = require('backbone.marionette');
var FollowVideoView = require('./FollowVideoView.js');
var FollowVideosView = Marionette.CollectionView.extend({
	childView: FollowVideoView
});
module.exports = FollowVideosView;
;
FollowerSearch = Backbone.Marionette.ItemView.extend({
	el : '.search-follower-wrap',
	template: VideoEssenceApp.templates['follower-search-template'],
	model: new Channel({
	}),
	events : {
		'click .search-follower' : 'addOrRemoveFollow'
	},
	initialize: function() {
		this.model.set('followed', false);
	},
	setQuery: function(query, collection){
		this.model.set('query', query);
		this.model.set('title', query);
		this.model.set('id', query);
		this.model.set('url', '/site/videosearch?textToSearch=' + query);
		this.model.set('type', 'search');
		this.model.set('subtype', 'search');
		this.model.set('followed', VideoEssenceApp.FollowPanel.exist(query));
	},
	addOrRemoveFollow : function(){
		var followed = this.model.get('followed');
		var query = this.model.get('query');
		if(followed){
			VideoEssenceApp.FollowPanel.remove(this.model.get('query'));
			this.model.set('followed', false);
		}
		else {
			VideoEssenceApp.FollowPanel.add(this.model);
			this.model.set('followed', true);
		}

		this.render();
	}
});
;
var Marionette = require('backbone.marionette');
var GooglePostView = Marionette.ItemView.extend({
	template: VideoEssenceApp.templates['post-google'],
	events: {
		'click .embed-btn': 'embed',
		'click .remove-btn': 'removeSelect'
	},
	embed: function(){
		this.model.set('saved', true);
		this.render();
	},
	removeSelect: function(){
		this.model.set('saved', false);
		this.render();
	},
	onRender: function () {
		VideoEssenceApp.on('tick', _.bind(this.tick, this));
	},
	tick: function () {
		this.$el.find('.time-ago').html(moment(this.model.get('published')).fromNow());
	}
});
module.exports = GooglePostView;;
var Marionette = require('backbone.marionette');
var GooglePostView= require('./GooglePostView.js');
var GooglePostsView = Marionette.CollectionView.extend({
	className: 'image-search-result-inner',
	childView: GooglePostView
});
module.exports = GooglePostsView;;
var SocialSearchModal = require('./SocialSearchModal.js');
var GooglePostCollection =  require('../collections/GooglePosts.js');
var GoogleSearchModal = SocialSearchModal.extend({
	afterSearch: function (key) {
		this.collection = new GooglePostCollection();
		this.collection.fetch({
			data: {"keyword": key}
		});
		var GooglePostsView = require('./GooglePostsView.js');
		var collectionView = new GooglePostsView({
			collection: this.collection
		});
		this.resultsRegion.show(collectionView);
		this.model.set('count_select',this.collection.length);
		this.listenTo(this.collection, 'change:saved',this.setCount);
	},
	insertSelectedItems: function () {
		var GooglePostsView = require('./GooglePostsView.js');
		var GooglePostView = require('./GooglePostView.js');
		if(!_.isUndefined(this.collection) && !!this.collection.length) {
			var selectedPosts = this.collection.where({saved: true});
			var html = '';
			for(var i in selectedPosts) {
				html += new GooglePostView ({
						model: selectedPosts[i],
						template: VideoEssenceApp.templates['post-editor-google']
					}
				).render().$el.html();
			}
			VideoEssenceApp.PostCreate.editor.btnGoogleP.insertHtml(html);
		}
	},
	setCount: function() {
		this.model.set('count_select',this.collection.where({saved: true}).length);
		this.$el.find('.modal-social-header span').html(this.model.get('embedded_title') + ' - ' + this.model.get('count_select'));
	}
});
module.exports = GoogleSearchModal;;
VideoEssenceApp.ImageSearcheView = Backbone.Marionette.ItemView.extend({
	tagName: "div",
	className: "image-search-item",
	template: VideoEssenceApp.templates['image-search-template'],

	events: {
		'click img': 'selectImage'
	},
	initialize: function () {

	},
	selectImage: function () {
		var self = this;
		VideoEssenceApp.MediaManager.modalView.showLoaderSearch();
		var jqxhr = $.ajax("/post/save-image?url=" + encodeURIComponent(this.model.get('webformatURL')))
			.done(function (data) {
				if(data.status !== 'error'){
					self.saveImage(data.data.path);
				}
			});
	},
	saveImage: function (bigUrl) {
		VideoEssenceApp.PostCreate.editor.btnImage.insertImage(bigUrl);
		VideoEssenceApp.MediaManager.imagesGalleyCollection.push({path: bigUrl});
		VideoEssenceApp.MediaManager.hide();
	}
});
;
VideoEssenceApp.ImageSearchesView = Backbone.Marionette.CollectionView.extend({
	className: 'image-search-result-inner',
	childView: VideoEssenceApp.ImageSearcheView
});
;
var Marionette = require('backbone.marionette');
var ImageView = Marionette.ItemView.extend({
	tagName: "div",
	className: "image-gallery-item",
	template: VideoEssenceApp.templates['image-template'],

	events: {
		'click img': 'selectImage',
		'click .close-button': 'deleteItem'
	},
	initialize: function () {

	},
	selectImage: function () {
		VideoEssenceApp.PostCreate.editor.btnImage.insertImage(this.model.get('path'));
		VideoEssenceApp.MediaManager.hide();
	},
	deleteItem: function () {
		this.model.destroy({url: "/image/delete/" + this.model.get('id')});
	}
});
module.exports = ImageView;;
var Marionette = require('backbone.marionette');
var ImageView = require('./ImageView.js');
var ImagesView = Marionette.CollectionView.extend({
	tagName: "div",
	className: "image-gallery-wrapper",
	childView: ImageView
});
module.exports = ImagesView;
;
var Marionette = require('backbone.marionette');
var LinkPostView = Marionette.ItemView.extend({
	model: new Backbone.Model({
		linked: false,
		escape: false
	}),
	template:   VideoEssenceApp.templates['related-post'],
	events: {
		'click .post-link': 'addLink'
	},
	addLink:function(){
		if (VideoEssenceApp.PostPublish.linkPostsCollection.where({linked: true}).length < 5)
		{
			this.model.set('linked', !this.model.get('linked'));
			this.render();
			VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);
		}
	}
});
module.exports = LinkPostView;;
var Marionette = require('backbone.marionette');
var LinkPostView = require('./LinkPostView.js');
var LinkPostsView = Marionette.CollectionView.extend({
	childView: LinkPostView
});
module.exports = LinkPostsView;;
var LinkPostView = require('./LinkPostView.js');
var LinkRelatedPostView = LinkPostView.extend({
	addLink:function(){
		this.model.set('linked', !this.model.get('linked'));
		this.render();
		VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);

		hasPost = VideoEssenceApp.PostPublish.currentPostRelation.where({id:this.model.get('id')});
		if(hasPost.length>0){
			VideoEssenceApp.linkPostsView.collection.remove(this.model);
		} else {
			VideoEssenceApp.linkPostsView.collection.add(this.model);
		}
	}
});
module.exports = LinkRelatedPostView;;
var Marionette = require('backbone.marionette');
var LinkRelatedPostView = require('./LinkRelatedPostView.js');
var LinkRelatedPostsView = Marionette.CollectionView.extend({
	childView: LinkRelatedPostView
});
module.exports = LinkRelatedPostsView;;
require('backbone.modal');
var Backbone = require('backbone');

var ModalHandelbars = Backbone.Modal.extend({
	buildTemplate: function (template, data) {
		var templateFunction;
		if (typeof template === 'function') {
			templateFunction = template;
		} else {
			templateFunction = Handlebars.compile(Backbone.$(template).html());
		}
		return templateFunction(data);
	},
	checkKey: function (e) {
		if (this.active) {
			switch (e.keyCode) {
				case 27:
					return this.triggerCancel(e);
			}
		}
	},
	render: function (options) {
		if (typeof this.beforeRender === "function") {
			this.beforeRender();
		}
		ModalHandelbars.__super__.render.apply(this, arguments);
		return this;
	}
});
module.exports = ModalHandelbars;
;
var Marionette = require('backbone.marionette');
var ModalHandelbars = require('./ModalHandlebars.js');
var ModalMediaManager = ModalHandelbars.extend({
	prefix: 'bim',
	template:  VideoEssenceApp.templates['modal-media-manager-template'],
	cancelEl: '.bbm-button',
	events: {
		'click .tab-upload': 'showDropZone',
		'click .tab-library': 'showImageLibrary',
		'click .tab-search': 'showSearch',
		'click .tab-url': 'showUrl',
		'keyup .search-url': 'searchImages',
		'keyup .insert-url': 'insertImages'
	},
	onRender: function()
	{
		this.initDropZone();
		this.$el.find('.tab-upload').addClass('selected');

		this.rerenderGallery();
	},
	hideAllBeforeSelect: function () {
		this.$el.find('.ve-tab').removeClass('selected');
		this.$el.find('.dropzone-wrapper').hide();
		this.$el.find('.image-library-wrapper').hide();
		this.$el.find('.image-search-wrapper').hide();
		this.$el.find('.image-url-wrapper').hide();
	},
	showImageLibrary: function() {
		this.hideAllBeforeSelect();

		this.$el.find('.tab-library').addClass('selected');
		this.$el.find('.image-library-wrapper').show();
	},
	showDropZone: function() {
		this.dropzone.removeAllFiles();

		this.hideAllBeforeSelect();
		this.$el.find('.tab-upload').addClass('selected');
		this.$el.find('.dropzone-wrapper').show();
	},
	showSearch: function() {
		this.hideAllBeforeSelect();

		this.$el.find('.tab-search').addClass('selected');
		this.$el.find('.image-search-wrapper').show();
	},
	showUrl: function() {
		this.hideAllBeforeSelect();

		this.$el.find('.tab-url').addClass('selected');
		this.$el.find('.image-url-wrapper').show();
	},
	rerenderGallery: function () {
		var ImagesView = require('./ImagesView.js');
		this.videoEssenceApp = new ImagesView({
			collection: VideoEssenceApp.MediaManager.imagesGalleyCollection
		});
		this.imagesRegion = new Marionette.Region({
			el: this.$el.find(".image-library-wrapper")
		});
		this.imagesRegion.show(this.videoEssenceApp);
	},
	initDropZone: function () {
		var self = this;
		var Dropzone = require('dropzone');
		new Dropzone(this.$el.find('.dropzone')[0], {
			url: "/post/upload",
			maxFiles: 1,
			maxFilesize: 2,
			init: function() {
				self.dropzone = this;
			},
			accept: function(file, done) {
				if (file.name == "justinbieber.jpg") {
					done("Naha, you don't.");
				}
				else { done(); }
			},
			processFile : function(a) {
				console.log(a);
			},
			success: function(file,response){
				if(response.status == "success") {
					VideoEssenceApp.MediaManager.imagesGalleyCollection.add(response.data);
					self.rerenderGallery();
					self.showImageLibrary();
				}

			}
		});
	},
	searchImages:  function (event) {
		var self = this;
		var ImagesCollection = Backbone.Collection.extend({
			model: VideoEssenceApp.ImageSearch
		});
		var imagesCollection = new ImagesCollection();

		if(event.keyCode == 13){
			var jqxhr = $.ajax("/post/search-images-from-key?key=" + encodeURIComponent(this.$el.find('.search-url').val()))
				.done(function (data) {
					if (data.status === "success") {
						if(_.isArray(data.data) && data.data.length > 0){
							for (var i in data.data) {
								var image = data.data[i];
								imagesCollection.push(
									new VideoEssenceApp.ImageSearch({
										"previewURL": image.previewURL,
										"webformatURL": image.webformatURL
									})
								)
							}
							self.fillSearchResults(imagesCollection);
						} else {
							self.$el.find(".image-search-result").text('No results');
						}

					}
				});
		}
	},
	fillSearchResults: function(imagesCollection) {
		var imageSearchesView = new VideoEssenceApp.ImageSearchesView({
			collection: imagesCollection
		});
		var imageSearcheRegion = new Marionette.Region({
			el: this.$el.find(".image-search-result")
		});
		imageSearcheRegion.show(imageSearchesView);
	},
	insertImages: function (event) {
		var self = this;
		if(event.keyCode == 13){
			var jqxhr = $.ajax("/post/save-image?url=" + encodeURIComponent(this.$el.find('.insert-url').val()))
				.done(function (data) {
					if(data.status !== 'error'){
						self.saveImage(data.data.path);
					}
				});
		}
	},
	saveImage: function (bigUrl) {
		VideoEssenceApp.PostCreate.editor.btnImage.insertImage(bigUrl);
		VideoEssenceApp.MediaManager.imagesGalleyCollection.push({path: bigUrl});
		VideoEssenceApp.MediaManager.hide();
	},
	showLoaderSearch: function () {
		this.$el.find('.image-search-result').prepend(
			'<div class="loader"><div class="loader-inner ball-spin-fade-loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>'
		);
	}
});
module.exports = ModalMediaManager;
;
var ModalHandelbars = require('./ModalHandlebars.js');
VideoEssenceApp.ModalTwitterManager = VideoEssenceApp.ModalHandelbars.extend({
	prefix: 'bim',
	template:  VideoEssenceApp.templates['modal-twitter-manager-template'],
	cancelEl: '.bbm-button',
	events: {
		'click .tab-upload': 'showDropZone',
		'click .tab-library': 'showImageLibrary',
		'click .tab-search': 'showSearch',
		'click .tab-url': 'showUrl',
		'keyup .search-url': 'searchImages',
		'keyup .insert-url': 'insertImages'
	},
	onRender: function()
	{
		this.initDropZone();
		this.$el.find('.tab-upload').addClass('selected');

		this.rerenderGallery();
	},
	hideAllBeforeSelect: function () {
		this.$el.find('.ve-tab').removeClass('selected');
		this.$el.find('.dropzone-wrapper').hide();
		this.$el.find('.image-library-wrapper').hide();
		this.$el.find('.image-search-wrapper').hide();
		this.$el.find('.image-url-wrapper').hide();
	},
	showImageLibrary: function() {
		this.hideAllBeforeSelect();

		this.$el.find('.tab-library').addClass('selected');
		this.$el.find('.image-library-wrapper').show();
	},
	showDropZone: function() {
		this.dropzone.removeAllFiles();

		this.hideAllBeforeSelect();
		this.$el.find('.tab-upload').addClass('selected');
		this.$el.find('.dropzone-wrapper').show();
	},
	showSearch: function() {
		this.hideAllBeforeSelect();

		this.$el.find('.tab-search').addClass('selected');
		this.$el.find('.image-search-wrapper').show();
	},
	showUrl: function() {
		this.hideAllBeforeSelect();

		this.$el.find('.tab-url').addClass('selected');
		this.$el.find('.image-url-wrapper').show();
	},
	rerenderGallery: function () {
		this.videoEssenceApp = new VideoEssenceApp.ImagesPocketView({
			collection: VideoEssenceApp.MediaManager.imagesGalleyCollection
		});
		this.imagesRegion = new Backbone.Marionette.Region({
			el: this.$el.find(".image-library-wrapper")
		});
		this.imagesRegion.show(this.videoEssenceApp);
	},
	initDropZone: function () {
		var self = this;
		this.$el.find('.dropzone').dropzone({
			url: "/post/upload",
			maxFiles: 1,
			maxFilesize: 2,
			init: function() {
				self.dropzone = this;
			},
			accept: function(file, done) {
				if (file.name == "justinbieber.jpg") {
					done("Naha, you don't.");
				}
				else { done(); }
			},
			processFile : function(a) {
				console.log(a);
			},
			success: function(file,response){
				if(response.status == "success") {
					VideoEssenceApp.MediaManager.imagesGalleyCollection.add(response.data);
					self.rerenderGallery();
					self.showImageLibrary();
				}

			}
		});
	},
	searchImages:  function (event) {
		var self = this;
		var ImagesCollection = Backbone.Collection.extend({
			model: VideoEssenceApp.ImageSearch
		});
		var imagesCollection = new ImagesCollection();

		if(event.keyCode == 13){
			var jqxhr = $.ajax("/post/search-images-from-key?key=" + encodeURIComponent(this.$el.find('.search-url').val()))
				.done(function (data) {
					if (data.status === "success") {
						if(_.isArray(data.data) && data.data.length > 0){
							for (var i in data.data) {
								var image = data.data[i];
								imagesCollection.push(
									new VideoEssenceApp.ImageSearch({
										"previewURL": image.previewURL,
										"webformatURL": image.webformatURL
									})
								)
							}
							self.fillSearchResults(imagesCollection);
						} else {
							self.$el.find(".image-search-result").text('No results');
						}

					}
				});
		}
	},
	fillSearchResults: function(imagesCollection) {
		var imageSearchesView = new VideoEssenceApp.ImageSearchesView({
			collection: imagesCollection
		});
		var imageSearcheRegion = new Marionette.Region({
			el: this.$el.find(".image-search-result")
		});
		imageSearcheRegion.show(imageSearchesView);
	},
	insertImages: function (event) {
		var self = this;
		if(event.keyCode == 13){
			var jqxhr = $.ajax("/post/save-image?url=" + encodeURIComponent(this.$el.find('.insert-url').val()))
				.done(function (data) {
					if(data.status !== 'error'){
						self.saveImage(data.data.path);
					}
				});
		}
	},
	saveImage: function (bigUrl) {
		VideoEssenceApp.PostCreate.editor.btnImage.insertImage(bigUrl);
		VideoEssenceApp.MediaManager.imagesGalleyCollection.push({path: bigUrl});
		VideoEssenceApp.MediaManager.hide();
	}
});
;
var Backbone = require('backbone');
var _ = require('underscore');
require('backbone.stickit');
require('jquery-ui');
require('jquery-colpick');

Backbone.Stickit.addHandler([{
    selector: '.sliderWidget',
    initialize: function($el, model, options) {
        var params = options.params || {};
        var onSlide = function(event, ui) {
            model.set(options.observe, ui.value);
        }
        params.value = model.get(options.observe);
        params.slide = onSlide;
        $el.slider(params);
        options.initialized = true;
    },
    update: function($el, val, model, options) {
        if (options.initialized) $el.slider('value', val);
    }
}, {
    selector: '.draggable',
    initialize: function($el, model, options) {
        var params = options.params || {};
        var onStop = function(event, ui) {
            model.set(ui.position);
        }
        params.containment = "parent";
        params.stop = onStop;
        $el.draggable(params);
    },
    update: function($el, val, model, options) {
        $el.css({
            'background-color': val[0],
            left: val[1],
            top: val[2]
        });
    }
}, {
    selector: '.colorSelector',
    initialize: function($el, model, options) {
        var val = model.get(options.observe);
        var applyColor = function(color) {
            $el.find('.no-color-holder').text(color);
            $el.find('.color-holder i').css({background: color});
            $el.find('input').val(color);
        }
        var params = _.extend(options.params || {}, {
            layout: 'hex',
            submit: false,
            color: '000000',
            showEvent: '',
            onChange: function(hsl, hex, rgb) {
                var color = '#' + hex.toUpperCase();
                applyColor(color);
                model.set(options.observe, color);
            }
        });
        applyColor('#' + params.color)
        if (options.single || !_.include(model.colors, val)) {
            params.color = val.slice(1,7);
        }
        if (val.slice(1,7) == params.color) {
            $el.find('input').trigger('click');
        }
        $el.colpick(params);
        $el.on('click', '.color-picking', function(){
            $el.colpickShow();
        });
        options.initialized = true;
    },
    update: function($el, val, model, options) {
        if (options.initialized) {
            if (options.single || !_.include(model.colors, val)) {
                $el.colpickSetColor(val.slice(1,7), false);
            }
        }
    }
}]);

var Marionette = require('backbone.marionette');

var ModalVideoCustom = Marionette.ItemView.extend({
    templateHelpers: function () {
        return {
            colors:         this.model.colors,
            fontSizes:      this.model.fontSizes,
            emailProviders: this.model.emailProviders,
            thumbnail:      this.model.video.thumbnail,
        }
    },
    events: {
        'click .color-picking': 'changeColor',
        'click .closeAnnotation': function(event) {
            event.preventDefault();
        },
    },
    bindings: {
        '#displayOnPause': 'displayOnPause',
        '#showCloseButton': 'showCloseButton',
        '#allowSkip': 'allowSkip',
        '#askNames': 'askNames',
        '#text': 'text',
        '#headline': 'headline',
        '#subHeadline': 'subHeadline',
        '#buttonText': 'buttonText',
        '#targetUrl': 'targetUrl',
        '#emailServiceProvider': 'emailServiceProvider',
        '#textFontSize': 'textFontSize',
        '#textColor .color-pick': 'textColor',
        '#textColor .colorSelector': {
            observe: 'textColor',
            single: true,
        },
        '#buttonColor .color-pick': 'buttonColor',
        '#buttonColor .colorSelector': 'buttonColor',
        '#backgroundColor .color-pick': 'backgroundColor',
        '#backgroundColor .colorSelector': 'backgroundColor',
        '#opacity': 'opacity',
        '#opacitySlider': {
            observe: 'opacity',
            params: {max: 100}
        },
        '#timeStart': {
            observe: 'timeStart',
            onGet: 'formatTime',
            onSet: 'parseTime'
        },
        '#timeStop': {
            observe: 'timeStop',
            onGet: 'formatTime',
            onSet: 'parseTime'
        },
        '#previewCta .cta': {
            observe: ['buttonColor', 'left', 'top'],
        },
        '#previewCta .button': {
            observe: 'buttonText',
            updateModel: false,
        },
        '#previewAnnotation .annotation': {
            observe: ['backgroundColor', 'left', 'top']
        },
        '#previewAnnotation .text': {
            observe: 'text',
            updateModel: false,
            attributes: [{
                name: 'style',
                observe: ['textColor', 'textFontSize'],
                updateModel: false,
                onGet: function(values, options) {
                    return [
                        'color:'+values[0],
                        'font-size:'+values[1]+'px'
                    ].join(';');
                }
            }]
        },
        '#previewAnnotation .closeAnnotation': {
            observe: 'showCloseButton',
            updateModel: false,
            visible: function(val) {
                return val == true;
            }
        },
        '#previewLead .background': {
            updateModel: false,
            attributes: [{
                name: 'style',
                observe: ['backgroundColor', 'opacity'],
                updateModel: false,
                onGet: function(values, options) {
                    return [
                        'background-color:'+values[0],
                        'opacity:'+(values[1]/100)
                    ].join(';');
                }
            }]
        },
        '#previewLead .headline': {
            observe: 'headline',
            updateModel: false
        },
        '#previewLead .subheadline': {
            observe: 'subHeadline',
            updateModel: false
        },
        '#previewLead .form': {
            classes: {
                'with-name': 'askNames',
            }
        },
        '#previewLead .skip': {
            observe: 'allowSkip',
            updateModel: false,
            visible: function(val) {
                return val == true;
            }
        },
        '#previewLead .button': {
            observe: 'buttonText',
            updateModel: false,
            attributes: [{
                name: 'style',
                observe: ['buttonColor'],
                updateModel: false,
                onGet: function(values, options) {
                    return [
                        'background-color:'+values[0]
                    ].join(';');
                }
            }]
        },
    },
    onRender: function() {
        this.addBinding(null, '#timeStartSlider', {
            observe: 'timeStart',
            params: {max: this.model.video.length}
        });
        this.addBinding(null, '#timeStopSlider', {
            observe: 'timeStop',
            params: {max: this.model.video.length}
        });
        this.stickit();
    },
    onDestroy: function() {
        this.unstickit();
    },
    changeColor: function(event) {
        $(event.currentTarget).prev(':radio').trigger('click');
    },
    parseTime: function(time) {
        var match = /^(\d+)(:(\d{0,}))?$/.exec(time);
        var min = match && match[1]|0 || 0,
            sec = match && match[2]|0 || 0;
        return min * 60 + sec;
    },
    formatTime: function(seconds) {
        var min = ~~(seconds/60),
            sec = seconds % 60;
        return min + ':' + ("00" + sec).slice(-2);
    }
});

module.exports = ModalVideoCustom;
;
var ModalVideoCustom = require('./ModalVideoCustom.js');

var ModalVideoCustomAnnotation = ModalVideoCustom.extend({
    template:  VideoEssenceApp.templates['modal-video-custom-annotation']
});

module.exports = ModalVideoCustomAnnotation;
;
var ModalVideoCustom = require('./ModalVideoCustom.js');

var ModalVideoCustomCta = ModalVideoCustom.extend({
    template:  VideoEssenceApp.templates['modal-video-custom-cta']
});

module.exports = ModalVideoCustomCta;
;
var ModalVideoCustom = require('./ModalVideoCustom.js');

var ModalVideoCustomLead = ModalVideoCustom.extend({
    template:  VideoEssenceApp.templates['modal-video-custom-lead']
});

module.exports = ModalVideoCustomLead;
;
require('backbone.stickit');

var ModalHandelbars = require('./ModalHandlebars.js');

var ModalVideoCustomLead = require('./ModalVideoCustomLead.js');
var ModalVideoCustomAnnotation = require('./ModalVideoCustomAnnotation.js');
var ModalVideoCustomCta = require('./ModalVideoCustomCta.js');

var ModalVideoCustomSelect = ModalHandelbars.extend({
    prefix: 'vcm',
    template: VideoEssenceApp.templates['modal-video-custom'],
    viewContainer: '.my-container',
    cancelEl: '.close',
    submitEl: '#addCompaign',
    views: {
        'select': {
            name: 'select',
            view: VideoEssenceApp.templates['modal-video-custom-select'],
        },
        'lead': {
            name: 'lead',
            view: ModalVideoCustomLead,
        },
        'annotation': {
            name: 'annotation',
            view: ModalVideoCustomAnnotation,
        },
        'cta': {
            name: 'cta',
            view: ModalVideoCustomCta,
        }
    },
    events: {
        'click #customize': 'startCampaign',
    },
    bindings: {
        '.tab_radio': 'type',
    },
    setActive: function(options) {
        console.log('set active', options, this)
    },
    onRender: function() {
        this.stickit();
        this.listenTo(this.model, 'change:type', this.changeCampaign);
        this.changeCampaign();
    },
    onDestroy: function() {
        this.unstickit();
        this.stopListening();
    },
    startCampaign: function() {
        this.openAt({name: this.model.get('type')});
    },
    changeCampaign: function() {
        var type = this.model.get('type');
        this.$el.find('.campaign-preview.active').removeClass('active');
        this.$el.find('.campaign-preview#'+type).addClass('active');
    },
    beforeSubmit: function() {
        return this.model.validate()
    },
    submit: function() {
        console.log('submit');
        this.trigger('video:custom:apply', this.model);
    }
});
module.exports = ModalVideoCustomSelect;
;
var Marionette = require('backbone.marionette');
var VideoPocketView = require('./VideoPocketView.js');

var PocketView = Marionette.CompositeView.extend({
	el: '.pocket',
	template: VideoEssenceApp.templates['pocket'],
	childView: VideoPocketView,
	childViewContainer: ".pocket-wrapper",
	events: {
		'click .maximize': 'maximize',
		'click .minimize': 'minimize'
	},
	collectionEvents: {
		"add": "collectionChange",
		"remove": "collectionChange"
	},
	modelEvents: {
		"change:isMinification": "minificationChange"
	},
	initialize: function () {
		var self = this;
		VideoEssenceApp.vent.on("pocket:videoRemove", function (model) {
			self.removeItemFromLocalStorage(model);
			self.collection.remove(model);
		});
		VideoEssenceApp.vent.on("pocket:videoAdd", function (model) {
			self.addItemFromLocalStorage(model);
		});
	},
	minificationChange: function() {
		if(this.model.get('isMinification')) {
			this.$el.find('.pocket-wrapper').animate({ height: '0' }, 600, 'easeOutBounce');
			this.$el.find('.minimize').removeClass('minimize').addClass('maximize');

		} else {
			this.$el.find('.pocket-wrapper').animate({ height: '308px' }, 600, 'easeOutBounce');
			this.$el.find('.maximize').removeClass('maximize').addClass('minimize');
		}

	},
	collectionChange: function () {
		this.model.set({countVideo: this.collection.length});
		this.$el.find('.header-title').html(this.collection.length + ' videos in Pocket');
		var pocketInner = this.$el.find('.pocket-inner');
		if(this.collection.length) {
			pocketInner.show();
		} else {
			pocketInner.hide();
		}
	},
	maximize: function () {
		var isMinification = false;
		localStorage.setItem('pocketVideosMinification', isMinification);
		this.model.set({isMinification: isMinification});
	},
	minimize: function () {
		var isMinification = true;
		localStorage.setItem('pocketVideosMinification', isMinification);
		this.model.set({isMinification: isMinification});
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	},
	removeItemFromLocalStorage: function (model) {
		var videoModelsArr = JSON.parse(localStorage.getItem("pocketVideosCollection"));

		var newVideoModels = [];
		_.each(videoModelsArr, function (videoInLS) {
			if (videoInLS.id != model.get('id')) {
				newVideoModels.push(videoInLS);
			}
		});
		localStorage.setItem("pocketVideosCollection", JSON.stringify(newVideoModels));
	},
	addItemFromLocalStorage: function (model) {
		console.log('addItemFromLocalStorage');
		this.collection.unshift(model.clone());
		localStorage.setItem("pocketVideosCollection", JSON.stringify(this.collection.toJSON()));
	}
});
module.exports = PocketView;;
var Marionette = require('backbone.marionette');
var PostEditorView = Marionette.ItemView.extend({
    tagName: "form",
    template: VideoEssenceApp.templates['post-editor'],

    events: {
        'click #post-submit': 'savePost',
        'click .close-button': 'closeTweet',
        'mouseenter .is-ve-video.done': 'showCustomizeButton',
        'mouseleave .is-ve-video.done': 'hideCustomizeButton',
        'click .is-ve-video-b': 'clickCustomButton'
    },

    editor: null,
    videoInPost: {},

    initialize: function() {
	    var ImageTooltip = require('../../js/danteImageTooltip.js');
        this.btnImage = new ImageTooltip();

	    var VideoTooltip = require('../../js/danteVideoTooltip.js');
        this.btnVideo = new VideoTooltip({
            afterPaste: this.afterPasteVideo.bind(this)
        });

	    var FacebookTooltip = require('../../js/danteFacebookTooltip.js');
        this.btnFаcebook = new FacebookTooltip();

	    var GooglePTooltip = require('../../js/danteGooglePTooltip.js');
        this.btnGoogleP = new GooglePTooltip();

	    var TwitterTooltip = require('../../js/danteTwitterTooltip.js');
        this.btnTwitter = new TwitterTooltip;
	    this.listenTo(this, 'video:custom:update', this.updateVideo);
    },
    onShow: function() {
        var self = this;
        this.editor = new Dante.Editor({
            el: this.$el.find('#editor'),
            debugMode: true,
            upload_url: "/images.json",
            extra_tooltip_widgets: [this.btnVideo, this.btnImage, this.btnFаcebook, this.btnGoogleP, this.btnTwitter],
            base_widgets: ["embed_extract"],
            disable_title: true,
            afterInit: function() {
                self.initContent();
                self.initVideo();
                self.initEditVideo();
            }
        });
        this.btnImage.current_editor = this.editor;
        this.btnVideo.current_editor = this.editor;
        this.btnFаcebook.current_editor = this.editor;
        this.btnGoogleP.current_editor = this.editor;
        this.btnTwitter.current_editor = this.editor;
        this.editor.start();

        this.$el.find('#editor').on('click','.close-button',function() {
            $(this).parent().remove();
            return false;
        });
    },
    initVideo: function() {
        var videos = this.model.get('videos');
        for (index in videos) {
            if (videos.hasOwnProperty(index) && videos[index]['id']) {
                this.pasteVideo(videos[index]);
            }
        }
    },
    initEditVideo: function() {
        var self = this;
        this.editor.$el.find('.video-with-custom').each(function(){
            var video = $(this).data('video');
            self.btnVideo.pasteVideo(video, $(this).parent());
        });
    },
    initContent: function () {
        if(this.model.get('title')) {
            this.$el.find('.title-input').val(this.model.get('title'));
        }

        var $editor = this.$el.find('#editor');
        if(!_.isEmpty(this.model.get('content'))) {
            $editor.find(".section-inner").html(this.model.get('content'));
        }
    },
    pasteVideo: function(video) {
        this.btnVideo.pasteVideo(video);
	    //this.afterPasteVideo(video);
    },
    afterPasteVideo: function(video, nodeId, player) {
	    var VideoROICollection = require('../collections/VideoROICollection.js');
        this.videoInPost[nodeId] = {
            video: video,
            player: player,
            views: {},
            customs: new VideoROICollection(video.customs)
        };
        var self = this;
        this.initVideoCustom(nodeId);
        player.on('play', function() {
            // self.initVideoCustom(nodeId);
        }).on('ended', function() {
            self.destroyVideoCustom(nodeId);
        }).on('pause', function() {
            self.onVideoPause(nodeId);
        }).on('timeupdate', function(){
            self.onVideoPlaying(nodeId, player.currentTime());
        });
    },
    closeTweet: function(event) {
        event.preventDefault();
        $(event.currentTarget).parent().remove();
    },
    preparePostVideo: function() {
        var content = this.editor.$el.find('.section-inner').clone();
        for (var nodeId in this.videoInPost) {
            if (this.videoInPost.hasOwnProperty(nodeId) && this.videoInPost[nodeId].video) {
                var video = this.videoInPost[nodeId].video;
                var data = JSON.stringify(video);
                var html = this.btnVideo.embededHtml(video.type, video.url, nodeId);
                var field = content.find('#'+nodeId);
                var roi = field.find('.custom-rois');
                roi.children().hide();
                var html = "<span class=\"video-with-custom\" data-video='" + data + "' data-roi='" + JSON.stringify(roi.html()) + "'></span>";
                field.replaceWith(html);
            }
        }
        return content.html();
    },
    savePost: function() {
        var content = this.preparePostVideo();
		var firstVideo = this.prepareFirstVideo();

	    this.model.set('video_id', firstVideo.id);
	    this.model.set('video_type', firstVideo.type);
        this.model.set('content', JSON.stringify(content));
        this.model.set('title', this.$el.find('.title-input').val());
        this.model.validate();
        this.model.save();
    },

	prepareFirstVideo: function() {
		var nodeId = this.$el.find('.video-js')[0].id;
		if(_.isUndefined(nodeId)){
			return {};
		}
		var video = this.videoInPost[nodeId];
		if(_.isUndefined(video)){
			return {};
		}
		return {
			id: video.video.id,
			type: video.video.type
		};
	},
	prepareVideos: function() {

	},

    showCustomizeButton: function(event) {
        $(event.currentTarget).prepend('<a contenteditable="false" href="#" class="is-ve-video-b">Customize</a>');
    },
    hideCustomizeButton: function(event) {
        $(event.currentTarget).find('.is-ve-video-b').remove();
    },
    clickCustomButton: function(event) {
        var nodeId = $(event.currentTarget).siblings('.video-js').attr('id');

        var node = this.videoInPost[nodeId];
        if (!node) return;

        var video = node.video;
        node.player.pause();
        this.trigger('video:custom:click', video, nodeId);
    },
    updateVideo: function(nodeId, customs) {
        this.videoInPost[nodeId].customs.reset(customs);
    },
    initVideoCustom: function(nodeId) {
        var node = this.videoInPost[nodeId];
        if (!node || node.views.isRendered || !node.customs) return;

        var container = this.$el.find('#'+nodeId);
        var el = $('<div class="custom-rois"></div>').appendTo(container);

	    var VideoROIView = require('./VideoROIView.js');
	    var VideoROICollectionView = require('./VideoROICollectionView.js');
        node.views = new VideoROICollectionView({
            childView: VideoROIView,
            collection: node.customs,
            el: el
        });
        node.views.render();
    },
    destroyVideoCustom: function(nodeId) {
        var node = this.videoInPost[nodeId];
        if (!node || !node.views.isRendered) return;

        node.views.destroy();
        this.$el.find('#'+nodeId).find('.custom-rois').detach();
    },
    onVideoPlaying: function(nodeId, time) {
        var node = this.videoInPost[nodeId];
        if (!node || !node.views.isRendered) return;

        node.views.showForTime(time);
    },
    onVideoPause: function(nodeId) {
        var node = this.videoInPost[nodeId];
        if (!node || !node.views.isRendered) return;

        node.views.showPause();
    }
});
module.exports = PostEditorView;;
var Marionette = require('backbone.marionette');
var ModalHandelbars = require('./ModalHandlebars.js');

var LinkPostsView = require('./LinkPostsView.js');
var LinkPosts = require('../collections/LinkPosts.js');
var LinkRelatedPostsView =  require('./LinkRelatedPostsView.js');

var RelatedModal = ModalHandelbars.extend({
	model: new Backbone.Model({
		listType: 'all'
	}),
	template:  VideoEssenceApp.templates['modal-template-related-posts'],
	cancelEl: '.bbm-button',
	events: {
		"click #post-search" : "search",
		'keyup .search-post': 'searchFromInput',
		"click .post-btn" : "addRelations",
		"click .all-posts" : "showAll",
		"click .related-posts" : "showRelated"
	},
	beforeCancel: function(){
		this.model.set('headline', $("#headline").text());
		$('input[name=related_headline]').val($("#headline").text());
	},
	beforeSubmit: function(){
		this.model.set('headline', $("#headline").text());
		$('input[name=related_headline]').val($("#headline").text());
	},
	showAll: function() {
		this.model.set({
			listType: 'all',
			keyword: ''
		});
		this.render();
		VideoEssenceApp.linkPostsView = new LinkPostsView({
			collection: VideoEssenceApp.PostPublish.linkPostsCollection
		});

		VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);
	},
	showRelated: function() {
		this.model.set({
			listType: 'related',
			keyword: ''
		});
		this.render();
		VideoEssenceApp.linkPostsView = new LinkRelatedPostsView({
			collection:
				new LinkPosts(VideoEssenceApp.PostPublish.linkPostsCollection.where({linked: true}))
		});
		VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);
	},
	beforeRender : function(){
		this.model.set({
			headline: $('input[name=related_headline]').val()
		});
	},
	onShow : function(){
		VideoEssenceApp.linkPostsRegion = new Marionette.Region({
			el: this.$el.find('.post-container')
		});
		VideoEssenceApp.linkPostsView = new LinkPostsView({
			collection: VideoEssenceApp.PostPublish.linkPostsCollection
		});

		VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);

		$("#headline").keypress(function(e){ return e.which != 13; });
	},
	searchFromInput: function(event) {
		if(event.keyCode == 13){
			this.search();
		}
	},
	search: function(){
		var keyword = this.$(".search-post").val();
		this.model.set({
			listType: 'all',
			keyword: keyword
		});
		this.render();
		findResult = new Backbone.Collection();
		VideoEssenceApp.PostPublish.linkPostsCollection.each(function(post) {
			postTitle = post.get('title');
			if(postTitle.indexOf(keyword) > -1){
				findResult.add(post);
			}
		});
		VideoEssenceApp.linkPostsView = new LinkPostsView({
			collection: findResult
		});

		VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);

	},
	addRelations:function(){
		this.model.set('listType', 'all');
		$(this.el).hide();
	}
});
module.exports = RelatedModal;;
var Marionette = require('backbone.marionette');
var SearchVideoView = Marionette.ItemView.extend({
	template: VideoEssenceApp.templates['found-channel-template'],
    events: {
        'click .url': 'showChannelVideos',
        'click .found-channel-like': 'clickFollow'
    },

    initialize: function () {
        this.model.set('followed', VideoEssenceApp.FollowPanel.isHave(this.model.get('id')));
    },

    showChannelVideos: function(){
        VideoEssenceApp.VideoExplore.videosCollection.channelVideos(this.model.get('type'), this.model.get('id'));
        VideoEssenceApp.VideoExplore.videosView.getItems();
        return false;
    },

    clickFollow: function() {
        var isFollowed = this.model.get('followed');
        VideoEssenceApp.FollowPanel.followedChannelCollection.channelProcess(isFollowed, {
            id:  this.model.get('id'),
            title:  this.model.get('title'),
            type:  this.model.get('type'),
            url: this.model.get('url')
        });
        this.model.set('followed', !isFollowed);
        this.render();
    }
});
module.exports = SearchVideoView;;
var Marionette = require('backbone.marionette');
var SearchVideoView = require('./SearchVideoView.js');
var SearchVideosView = Marionette.CollectionView.extend({
	childView: SearchVideoView
});
module.exports = SearchVideosView;;
var Marionette = require('backbone.marionette');
var SearchVideoView = require('./SearchVideoView.js');

var SimilarKeywordsView = Marionette.CollectionView.extend({
	childView: SearchVideoView
});
module.exports = SimilarKeywordsView;;
var Marionette = require('backbone.marionette');
var ModalHandelbars = require('./ModalHandlebars.js');
var SocialSearchModal = ModalHandelbars.extend({
	events: {
		"click .btn-primary": "search",
		'keyup .post-search-field': 'searchFromInput'
	},
	template: VideoEssenceApp.templates['modal-social-search'],
	cancelEl: '.close-button',
	submitEl: '.btn-post-add',

	onRender: function () {
		var $result_el = this.$el.find(".modal-social-search-result");
		this.resultsRegion = new Marionette.Region({
			el: $result_el[0]
		});
	},
	searchFromInput: function (evt) {
		if (evt.keyCode == 13) {
			this.search();
		}
	},

	search: function () {
		this.insertSelectedItems();
		var key = $('.post-search-field').val();
		this.afterSearch(key);
	},
	afterSearch: function (key) {

	},
	submit: function () {
		this.insertSelectedItems();
	},
	insertSelectedItems: function () {

	}
});
module.exports = SocialSearchModal;;
var SocialSearchModal = require('./SocialSearchModal.js');
var Twitters = require('../collections/Twitters.js');
var TwitterSearchModal = SocialSearchModal.extend({
	afterSearch: function (key) {
		this.collection = new Twitters();
		this.collection.fetch({
			data: {"keyword": key}
		});

		var TwittersView = require('./TwittersView.js');
		this.resultsRegion.show(new TwittersView({
			collection: this.collection
		}));
		this.model.set('count_select', this.collection.length);
		this.listenTo(this.collection, 'change:saved', this.setCount);
	},
	setCount: function () {
		this.model.set('count_select', this.collection.where({saved: true}).length);
		this.$el.find('.modal-social-header span').html(this.model.get('embedded_title') + ' - ' + this.model.get('count_select'));
	},
	insertSelectedItems: function () {
		var TwitterView = require('./TwitterView.js');
		if(!_.isUndefined(this.collection) && !!this.collection.length) {
			var selectedPosts = this.collection.where({saved: true});
			var html = '';
			for (var i in selectedPosts) {
				html += new TwitterView({
						model: selectedPosts[i],
						template: VideoEssenceApp.templates['twitter-editor-template']
					}
				).render().$el.html();
			}
			VideoEssenceApp.PostCreate.editor.btnTwitter.insertHtml(html);
			this.collection.reset();
		}
	}
});
module.exports = TwitterSearchModal;;
var Marionette = require('backbone.marionette');
var TwitterView = Marionette.ItemView.extend({
	template: VideoEssenceApp.templates['twitter-template'],
	events: {
		'click .embed-btn': 'embed',
		'click .remove-btn': 'removeSelect'
	},
	embed: function(){
		this.model.set('saved', true);
		this.render();
	},
	removeSelect: function(){
		this.model.set('saved', false);
		this.render();
	},
	onRender: function () {
		this.listenTo(VideoEssenceApp, 'tick', this.tick);
		//VideoEssenceApp.on('tick', _.bind(this.tick, this));
	},
	tick: function () {
		if(!_.isUndefined(this.model) ){
			this.$el.find('.time-ago').html(moment(this.model.get('created_at')).fromNow());
		}
	},
	onDestroy: function(){
		this.stopListening();
	}
});
module.exports = TwitterView;;
var Marionette = require('backbone.marionette');
var TwitterView = require('./TwitterView.js');
var TwittersView = Marionette.CollectionView.extend({
	className: 'image-search-result-inner',
	childView: TwitterView
});
module.exports = TwittersView;;
VideoEssenceApp.VideoCustomModal = VideoEssenceApp.ModalHandelbars.extend({
	prefix: 'vcm',
	template: VideoEssenceApp.templates['modal-video-custom'],
	events: {
		"click .tab_label": "tabClick",
		"click .menu-tabs .customize_button": "startCampaign"
	},
	tabClick: function (evt) {
		var $this = $(evt.currentTarget);
		var $content = $this.attr('content_div');
		this.$el.find('.popup-tabs').find('.active').removeClass("active");
		$this.addClass("active");
		this.$el.find('.campaign_content.active').removeClass("active");
		this.$el.find('#' + $content).addClass("active");
	},
	startCampaign: function (evt) {
		var select_campaing = this.$el.find('input[name=tab]:checked').val();
		switch (select_campaing) {
			case 'campaign_1':
				this.startLeadCampaign();
				break;
			case 'campaign_3':
				this.startAnnotationCampaign();
				break;
			case 'campaign_4':
				this.startCallToActionCampaign();
				break;
		}
	},
	startLeadCampaign: function() {
		this.destroy();
		var videoLeadCaptureModal = new VideoEssenceApp.VideoLeadCaptureModal();
		$('.app').html(videoLeadCaptureModal.render().el);
	},
	startAnnotationCampaign: function() {

	},
	startCallToActionCampaign: function() {

	}
});;
VideoEssenceApp.VideoLeadCaptureModal = VideoEssenceApp.ModalHandelbars.extend({
	prefix: 'vlc',
	template: VideoEssenceApp.templates['modal-video-lead'],
	events: {
		"click .button-color .color-picking": "selectButtonColor",
		"click .background-color .color-picking": "selectBackgroundColor"
	},
	initialize: function() {
		this.model = new VideoEssenceApp.VideoLead();
		this.previewView = new VideoEssenceApp.VideoLeadPreview({
			model: this.model
		});
		this.listenTo(this.model, 'change', this.renderPreview);
	},
	onShow: function () {
		this.previewRegion = new Backbone.Marionette.Region({
			el: this.$el.find(".preview-wrapper")
		});

		//this.$el.find(".colorSelector").ColorPicker({
		//	color: "#000000",
		//	onShow: function (colpkr) {
		//		$(this).parent().parent().parent().find('.tick').removeClass('tick');
		//		$(this).parent().find('.color-holder').addClass("tick");
		//		$(colpkr).fadeIn(500);
		//		return false;
		//	},
		//	onHide: function (colpkr) {
		//		$(colpkr).fadeOut(500);
		//		return false;
		//	},
		//	onChange: function (hsb, hex, rgb) {
		//		var controlBar, html, sub;
		//		sub = $(".color-picking-right-now");
		//		if (sub.hasClass("no-color-holder")) {
		//			sub = sub.parent().find('.color-holder');
		//		}
		//		sub.css({
		//			'background-color': "#" + hex
		//		});
		//		controlBar = $('.vjs-control-bar');
		//		$(controlBar).css({
		//			'background': '#' + hex
		//		});
		//		$('#embedStyling').html("");
		//		html = '<style type="text/css">.vjs-control-bar, .vjs-big-play-button:before{background-color: #';
		//		html += hex;
		//		html += ' !important }</style>';
		//		$('#embedStyling').append(html);
		//		sub.addClass("active");
		//		sub.parent().find(".no-color-holder").html("#" + hex);
		//		sub.parent().parent().parent().find('.colorHolder').attr('value', '#' + hex);
		//	}
		//});
		//this.$el.find(".slider-range-min").each(function () {
		//	var $this;
		//	$this = $(this);
		//	return $($this).slider({
		//		range: "min",
		//		min: parseInt($this.attr('min-value')),
		//		max: parseInt($this.attr('max-value')),
		//		step: parseInt($this.attr('step')),
		//		value: parseInt($this.attr('value')),
		//		slide: function (e, ui) {
		//			var idToChange, minutes, seconds;
		//			if ($this.hasClass('select_time_mode')) {
		//				minutes = Math.floor(ui.value / 60);
		//				seconds = ui.value - (minutes * 60);
		//				if (minutes.length === 1) {
		//					minutes = "0" + minutes;
		//				}
		//				if (seconds.length === 1) {
		//					seconds = "0" + seconds;
		//				}
		//				$($this).parent().parent().find('.select_value').val(minutes + ":" + seconds);
		//				$($this).parent().parent().find('.select_value').attr('in_seconds', ui.value);
		//			}
		//			if ($($this).hasClass('opacitySlider')) {
		//				$($this).parent().parent().find('.opacity_value').html(Math.round(ui.value));
		//				idToChange = $($this).attr("changeBgOfThisId");
		//				if (idToChange !== void 0) {
		//					$('#' + idToChange).css({
		//						opacity: Math.round(ui.value) / 100
		//					});
		//				}
		//			}
		//		}
		//	});
		//});

		this.renderPreview();
	},
	renderPreview: function () {
		this.previewRegion.show(this.previewView)
	},
	selectButtonColor: function (evt) {

		var $this = $(evt.currentTarget);

		this.model.set('buttonColor', $this.attr('value'));
		this.$el.find('.button-color .tick').removeClass('tick');
		$this.addClass('tick');

		//$('.color-picking').click(function() {
		//	if ($('.color-picking-right-now').length > 0) {
		//		$('.color-picking-right-now').removeClass('color-picking-right-now');
		//	}
		//	return $(this).addClass('color-picking-right-now');
		//});
		//$(".color-picking").click(function() {
		//	var controlBar, html, oldActive;
		//	$(this).parent().parent().parent().find('.tick').removeClass('tick');
		//	$(this).addClass('tick');
		//	controlBar = $('.vjs-control-bar');
		//	$(controlBar).css({
		//		'background': $(this).css("background-color")
		//	});
		//	$('#embedStyling').html("");
		//	html = '<style type="text/css">.vjs-control-bar, .vjs-big-play-button:before{background-color: ';
		//	html += $(this).css("background-color");
		//	html += ' !important }</style>';
		//	$('#embedStyling').append(html);
		//	oldActive = $(this).parent().parent().parent().find(".active");
		//	$(this).parent().parent().find('.colorHolder').attr('value', $(this).css("background-color"));
		//	oldActive.removeClass("active");
		//	oldActive.css({
		//		"border-color": "#ffffff"
		//	});
		//	if (!$(this).hasClass("no-color-holder")) {
		//		$(this).addClass("active");
		//	}
		//});
	},
	selectBackgroundColor: function (evt) {
		var $this = $(evt.currentTarget);

		this.model.set('backgroundColor', $this.attr('value'));
		this.$el.find('.button-color .tick').removeClass('tick');
		$this.addClass('tick');
	}
});;
VideoEssenceApp.VideoLeadPreview = Backbone.Marionette.ItemView.extend({
	tagName: "div",
	className: "image-search-item",
	template: VideoEssenceApp.templates['video-lead-preview']
});;
var Marionette = require('backbone.marionette');
var VideoPocketView = Marionette.ItemView.extend({
    template: VideoEssenceApp.templates['video-pocket-template'],
    events: {
        'click .fa-times': 'clickedButton'
    },
    clickedButton: function() {
        VideoEssenceApp.vent.trigger("pocket:videoRemove", this.model);
    }
});
module.exports = VideoPocketView;;
var Marionette = require('backbone.marionette');
var VideoROICollectionView = Marionette.CollectionView.extend({
    template: VideoEssenceApp.templates['video-roi-collection'],
    showForTime: function(time) {
        this.children.each(function(view){
            view.applyPlay(time);
        });
    },
    showPause: function() {
        this.children.each(function(view){
            view.applyPause();
        });
    }
});
module.exports = VideoROICollectionView;;
var Marionette = require('backbone.marionette');
var VideoROIView = Marionette.ItemView.extend({
    template: VideoEssenceApp.templates['video-roi'],
    templateHelpers: function () {
        var self = this;
        var equal = function(need, data) {
            return need === data;
        }
        return {
            display: function() {
                return self.model.get('displayOnPause') ? 1 : 0;
            },
            typeIsLead: equal('lead', this.model.get('type')),
            typeIsAnnotation: equal('annotation', this.model.get('type')),
            typeIsCta: equal('cta', this.model.get('type')),
            opacity: function() {
                return self.model.get('opacity')/100;
            }
        }
    },
    events: {
        'click .closeAnnotation': 'skip',
        'click .skip': 'skip',
    },
    isPause: false,
    skiped: false,
    skipedOnPause: false,
    skip: function() {
        if (this.isPause) {
            this.skipedOnPause = true;
        } else {
            this.skiped = true;
        }
        this.hide();
    },
    onRender: function() {
        this.hide();
    },
    show: function() {
        if (!this.skiped) {
            this.$el.show();
        }
    },
    showOnPause: function() {
        if (!this.skipedOnPause) {
            this.$el.show();
        }
    },
    hide: function() {
        this.$el.hide();
    },
    applyPlay: function(time) {
        this.isPause = false;
        if (time > this.model.get('timeStart')) {
            this.show();
        } else {
            this.hide();
        }
        if (time >= this.model.get('timeStop') && this.model.get('timeStop') > 0) {
            this.hide();
        }
    },
    applyPause: function() {
        this.isPause = true;
        if (this.model.get('displayOnPause')) {
            this.showOnPause();
        }
    }
});
module.exports = VideoROIView;;
var VideoView = Backbone.Marionette.ItemView.extend({
	template: VideoEssenceApp.templates['video-template'],
	className: "video-container-wrapper",

	events: {
		'click .fa-plus-circle': 'clickedButton',
		'click .button-like': 'clickFollow',
		'click .fa-ellipsis-v': 'hideVideoButton',
		'click .hide-video-block': 'hideVideo',
		'click .thumbnail-wrapper .image-view': 'showModal',
		'click .video-description .lockup-title': 'showModal'
	},

	initialize: function () {
		this.listenTo(this.model, 'change:saved', this.render);
		if (this.model.get('type') == 'youtube') {
			this.model.set({'embeded_url': 'https://www.youtube.com/embed/' + this.model.get('id')});
		} else {
			this.model.set({'embeded_url': 'https://player.vimeo.com/video/' + this.model.get('id')});
		}
	},
	showModal: function (evt) {
		var model = new Backbone.Model({
			id : this.model.get("id"),
			type : this.model.get("type")
		});
		var ModalHandelbars = require('./ModalHandlebars.js');
		var TabModal = ModalHandelbars.extend({
			template: VideoEssenceApp.templates['modal-template'],
			cancelEl: '.bbm-button',
			model:model
		});
		var tabModal = new TabModal();

		$('.app').html(tabModal.render().el);
		evt.preventDefault();
	},
	hideVideo: function () {
		this.model.hide();
		this.destroy();
	},
	hideVideoButton: function () {
		this.model.set('showButtonVideoHide', !this.model.get('showButtonVideoHide'));
		this.render();
	},
	clickedButton: function () {
		var isSaved = this.model.get('saved');
		if (isSaved) {
			VideoEssenceApp.vent.trigger("pocket:videoRemove", this.model);
		} else {
			VideoEssenceApp.vent.trigger("pocket:videoAdd",this.model)
		}
		this.model.set('saved', !isSaved);
		this.render();
	},
	clickFollow: function () {
		var isFollowed = this.model.get('followed');

		var channelOptions = {
			id: this.model.get('channel_id'),
			title: this.model.get('channel_title'),
			type: this.model.get('type'),
			url: this.model.get('channel_url'),
			subtype: this.model.get('channel_subtype')
		};
        VideoEssenceApp.FollowPanel.followedChannelCollection.channelProcess(isFollowed, channelOptions);

		VideoEssenceApp.VideoExplore.videosView.checkFollowedByChannel(isFollowed, this.model.get('channel_id'));
		if(!_.isUndefined(VideoEssenceApp.SearchPanel)){
			VideoEssenceApp.SearchPanel.fillChannels([]); //update list of search channels If channel was followed
		}

        VideoEssenceApp.FollowPanel.rerender();
	}
});
module.exports = VideoView;;
var VideoPocketView = require('./VideoPocketView.js');
var VideosPocketView = Backbone.Marionette.CollectionView.extend({
    childView: VideoPocketView
});
module.exports = VideosPocketView;
;
var Marionette = require('backbone.marionette');

var VideoView = require('./VideoView.js');
var VideosView = Marionette.CompositeView.extend({
	offset: 20,
	limit: 20,
	works: false,
	model: new Backbone.Model({
		gettingIsStop: false,
		bigView: false
	}),
	childView: VideoView,
	template: VideoEssenceApp.templates['videos-template'],
	childViewContainer: '.list',
	events: {
		'click .video-list-controls .do-big': 'toBigSizeList',
		'click .video-list-controls .do-small': 'toSmallSizeList'
	},
	initViewModeFromLocalStorage: function () {
		var videosViewMode = (localStorage.getItem("videosViewMode") === 'true');
		if (!_.isNull(videosViewMode)) {
			this.model.set({
				bigView: videosViewMode
			});
		}
	},
	resetOffset: function () {
		this.collection.reset();
		this.offset = 0;
		this.model.set('gettingIsStop', false);
		this.render();
	},
	constructor: function () {
		this.initViewModeFromLocalStorage();
		Marionette.CompositeView.prototype.constructor.apply(this, arguments);
	},
	onBeforeRender: function () {
		this.collection.invoke('set', {bigView: this.model.get('bigView')});
	},
	onRender: function () {
		var self = this;
		$(window).scroll(function () {
			self.loadItems();
		});
	},
	loadItems: function () {
		if ($(window).scrollTop() >= this.$el.height() - $(window).height() - 200 && !this.works) {
			this.getItems();
		}
	},
	getItems: function (without_adding_results) {
		without_adding_results = without_adding_results || false;
		if (without_adding_results) {
			this.collection.fetch({
				remove: false,
				add: false, //TODO здесь возникают ошибки id
				merge: false,
				data: {"offset": this.offset, "limit": this.limit}
			});
		}
		else {
			this.works = true;
			var length = this.collection.length;
			this.collection.fetch({
				remove: false,
				add: true,
				merge: false,
				data: {"offset": this.offset, "limit": this.limit},
				success: _.bind(function (model, response, options) {
					if (this.collection.length > length) {
						this.works = false;
						this.offset += this.limit;
						this.collection.youtubeNextPageToken = response.youtubeNextPageToken;
						this.loadItems();
						this.getItems(true);
					}
					else {
						this.stopGetting();
					}
				}, this),
				error: _.bind(function () {
					this.stopGetting();
				}, this)
			});
		}
	},
	stopGetting: function () {
		this.model.set('gettingIsStop', true);
		this.render();
	},
	checkFollowedByChannel: function (isFollowed, channel_id) {
		var followedVideo = this.collection.where({
			channel_id: channel_id
		});
		for (var i = 0; followedVideo.length > i; i++) {
			followedVideo[i].set('followed', !isFollowed);
		}

		this.render();
	},
	toBigSizeList: function () {
		this.setSizeList(false);
	},
	toSmallSizeList: function () {
		this.setSizeList(true);
	},
	setSizeList: function (result) {
		this.model.set({bigView: result});
		localStorage.setItem('videosViewMode', result);
		this.render();
	}
});
module.exports = VideosView;;
var Marionette = require('backbone.marionette');
var CategoryModule = Marionette.Module.extend({
	startWithParent: false,
	onStart: function (options) {
		console.log('Category Module start');
		this.region = new Marionette.Region({
			el: ".video-wrapper"
		});
		var Channels = require('../collections/Channels.js');

		this.channels = new Channels(options.channels, {
			category: options.category,
			youtubeNextPageToken: options.youtubeNextPageToken
		});

		var ChannelsView = require('../views/ChannelsView.js');
		this.channelsView = new ChannelsView({
			collection: this.channels
		});
		this.region.show(this.channelsView);

		this.scrollListener();
	},
	scrollListener : function () {
		var self = this;
		$(window).on("scroll", function () {
			if ($(window).scrollTop() >= $(document).height() - $(window).height() - 200 && !self.channelsView.works) {
				self.channelsView.getItems();
			}
		});
	}
});
module.exports = CategoryModule;;
var Marionette = require('backbone.marionette');
var FollowVideosView = require('../views/FollowVideosView.js');
var FollowedChannelCollection = require('../collections/FollowedChannel.js');

var FollowPanelModule = Marionette.Module.extend({
	initialize: function (moduleName, app, options) {
		console.log('initialize FollowPanelModule');


		this.followedChannelCollection = new FollowedChannelCollection();
		this.followPanelRegion = new Marionette.Region({
			el: ".followed-panel-wrapper"
		});

		this.rerender = function () {
			if ($(".followed-panel-wrapper").length) {
				var followVideosView = new FollowVideosView({
					collection: this.followedChannelCollection
				});
				this.followPanelRegion.show(followVideosView);
			}
		};

		this.isHave = function (videoId) {
			return this.followedChannelCollection.get(videoId) != undefined;
		};

		this.add = function (channel) {
			this.followedChannelCollection.add(channel);
		};

		this.remove = function (title) {
			var SearchModel = this.followedChannelCollection.where({title: title});
			this.followedChannelCollection.remove(SearchModel);
		};

		this.exist = function (channel_id) {
			var exist = this.followedChannelCollection.where({title: channel_id});
			return exist.length > 0;
		};

		return false;
	},
	fillChannels: function (channels) {
		this.followedChannelCollection.add(channels);
		var followVideosView = new FollowVideosView({
			collection: this.followedChannelCollection
		});

		this.followPanelRegion.show(followVideosView);
	}
});
module.exports = FollowPanelModule;;
var Marionette = require('backbone.marionette');
var MediaManagerModule = Marionette.Module.extend({
	startWithParent: false,
	initialize: function () {
		//this.imagesGalleyCollection = new VideoEssenceApp.ImagesGalley();
	},
	onStart: function(options) {
		var ImagesGalley = require('../collections/ImagesGallery.js')
		this.imagesGalleyCollection = new ImagesGalley();
		this.imagesGalleyCollection.set(options.images_gallery);
	},
	show: function () {
		var ModalMediaManager = require('../views/ModalMediaManager.js');
		this.modalView = new ModalMediaManager();
		$('.app').html(this.modalView.render().el);
	},
	hide: function () {
		this.modalView.destroy();
	}
});
module.exports = MediaManagerModule;;
var Marionette = require('backbone.marionette');
var PocketModule = Marionette.Module.extend({
	initialize: function (moduleName, app, options) {
		console.log('initialize PocketModule');
		this.fillDataFromLS();

		var PocketView = require('../views/PocketView.js');
		this.view = new PocketView({
			model: new Backbone.Model({
				isMinification: this.isMinification,
				countVideo: this.pocketVideosCollection.length
			}),
			collection: this.pocketVideosCollection
		});

	},
	onStart: function () {
		this.view.render();
	},
	fillDataFromLS: function () {
		var PocketVideosCollection = require('../collections/PocketVideos.js');
		this.pocketVideosCollection = new PocketVideosCollection();
		this.isMinification = false;
		this.fillVideosCollection();
		this.fillMinificationOption();
	},
	fillVideosCollection: function () {
		try {
			var VideoModel = require('../models/Video.js');
			var videoModelsArr = JSON.parse(localStorage.getItem("pocketVideosCollection"));
			var videoModels = [];
			for (var i in videoModelsArr) {
				var videoModel = videoModelsArr[i];
				videoModels.push(new VideoModel(videoModel));
			}
			this.pocketVideosCollection.set(videoModels);
		} catch (e) {
		}
	},
	fillMinificationOption: function () {
		var minificationOption = localStorage.getItem("pocketVideosMinification");
		if (!_.isNull(minificationOption)) {
			minificationOption = (minificationOption === 'true');
			this.isMinification = minificationOption;
		}
	},
	rerender: function () {
		this.view.render();
	}
});
module.exports = PocketModule;;
var Marionette = require('backbone.marionette');
var VideoROI = require('../models/VideoROI.js');
var ModalVideoCustomSelect = require('../views/ModalVideoCustomSelect.js');
var PostCreateModule = Marionette.Module.extend({
    postVideo: null,
	startWithParent: false,
    onStart: function (postData) {
	    this.postData = postData;
        this.initRegions();

        this.showEditor();
    },
    initRegions: function() {
        this.editorRegion = new Backbone.Marionette.Region({
            el: '#post-editor'
        });
        this.modalRegion = new Backbone.Marionette.Region({
            el: '.app'
        });
    },
    showEditor: function() {
	    var Post = require('../models/Post.js');
        this.post = new Post(this.postData);

	    var PostEditorView = require('../views/PostEditorView.js');
        this.editor = new PostEditorView({model: this.post});
        this.listenTo(this.editor, 'video:custom:click', this.showCustomize);

        this.editorRegion.show(this.editor);
    },
    showCustomize: function(video, nodeId) {
        var roi = new VideoROI({}, {video: video});
        this.customView = new ModalVideoCustomSelect({model: roi});
        var callback = this.applyCustomize.bind(this, nodeId);
        this.listenTo(this.customView, 'video:custom:apply', callback);
        this.modalRegion.show(this.customView);
    },
    applyCustomize: function(nodeId, roi) {
        var customs = roi.video.customs;
        customs.push(roi.toJSON());
        this.editor.trigger('video:custom:update', nodeId, customs);
    }
});
module.exports = PostCreateModule;
;
var Marionette = require('backbone.marionette');
var PostPublishModule = Marionette.Module.extend({
	initialize: function () {
		//this.post_id = 0;
		this.currentPostRelation = new Backbone.Collection();
		this.postRelation = new Backbone.Collection();

		this.initTagInputs();

		var LinkPosts = require('../collections/LinkPosts.js');
		this.linkPostsCollection = new LinkPosts();

		var LinkPostsView = require('../views/LinkPostView.js');
		this.linkPostsView = new LinkPostsView({
			collection: this.linkPostsCollection
		});
		var RelatedModal = require('../views/RelatedModal.js');
		$(".relations-popup").click(function () {
			$('.app').html(new RelatedModal().render().el);
		});

		$('#tree,#tree-combined').on('acitree', function(event, api, item, eventName, options) {
			if(eventName == 'checked'){
				//VideoEssenceApp.checkedCategories[api.getId(item)] = 1;
				VideoEssenceApp.checkedCategories.push(api.getId(item));
			}
			if(eventName == 'unchecked'){
				//delete VideoEssenceApp.checkedCategories[api.getId(item)];
				VideoEssenceApp.checkedCategories.splice(VideoEssenceApp.checkedCategories.indexOf(api.getId(item)), 1);
			}
		});

		$('#tree').aciTree({
			ajax: {
				url: '/post/get-categories?post_id=' + window.post_id
			},
			checkbox: true
		});

		$('.add-category input').keyup(function(e){
		    if(e.keyCode == 13 && $(this).val()!='')
		    {
		    	var input = this;
		        $.ajax({
					url: '/post/add-category',
					data: {
						category: $(input).val()
					},
					dataType: 'html',
					success: function(html){
						var api = $('#tree').aciTree('api');
						api.append(null, {
							itemData: {
								id: html,
								label: $(input).val(),
								open: false,
								inode: false,
								checkbox:  true,
								radio: false,
								checked: true,
								selected: true
							}
						});
						$(input).val('');
						VideoEssenceApp.checkedCategories.push(html);
					},
					error: function(){
						alert('Some error on server');
					}
				});
		    }
		});

		$('#post-form').submit(function(event){
			var jsonRelations = JSON.stringify(
				_.pluck(
					VideoEssenceApp.PostPublish.linkPostsCollection.
						where({linked: true}),
					'id'
			));
			var checkedCategories = JSON.stringify(VideoEssenceApp.checkedCategories);
			if($('.ace-switch-6')[0].checked){
				$('#show_related').val(1);
			}
			$('#relations').val(jsonRelations);
			$('#tags').val($(".input-post-tags").val());
			$('#selected-categories').val(checkedCategories);
		});
		$('.search-post').bind("enterKey",function(e){
			VideoEssenceApp.RelatedModal.search();
		});
		$('.search-post').keydown(function(e){
			if(e.keyCode == 13)
			{
				$(this).trigger("enterKey");
			}
		});

	},
	initTagInputs: function () {

		var postTags = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
			queryTokenizer: Bloodhound.tokenizers.whitespace
		});
		postTags.initialize();

		this.tagsBlock = $('.input-post-tags');
		this.tagsBlock.tagsinput({
			typeaheadjs: {
				name: 'posttags',
				displayKey: 'name',
				valueKey: 'name',
				source: postTags.ttAdapter(),
			}
		});

	}
});
module.exports = PostPublishModule;
;
var Marionette = require('backbone.marionette');
var SearchPanelModule = Marionette.Module.extend({
    initialize: function( moduleName, app, options ) {
	    console.log('initialize SearchPanel');

	    var Channels = require('../collections/Channels.js');
	    this.searchChannelCollection = new Channels();
	    this.searchChannelCollection.url = '/site/getchannelbykeyword';
	    this.searchPanelRegion = new Marionette.Region({
		    el: ".search-panel-wrapper"
	    });

	    return false;
    },
	fillChannels: function (keyword) {
		this.searchChannelCollection.fetch({
			remove: false,
			add: true,
			merge: false,
			data: {"textToSearch": keyword}
		});
		var SearchVideosView = require('../views/SearchVideosView.js');
		var videosView = new SearchVideosView({
			collection: this.searchChannelCollection
		});
		if($(".search-panel-wrapper").length) {
			this.searchPanelRegion.show(videosView);
		}
	}
});
module.exports = SearchPanelModule;;
var Marionette = require('backbone.marionette');
var SimilarKeywordModule = Marionette.Module.extend({
	startWithParent: false,
	initialize: function( moduleName, app, options ) {
		this.region = new Backbone.Marionette.Region({
			el: ".similar-keyword-wrapper"
		});
	},
	onStart: function(options) {
		this.textToSearch = options.textToSearch;
		var similar_keywords_query = document.createElement('script');
		similar_keywords_query.setAttribute('src','https://www.google.com/complete/search?client=hp&hl=en&sugexp=msedr&gs_rn=62&gs_ri=hp&cp=1&gs_id=9c&q='+options.textToSearch+'&xhr=t&callback=createSimilarKeywords');
		document.head.appendChild(similar_keywords_query);

	},
	showPanel: function(data) {
		var SimilarKeywordsView = require('../views/SimilarKeywordsView.js');
		var SimilarKeywords = require('../collections/SimilarKeywords.js');
		var collection = new SimilarKeywords();
		this.view = new SimilarKeywordsView({
			collection: collection
		});
		collection.push({
			title: this.textToSearch,
			id: this.textToSearch
		});

		collection.add(_.map(data[1], function(element){
			var query = element[0].replace(/<b>/gi," ").replace(/<\/b>/gi," ");
			return {
				title: query,
				id: query
			};
		}));

		this.region.show(this.view);
	}
});
module.exports = SimilarKeywordModule;;
var Marionette = require('backbone.marionette');
var VideoExplore = Marionette.Module.extend({
	startWithParent: false,
	initialize: function (moduleName, app, options) {
		console.log('initialize VideoExplore');
		this.videoRegion = new Marionette.Region({
			el: ".explore-video-wrapper"
		});
		var self = this;
		VideoEssenceApp.vent.on("pocket:videoRemove", function (model) {
			var videoInCanvas = self.videosCollection.get(model);
			if (!_.isUndefined(videoInCanvas)) {
				videoInCanvas.set('saved', false);
			}
		});
	},
	onStart: function (options) {
		var VideosCollection = require('../collections/Videos.js');
		this.videosCollection = new VideosCollection([], options.collectionOptions);
		this.videosCollection.set(options.videos);

		var VideosView = require('../views/VideosView.js');
		this.videosView = new VideosView({
			collection: this.videosCollection
		});
		this.videoRegion.show(this.videosView);

		if (options.stopPaging) {
			this.videosView.stopGetting();
		} else {
			this.videosView.getItems(true);
		}


	}
});
module.exports = VideoExplore;