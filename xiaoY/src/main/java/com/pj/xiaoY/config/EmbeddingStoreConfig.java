package com.pj.xiaoY.config;

import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.store.embedding.EmbeddingStore;
import dev.langchain4j.store.embedding.pinecone.PineconeEmbeddingStore;
import dev.langchain4j.store.embedding.pinecone.PineconeServerlessIndexConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EmbeddingStoreConfig {
    @Autowired
    @Qualifier("qwenEmbeddingModel")
    private EmbeddingModel embeddingModel;
    @Bean
    public EmbeddingStore<TextSegment> couresEmbeddingStore() {
//创建向量存储
        EmbeddingStore<TextSegment> embeddingStore = PineconeEmbeddingStore.builder()
                .apiKey(System.getenv("PINECONE_API_KEY"))
                .index("xiao-y-index")//如果指定的索引不存在，将创建一个新的索引
                .nameSpace("course") //如果指定的名称空间不存在，将创建一个新的名称
                .createIndex(PineconeServerlessIndexConfig.builder()
                        .cloud("AWS") //指定索引部署在 AWS 云服务上。
                        .region("ap-northeast-1") //指定索引所在的 AWS 区域为 us-east-1。
                        .dimension(embeddingModel.dimension()) //指定索引的向量维度，该维度
                        .build())
                .build();
        return embeddingStore;
    }
}
