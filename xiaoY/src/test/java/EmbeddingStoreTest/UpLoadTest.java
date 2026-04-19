package EmbeddingStoreTest;


import com.pj.xiaoY.entity.vectorDb.Namespace;
import com.pj.xiaoY.entity.vectorDb.VectorRecord;
import com.pj.xiaoY.service.VectorDbService;
import dev.langchain4j.data.document.Document;
import dev.langchain4j.data.document.DocumentSplitter;
import dev.langchain4j.data.document.Metadata;
import dev.langchain4j.data.document.splitter.DocumentSplitters;
import dev.langchain4j.data.embedding.Embedding;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.model.chat.StreamingChatLanguageModel;
import dev.langchain4j.model.embedding.EmbeddingModel;

import dev.langchain4j.store.embedding.EmbeddingStore;
import dev.langchain4j.store.embedding.EmbeddingStoreIngestor;
import dev.langchain4j.store.embedding.pinecone.PineconeEmbeddingStore;
import dev.langchain4j.store.embedding.pinecone.PineconeServerlessIndexConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@SpringBootTest(classes = com.pj.xiaoY.XiaoYApplication.class)
public class UpLoadTest {
    @Autowired
    private EmbeddingModel embeddingModel;

    @Autowired
    private StreamingChatLanguageModel streamingChatLanguageModel;

    @Autowired
    private VectorDbService vectorDbService;
    @Test
    public void test() {

        String fileUrl = "C:\\Users\\zzxcl\\Pictures\\素材\\科大小y\\course-info1.txt";
        String namespace = "course-info";
        try {
            // 核心代码：读取整个文件为字符串（指定编码，避免中文乱码）
            String contents = Files.readString(Paths.get(fileUrl), java.nio.charset.StandardCharsets.UTF_8);
//            System.out.println("文件内容：\n" + contents);
            contents = contents.trim();
            String[] split = contents.split("\\R{4}");
            System.out.println(split.length);
            for (String courseContent : split){
                courseContent = courseContent.trim();
                String[] courseLines = courseContent.split("\\R{1}");
//                System.out.println(courseLines[0]);
//                System.out.println(courseLines[1]);
//                System.out.println(String.join("\n", Arrays.copyOfRange(courseLines, 2, courseLines.length)));
                String text ="课程名称:" + courseLines[0] + "\n"
                        + "授课老师:" + courseLines[1] + "\n"
                        + String.join("\n", Arrays.copyOfRange(courseLines, 2, courseLines.length));
//                Metadata metadata = new Metadata();
//                metadata.put("课程名称", courseLines[0]);
//                metadata.put("授课老师", courseLines[1]);
                VectorRecord vectorRecord = new VectorRecord();
                vectorRecord.setContent(text);
                vectorRecord.setNamespace(namespace);
                List<VectorRecord.Pair> pairs = new ArrayList<>();
                pairs.add(new VectorRecord.Pair("课程名称", courseLines[0]));
                pairs.add(new VectorRecord.Pair("授课老师", courseLines[1]));
                vectorRecord.setMetadata(pairs);
                vectorDbService.insertRecord(vectorRecord);
            }
        } catch (IOException e) {
            e.printStackTrace(); // 捕获文件不存在/权限不足等异常
        }

    }
    @Test
    public void test2() {
            EmbeddingStore<TextSegment> embeddingStore = PineconeEmbeddingStore.builder()
                    .apiKey(System.getenv("PINECONE_API_KEY"))
                    .index("xiao-y-index")//如果指定的索引不存在，将创建一个新的索引
                    .nameSpace("course-info") //如果指定的名称空间不存在，将创建一个新的名称
                    .createIndex(PineconeServerlessIndexConfig.builder()
                            .cloud("AWS") //指定索引部署在 AWS 云服务上。
                            .region("ap-northeast-1") //指定索引所在的 AWS 区域为 us-east-1。
                            .dimension(embeddingModel.dimension()) //指定索引的向量维度，该维度
                            .build())
                    .build();
        String fileUrl = "C:\\Users\\zzxcl\\Pictures\\素材\\科大小y\\course-info2.txt";
        try {
            // 核心代码：读取整个文件为字符串（指定编码，避免中文乱码）
            String contents = Files.readString(Paths.get(fileUrl), java.nio.charset.StandardCharsets.UTF_8);
//            System.out.println("文件内容：\n" + contents);
            contents = contents.trim();
            String[] split = contents.split("\\R{8}");
            System.out.println(split.length);
            for (int i = 0 ; i < split.length; i++){
                String courseContent = split[i];
                courseContent = courseContent.trim();
                String[] courseLines = courseContent.split("\\R{4}");
//                System.out.println(courseLines[0]);
                String[] coureLines_1 = courseLines[0].split("\\R{1}");
//                System.out.println(courseLines[1]);
                String[] coureLines_2 = courseLines[1].split("\\R{1}");
//                System.out.println(Arrays.toString(coureLines_1));
//                System.out.println(Arrays.toString(coureLines_2));
                for(int j = 2; j < courseLines.length; j++){
//                    System.out.println(courseLines[j]);
//                    String[] coureLines_3 = courseLines[j].split("\\R{1}");
//                    System.out.println(Arrays.toString(coureLines_3));
                    Metadata metadata = new Metadata();
                    metadata.put(coureLines_1[0], coureLines_1[1]);
                    metadata.put(coureLines_2[0], coureLines_2[1]);
                    String text = courseLines[0] + "\n" + courseLines[1] + "\n" + courseLines[j];
//                    System.out.println(text);
                    TextSegment segment = TextSegment.from(text , metadata);
                    Embedding embedding = embeddingModel.embed(text).content();
//                    System.out.println(metadata.toString());
                    embeddingStore.add(embedding, segment);
//                    System.out.println("---------");
                }
//                System.out.println("---------");
//                System.out.println(String.join("\n", Arrays.copyOfRange(courseLines, 2, courseLines.length)));
            }

//                String text ="课程名称:" + courseLines[0] + "\n"
//                        + "授课老师:" + courseLines[1] + "\n"
//                        + String.join("\n", Arrays.copyOfRange(courseLines, 2, courseLines.length));
//                Metadata metadata = new Metadata();
//                metadata.put("课程名称", courseLines[0]);
//                metadata.put("授课老师", courseLines[1]);
//                TextSegment segment = TextSegment.from(text , metadata);
//
//
////                Embedding embedding = embeddingModel.embed(segment).content();
////                System.out.println("课程名称:" + courseLines[0] + "\n"
////                + "授课老师:" + courseLines[1] + "\n"
////                + String.join("\n", Arrays.copyOfRange(courseLines, 2, courseLines.length)));
//                Embedding embedding = embeddingModel.embed(text).content();
//                embeddingStore.add(embedding, segment);
//            }
        } catch (IOException e) {
            e.printStackTrace(); // 捕获文件不存在/权限不足等异常
        }
    }
    @Autowired
    private EmbeddingModel qwenEmbeddingModel;
    @Test
    public void test3() {
//        embeddingModel.dimension();
        System.out.println(qwenEmbeddingModel.dimension());
    }

    @Test
    public void test4() {
        EmbeddingStore<TextSegment> embeddingStore = PineconeEmbeddingStore.builder()
                .apiKey(System.getenv("PINECONE_API_KEY"))
                .index("xiao-y-index")//如果指定的索引不存在，将创建一个新的索引
                .nameSpace("course-info2") //如果指定的名称空间不存在，将创建一个新的名称
                .createIndex(PineconeServerlessIndexConfig.builder()
                        .cloud("AWS") //指定索引部署在 AWS 云服务上。
                        .region("us-east-1") //指定索引所在的 AWS 区域为 us-east-1。
                        .dimension(embeddingModel.dimension()) //指定索引的向量维度，该维度
                        .build())
                .build();
        String fileUrl = "C:\\Users\\zzxcl\\Pictures\\素材\\科大小y\\course-info1.txt";
        try {
            // 核心代码：读取整个文件为字符串（指定编码，避免中文乱码）
            String contents = Files.readString(Paths.get(fileUrl), java.nio.charset.StandardCharsets.UTF_8);
//            System.out.println("文件内容：\n" + contents);
            contents = contents.trim();
            String[] split = contents.split("\\R{4}");
            System.out.println(split.length);
            for (String courseContent : split){
                courseContent = courseContent.trim();
                String[] courseLines = courseContent.split("\\R{1}");
//                System.out.println(courseLines[0]);
//                System.out.println(courseLines[1]);
//                System.out.println(String.join("\n", Arrays.copyOfRange(courseLines, 2, courseLines.length)));
                String text ="课程名称:" + courseLines[0] + "\n"
                        + "授课老师:" + courseLines[1] + "\n"
                        + String.join("\n", Arrays.copyOfRange(courseLines, 2, courseLines.length));

                Metadata metadata = new Metadata();
                metadata.put("课程名称", courseLines[0]);
                metadata.put("授课老师", courseLines[1]);
                Document document = Document.from(text , metadata);
                DocumentSplitter splitter = DocumentSplitters.recursive(150, 80);

                List<TextSegment> splitChunks = splitter.split(document);
//                TextSegment segment = TextSegment.from(text , metadata);

//                Embedding embedding = embeddingModel.embed(text).content();

//                Embedding embedding = embeddingModel.embed(segment).content();
//                System.out.println("课程名称:" + courseLines[0] + "\n"
//                + "授课老师:" + courseLines[1] + "\n"
//                + String.join("\n", Arrays.copyOfRange(courseLines, 2, courseLines.length)));

//                embeddingStore.addAll(splitChunks);
//                embeddingStore.add(embedding, segment);
                for(TextSegment textSegment : splitChunks){
                    Embedding embedding = embeddingModel.embed(textSegment).content();
                    embeddingStore.add(embedding, textSegment);
                }
            }
        } catch (IOException e) {
            e.printStackTrace(); // 捕获文件不存在/权限不足等异常
        }

    }
    @Test
    public void test5() {

        String fileUrl = "C:\\Users\\zzxcl\\Pictures\\素材\\科大小y\\course-info1.txt";
        try {
            // 核心代码：读取整个文件为字符串（指定编码，避免中文乱码）
            String contents = Files.readString(Paths.get(fileUrl), java.nio.charset.StandardCharsets.UTF_8);
//            System.out.println("文件内容：\n" + contents);
            contents = contents.trim();
            String[] split = contents.split("\\R{4}");
            System.out.println(split.length);
            for (String courseContent : split){
                courseContent = courseContent.trim();
                String[] courseLines = courseContent.split("\\R{1}");
//                System.out.println(courseLines[0]);
//                System.out.println(courseLines[1]);
//                System.out.println(String.join("\n", Arrays.copyOfRange(courseLines, 2, courseLines.length)));
                String text ="课程名称:" + courseLines[0] + "  "
                        + "授课老师:" + courseLines[1];
                System.out.println(text);
//                Metadata metadata = new Metadata();
//                metadata.put("课程名称", courseLines[0]);
//                metadata.put("授课老师", courseLines[1]);


//                TextSegment segment = TextSegment.from(text , metadata);

//                Embedding embedding = embeddingModel.embed(text).content();

//                Embedding embedding = embeddingModel.embed(segment).content();
//                System.out.println("课程名称:" + courseLines[0] + "\n"
//                + "授课老师:" + courseLines[1] + "\n"
//                + String.join("\n", Arrays.copyOfRange(courseLines, 2, courseLines.length)));

//                embeddingStore.addAll(splitChunks);
//                embeddingStore.add(embedding, segment);

            }
        } catch (IOException e) {
            e.printStackTrace(); // 捕获文件不存在/权限不足等异常
        }

    }
}
