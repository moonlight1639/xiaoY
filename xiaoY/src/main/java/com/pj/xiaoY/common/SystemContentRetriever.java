package com.pj.xiaoY.common;

import com.pj.xiaoY.entity.vectorDb.Namespace;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.rag.content.retriever.ContentRetriever;
import dev.langchain4j.rag.content.retriever.EmbeddingStoreContentRetriever;
import dev.langchain4j.store.embedding.pinecone.PineconeEmbeddingStore;
import dev.langchain4j.store.embedding.pinecone.PineconeServerlessIndexConfig;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class SystemContentRetriever {
    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private EmbeddingModel qwenEmbeddingModel;

    public String systemPrompt;
    public Map<String , ContentRetriever> contentRetrieverMap;

    @PostConstruct
    void init(){
        generate();
    }
    public synchronized void generate(){
        Query query = new Query();
        List<Namespace> namespaces = mongoTemplate.find(query, Namespace.class);
        if(namespaces==null || namespaces.isEmpty()){
            return;
        }
        String _systemPrompt;
        Map<String , ContentRetriever> _contentRetrieverMap = new HashMap<>();
        _contentRetrieverMap = new HashMap<String , ContentRetriever>();
        _systemPrompt = "### 规则\n" +
                "1. 可选namespace：{";
        for (Namespace namespace : namespaces) {
            _systemPrompt += namespace.getName() + ",";
            PineconeEmbeddingStore embeddingStore = PineconeEmbeddingStore.builder()
                    .apiKey(System.getenv("PINECONE_API_KEY"))
                    .index("xiao-y-index-2")//如果指定的索引不存在，将创建一个新的索引
                    .nameSpace(namespace.getName()) //如果指定的名称空间不存在，将创建一个新的名称
                    .createIndex(PineconeServerlessIndexConfig.builder()
                            .cloud("AWS") //指定索引部署在 AWS 云服务上。
                            .region("ap-northeast-1") //指定索引所在的 AWS 区域为 us-east-1。
                            .dimension(qwenEmbeddingModel.dimension()) //指定索引的向量维度，该维度
                            .build())
                    .build();

            _contentRetrieverMap.put(namespace.getName() , EmbeddingStoreContentRetriever
                    .builder()
// 设置用于生成嵌入向量的嵌入模型
                    .embeddingModel(qwenEmbeddingModel)
// 指定要使用的嵌入存储 - 也要输入模型
                    .embeddingStore(embeddingStore)
// 设置最大检索结果数量，这里表示最多返回 1 条匹配结果
                    .maxResults(4)
// 设置最小得分阈值，只有得分大于等于 0.8 的结果才会被返回
//                .minScore(0.6)
// 构建最终的 EmbeddingStoreContentRetriever 实例
                    .build());

        }
        _systemPrompt = _systemPrompt.substring(0, _systemPrompt.length() - 1);
        _systemPrompt += "}\n" +
            "2. 匹配逻辑：\n" ;

        for (Namespace namespace : namespaces) {
            _systemPrompt += "   - " + namespace.getName() + ": " + namespace.getDescription() + "\n";
        }
        _systemPrompt += "3. 输出约束：仅返回上述namespace列表中的一个字符串，禁止任何其他字符（包括空格、换行、标点）\n";
        systemPrompt = _systemPrompt;
        contentRetrieverMap = _contentRetrieverMap;
    }


}
