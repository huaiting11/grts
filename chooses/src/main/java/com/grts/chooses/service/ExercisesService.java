package com.grts.chooses.service;

import com.grts.chooses.bean.CareerDirection;
import com.grts.chooses.bean.Exercises;
import com.grts.chooses.bean.LgPosition;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ExercisesService {

    List<Exercises> findExercisesByCareerId(String carrId);

    List<CareerDirection> findUserByCareerDirections(String userId);

    List<LgPosition> getLgPosition(String userId, String carrId);

    List<Exercises> find(String careerId);

    Exercises getExersice(String id);

    Boolean saveExer(Exercises exercises);
}
