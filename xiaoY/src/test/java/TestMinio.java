 package com.pj.xiaoY;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pj.xiaoY.common.SystemContentRetriever;
import com.pj.xiaoY.entity.Course;
import com.pj.xiaoY.entity.vectorDb.Namespace;
import com.pj.xiaoY.utils.MinioUtil;
import dev.langchain4j.service.spring.AiService;
import io.minio.MinioClient;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;


@SpringBootTest
public class TestMinio {
    @Autowired
    private MinioClient minioClient;

    @Test
    void test23(){
        String jsonString = "{\"avatar\":\"http://192.168.88.130:9001/my-bucket/avatar/8a3592113a7045f9b4cceb25e005b801.png\"}";
        try {
            ObjectMapper mapper = new ObjectMapper();
            Course course = mapper.readValue(jsonString, Course.class);
            System.out.println(course.getAvatar());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    @Test
    void test(){
            System.out.println(minioClient);
    }

    @Test
    void test1(){
        String workingDir = System.getProperty("user.dir");
        System.out.println("当前程序的工作路径：" + workingDir);
    }

//    @Autowired
//    private MongoTemplate mongoTemplate;
//    @Test
//    void testmongodb(){
//        Namespace namespace = new Namespace();
//        namespace.setId("123");
//        namespace.setName("<UNK>");
//        namespace.setDescription("这是一个测试命名空间");
////        namespace.setCreateTime();
//        mongoTemplate.insert(namespace);
//    }

    @Autowired
    private MinioUtil minioUtil;
    @Test
    void test2(){
        String fileName = new String("src/main/resources/static/images/test_upload.jpg");
        MultipartFile multipartFile = null;
        try {
            multipartFile = createMockFile(fileName);
        }catch (Exception e){
            e.printStackTrace();
        }
        System.out.println(multipartFile.getOriginalFilename());
        System.out.println(minioUtil.uploadFile(multipartFile,"test/"));
    }

    @Autowired
    private SystemContentRetriever systemContentRetriever;
    @Resource
    private ObjectMapper objectMapper;
    @Test
    void test_prompt() throws JsonProcessingException {
        System.out.println(systemContentRetriever.systemPrompt);
//        System.out.println(objectMapper.writeValueAsString(systemContentRetriever));
    }

    private MultipartFile createMockFile(String filaName) throws Exception {
        File localFile = new File(filaName);
        return new MockMultipartFile(
                "file",
                localFile.getName(),
                "image/jpeg",
                new FileInputStream(localFile)
        );
    }
}
