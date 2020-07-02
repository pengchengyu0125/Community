function post(){
    var postId=$("#post_id").val();
    var content=$("#comment_content").val();
    $.ajax({
        type: "POST",
        url: "/comment",
        contentType: 'application/json',
        data: JSON.stringify({
            "parentId": postId,
            "content": content,
            "type": 1
        }),
        success: function(response){
            $("#comment_section").hide();
        },
        dataType: "json"
    });
}