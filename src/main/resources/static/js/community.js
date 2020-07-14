function post(){
    var postId=$("#post_id").val();
    var content=$("#comment_content").val();
    var commentator=$("#commentator").val();
    comment2target(postId, 1, content, commentator);
}

function comment2target(targetId, type, content, commentator){
    $.ajax({
            type: "POST",
            url: "/comment",
            contentType: 'application/json',
            data: JSON.stringify({
                "parentId": targetId,
                "content": content,
                "type": type,
                "commentator": commentator
            }),
            success: function(){
                window.location.reload();
            },
            dataType: "json"
        });
}

function comment(e) {
    var commentId=e.getAttribute("data-id");
    var content=$("#input-"+commentId).val();
    var commentator=$("#replyCommentator").val();
    comment2target(commentId, 2, content, commentator);
}

function collapseComments(e) {
    var id=e.getAttribute("data-id");
    var comments=$("#comment-"+id);
    //获取展开状态
    var collapse=e.getAttribute("data-collapse");
    if(collapse){
        //折叠二级评论
        comments.removeClass("in");
        e.removeAttribute("data-collapse");
        e.classList.remove("active");
    }
    else{
        var subCommentContainer = $("#comment-"+id);
        if(subCommentContainer.children().length != 1){
            //展开二级评论
            comments.addClass("in");
            //标记二级评论状态
            e.setAttribute("data-collapse","in");
            e.classList.add("active");
        }
        else{
            $.getJSON("/comment/"+id, function(data){
                $.each(data.data.reverse(), function(index, comment){
                    var mediaLeftElement=$("<div/>",{
                        "class":"media-left"
                    }).append($("<img/>", {
                        "class":"media-object img-rounded",
                        "src":comment.user.avatarUrl
                    }));

                    var mediaBodyElement=$("<div/>",{
                        "class":"media-body"
                    }).append($("<h5/>",{
                        "class":"media-heading",
                        "html":comment.user.name
                    })).append($("<div/>",{
                        "html":comment.content
                    })).append($("<div/>",{
                        "class":"menu"
                    }).append($("<span/>",{
                        "class":"pull-right",
                        "html":moment(comment.gmtCreate).format('YYYY-MM-DD')
                    })));
                    var mediaElement=$("<div/>",{
                        "class":"media"
                    }).append(mediaLeftElement).append(mediaBodyElement);
                    var commentElement=$("<div/>",{
                        "class":"col-lg-12 col-md-12 col-sm-12 col-xs-12 comments"
                    }).append(mediaElement);
                    subCommentContainer.prepend(commentElement);
                });
                //展开二级评论
                comments.addClass("in");
                //标记二级评论状态
                e.setAttribute("data-collapse","in");
                e.classList.add("active");
            });
        }
    }
}