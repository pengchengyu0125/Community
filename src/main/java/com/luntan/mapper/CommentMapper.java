package com.luntan.mapper;

import com.luntan.model.Comment;
import com.luntan.model.Post;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface CommentMapper {

    @Insert("insert into comment (parent_id,type,gmt_create,gmt_modified,commentator,content,like_count) values (#{parentId},#{type},#{gmtCreate},#{gmtModified},#{commentator},#{content},#{likeCount})")
    void insert(Comment comment);

    @Select("select * from comment where id=#{id}")
    Comment getById(@Param("id") Integer id);

    @Select("select * from comment where parent_id=#{parentId}")
    List<Comment> selectByParentId(Integer parentId);

    @Select("select * from comment where parent_id=#{id} and type=2")
    List<Comment> selectReply(Integer id);

    @Update("update comment set comment_count=comment_count+1 where id=#{id}")
    void updateCommentCount(Integer id);
}
