function initializePostVideo() {

    var embededHtml = function(type, url, node_name) {
        switch(type) {
            case 'vimeo':
                return "<video contenteditable='false' id='" + node_name + "' src='" + url + "' class='video-js vjs-default-skin' controls preload='auto' width='100%' height='360' ></video>";
            case 'youtube':
                return "<video contenteditable='false' id='" + node_name + "' src='' class='video-js vjs-default-skin' controls preload='auto' width='100% ' height='360' data-setup='{ \"techOrder\": [\"youtube\"], \"src\": \"" + url + "\"}'></video>";
        }
        return null;
    };
    var hide = function(el) {
        $(el).parent().hide();
    }
    var show = function(el) {
        if (!$(el).data('skipped')) {
            $(el).parent().show();
        }
    }
    var skip = function(event) {
        event.preventDefault();
        var el = $(event.target).closest('.custom-roi').data('skipped', 1);
        hide(el);
    }

    var content = $('.post-preview');
    content.find('.video-with-custom').each(function(index){
        var roi = JSON.parse($(this).data('roi'));
        var video = $(this).data('video');
        var nodeId = 'video-' + index;
        var html = embededHtml(video.type, video.url, nodeId);
        var node = $(this).parent();
        node.html(html);
        var player = videojs(nodeId);
        var rois = $('<div class="custom-rois"></div>').html(roi);
        var customs = rois.find('.custom-roi');
        rois.on('click', '.closeAnnotation', skip);
        rois.on('click', '.skip', skip);
        rois.appendTo(node.find('#'+nodeId));
        player.on('pause', function() {
            customs.each(function() {
                var display = $(this).data('displayOnPause');
                if (display) {
                    show(this);
                }
            })
        }).on('timeupdate', function(){
            var time = player.currentTime();
            customs.each(function() {
                var start = $(this).data('start');
                var stop = $(this).data('stop');

                if (time > start) {
                    show(this);
                } else {
                    hide(this);
                }
                if (time >= stop && stop > 0) {
                    hide(this);
                }
            })
        });
    });
}
