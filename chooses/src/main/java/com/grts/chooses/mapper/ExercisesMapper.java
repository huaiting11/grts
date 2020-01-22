package com.grts.chooses.mapper;

import com.grts.chooses.bean.Exercises;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ExercisesMapper {
    @Select("SELECT * FROM t_exercises WHERE career_id = #{carrId} ORDER BY RAND() LIMIT 15")
    List<Exercises> findExercisesByCareerId(String carrId);
}
