package com.pj.xiaoY.entity.vo;

import com.pj.xiaoY.entity.SingleMessages;
import lombok.Data;

@Data
public class ChatMessagesVO extends SingleMessages {
    private String memoryId;
    private String title;
}
