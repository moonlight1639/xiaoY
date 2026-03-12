package com.pj.xiaoY;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pj.xiaoY.entity.Course;
import com.pj.xiaoY.utils.MinioUtil;
import io.minio.MinioClient;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
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
