package com.grts.chooses.service;

import com.github.pagehelper.PageInfo;
import com.grts.chooses.bean.AbilityType;
import com.grts.chooses.bean.Video;


import java.util.List;

public interface VideoService {
    public List<AbilityType> abilityType();

    public void saveKey(String key, String typeId);

    public  PageInfo<Video> getVideoByType(String typeId, Integer pageNo, Integer pageSize);

    public void saveKey(Video video);
}
