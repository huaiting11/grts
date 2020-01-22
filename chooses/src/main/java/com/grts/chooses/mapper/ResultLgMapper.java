package com.grts.chooses.mapper;

import com.grts.chooses.bean.LgPosition;
import org.apache.ibatis.annotations.*;

import java.util.List;


@Mapper
public interface ResultLgMapper {
    @Delete("DELETE FROM t_result_lg WHERE result_id = #{result_id}")
    void deleteByResultId(String id);
    @Select("SELECT * FROM t_lg_position ORDER BY RAND() LIMIT 3")
    List<LgPosition> findRand();
    @Insert("INSERT INTO t_result_lg(result_id,lg_id) VALUE(#{result_id},#{lg_id})")
    void save(@Param("result_id") String id, @Param("lg_id") Integer id1);
}
