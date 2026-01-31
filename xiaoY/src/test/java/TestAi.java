package com.pj;
import com.pj.xiaoY.assistant.XiaoY;
import dev.langchain4j.community.model.dashscope.QwenStreamingChatModel;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TestAi {
    @Autowired
    private XiaoY xiaoY;

//    @Test
//    public void test(){
//
//        String result = xiaoY.chat(1L , "你好，我叫小梅");
//        System.out.println(result);
//        result = xiaoY.chat(1L , "你好 ， 我是谁");
//        System.out.println(result);
//    }

//    @Autowired
//    private QwenChatModel  qwenChatModel;
    @Autowired
    private QwenStreamingChatModel qwenStreamingChatModel;
    @Test
    public void test1(){
        String result = xiaoY.chat(1L, "你好");
        System.out.println(result);
    }

}
