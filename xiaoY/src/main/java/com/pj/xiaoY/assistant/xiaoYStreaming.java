package com.pj.xiaoY.assistant;

import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.spring.AiService;
import dev.langchain4j.service.spring.AiServiceWiringMode;
import reactor.core.publisher.Flux;

@AiService(
        wiringMode = AiServiceWiringMode.EXPLICIT
//        chatModel = "deepseekChatModel",
        ,streamingChatModel = "qwenStreamingChatModel"
//        ,embeddingModel = "qwenEmbeddingModel",
        ,chatMemoryProvider = "chatMemoryProvider"
        ,contentRetriever = "multicontentRetrieverXiaoYPincone"
)
public interface xiaoYStreaming {
//    @SystemMessage(fromResource = "prompt/xiao-y-prompt.txt")
//    Flux<String> chat(@MemoryId String memoryId, @UserMessage String userMessage);

    @SystemMessage(fromResource = "prompt/xiao-y-prompt.txt")
    Flux<String> test(@UserMessage String userMessage);
}
