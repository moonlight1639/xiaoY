package com.pj.xiaoY.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nonapi.io.github.classgraph.json.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("chat_messages_by_user")
public class ChatMessageByUser {
    @Id
    private String id;

    private Integer userId; // 用户ID

    private String title;// 聊天记录标题

    private String memoryId; // 消息列表ID

    private List<SingleMessages> messages;//消息列表

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime createTime; // 创建时间
}
