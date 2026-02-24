package com.pj.xiaoY.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.pj.xiaoY.entity.enums.MessageType;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class SingleMessages {
    // 消息类型，可能是 "user" 或 "assistant" 用MessageType枚举表示
    private String type;

    // 消息内容
    private String content;

    //消息创建时间
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime createTime;
}
