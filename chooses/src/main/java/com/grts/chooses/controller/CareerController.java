package com.grts.chooses.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.grts.chooses.bean.CareerDirection;
import com.grts.chooses.bean.Exercises;
import com.grts.chooses.bean.User;
import com.grts.chooses.service.CareerService;
import com.grts.chooses.service.ExercisesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class CareerController {
    @Autowired
    CareerService careerService;
    @Autowired
    ExercisesService exercisesService;
    @RequestMapping("/career/getAll")
    @ResponseBody
    public List<CareerDirection> getAll(){
        return careerService.getAll();
    }
    @RequestMapping("/career/getExercise")
    @ResponseBody
    public PageInfo<Exercises> getExercise(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "7") int pageSize, String careerId) {
        PageHelper.startPage(pageNo,pageSize);
        PageInfo<Exercises> pageInfo = new PageInfo<Exercises>(exercisesService.find(careerId));
        return pageInfo;
    }
    @RequestMapping("/career/getById")
    @ResponseBody
    public Exercises getById(String id) {
        return exercisesService.getExersice(id);
    }
    @RequestMapping("career/saveExer")
    @ResponseBody
    public Boolean saveExer(Exercises exercises){
        return exercisesService.saveExer(exercises);
    }
    @RequestMapping("career/getCareerById")
    @ResponseBody
    public CareerDirection getCareerById(String id){
        return careerService.getCareerById(id);
    }
    @RequestMapping("career/saveCareer")
    @ResponseBody
    public Boolean saveCareer(CareerDirection careerDirection){
        return careerService.saveCareer(careerDirection);
    }
}
