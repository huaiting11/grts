package com.grts.chooses.controller;


import com.grts.chooses.bean.User;
import com.grts.chooses.service.UserService;
import com.grts.chooses.util.ShiroUtils;
import com.qiniu.common.QiniuException;
import com.qiniu.sms.SmsManager;
import com.qiniu.util.Auth;
import net.sf.json.JSONObject;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Controller
@CrossOrigin
public class LoginController {
    @Autowired
    UserService userService;
    @Autowired
    private Environment env;
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
    @RequestMapping("/register/isTelephone")
    @ResponseBody
    public Boolean isTelephone(String telephone){
        return userService.isTelephone(telephone) == null ? false:true;
    }
    @RequestMapping("/register/sendVerifyCode")
    @ResponseBody
    public Boolean sendVerifyCode(String telephone, HttpServletRequest request) {
        String ACCESS_KEY = env.getProperty("qiniuyun.access_key");
        String SECRET_KEY = env.getProperty("qiniuyun.secret_key");
        Auth auth = Auth.create(ACCESS_KEY, SECRET_KEY);
        SmsManager smsManager = new SmsManager(auth);
        String verifyCode = String.valueOf(new Random().nextInt(899999) + 100000);
        try {
            Map<String, String> map = new HashMap<String, String>();
            map.put("code",verifyCode);
            smsManager.sendMessage(env.getProperty("qiniuyun.templateId"), new String[] { telephone }, map);
            JSONObject json = new JSONObject();
            json.put("verifyCode", verifyCode);
            json.put("createTime", System.currentTimeMillis());
            // 将认证码存入SESSION
            request.getSession().setAttribute("verifyCode", json);
            return true;
            //System.out.println();
        } catch (QiniuException e) {
            System.out.println(e);
        }
        return false;

    }
    @RequestMapping("/register/checkVerCode")
    @ResponseBody
    public String checkVocde(String verCode,HttpServletRequest request){
        JSONObject json = (JSONObject)request.getSession().getAttribute("verifyCode");
        JSONObject info = new JSONObject();
        if(!json.getString("verifyCode").equals(verCode)){
            info.put("msg","验证码错误") ;
        }else if((System.currentTimeMillis() - json.getLong("createTime")) > 1000 * 60 * 5) {
            info.put("msg","验证码过期") ;
        }else {
            info.put("msg","success") ;
        }
        return info.toString();
    }
    @RequestMapping("/register/register")
    @ResponseBody
    public String register(String telephone,String password,String nickName){
        JSONObject info = new JSONObject();
        boolean isSuccess = userService.register(telephone,password,nickName);
        info.put("msg",isSuccess?"success":"注册失败");
        return info.toString();
    }

}