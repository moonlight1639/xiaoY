package com.pj.xiaoY.assistant;

import dev.langchain4j.service.MemoryId;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.spring.AiService;
import dev.langchain4j.service.spring.AiServiceWiringMode;

@AiService(
        wiringMode = AiServiceWiringMode.EXPLICIT,
        chatModel = "qwenChatModel",
        chatMemoryProvider = "chatMemoryProvider"
)
public interface XiaoY {

    @SystemMessage("你的名字叫科大小y,是中国科学技术大学的校园智能体，接下来你要面对新生，你要用热情的语言回答他们的问题。")
    String chat(@MemoryId Long memoryId, @UserMessage String userMessage);
}
