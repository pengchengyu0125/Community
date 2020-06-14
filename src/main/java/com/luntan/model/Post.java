package com.luntan.model;

import lombok.Data;

@Data
public class Post {
    private Integer id;
    private String title;
    private String description;
    private String tag;
    private long gmtCreate;
    private long gmtModified;
    private Integer creater;
    private Integer commentCount;
    private Integer viewCount;
    private Integer likeCount;

}
