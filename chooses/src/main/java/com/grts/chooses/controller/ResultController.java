package com.grts.chooses.controller;

import com.grts.chooses.bean.CareerDirection;
import com.grts.chooses.bean.LgPosition;
import com.grts.chooses.service.ExercisesService;
import com.grts.chooses.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class ResultController {
    @Autowired
    private UserService userService;
    @Autowired
    private ExercisesService exercisesService;
    @RequestMapping("/exercise/saveScore")
    @ResponseBody
    public String saveScore(float score , String carrId , String userId ){
        String message = userService.saveScore(score,carrId,userId);
        return message;
    }

    @RequestMapping("/exercise/career/{userId}")
    @ResponseBody
    public List<CareerDirection> getCareerDirectionS(@PathVariable String userId){
        List<CareerDirection> careerDirections = exercisesService.findUserByCareerDirections(userId);
        return careerDirections;
    }
    @RequestMapping("result/{userId}/{carrId}")
    @ResponseBody
    public List<LgPosition> getLgPosition(@PathVariable String userId,
                                          @PathVariable String carrId){
        List<LgPosition> lgPositions =exercisesService.getLgPosition(userId,carrId);
        return  lgPositions;
    }

}
