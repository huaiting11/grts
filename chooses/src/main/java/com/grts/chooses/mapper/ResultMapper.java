package com.grts.chooses.mapper;

import com.grts.chooses.bean.LgPosition;
import com.grts.chooses.bean.Result;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ResultMapper {
    @Select("SELECT * FROM t_result WHERE user_id = #{userId} AND career_id = #{carrId}")
    Result findUserByIdAndCarrId(@Param("userId") String userId, @Param("carrId") String carrId);
    @Insert("INSERT INTO t_result(id, user_id, career_id, score, `explain`) VALUE (#{id},#{userId},#{careerId},#{score},#{explain})")
    void saveScore(Result result);
    @Update("UPDATE t_result SET score = #{score}, `explain` = #{explain} WHERE id = #{id}")
    void updateScore(Result result);
    @Select("select pos.* from t_lg_position pos where EXISTS (select * from t_result_lg  rl where pos.id = rl.lg_id and rl.result_id = #{id})")
    List<LgPosition> getLgPosition(String id);

}
