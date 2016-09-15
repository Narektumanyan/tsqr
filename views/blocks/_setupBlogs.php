<div id="setupBlog" class="bim-wrapper onlyupload" style="display: none">
    <div class="bim-modal bim-modal--open" style="opacity: 1; min-height: 470px; height: auto;">
        <span class="modal-close"></span>
        <div class="modal-media-title">Howdy! Let's get started by creating your personal blog</div>
        <hr class="blog-line" />
        <form id="blogForm" class="form-horizontal" role="form" action="/blog/create" method="POST">
            <div class="form-group">
                <label for="inputBlogName" class="col-sm-2 control-label">Name</label>
                <div class="col-sm-3 col-sm-offset-0">
                    <?php // echo $form->field($blogModel, 'name')->textInput(['class' => 'aaaa form-control blogCreateInput', 'id' => 'inputBlogName', 'placeholder' => 'Name'])->label(false) ?>
                    <input name="Blog[blog-name]" type="text" class="form-control blogCreateInput" id="inputBlogName" placeholder="Name">
                </div>
                <div class="col-sm-2">
                    <span class="blogCreatePostfix">.trendsquare.com</span>
                </div>
                <div class="col-sm-4">
                    <div class="name-taken"></div>
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

