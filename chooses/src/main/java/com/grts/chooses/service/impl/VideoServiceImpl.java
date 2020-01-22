package com.grts.chooses.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.grts.chooses.bean.AbilityType;
import com.grts.chooses.bean.Video;
import com.grts.chooses.mapper.AbilityTypeMapper;
import com.grts.chooses.mapper.VideoMapper;
import com.grts.chooses.service.VideoService;
import com.grts.chooses.util.IdGen;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;
import java.util.UUID;

@Service
public class VideoServiceImpl implements VideoService {

    @Override
    public List<AbilityType> abilityType() {
        return null;
    }

    @Override
    public void saveKey(String key, String typeId) {

    }

    @Override
    public PageInfo<Video> getVideoByType(String typeId, Integer pageNo, Integer pageSize) {
        return null;
    }

    @Override
    public void saveKey(Video video) {

    }
}
