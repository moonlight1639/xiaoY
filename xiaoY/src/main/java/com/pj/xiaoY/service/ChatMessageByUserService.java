package com.pj.xiaoY.service;

import com.pj.xiaoY.entity.ChatForm;
import com.pj.xiaoY.entity.ChatMessageByUser;
import com.pj.xiaoY.entity.vo.ChatMessagesList;
import com.pj.xiaoY.entity.vo.ChatMessagesTitle;
import com.pj.xiaoY.entity.vo.ChatMessagesVO;

import java.util.List;

public interface ChatMessageByUserService {

    ChatMessageByUser getByMemoryId(String memoryId);

    List<ChatMessagesTitle> getList();

    ChatMessagesList getMessages(String memoryId);

    ChatMessagesVO xiaoY_chat(ChatForm chatform);
}
