package com.pj.xiaoY.service.impl;

import com.github.xiaoymin.knife4j.core.util.StrUtil;
import com.pj.xiaoY.assistant.XiaoY;
import com.pj.xiaoY.entity.ChatForm;
import com.pj.xiaoY.entity.ChatMessageByUser;
import com.pj.xiaoY.entity.SingleMessages;
import com.pj.xiaoY.entity.enums.MessageType;
import com.pj.xiaoY.entity.vo.ChatMessagesList;
import com.pj.xiaoY.entity.vo.ChatMessagesTitle;
import com.pj.xiaoY.entity.vo.ChatMessagesVO;
import com.pj.xiaoY.repository.ChatMessageByUserRepository;
import com.pj.xiaoY.service.ChatMessageByUserService;
import com.pj.xiaoY.utils.UserInfoThreadPoolUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ChatMessageByUserServiceImpl implements ChatMessageByUserService {


    @Autowired
    private ChatMessageByUserRepository chatMessageByUserRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public ChatMessageByUser getByMemoryId(String memoryId) {
        ChatMessageByUser result =  chatMessageByUserRepository.findByMemoryId(memoryId);
        return result;
    }


    @Override
    public List<ChatMessagesTitle> getList() {
        Integer userId = UserInfoThreadPoolUtil.get().getId();
        Query query = Query.query(Criteria.where("userId").is(userId));
// 2. 只查询 userId、memoryId 字段，排除 _id
        query.fields()
                .include("memoryId")
                .include("title")
                .include("createTime")
                .exclude("_id");

// 3. 执行查询，结果存入 List<ChatMessageByUser>
        List<ChatMessagesTitle> list = mongoTemplate.find(query, ChatMessagesTitle.class , "chat_messages_by_user");
        return list;
    }

    @Override
    public ChatMessagesList getMessages(String memoryId) {
        Query query = Query.query(Criteria.where("memoryId").is(memoryId));
// 2. 只查询 userId、memoryId 字段，排除 _id
        query.fields()
                .include("memoryId")
                .include("title")
                .include("createTime")
                .include("messages")
                .exclude("_id");

// 3. 执行查询，结果存入 List<ChatMessageByUser>
        ChatMessagesList messages = mongoTemplate.findOne(query, ChatMessagesList.class , "chat_messages_by_user");
        return messages;

    }

    @Autowired
    private XiaoY xiaoY;
    @Override
    public ChatMessagesVO xiaoY_chat(ChatForm chatform) {
        if(StrUtil.isBlank(chatform.getContent())){
            /*
            * 这里后续需要写一个返回失败的接口*/
            return null;
        }
        Integer userId = UserInfoThreadPoolUtil.get().getId();
        if(StrUtil.isBlank(chatform.getMemoryId())){

            ChatMessageByUser chatMessageByUser = new ChatMessageByUser();
            chatMessageByUser.setMemoryId(UUID.randomUUID().toString());
            chatMessageByUser.setUserId(userId);
            chatMessageByUser.setTitle(chatform.getContent().substring(0 , Math.min(10 , chatform.getContent().length())));
            chatMessageByUser.setCreateTime(LocalDateTime.now());
            chatMessageByUser.setMessages(new ArrayList<SingleMessages>());
            chatMessageByUserRepository.save(chatMessageByUser);
            chatform.setMemoryId(chatMessageByUser.getMemoryId());
        }
        ChatMessageByUser chatMessageByUser = chatMessageByUserRepository.findByMemoryId(chatform.getMemoryId());
        if(chatMessageByUser != null){
            SingleMessages userMessages = new SingleMessages();
            userMessages.setType(MessageType.USER.getType());
            userMessages.setContent(chatform.getContent());
            userMessages.setCreateTime(LocalDateTime.now());


                //------------------------------------------------
            String response = "";
            try{
                response =  xiaoY.chat(chatform.getMemoryId() , chatform.getContent());
            }catch (Exception e){
                /*
                * 后续写出现问题怎么办*/
            }

            Query query_title = Query.query(Criteria.where("memoryId").is(chatform.getMemoryId()));
            query_title.fields().include("title").exclude("_id");
            String title = mongoTemplate.findOne(query_title , ChatMessageByUser.class , "chat_messages_by_user").getTitle();
            ChatMessagesVO assistantMessages = new ChatMessagesVO();
            assistantMessages.setMemoryId(chatform.getMemoryId());
            assistantMessages.setTitle(title);
            assistantMessages.setType(MessageType.ASSISTANT.getType());
            assistantMessages.setContent(response);
            assistantMessages.setCreateTime(LocalDateTime.now());

            //-----------------------------------------------


            Query query_user = Query.query(Criteria.where("memoryId").is(chatform.getMemoryId()));
            Update update_user = new Update();
            update_user.push("messages").each(userMessages , assistantMessages);
            mongoTemplate.updateFirst(query_user, update_user , "chat_messages_by_user");

            return assistantMessages;
        }else{
            /*
            * 这里后续需要写一个返回失败的接口*/
        }

        return null;
    }

}
