package com.grts.chooses.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.grts.chooses.bean.Exercises;
import com.grts.chooses.bean.User;
import com.grts.chooses.service.ExercisesService;
import com.grts.chooses.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private ExercisesService exercisesService;

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


}
