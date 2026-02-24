package com.pj.xiaoY.repository;

import com.pj.xiaoY.entity.ChatMessageByUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageByUserRepository extends MongoRepository<ChatMessageByUser, String> {
//     按userId查询用户的消息列表
    List<ChatMessageByUser> findByUserId(Integer userId);

    ChatMessageByUser findByMemoryId(String memoryId);

    // 按userId+memoryId查询（唯一）
    ChatMessageByUser findByUserIdAndMemoryId(Integer userId, String memoryId);
}
