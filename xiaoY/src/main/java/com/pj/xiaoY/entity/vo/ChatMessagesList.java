package com.pj.xiaoY.entity.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.pj.xiaoY.entity.SingleMessages;
import lombok.Data;

import java.util.List;

@Data
public class ChatMessagesList {
    private String memoryId;
    private String title;
    private List<SingleMessages> messages;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private String createTime;
}
