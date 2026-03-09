package com.pj.xiaoY.assistant;

import ai.djl.Model;
import dev.langchain4j.community.model.dashscope.QwenChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ChatClientConfig {
    @Autowired
    private QwenChatModel qwenChatModel;

//    @Bean
//    public ChatClient dashScopeClient() {
//        return ChatClient.builder(dashScopeChatModel).build();
//    }


}
