package com.grts.chooses.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.grts.chooses.bean.Exercises;
import com.grts.chooses.bean.User;
import com.grts.chooses.service.ExercisesService;
import com.grts.chooses.service.UserService;
import com.qiniu.common.QiniuException;
import com.qiniu.sms.SmsManager;
import com.qiniu.util.Auth;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Controller
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private ExercisesService exercisesService;
    @Autowired
    private Environment env;
    @RequestMapping("/user/{userId}")
    @ResponseBody
    public User findUserById(@PathVariable String userId){
        User user = userService.findUserById(userId);
        return  user;
    }
    @RequestMapping("/user/login")
    @ResponseBody
    public User findUserByUserAndPass(String telephone ,String password){
        User isLogin = userService.findUserAndPass(telephone,password);
        return isLogin;
    }
    @RequestMapping("/user/updateInfo")
    @ResponseBody
    public String updateUser(User user){
        String message = userService.updateUser(user);
        return message;
    }
    @RequestMapping("/exercise/{carrId}")
    @ResponseBody
    public List<Exercises> findExercisesByCareerId(@PathVariable String carrId){
        List<Exercises> result = exercisesService.findExercisesByCareerId(carrId);
        return result;
    }
    @RequestMapping("/user/getSchool")
    @ResponseBody
    public List<String> getSchool(){
        return  userService.getSchool();
    }
    @RequestMapping("/users/getUser")
    @ResponseBody
    public PageInfo<User> lists(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "1") int pageSize, String schoolName) {
        PageHelper.startPage(pageNo,pageSize);
        PageInfo<User> pageInfo = new PageInfo<User>(userService.getUsers(schoolName));
        return pageInfo;
    }
    @RequestMapping("/user/isTelephone")
    @ResponseBody
    public Boolean isTelephone(String telephone){
        return userService.isTelephone(telephone) == null ? false:true;
    }
    @RequestMapping("/user/sendVerifyCode")
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
    @RequestMapping("/user/register")
    @ResponseBody
    public String register(String telephone ,String password,String verCode,HttpServletRequest request){
        JSONObject json = (JSONObject)request.getSession().getAttribute("verifyCode");
        if(!json.getString("verifyCode").equals(verCode)){
            return "验证码错误";
        }
        if((System.currentTimeMillis() - json.getLong("createTime")) > 1000 * 60 * 5) {
            return "验证码过期";

        }
        boolean isSuccess = userService.register(telephone,password);
        return isSuccess?"success":"注册失败";
    }

}
