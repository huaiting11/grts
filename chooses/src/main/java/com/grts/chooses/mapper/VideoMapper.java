package com.grts.chooses.mapper;

import com.grts.chooses.bean.AbilityType;
import com.grts.chooses.bean.Video;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface VideoMapper {
    public List<AbilityType> getAll();

}