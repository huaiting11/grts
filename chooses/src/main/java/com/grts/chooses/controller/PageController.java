package com.grts.chooses.controller;

import com.grts.chooses.bean.User;
import com.grts.chooses.service.UserService;
import com.grts.chooses.util.ShiroUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {
    @Autowired
    UserService userService;
    @RequestMapping("/{page}")
    public String showPage(@PathVariable String page, Integer status){
        User user = ShiroUtils.getPrincipal();
        if(user!= null){
            user = userService.findUserById(user.getId());
        }
        if(page.equals("home.html")){
            if(user != null){
               if(ShiroUtils.getSubject().hasRole("管理员")){
                    return "back/index.html";
               }else{
                   return page;
               }
            }else{
                return page;
            }
        }else if(!page.equals("information.html") && !page.equals("login.html") && !page.equals("register.html")){
            if(user.getStatus() == 0){
                return "home.html";
            }else{
                return page;
            }
        }
        return page;
    }
    @RequestMapping("back/{page}")
    public String showBackPage(@PathVariable String page){
        return "back/"+page;
    }
}
