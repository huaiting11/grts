package com.grts.chooses.bean;

public class UserCareer {
    private String careerId;

    private String userId;
    private Integer sequence;

    public String getCareerId() {
        return careerId;
    }

    public void setCareerId(String careerId) {
        this.careerId = careerId == null ? null : careerId.trim();
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    public Integer getSequence() {
        return sequence;
    }

    public void setSequence(Integer sequence) {
        this.sequence = sequence;
    }
}