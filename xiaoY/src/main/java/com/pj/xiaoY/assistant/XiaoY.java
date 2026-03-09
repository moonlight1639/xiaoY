package com.pj.xiaoY.assistant;

import dev.langchain4j.service.MemoryId;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.V;
import dev.langchain4j.service.spring.AiService;
import dev.langchain4j.service.spring.AiServiceWiringMode;
import jdk.jfr.Description;

@AiService(
        wiringMode = AiServiceWiringMode.EXPLICIT,
//        chatModel = "deepseekChatModel",
        chatModel = "qwenChatModel",
//        embeddingModel = "qwenEmbeddingModel",
        chatMemoryProvider = "chatMemoryProvider"
        ,contentRetriever = "multicontentRetrieverXiaoYPincone"
)
public interface XiaoY {

    @SystemMessage(fromResource = "prompt/xiao-y-prompt.txt")
    String chat(@MemoryId String memoryId, @UserMessage String userMessage);

    @SystemMessage(fromResource = "prompt/fill.txt")
    String fill(@V("user_class") String userClass, @UserMessage String userMessage);

    @SystemMessage("请根据以下文本填充对象：\\n\\n {{it}}")
    <T> T fill1( @UserMessage String userMessage);



}
