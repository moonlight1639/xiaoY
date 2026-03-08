package com.pj.xiaoY.config;

import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.model.embedding.onnx.bgesmallzh.BgeSmallZhEmbeddingModel;
import dev.langchain4j.model.openai.OpenAiChatModel;
import dev.langchain4j.model.openai.OpenAiChatModelName;
import dev.langchain4j.model.openai.OpenAiEmbeddingModel;
import dev.langchain4j.model.openai.OpenAiEmbeddingModelName;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class ModelConfig {
    @Bean
    public ChatLanguageModel deepseekChatModel() {
        return OpenAiChatModel.builder()
                .apiKey(System.getenv("DEEP_SEEK_API_KEY"))
                .baseUrl("https://api.deepseek.com")
                .modelName("deepseek-chat")
                .temperature(0.2)
                .build();
    }

    @Bean
    @Primary
    public EmbeddingModel BgeSmallZhEmbeddingModel() {
        return new BgeSmallZhEmbeddingModel();

    }
//    @Bean
//    public String qwenV4EmbeddingModel() {
//        OpenAiEmbeddingModel embeddingModel = OpenAiEmbeddingModel.builder()
//                .baseUrl("https://dashscope.aliyuncs.com/compatible-mode/v1")
//                .apiKey(System.getenv("DASH_SCOPE_API_KEY"))
////                .modelName(OpenAiEmbeddingModelName.TEXT_EMBEDDING_ADA_002)
//                .modelName("tongyi-embedding-vision-flash")
//                .build();
//        System.out.println(embeddingModel.dimension());
//        return "ss";
//
//    }
}
