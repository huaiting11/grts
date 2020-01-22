package com.grts.chooses.mapper;

import com.grts.chooses.bean.AbilityType;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface AbilityTypeMapper {
    @Select("SELECT * FROM t_ability_type")
    List<AbilityType> getAll();
    @Select("select * from t_ability desc  ")
    List<AbilityType> getAlls();


}
