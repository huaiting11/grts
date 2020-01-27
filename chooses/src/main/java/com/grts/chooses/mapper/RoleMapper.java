package com.grts.chooses.mapper;

import com.grts.chooses.bean.Role;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface RoleMapper {
    @Select("SELECT * from t_role where EXISTS (SELECT 1 from t_user_role where user_id =#{id})")
    List<Role> getRoles(String id);
}
