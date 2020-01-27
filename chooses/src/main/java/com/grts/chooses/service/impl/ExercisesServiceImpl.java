package com.grts.chooses.service.impl;

import com.github.pagehelper.util.StringUtil;
import com.grts.chooses.bean.*;
import com.grts.chooses.mapper.CareerDirectionMapper;
import com.grts.chooses.mapper.ExercisesMapper;
import com.grts.chooses.mapper.ResultMapper;
import com.grts.chooses.mapper.UserMapper;
import com.grts.chooses.service.ExercisesService;
import com.grts.chooses.util.IdGen;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ExercisesServiceImpl implements ExercisesService{
    @Autowired
    private ExercisesMapper exercisesMapper;
    @Autowired
    private CareerDirectionMapper careerDirectionMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private ResultMapper resultMapper;
    @Override
    public List<Exercises> findExercisesByCareerId(String carrId) {
        List<Exercises> result = exercisesMapper.findExercisesByCareerId(carrId);
        return result;
    }

    @Override
    public List<CareerDirection> findUserByCareerDirections(String userId) {
        User user = userMapper.findUserById(userId);
        List<CareerDirection> careerDirections = careerDirectionMapper.findCareeDirectionById(user.getId());
        return careerDirections;
    }

    @Override
    public List<LgPosition> getLgPosition(String userId, String carrId) {
        Result result = resultMapper.findUserByIdAndCarrId(userId,carrId);
        if(result == null){
            return null;
        }else{
            List<LgPosition> list = resultMapper.getLgPosition(result.getId());
            return  list.size()>0?list:null;
        }
    }

    @Override
    public List<Exercises> find(String careerId) {
        return exercisesMapper.find(careerId);
    }

    @Override
    public Exercises getExersice(String id) {
        return exercisesMapper.findById(id);
    }

    @Override
    public Boolean saveExer(Exercises exercises) {
        if(StringUtil.isNotEmpty(exercises.getId())){
            int i = exercisesMapper.saveExer(exercises);
        }else {
            exercises.setId(UUID.randomUUID().toString().replaceAll("-", ""));
            int i = exercisesMapper.insert(exercises);
        }

        return true;
    }
}
