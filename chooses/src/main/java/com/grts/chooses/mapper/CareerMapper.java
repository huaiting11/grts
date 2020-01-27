package com.grts.chooses.mapper;

import com.grts.chooses.bean.CareerDirection;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface CareerMapper {
    @Select("SELECT * FROM t_career_direction WHERE type = #{type} LIMIT 0,3")
    List<CareerDirection> findCareerByType(Integer type);
    @Select("SELECT * FROM t_career_direction")
    List<CareerDirection> getAll();
    @Select("SELECT * FROM t_career_direction WHERE id = #{id}")
    CareerDirection getCareerById(String id);
    @Insert("INSERT INTO t_career_direction(id, name, description, distribution, `require`, " +
            "type, sequence) VALUE (#{id},#{name},#{description},#{distribution},#{require},#{type}," +
            "#{sequence})")
    int insert(CareerDirection careerDirection);
    @Update("UPDATE t_career_direction SET name = #{name} , description = #{description} , " +
            " distribution = #{distribution} , " +
            " `require` = #{require} WHERE id = #{id}")
    int update(CareerDirection careerDirection);
}
