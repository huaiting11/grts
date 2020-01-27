package com.grts.chooses.service.impl;


import com.grts.chooses.bean.*;
import com.grts.chooses.mapper.*;
import com.grts.chooses.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private CareerMapper careerMapper;
    @Autowired
    private UserCareerMapper userCareerMapper;
    @Autowired
    private ResultMapper resultMapper;
    @Autowired
    private ResultLgMapper resultLgMapper;
    @Override
    public User findUserById(String userId) {
        return userMapper.findUserById(userId);
    }

    @Override
    public User findUserAndPass(String telephone, String password) {
        User user = userMapper.findUserAndPass(telephone,password);
        return user;
    }

    @Override
    public String updateUser(User user) {
        int i = userMapper.updateUser(user);
        if(i == 0){
            return "no";
        }
        Integer type = judgeProfessionalAndEvaluation(user.getProfessional(), user.getEvaluation());
        List<CareerDirection> careerDirections = careerMapper.findCareerByType(type);
        if(careerDirections == null){
            return "no";
        }
        for (CareerDirection career: careerDirections) {
            UserCareer userCareer = new UserCareer();
            userCareer.setCareerId(career.getId());
            userCareer.setUserId(user.getId());
            int count = userCareerMapper.saveUserCareer(userCareer);
            if(count==0){
                return "no";
            }
        }
        return "yes";
    }

    @Override
    public String saveScore(float score, String carrId, String userId) {
        Result result = resultMapper.findUserByIdAndCarrId(userId,carrId);
        if(result==null){
            result = new Result();
            result.setId(UUID.randomUUID().toString().replaceAll("-", ""));
            result.setCareerId(carrId);
            result.setUserId(userId);
            result.setScore(score);
            if(score<80){
                result.setExplain("去看视频");
            }else{
                List<LgPosition> lgPositions = resultLgMapper.findRand();
                savelg(lgPositions,result.getId());
            }
            resultMapper.saveScore(result);
        }else{
            result.setScore(score);
            if(score<80){
                result.setExplain("去看视频");
            }else{
                resultLgMapper.deleteByResultId(result.getId());
                List<LgPosition> lgPositions = resultLgMapper.findRand();
                savelg(lgPositions,result.getId());
            }
            //resultLgMapper.deleteByResultId(result.getId());
            resultMapper.updateScore(result);
        }

        return "yes";
    }
    public void savelg(List<LgPosition> lgPositions ,String resultId){
        for (LgPosition lgPosition: lgPositions) {
            resultLgMapper.save(resultId,lgPosition.getId());
        }
    }
    @Override
    public boolean register(String telephone, String password) {
        User user = new User();
        user.setId(UUID.randomUUID().toString().replaceAll("-", ""));
        user.setTelephone(telephone);
        user.setPassword(password);
        user.setStatus(0);
        int i = userMapper.saveUser(user);
        if(i > 0){
            return  true;
        }else{
            return false;
        }

    }
    public Integer judgeProfessionalAndEvaluation(String professional,String evaluation){
        return 1;
    }
    @Override
    public List<String> getSchool() {
        return userMapper.getSchool();
    }

    @Override
    public List<User> getUsers(String schoolName) {
        return userMapper.getUsers(schoolName);
    }

    @Override
    public Boolean isTelephone(String telephone) {
        return  userMapper.isTelephone(telephone)  >= 1 ? true : false;
    }


}
