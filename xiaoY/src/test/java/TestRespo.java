// package com.pj.xiaoY;
import com.mongodb.client.MongoDatabase;
import com.pj.xiaoY.entity.ChatMessageByUser;
import com.pj.xiaoY.entity.SingleMessages;
import com.pj.xiaoY.entity.enums.MessageType;
import com.pj.xiaoY.repository.ChatMessageByUserRepository;
import com.pj.xiaoY.service.ChatMessageByUserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@SpringBootTest
public class TestRespo {
    @Autowired
    private ChatMessageByUserRepository chatMessageByUserRepository;

    @Test
    public void test(){
        ChatMessageByUser chatMessageByUser = new ChatMessageByUser();
        chatMessageByUser.setUserId(1);
        chatMessageByUser.setMemoryId(UUID.randomUUID().toString());
        chatMessageByUser.setTitle("丽莎李松");

        chatMessageByUser.setCreateTime(LocalDateTime.now());
        List<SingleMessages> list = new ArrayList<>();
        SingleMessages singleMessages = new SingleMessages();
        singleMessages.setType(MessageType.USER.getType());
        singleMessages.setContent("你好呀");
        singleMessages.setCreateTime(LocalDateTime.now());
        list.add(singleMessages);
        chatMessageByUser.setMessages(list);
        chatMessageByUserRepository.save(chatMessageByUser);
//        System.out.println(chatMessageByUserRepository.findByMemoryId("a1212341234234"));
    }

    @Autowired
    private MongoTemplate mongoTemplate;
    @Test
    public void test1(){
        MongoDatabase db = mongoTemplate.getDb();
//        System.out.println("数据库地址：" + db.getClient().getClusterDescription().getServerDescriptions().get(0).getAddress());
        System.out.println("数据库名：" + db.getName());
    }

    @Test
    public void test2() {
        ChatMessageByUser chatMessageByUser = chatMessageByUserRepository.findByMemoryId("2345a1");
        System.out.println(chatMessageByUser);
    }

    @Test
    public void test3() {
        for(int i = 0 ; i < 5 ; i ++)
            test();
//        ChatMessageByUser chatMessageByUser = chatMessageByUserRepository.findByMemoryId("2345a1");
//        System.out.println(chatMessageByUser);
    }
}
