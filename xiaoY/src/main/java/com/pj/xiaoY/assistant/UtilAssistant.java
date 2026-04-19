package com.pj.xiaoY.assistant;

import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.V;
import dev.langchain4j.service.spring.AiService;
import dev.langchain4j.service.spring.AiServiceWiringMode;

@AiService(
        wiringMode = AiServiceWiringMode.EXPLICIT,
//        chatModel = "deepseekChatModel",
        chatModel = "qwenChatModel"
)
public interface UtilAssistant {
    @SystemMessage(fromResource = "prompt/select-prompt-example.txt")
    String selectExample(@UserMessage String userMessage);


    @SystemMessage(fromResource = "prompt/select-prompt.txt")
    String select(@V("systemPrompt")String SystemMessgae ,@UserMessage String userMessage);
}
