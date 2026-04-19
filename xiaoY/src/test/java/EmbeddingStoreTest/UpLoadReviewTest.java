package EmbeddingStoreTest;

import com.pj.xiaoY.entity.Course;
import com.pj.xiaoY.entity.CourseComment;
import com.pj.xiaoY.entity.vectorDb.VectorRecord;
import com.pj.xiaoY.mapper.CourseCommentMapper;
import com.pj.xiaoY.service.CourseCommentService;
import com.pj.xiaoY.service.CourseService;
import com.pj.xiaoY.service.VectorDbService;
import dev.langchain4j.data.document.Metadata;
import dev.langchain4j.data.embedding.Embedding;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.store.embedding.EmbeddingStore;
import dev.langchain4j.store.embedding.pinecone.PineconeEmbeddingStore;
import dev.langchain4j.store.embedding.pinecone.PineconeServerlessIndexConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

@SpringBootTest(classes = com.pj.xiaoY.XiaoYApplication.class)
public class UpLoadReviewTest {
    @Autowired
    private EmbeddingModel embeddingModel;
    @Autowired
    private CourseCommentService courseCommentService;
    @Autowired
    private CourseService courseService;
    @Autowired
    private VectorDbService vectorDbService;
    @Test
    public void test() {
//        EmbeddingStore<TextSegment> embeddingStore = PineconeEmbeddingStore.builder()
//                .apiKey(System.getenv("PINECONE_API_KEY"))
//                .index("xiao-y-index")//如果指定的索引不存在，将创建一个新的索引
//                .nameSpace("course-review") //如果指定的名称空间不存在，将创建一个新的名称
//                .createIndex(PineconeServerlessIndexConfig.builder()
//                        .cloud("AWS") //指定索引部署在 AWS 云服务上。
//                        .region("us-east-1") //指定索引所在的 AWS 区域为 us-east-1。
//                        .dimension(embeddingModel.dimension()) //指定索引的向量维度，该维度
//                        .build())
//                .build();

        try {

            List<CourseComment> courseComments = courseCommentService.list();
            List<Course> courses = courseService.list();
            Map<Integer , Course> courseMap = new TreeMap<>();
            for(Course course : courses){
                courseMap.put(course.getId(), course);
            }
            Course defaultCourse = new Course();
            defaultCourse.setCourseName("未知课程");
            defaultCourse.setTeacher("未知教师");
            String namespace = "course-review";
            for (CourseComment courseComment : courseComments) {
//                System.out.println(courseComment.getCourseName());
//                System.out.println(courseMap.getOrDefault(courseComment.getCourseId(), null));
                Course course = courseMap.getOrDefault(courseComment.getCourseId(), defaultCourse );
//                System.out.println(course.getCourseName() + " " + course.getTeacher() );
                String text = "课程名称: " + course.getCourseName() +  "\n授课老师: " + course.getTeacher() + "\n课程评价:\n" + courseComment.getContent();
                VectorRecord vectorRecord = new VectorRecord();
                vectorRecord.setContent(text);
                List<VectorRecord.Pair> pairs = new ArrayList<>();
                pairs.add(new VectorRecord.Pair("课程名称", course.getCourseName()));
                pairs.add(new VectorRecord.Pair("授课老师", course.getTeacher()));
                vectorRecord.setMetadata(pairs);
                vectorRecord.setNamespace(namespace);
                vectorDbService.insertRecord(vectorRecord);
//                TextSegment segment = TextSegment.from(text , metadata);
//                System.out.println(text);
                //
//                Embedding embedding = embeddingModel.embed(segment).content();
////                System.out.println("课程名称:" + courseLines[0] + "\n"
////                + "授课老师:" + courseLines[1] + "\n"
////                + String.join("\n", Arrays.copyOfRange(courseLines, 2, courseLines.length)));
//                Embedding embedding = embeddingModel.embed(text).content();
//                embeddingStore.add(embedding, segment);
//                System.out.println(courseComment.getContent());
            }


//
//
////                Embedding embedding = embeddingModel.embed(segment).content();
////                System.out.println("课程名称:" + courseLines[0] + "\n"
////                + "授课老师:" + courseLines[1] + "\n"
////                + String.join("\n", Arrays.copyOfRange(courseLines, 2, courseLines.length)));
//                Embedding embedding = embeddingModel.embed(text).content();
//                embeddingStore.add(embedding, segment);

        } catch (Exception e) {
            e.printStackTrace(); // 捕获文件不存在/权限不足等异常
        }

    }
}
