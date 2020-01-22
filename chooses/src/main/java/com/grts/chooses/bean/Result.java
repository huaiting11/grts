package com.grts.chooses.bean;

import java.util.List;

public class Result {
    private String id;

    private String userId;

    private String careerId;

    private Float score;

    private String explain;
    private List<LgPosition> lgPositions;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    public String getCareerId() {
        return careerId;
    }

    public void setCareerId(String careerId) {
        this.careerId = careerId == null ? null : careerId.trim();
    }

    public Float getScore() {
        return score;
    }

    public void setScore(Float score) {
        this.score = score;
    }

    public List<LgPosition> getLgPositions() {
        return lgPositions;
    }

    public void setLgPositions(List<LgPosition> lgPositions) {
        this.lgPositions = lgPositions;
    }

    public String getExplain() {
        return explain;
    }

    public void setExplain(String explain) {
        this.explain = explain;
    }
}