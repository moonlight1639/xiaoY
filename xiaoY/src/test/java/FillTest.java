// package com.pj.xiaoY;


import com.pj.xiaoY.assistant.XiaoY;
import com.pj.xiaoY.utils.SpringResourceReader;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class FillTest {
    @Autowired
    private XiaoY xiaoY;
    @Autowired
    private SpringResourceReader springResourceReader;

    @Test
    public void fillTest(){
        String userClass = "";
        try {
            userClass = springResourceReader.readResourceFile("class_description/UserInfo.txt");
        }catch (Exception e){
            e.printStackTrace();
        }
        String fill = xiaoY.fill(userClass, "李四,男，20岁，来自中国科学技术大学，喜欢编程和篮球。");
        System.out.println(fill);
    }
}
