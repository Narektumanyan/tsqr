var Marionette = require('backbone.marionette');
var ModalHandelbars = require('./ModalHandlebars.js');

var LinkPostsView = require('./LinkPostsView.js');
var LinkPosts = require('../collections/LinkPosts.js');
var LinkRelatedPostsView =  require('./LinkRelatedPostsView.js');

var RelatedModal = ModalHandelbars.extend({
    model: new Backbone.Model({
        listType: 'all'
    }),
    template:  VideoEssenceApp.templates['modal-template-post-categories-barge'],
    cancelEl: '.bbm-button, .post-category-add-close-barge',
    events: {
        'change #avatarInput': 'prepareCropFile',
        'click .post-category-add-create-barge': 'submitBarge'
    },
    initialize: function(){
        this.support = {
            fileList: !!$('<input type="file">').prop('files'),
            blobURLs: !!window.URL && URL.createObjectURL,
            formData: !!window.FormData
        };

        this.support.datauri = this.support.fileList && this.support.blobURLs;

        //if (!this.support.formData) {
        //    this.initIframe();
        //}
        //
        //this.initTooltip();
        //this.initModal();
        //this.addListener();
    },
    onShow: function(){
        console.log("this", this);

        this.$avatarModal = this.$el.find('.post-middle');

        this.$avatarForm = this.$avatarModal.find('.avatar-form');
        this.$avatarUpload = this.$avatarForm.find('.avatar-upload');
        this.$avatarSrc = this.$avatarForm.find('.avatar-src');
        this.$avatarData = this.$avatarForm.find('.avatar-data');
        this.$avatarInput = this.$avatarForm.find('.avatar-input');
        this.$avatarSave = this.$avatarForm.find('.avatar-save');
        this.$avatarBtns = this.$avatarForm.find('.avatar-btns');

        this.$avatarWrapper = this.$avatarModal.find('.avatar-wrapper');
        this.$avatarPreview = this.$avatarModal.find('.avatar-preview');

        //var url = this.$avatar.attr('src');

        var url = "";

        this.$avatarPreview.html('<img src="' + url + '">');

    },
    isImageFile: function (file) {
        if (file.type) {
            return /^image\/\w+$/.test(file.type);
        } else {
            return /\.(jpg|jpeg|png|gif)$/.test(file);
        }
    },
    startCropper: function () {
        var _this = this;

        if (this.cropperActive) {
            this.$img.cropper('replace', this.url);
        } else {
            this.$img = $('<img src="' + this.url + '">');
            this.$avatarWrapper.empty().html(this.$img);
            this.$img.cropper({
                aspectRatio: 1,
                preview: this.$avatarPreview.selector,
                strict: false,
                crop: function (e) {
                    var json = [
                        '{"x":' + e.x,
                        '"y":' + e.y,
                        '"height":' + e.height,
                        '"width":' + e.width,
                        '"rotate":' + e.rotate + '}'
                    ].join();

                    _this.$avatarData.val(json);
                }
            });

            this.cropperActive = true;
        }

        //this.$avatarModal.one('hidden.bs.modal', function () {
        //    _this.$avatarPreview.empty();
        //    _this.stopCropper();
        //});
    },
    stopCropper: function () {
        if (this.active) {
            this.$img.cropper('destroy');
            this.$img.remove();
            this.active = false;
        }
    },
    syncUpload: function () {
        this.$avatarSave.click();
    },
    prepareCropFile: function(e){
        var files;
        var file;

        console.log("0", this.support);
        if (this.support.datauri) {
            files = this.$avatarInput.prop('files');

            if (files.length > 0) {
                file = files[0];

                if (this.isImageFile(file)) {

                    if (this.url) {
                        URL.revokeObjectURL(this.url); // Revoke the old one
                    }

                    this.url = URL.createObjectURL(file);

                    console.log(this.url);

                    this.startCropper();
                }
            }
        } else {
            //console.log("8");
            file = this.$avatarInput.val();

            if (this.isImageFile(file)) {
                //this.syncUpload();
            }
        }
    },
    submitBarge: function (e){
        e.preventDefault();

        console.log("serializeArray", this.$el.find("form").serializeArray());

        //var data_files = new FormData();
        //$.each($('#avatarInput')[0].files, function(i, file) {
        //    data_files.append('file-'+i, file);
        //});
        //console.log("data_files", data_files);

        var data_files = new FormData(this.$avatarForm[0]);
        console.log(this.$avatarForm, data_files, this.$avatarForm[0]);

        //var data = this.$el.find("form").serializeArray();

        $.ajax({
            url: '/post/save-barge',
            type: 'post',
            data: data_files,
            //dataType: 'html',
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (resp) {
                console.log("success", resp);

                if (VideoEssenceApp.PostCategories.PostCategoriesTabView != undefined) {

                    this.curCategory =
                        VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection
                            .where({activeModel: 1})[0]
                    ;

                    this.curCategory.attributes.image_url = resp["result"];

                    VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.add(this.curCategory);

                    console.log("VideoEssenceApp", VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection);

                    $('.app').html(new VideoEssenceApp.PostCategoryModal().render().el);
                }

                if (VideoEssenceApp.PostPublish.publishView != undefined){
                    this.curCategory =
                        VideoEssenceApp.PostPublish.publishView.categories
                            .where({activeModel: 1})[0]
                    ;

                    this.curCategory.attributes.image_url = resp["result"];

                    VideoEssenceApp.PostPublish.publishView.categories.add(this.curCategory);

                    console.log("VideoEssenceApp", VideoEssenceApp.PostPublish.publishView.categories);

                    console.log(VideoEssenceApp.PostCategoryModal);

                    $('.app').html(new VideoEssenceApp.PostCategoryModal().render().el);
                }

                //if (resp.state == 200){
                //
                //}
            },
            error: function ( jqXHR, textStatus, errorThrown) {
                //alert('Some error on server');
                console.log("jqXHR, textStatus, errorThrown", jqXHR, textStatus, errorThrown);
            }
        });

        return false;
    }
});
module.exports = RelatedModal;