$("#tagBox").tagging("emptyInput");

$(document).ready(function() {

    $('.setup-blog').bind('click', function(e) {
        console.log('aaaaa');
        e.preventDefault();
        $('#setupBlog').fadeIn(200);
    });

    $('#setupBlog').bind('click', function(e){
        if( $(e.target).hasClass('bim-wrapper') ) {
            $(this).fadeOut(200);
        } else {
            e.stopPropagation();
        }
    });
    $('.modal-close, .action-cancel').bind('click', function(e){
        e.preventDefault();
        $('.bim-wrapper').fadeOut(200);
    });


    $('.blog-add-tag').bind('click', function(e) {
        e.preventDefault();
        $('.blog-add-tag-input').fadeIn();
    });


    $('#inputBlogName').bind('change', function() {

        $.ajax({
            url: '/blog/checkname',
            method: 'POST',
            dataType: 'JSON',
            data: { blogName: $(this).val() },
            success: function(response) {
                if(response.success == 0) {
                    $('.name-taken').addClass('text-danger').text(response.error);
                } else if(response.success == 1) {
                    $('.name-taken').removeClass('text-danger').addClass('text-success').text(response.message);
                }
            }
        });
    });

    $('#blogForm').bind('submit', function() {
        if($('#inputBlogName').val() == '') {
            alert('Please fill in the fields!');
            return false;
        }
    })

    $('button.close').click(function() {
        $(this).parent().fadeOut();
    })


});