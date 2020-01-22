package com.grts.chooses.mapper;

import com.grts.chooses.bean.CareerDirection;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CareerMapper {
    @Select("SELECT * FROM t_career_direction WHERE type = #{type} LIMIT 0,3")
    List<CareerDirection> findCareerByType(Integer type);
}
