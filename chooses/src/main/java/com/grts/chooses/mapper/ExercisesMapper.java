package com.grts.chooses.mapper;

import com.grts.chooses.bean.Exercises;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface ExercisesMapper {
    @Select("SELECT * FROM t_exercises WHERE career_id = #{carrId} ORDER BY RAND() LIMIT 15")
    List<Exercises> findExercisesByCareerId(String carrId);
    @Select("SELECT * FROM t_exercises WHERE career_id = #{carrId}")
    List<Exercises> find(String careerId);
    @Select("SELECT * FROM t_exercises WHERE id = #{id}")
    Exercises findById(String id);
    @Update("UPDATE t_exercises SET title = #{title} , optionA = #{optiona} , " +
            " optionB = #{optionb} , " +
            "optionC = #{optionc} , optionD = #{optiond}  " +
            "WHERE id = #{id}")
    int saveExer(Exercises exercises);
    @Insert("INSERT INTO t_exercises(id, title, optionA, optionB, optionC, " +
            "optionD, career_id) " +
            "VALUE (#{id},#{title},#{optiona},#{optionb},#{optionc},#{optiond}," +
            "#{careerId})")
    int insert(Exercises exercises);
}
