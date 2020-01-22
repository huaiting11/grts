package com.grts.chooses.mapper;

import com.grts.chooses.bean.CareerDirection;
import com.grts.chooses.bean.UserCareer;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserCareerMapper {
    @Insert("INSERT INTO t_user_career(career_id, user_id) VALUE (#{careerId} , #{userId})")
    int saveUserCareer(UserCareer userCareer);
}
