package com.pj.xiaoY.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.protobuf.Struct;
import com.google.protobuf.Value;
import com.mongodb.client.result.UpdateResult;
import com.pj.xiaoY.assistant.XiaoY;
import com.pj.xiaoY.common.DbConst;
import com.pj.xiaoY.common.exception.GlobalException;
import com.pj.xiaoY.entity.vectorDb.Namespace;
import com.pj.xiaoY.entity.vectorDb.vo.BathUpdateRecordsVo;
import com.pj.xiaoY.entity.vectorDb.vo.InsertVectorRecord;
import com.pj.xiaoY.service.VectorDbService;
import dev.langchain4j.data.embedding.Embedding;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.store.embedding.EmbeddingStore;
import io.pinecone.clients.Index;
import io.pinecone.configs.PineconeConfig;
import io.pinecone.clients.Pinecone;
import io.pinecone.configs.PineconeConnection;
import io.pinecone.proto.UpsertResponse;
import jakarta.annotation.PostConstruct;
import org.apache.commons.lang3.StringUtils;
import org.openapitools.db_control.client.model.IndexModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import com.pj.xiaoY.entity.vectorDb.VectorRecord;
import dev.langchain4j.data.document.Document;
import dev.langchain4j.data.document.DocumentSplitter;
import dev.langchain4j.data.document.Metadata;
import dev.langchain4j.data.document.splitter.DocumentSplitters;
import dev.langchain4j.data.segment.TextSegment;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.*;

@Service
public class VectorDbServiceImpl implements VectorDbService {

    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private EmbeddingModel embeddingModel;
    @Autowired
    private XiaoY xiaoY;

    static Pinecone pc;
    static String index = "xiao-y-index-2";
//    static Map<String , EmbeddingStore<TextSegment>> embeddingStoreMap = new HashMap<>();
    static PineconeConfig pineconeConfig;
    static PineconeConnection pineconeConnection;
    static Index connectedIndex;
    static String INDEX_HOST = "https://xiao-y-index-2-9b8c1f.svc.ap-northeast-1.pinecone.io";
    static HttpClient httpClient = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(30)).build();
    static ObjectMapper objectMapper = new ObjectMapper();
    static IndexModel indexModel;
    static String apiKey = System.getenv("PINECONE_API_KEY");

    @PostConstruct
    public void init() {
        // 初始化向量数据库，创建索引和名称空间等
        // 这里可以根据实际情况进行初始化操作，例如创建索引、设置名称空间等

        pc = new Pinecone.Builder(System.getenv("PINECONE_API_KEY"))
                .build();
        indexModel = pc.describeIndex(index);
        INDEX_HOST = indexModel.getHost();
        pineconeConfig = new PineconeConfig(apiKey);
        pineconeConfig.setHost(INDEX_HOST);
        PineconeConnection connection = new PineconeConnection(pineconeConfig);

        connectedIndex = new Index(pineconeConfig , connection, index);
        System.out.println("向量数据库初始化完成");
    }

    private void addEmptyRecordToNamespace(EmbeddingStore<TextSegment> embeddingStore , String namespaceName , String description) {
        // 4. 创建无意义的文本片段（标注为占位，方便后续清理）
        TextSegment placeholderSegment = TextSegment.from(
                "[Pinecone namespace:" + namespaceName + " 初始化占位] 无业务语义，不参与搜索"
        );
        // 给片段加元数据，方便后续筛选删除（可选）
        placeholderSegment.metadata().put("init_description", description);
        Embedding placeholderEmbedding = embeddingModel.embed(placeholderSegment.text()).content();
        // 5. 写入向量，触发Namespace创建
        embeddingStore.add(placeholderEmbedding, placeholderSegment);

        System.out.println("✅ " + namespaceName + ": 初始化完成，占位向量已写入（不影响搜索）");
    }
    @Override
    public void insertNamespace(Namespace namespace) {
        if(namespace == null || namespace.getName() == null)
            throw new GlobalException("名字不能为空");
//        System.out.println(namespace.getName());
        Query query = new Query(Criteria.where("name").is(namespace.getName()));
        Namespace inMongDb = mongoTemplate.findOne(query, Namespace.class);
        if(inMongDb != null)
            throw new GlobalException("名字已存在");

        if(StringUtils.isBlank(namespace.getDescription()))
            namespace.setDescription("请认真填写,否则会影响AI检索效果");
//            namespace.setDescription(xiaoY.getNewDescription(namespace.getName()));
//        addEmptyRecordToNamespace(embeddingStore , namespace.getName() , namespace.getDescription());
        try {
            // ===================== 2. 构建请求体（匹配 curl 的 JSON 结构）=====================
            Map<String, Object> requestBody = new HashMap<>();
            // 命名空间名称
            requestBody.put("name", namespace.getName());
            // Schema 配置（filterable 字段）

            String requestJson = objectMapper.writeValueAsString(requestBody);

            // 将请求体转为 JSON 字符串

            // ===================== 3. 构建 HTTP 请求（匹配 curl 的 Header 和 URL）=====================
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://" + INDEX_HOST + "/namespaces"))  // 目标 URL
                    // 设置 Header（与 curl 完全一致）
                    .header("Accept", "application/json")
                    .header("Content-Type", "application/json")
                    .header("Api-Key", System.getenv("PINECONE_API_KEY"))
                    .header("X-Pinecone-Api-Version", "2025-10")  // 新版 API 必须指定版本
                    // POST 请求 + 请求体
                    .POST(HttpRequest.BodyPublishers.ofString(requestJson))
                    .timeout(Duration.ofSeconds(15))  // 请求超时
                    .build();

            // ===================== 4. 发送请求并处理响应 =====================
            HttpResponse<String> response = httpClient.send(
                    request,
                    HttpResponse.BodyHandlers.ofString()
            );

            // ===================== 5. 解析响应结果 =====================
            int statusCode = response.statusCode();
            String responseBody = response.body();

            System.out.println("=== 请求结果 ===");
            System.out.println("状态码：" + statusCode);
            System.out.println("响应体：" + responseBody);

            // 校验请求是否成功
            if (statusCode != 200) {
                throw new RuntimeException("创建命名空间失败！状态码：" + statusCode + "，原因：" + responseBody);
            }

            // 格式化解析响应（可选，便于读取）
            JsonNode responseJson = objectMapper.readTree(responseBody);
//            System.out.println("\n=== 格式化响应 ===");
//            System.out.println("命名空间名称：" + responseJson.get("name").asText());
//            System.out.println("初始记录数：" + responseJson.get("record_count").asText());
//            System.out.println("Schema 配置：" + responseJson.get("schema").toPrettyString());
            namespace.setRecordCount(0);
            namespace.setCreateTime(new Date());
            namespace.setUpdateTime(new Date());
            mongoTemplate.insert(namespace);
        } catch (JsonProcessingException e) {
            System.err.println("JSON 序列化/反序列化失败：" + e.getMessage());
            e.printStackTrace();
        } catch (Exception e) {
            System.err.println("创建命名空间异常：" + e.getMessage());
            e.printStackTrace();
        }



//        embeddingStoreMap.put(namespace.getName(), embeddingStore);
        System.out.println(namespace.getName() + " " + namespace.getDescription() +" 插入成功");
    }
    @Override
    public void updateNamespace(Namespace namespace){
        if(namespace == null || namespace.getName() == null){
            throw new GlobalException("namespace 名称不能为空");
        }
        if(namespace.getId() == null){
            throw new GlobalException("id 不能为空");
        }
        Query query_find = new Query(Criteria.where("id").is(namespace.getId()));
        Update update = new Update().set("description", namespace.getDescription());
        UpdateResult updateResult = mongoTemplate.updateFirst(query_find, update, Namespace.class);
        if(updateResult.getMatchedCount() != 1){
            throw new GlobalException("更新错误，更新了" + updateResult.getMatchedCount() + "条记录");
        }
    }
    @Override
    public void deleteNamespace(String id) {
        Query query_find = new Query(Criteria.where("id").is(id));
        Namespace namespace = mongoTemplate.findOne(query_find, Namespace.class);
        // Validate input
        if (namespace == null || namespace.getName() == null || namespace.getName().isBlank()) {
            throw new GlobalException("namespace 名称不能为空");
        }

        Query query_pre = new Query(Criteria.where("name").is(namespace.getName()));
        Namespace inMongDb = mongoTemplate.findOne(query_pre, Namespace.class);
        if(inMongDb == null)
            throw new GlobalException("记录不存在");

//        System.out.println(namespace.getName());
        // Read Pinecone API key from environment
        String apiKey = System.getenv("PINECONE_API_KEY");
        if (apiKey == null || apiKey.isBlank()) {
            throw new GlobalException("PINECONE_API_KEY 未配置");
        }

        // Use the same region as insertNamespace (applies to Pinecone serverless config)
        String region = "us-east-1"; // 与 insertNamespace 中保持一致


        // To get the unique host for an index,
        // see https://docs.pinecone.io/guides/manage-data/target-an-index


        connectedIndex.deleteAll(namespace.getName());
        System.out.println(namespace.getName() + " 删除成功");


            // Remove Namespace doc from MongoDB by name
        Query query = new Query(Criteria.where("name").is(namespace.getName()));
        mongoTemplate.remove(query, Namespace.class);

        // Also remove any VectorRecord documents that belong to this namespace
        Query recQuery = new Query(Criteria.where("namespace").is(namespace.getName()));
        mongoTemplate.remove(recQuery, VectorRecord.class);

        // Remove in-memory embedding store reference if present
//        embeddingStoreMap.remove(namespace.getName());

    }

    @Override
    public void deleteRecord(String id) {
        Query query = new Query(Criteria.where("id").is(id));
        VectorRecord vectorRecord = mongoTemplate.findOne(query, VectorRecord.class);
        if (vectorRecord == null || StringUtils.isBlank(vectorRecord.getId())) {
            throw new GlobalException("要删除的记录信息不完整");
        }

        String namespaceName = vectorRecord.getNamespace();
        if (StringUtils.isBlank(namespaceName)) {
            throw new GlobalException("namespaceName 不能为空");
        }

        // Check namespace exists
        Query queryNamespace = new Query(Criteria.where("name").is(namespaceName));
        Namespace namespace = mongoTemplate.findOne(queryNamespace, Namespace.class);
        if (namespace == null) {
            throw new GlobalException("namespace 不存在");
        }

        // Check record exists
        Query queryRecord = new Query(Criteria.where("_id").is(vectorRecord.getId()));
        VectorRecord found = mongoTemplate.findOne(queryRecord, VectorRecord.class);
        if (found == null) {
            throw new GlobalException("记录不存在");
        }
        connectedIndex.deleteByIds(
                Collections.singletonList(vectorRecord.getId()),
                namespaceName
        );
        System.out.println("删除成功" + vectorRecord.getId());
        // Remove from MongoDB
        mongoTemplate.remove(queryRecord, VectorRecord.class);
        queryNamespace = new Query(Criteria.where("name").is(vectorRecord.getNamespace()));
        Update update = new Update();
        update.inc("recordCount", -1);
        mongoTemplate.updateFirst(queryNamespace, update, Namespace.class);
        // Remove from embedding store if present
//        EmbeddingStore<TextSegment> store = embeddingStoreMap.get(namespaceName);
    }

    @Override
    public void insertRecord(InsertVectorRecord vectorRecord) {
        if (vectorRecord == null) {
            throw new GlobalException("vectorRecord 不能为空");
        }
        if(StringUtils.isBlank(vectorRecord.getNamespace()))
            throw new GlobalException("namespace不能为空");
        if(StringUtils.isBlank(vectorRecord.getContent()))
            throw new GlobalException("content不能为空");

        Query queryNamespace = new Query(Criteria.where("name").is(vectorRecord.getNamespace()));
        Namespace namespace = mongoTemplate.findOne(queryNamespace, Namespace.class);
        if(namespace == null){
            namespace = new Namespace();
            namespace.setName(vectorRecord.getNamespace());
            namespace.setRecordCount(0);
            insertNamespace(namespace);
        }
        Boolean isInsert = true;
        if(StringUtils.isBlank(vectorRecord.getId())) {
            vectorRecord.setId(DbConst.PREFIX_VECTOR + UUID.randomUUID().toString());
            isInsert = false;
        }
//        Metadata metadata = new Metadata();
//        if (vectorRecord.getMetadata() != null) {
//            for (VectorRecord.Pair pair : vectorRecord.getMetadata()) {
//                metadata.put(pair.getKey(), pair.getValue());
//            }
//        }
        String text = vectorRecord.getContent();
//        metadata.put("text_segment" , text);
        Embedding embedding = embeddingModel.embed(text).content();

        Struct.Builder structBuilder = Struct.newBuilder();
        if (vectorRecord.getMetadata() != null) {
            for (InsertVectorRecord.Pair pair : vectorRecord.getMetadata()) {
                structBuilder.putFields(pair.getKey(),
                        Value.newBuilder().setStringValue(pair.getValue()).build());
            }
        }
        UpsertResponse upsertResponse = connectedIndex.upsert(
                vectorRecord.getId(), // Vector ID
                embedding.vectorAsList(), // Embedding values as List<Float>
                null,
                null,
                structBuilder.build(), // Metadata as Map<String, String>
                vectorRecord.getNamespace() // Namespace
        );
        System.out.println("插入修改成功" + upsertResponse.toString() );

//        Vector
        Query query = Query.query(Criteria.where("id").is(vectorRecord.getId()));

// 2. 构建更新语句
        Update update = new Update().set("content" , vectorRecord.getContent())
                .set("metadata", vectorRecord.getMetadata())
                .set("updateTime", new Date());;

// 3. 配置upsert选项（核心：开启upsert）

// 4. 执行更新（支持upsert）
        UpdateResult updateResult = mongoTemplate.upsert(query, update, VectorRecord.class);

        if(updateResult.getMatchedCount() == 0){
            throw new GlobalException("没有任何记录背修改");
        }

        queryNamespace = new Query(Criteria.where("name").is(vectorRecord.getNamespace()));
        Update updateNamespace = new Update();
        if(isInsert)
            updateNamespace.inc("recordCount", 1);
        mongoTemplate.updateFirst(queryNamespace, updateNamespace, Namespace.class);
    }

    @Override
    public void bathDeleteRecords(BathUpdateRecordsVo bathUpdateRecordsVo) {
        
    }

    @Override
    public void batchInsertRecords(BathUpdateRecordsVo bathUpdateRecordsVo) {

    }

    @Override
    public List<VectorRecord> getRecords() {
        Query query = new Query();
        List<VectorRecord> records = mongoTemplate.find(query, VectorRecord.class);
        return records;
    }

    @Override
    public List<Namespace> getNamespaces() {
        Query query = new Query();
        List<Namespace> namespaces = mongoTemplate.find(query, Namespace.class);
        return namespaces;
    }

    @Override
    public List<VectorRecord> splitPreview(InsertVectorRecord vectorRecord) {
        if (vectorRecord == null) {
            throw new GlobalException("vectorRecord 不能为空");
        }
        if (StringUtils.isBlank(vectorRecord.getContent())) {
            throw new GlobalException("content不能为空");
        }

        Integer isSplit = vectorRecord.getIsSplit();
        List<String> chunks = new ArrayList<>();

        // isSplit: 0/null 不切割；1 递归切割；其他值视为非法
        if (isSplit == null || isSplit == 0) {
            chunks.add(vectorRecord.getContent().trim());
        } else if (isSplit == 1) {
            // 使用 LangChain4j 的 DocumentSplitters.recursive 实现带重叠的递归切割
            // maxSegmentSize=500, overlapSize=50
            DocumentSplitter splitter = DocumentSplitters.recursive(500, 50);
            Document doc = Document.from(vectorRecord.getContent());
            List<TextSegment> splitSegments = splitter.splitAll(Collections.singletonList(doc));
            for (TextSegment segment : splitSegments) {
                String text = segment.text();
                if (StringUtils.isNotBlank(text)) {
                    chunks.add(text);
                }
            }
        } else {
            throw new GlobalException("isSplit 仅支持 0 或 1");
        }

        List<VectorRecord> result = new ArrayList<>();
        for (String chunk : chunks) {
            if (StringUtils.isBlank(chunk)) {
                continue;
            }

            VectorRecord record = new VectorRecord();
            record.setId(DbConst.PREFIX_VECTOR + UUID.randomUUID().toString());
            record.setNamespace(vectorRecord.getNamespace());
            record.setContent(chunk.trim());
            record.setMetadata(convertMetadata(vectorRecord.getMetadata()));
            result.add(record);
        }
        return result;
    }


    private List<VectorRecord.Pair> convertMetadata(List<InsertVectorRecord.Pair> source) {
        if (source == null) {
            return null;
        }
        List<VectorRecord.Pair> target = new ArrayList<>(source.size());
        for (InsertVectorRecord.Pair pair : source) {
            if (pair == null) {
                continue;
            }
            target.add(new VectorRecord.Pair(pair.getKey(), pair.getValue()));
        }
        return target;
    }
}
