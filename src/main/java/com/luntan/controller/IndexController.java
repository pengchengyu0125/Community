package com.luntan.controller;

import com.luntan.dto.HotTopicDTO;
import com.luntan.dto.PageDTO;
import com.luntan.dto.PostDTO;
import com.luntan.mapper.PostMapper;
import com.luntan.mapper.UserMapper;
import com.luntan.model.Post;
import com.luntan.model.User;
import com.luntan.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
public class IndexController {

    @Autowired
    private PostService postService;

    @Autowired
    private HotTopicDTO hotTopicDTO;

    @GetMapping("/")
    public String index(HttpServletRequest request,
                        Model model,
                        @RequestParam(name="page",defaultValue = "1") Integer page,
                        @RequestParam(name="size",defaultValue = "5") Integer size,
                        @RequestParam(name="search",required = false) String search,
                        @RequestParam(name="tag",required = false) String tag){
        PageDTO pagination = postService.list(search,tag,page,size);
        List<String> tags=hotTopicDTO.getHots();
        model.addAttribute("pagination",pagination);
        model.addAttribute("tags",tags);
        return "index";
    }
}