package com.grts.chooses.service;

import com.grts.chooses.bean.CareerDirection;

import java.util.List;

public interface CareerService {
    List<CareerDirection> getAll();

    CareerDirection getCareerById(String id);

    Boolean saveCareer(CareerDirection careerDirection);
}
