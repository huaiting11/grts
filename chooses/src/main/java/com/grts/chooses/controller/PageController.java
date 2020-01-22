package com.grts.chooses.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {
    @RequestMapping("/{page}")
    public String showPage(@PathVariable String page, Integer status){
        if(page.equals("job.html") || page.equals("exercise.html") || page.equals("major.html")){
            if(status == 1){
                return page;
            }else{
                return "information.html";
            }
        }
        return page;
    }
    @RequestMapping("back/{page}")
    public String showBackPage(@PathVariable String page){
        return "back/"+page;
    }
}
