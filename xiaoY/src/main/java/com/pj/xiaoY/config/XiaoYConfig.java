package com.pj.xiaoY.config;

import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.memory.chat.ChatMemoryProvider;
import dev.langchain4j.memory.chat.MessageWindowChatMemory;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.rag.content.retriever.ContentRetriever;
import dev.langchain4j.rag.content.retriever.EmbeddingStoreContentRetriever;
import dev.langchain4j.store.embedding.EmbeddingStore;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class XiaoYConfig {
    @Autowired
    private EmbeddingStore<TextSegment> couresEmbeddingStore;

    @Autowired
    private EmbeddingModel embeddingModel;

    @Qualifier("qwenEmbeddingModel")
    @Autowired
    private EmbeddingModel qwenEmbeddingModel;

    @Bean
    ChatMemoryProvider chatMemoryProvider() {
        return memoryId -> MessageWindowChatMemory.builder().id(memoryId).maxMessages(100).build();
    }

    @Bean
    ContentRetriever contentRetrieverXiaoYPincone() {
// 创建一个 EmbeddingStoreContentRetriever 对象，用于从嵌入存储中检索内容
        return EmbeddingStoreContentRetriever
                .builder()
// 设置用于生成嵌入向量的嵌入模型
                .embeddingModel(qwenEmbeddingModel)
// 指定要使用的嵌入存储 - 也要输入模型
                .embeddingStore(couresEmbeddingStore)
// 设置最大检索结果数量，这里表示最多返回 1 条匹配结果
                .maxResults(4)
// 设置最小得分阈值，只有得分大于等于 0.8 的结果才会被返回
//                .minScore(0.6)
// 构建最终的 EmbeddingStoreContentRetriever 实例
                .build();
    }
}
