package com.grts.chooses.mapper;

import com.grts.chooses.bean.User;
import org.apache.ibatis.annotations.*;

@Mapper
public interface UserMapper {
    @Select("SELECT * FROM t_user WHERE id = #{userId}")
    User findUserById(String userId);
    @Select("SELECT * FROM t_user WHERE telephone = #{telephone} AND password = #{password};")
    User findUserAndPass(@Param("telephone") String telephone, @Param("password") String password);
    @Update("UPDATE t_user SET name = #{name} , sex = #{sex} , " +
            " professional = #{professional} , " +
            "hobby = #{hobby} , evaluation = #{evaluation} , " +
            "status = #{status} , prov = #{prov} , " +
            "city = #{city} , dist = #{dist} , " +
            "age = #{age} , " +
            "school = #{school} " +
            "WHERE id = #{id}")
    int updateUser(User user);
    @Insert("INSERT INTO t_user(id, name, telephone, sex, password, " +
            "professional, hobby, evaluation, `status`, prov, city, dist, age, school) " +
            "VALUE (#{id},#{name},#{telephone},#{sex},#{password},#{professional}," +
            "#{hobby},#{evaluation},#{status},#{prov},#{city},#{dist},#{age},#{school})")
    int saveUser(User user);
}
