package com.grts.chooses.controller;


import com.grts.chooses.bean.User;
import com.grts.chooses.service.UserService;
import com.grts.chooses.util.ShiroUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.Map;

@Controller
@CrossOrigin
public class LoginController {
    @Autowired
    UserService userService;
    // 处理登录逻辑
    @RequestMapping(value = "login",method = RequestMethod.POST)
    @ResponseBody
    public User  login(String username, String password,HttpSession session,
                        Map<String, Object> map) {
        Subject currentUser = SecurityUtils.getSubject();
        User user = new User();
        if (!currentUser.isAuthenticated()) {
            // 把用户名和密码封装为 UsernamePasswordToken 对象
            UsernamePasswordToken token = new UsernamePasswordToken(username, password);
            // 设置为rememberme
            token.setRememberMe(true);
            try {
                // 执行登录.
                currentUser.login(token);
                user.setTelephone(username);
                user.setPassword(password);
                user = userService.findUserAndPass(username,password);
            }
            // 所有认证时异常的父类
            catch (AuthenticationException ae) {
                System.out.println(ae);
            }
        }
        return user;

    }
    @RequestMapping(value = "loginStatus")
    @ResponseBody
    public User loginStatus(){
        return ShiroUtils.getPrincipal();
    }

}