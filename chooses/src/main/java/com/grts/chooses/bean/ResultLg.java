package com.grts.chooses.bean;

public class ResultLg {
    private String id;

    private String resultId;

    private String lgId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getResultId() {
        return resultId;
    }

    public void setResultId(String resultId) {
        this.resultId = resultId == null ? null : resultId.trim();
    }

    public String getLgId() {
        return lgId;
    }

    public void setLgId(String lgId) {
        this.lgId = lgId == null ? null : lgId.trim();
    }
}