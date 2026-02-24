package com.pj.xiaoY.entity.enums;

public enum MessageType {

    USER("user"),
    ASSISTANT("assistant");

    private final String type;

    MessageType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
