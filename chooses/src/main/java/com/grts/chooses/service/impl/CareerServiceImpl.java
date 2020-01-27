package com.grts.chooses.service.impl;

import com.github.pagehelper.util.StringUtil;
import com.grts.chooses.bean.CareerDirection;
import com.grts.chooses.mapper.CareerMapper;
import com.grts.chooses.service.CareerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CareerServiceImpl implements CareerService {
    @Autowired
    CareerMapper careerMapper;
    @Override
    public List<CareerDirection> getAll() {
        return careerMapper.getAll();
    }

    @Override
    public CareerDirection getCareerById(String id) {
        return careerMapper.getCareerById(id);
    }

    @Override
    public Boolean saveCareer(CareerDirection careerDirection) {
        int i ;
        if(StringUtil.isEmpty(careerDirection.getId())){
            careerDirection.setId(UUID.randomUUID().toString().replaceAll("-", ""));
            i = careerMapper.insert(careerDirection);
        }else {
            i = careerMapper.update(careerDirection);
        }
        return i > 0 ? true : false;
    }
}
