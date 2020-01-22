package com.grts.chooses.controller;

import com.grts.chooses.bean.Exercises;
import com.grts.chooses.bean.User;
import com.grts.chooses.service.ExercisesService;
import com.grts.chooses.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
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
    @RequestMapping("/user/register")
    @ResponseBody
    public Boolean register(String telephone ,String password){
        boolean isSuccess = userService.register(telephone,password);
        return isSuccess;
    }

}
