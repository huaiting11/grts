package com.grts.chooses.mapper;

import com.grts.chooses.bean.CareerDirection;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CareerDirectionMapper {
    @Select("SELECT * FROM t_career_direction  tcd WHERE EXISTS (SELECT career_id FROM t_user_career c WHERE  c.career_id =tcd.id AND c.user_id = #{userId})")
    List<CareerDirection> findCareeDirectionById(@Param("userId") String userId);
}
