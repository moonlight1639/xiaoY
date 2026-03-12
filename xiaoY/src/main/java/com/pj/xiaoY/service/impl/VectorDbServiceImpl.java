package com.pj.xiaoY.service.impl;

import com.pj.xiaoY.common.exception.GlobalException;
import com.pj.xiaoY.entity.CourseComment;
import com.pj.xiaoY.entity.vectorDb.Namespace;
import com.pj.xiaoY.entity.vectorDb.vo.BathUpdateRecordsVo;
import com.pj.xiaoY.mapper.CourseCommentMapper;
import com.pj.xiaoY.mapper.CourseMapper;
import com.pj.xiaoY.mapper.DishMapper;
import com.pj.xiaoY.service.VectorDbService;
import dev.langchain4j.data.document.Metadata;
import dev.langchain4j.data.embedding.Embedding;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.store.embedding.EmbeddingStore;
import dev.langchain4j.store.embedding.pinecone.PineconeEmbeddingStore;
import dev.langchain4j.store.embedding.pinecone.PineconeServerlessIndexConfig;
import jakarta.annotation.PostConstruct;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import com.pj.xiaoY.entity.vectorDb.VectorRecord;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;

import static org.apache.xmpbox.type.Types.Date;

@Service
public class VectorDbServiceImpl implements VectorDbService {

    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private CourseMapper courseMapper;
    @Autowired
    private CourseCommentMapper courseCommentMapper;
    @Autowired
    private DishMapper dishMapper;
    @Autowired
    private EmbeddingModel embeddingModel;
    static String index = "xiao-y-index-1.0";
    static Map<String , EmbeddingStore<TextSegment>> embeddingStoreMap = new HashMap<>();
    @PostConstruct
    public void init() {
        // 初始化向量数据库，创建索引和名称空间等
        // 这里可以根据实际情况进行初始化操作，例如创建索引、设置名称空间等
        Query query = new Query();
        // find(查询条件, 实体类.class)：返回集合所有记录的实体类列表
        List<Namespace> namespaces = mongoTemplate.find(query, Namespace.class);
        for(Namespace namespace : namespaces) {
            EmbeddingStore<TextSegment> embeddingStore = PineconeEmbeddingStore.builder()
                    .apiKey(System.getenv("PINECONE_API_KEY"))
                    .index(index)//如果指定的索引不存在，将创建一个新的索引
                    .nameSpace(namespace.getName()) //如果指定的名称空间不存在，将创建一个新的名称
                    .createIndex(PineconeServerlessIndexConfig.builder()
                            .cloud("AWS") //指定索引部署在 AWS 云服务上。
                            .region("ap-northeast-1") //指定索引所在的 AWS 区域为 us-east-1。
                            .dimension(embeddingModel.dimension()) //指定索引的向量维度，该维度
                            .build())
                    .build();
            embeddingStoreMap.put(namespace.getName(), embeddingStore);
        }
    }

    @Override
    public void insertNamespace(Namespace namespace) {
        if(namespace == null || namespace.getName() == null)
            throw new GlobalException("名字不能为空");

        Query query = new Query(Criteria.where("name").is(namespace.getName()));
        Namespace inMongDb = mongoTemplate.findOne(query, Namespace.class);
        if(inMongDb != null)
            throw new GlobalException("名字已存在");
        EmbeddingStore<TextSegment> embeddingStore = PineconeEmbeddingStore.builder()
                .apiKey(System.getenv("PINECONE_API_KEY"))
                .index(index)//如果指定的索引不存在，将创建一个新的索引
                .nameSpace(namespace.getName()) //如果指定的名称空间不存在，将创建一个新的名称
                .createIndex(PineconeServerlessIndexConfig.builder()
                        .cloud("AWS") //指定索引部署在 AWS 云服务上。
                        .region("ap-northeast-1") //指定索引所在的 AWS 区域为 us-east-1。
                        .dimension(embeddingModel.dimension()) //指定索引的向量维度，该维度
                        .build())
                .build();

        if(StringUtils.isBlank(namespace.getDescription()))
            namespace.setDescription("请认真填写，这个将会影响ai的搜索准确率");
        namespace.setRecordCount(0);
        namespace.setCreateTime(new Date());
        namespace.setUpdateTime(new Date());
        mongoTemplate.insert(namespace);
        embeddingStoreMap.put(namespace.getName(), embeddingStore);
    }

    @Override
    public void deleteNamespace(Namespace namespace) {

        // Validate input
        if (namespace == null || namespace.getName() == null || namespace.getName().isBlank()) {
            throw new GlobalException("namespace 名称不能为空");
        }

        // Read Pinecone API key from environment
        String apiKey = System.getenv("PINECONE_API_KEY");
        if (apiKey == null || apiKey.isBlank()) {
            throw new GlobalException("PINECONE_API_KEY 未配置");
        }

        // Assumptions: use the same index and region as in InsertNamespace
        String region = "ap-northeast-1"; // 与 InsertNamespace 中保持一致

        // Build controller URL to delete namespace
        String encodedNs = URLEncoder.encode(namespace.getName(), StandardCharsets.UTF_8);
        String url = String.format("https://controller.%s.pinecone.io/databases/%s/namespaces/%s", region, index, encodedNs);

        HttpClient client = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .timeout(Duration.ofSeconds(10))
                .header("Api-Key", apiKey)
                .DELETE()
                .build();

        HttpResponse<String> response;
        try {
            response = client.send(request, HttpResponse.BodyHandlers.ofString());
        } catch (IOException | InterruptedException e) {
            // restore interrupted status if interrupted
            if (e instanceof InterruptedException) Thread.currentThread().interrupt();
            throw new GlobalException("调用 Pinecone 删除 namespace 失败: " + e.getMessage());
        }

        int status = response.statusCode();
        // Treat 200/204 as success; also treat 404 (namespace not found) as success for idempotency
        if (status == 200 || status == 204 || status == 404) {
            // Remove from MongoDB by name
            Query query = new Query(Criteria.where("name").is(namespace.getName()));
            mongoTemplate.remove(query, Namespace.class);
        } else {
            throw new GlobalException("Pinecone 删除 namespace 失败，状态码=" + status + ", body=" + response.body());
        }
    }

    @Override
    public void deleteRecord(VectorRecord vectorRecord) {
        Query query = new Query(Criteria.where("_id").is(vectorRecord.getId()));
        mongoTemplate.remove(query, VectorRecord.class);

        Query queryNamespace = new Query(Criteria.where("name").is(vectorRecord.getNamespaceName()));
        Namespace namespace = mongoTemplate.findOne(queryNamespace, Namespace.class);
        if(namespace != null && query != null){
            mongoTemplate.remove(query , VectorRecord.class);
        }else{
            throw new GlobalException("记录不存在");
        }
        embeddingStoreMap.get(vectorRecord.getNamespaceName()).remove(vectorRecord.getId());
    }

    @Override
    public void insertRecord(VectorRecord vectorRecord) {
        mongoTemplate.insert(vectorRecord);
        if(StringUtils.isBlank(vectorRecord.getNamespaceName()))
            throw new GlobalException("namespace不能为空");
        if(StringUtils.isBlank(vectorRecord.getContent()))
            throw new GlobalException("content不能为空");
        Query queryNamespace = new Query(Criteria.where("name").is(vectorRecord.getNamespaceName()));
        Namespace namespace = mongoTemplate.findOne(queryNamespace, Namespace.class);
        if(namespace == null){
            namespace = new Namespace();
            namespace.setName(vectorRecord.getNamespaceName());
            namespace.setRecordCount(0);
            insertNamespace(namespace);
        }

        Metadata metadata = new Metadata();
        for (VectorRecord.Pair pair : vectorRecord.getMetadata()) {
            metadata.put(pair.getKey(), pair.getValue());
        }
        String text = vectorRecord.getContent();
        TextSegment segment = TextSegment.from(text , metadata);
        Embedding embedding = embeddingModel.embed(text).content();
//                    System.out.println(metadata.toString());
        embeddingStoreMap.get(vectorRecord.getNamespaceName()).add(embedding, segment);
    }

    @Override
    public void bathDeleteRecords(BathUpdateRecordsVo bathUpdateRecordsVo) {
    }

    @Override
    public void batchInsertRecords(BathUpdateRecordsVo bathUpdateRecordsVo) {

    }
}
