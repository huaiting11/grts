package com.grts.chooses.controller;

import com.grts.chooses.bean.AbilityType;
import com.grts.chooses.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@RequestMapping
public class VideoController {
    @Autowired
    VideoService videoService;
    @RequestMapping(value = "/ability/type",method = RequestMethod.GET )
    public List<AbilityType> get(){
        List<AbilityType> abilityTypes = videoService.abilityType();
        return abilityTypes;
    }
}
