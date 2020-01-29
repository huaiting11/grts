package com.grts.chooses.mapper;

import com.grts.chooses.bean.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {
    @Select("SELECT * FROM t_user WHERE id = #{userId}")
    User findUserById(String userId);
    @Select("SELECT * FROM t_user WHERE telephone = #{telephone} AND password = #{password}")
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
    @Insert("INSERT INTO t_user(id, nickName,name, telephone, sex, password, " +
            "professional, hobby, evaluation, `status`, prov, city, dist, age, school) " +
            "VALUE (#{id},#{nickName},#{name},#{telephone},#{sex},#{password},#{professional}," +
            "#{hobby},#{evaluation},#{status},#{prov},#{city},#{dist},#{age},#{school})")
    int saveUser(User user);
    @Select("SELECT DISTINCT school FROM t_user")
    List<String> getSchool();
    @Select("SELECT * FROM t_user WHERE school = #{schoolName}")
    List<User> getUsers(String schoolName);
    @Select("SELECT * FROM `t_user` where telephone = #{telephone}")
    User isTelephone(String telephone);
}
