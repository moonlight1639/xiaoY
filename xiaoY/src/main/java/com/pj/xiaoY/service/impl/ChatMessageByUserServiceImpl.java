package com.pj.xiaoY.service.impl;

import com.github.xiaoymin.knife4j.core.util.StrUtil;
import com.pj.xiaoY.assistant.XiaoY;
import com.pj.xiaoY.common.RedisKeyPrefixConst;
import com.pj.xiaoY.common.exception.GlobalException;
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
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class ChatMessageByUserServiceImpl implements ChatMessageByUserService {


    @Autowired
    private ChatMessageByUserRepository chatMessageByUserRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;
    @Override
    public ChatMessageByUser getByMemoryId(String memoryId) {
        ChatMessageByUser result =  chatMessageByUserRepository.findByMemoryId(memoryId);
        return result;
    }


    @Override
    public List<ChatMessagesTitle> getList() {
        Integer userId = UserInfoThreadPoolUtil.get().getId();
        Query query = Query.query(Criteria.where("userId").is(userId));
        query.with(Sort.by(Sort.Direction.DESC, "createTime"));
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
    @Autowired
    private ExecutorService aiExecutor;
    @Override
    public ChatMessagesVO xiaoY_chat(ChatForm chatform) {
        if(StrUtil.isBlank(chatform.getContent())){
            /*
            * 这里后续需要写一个返回失败的接口*/
            return null;
        }
//        Flux<String>
        String response = "";
        ChatMessageByUser chatMessageByUser = new ChatMessageByUser();
        String memoryId = chatform.getMemoryId();
        if(StrUtil.isBlank(memoryId)){
            memoryId = UUID.randomUUID().toString();
            chatMessageByUser.setMemoryId(memoryId);
//            chatMessageByUser.setMemoryId(UUID.randomUUID().toString());
            chatMessageByUser.setUserId(UserInfoThreadPoolUtil.get().getId());
            String new_title = chatform.getContent().substring(0 , Math.min(10 , chatform.getContent().length()));
            chatMessageByUser.setTitle(new_title);
            chatMessageByUser.setCreateTime(LocalDateTime.now());
            chatMessageByUser.setMessages(new ArrayList<SingleMessages>());
            stringRedisTemplate.opsForValue().set(RedisKeyPrefixConst.PREFIX_CHAT_MESSAGE_TITLE + memoryId, new_title , 1, TimeUnit.HOURS);
        }else{
            String title = null;
            String redis_title = stringRedisTemplate.opsForValue().get(RedisKeyPrefixConst.PREFIX_CHAT_MESSAGE_TITLE + memoryId);
            if(redis_title != null){
                title = redis_title;
            }else {
                Query query_title = Query.query(Criteria.where("memoryId").is(chatform.getMemoryId()));
                query_title.fields().include("title").exclude("_id");
                title = mongoTemplate.findOne(query_title, ChatMessageByUser.class, "chat_messages_by_user").getTitle();
                if(title == null){
                    throw new GlobalException("不存在的聊天记录！");
                }
                stringRedisTemplate.opsForValue().set(RedisKeyPrefixConst.PREFIX_CHAT_MESSAGE_TITLE + memoryId, title, 1, TimeUnit.HOURS);
            }

             chatMessageByUser.setTitle(title);
        }
        try{
            response =  xiaoY.chat(memoryId , chatform.getContent());
        }catch (Exception e){
            throw new GlobalException("聊天接口失败");
            /*
             * 后续写出现问题怎么办*/
        }
        ChatMessagesVO assistantMessages = new ChatMessagesVO();
        assistantMessages.setMemoryId(memoryId);
        assistantMessages.setTitle(chatMessageByUser.getTitle());
        assistantMessages.setType(MessageType.ASSISTANT.getType());
        assistantMessages.setContent(response);
        assistantMessages.setCreateTime(LocalDateTime.now());

        String finalResponse = response;
        String finalMemoryId = memoryId;
        CompletableFuture<Void> task3 =
                CompletableFuture.runAsync(() -> saveChatMessageByUser(chatMessageByUser , chatform.getContent() , finalResponse, finalMemoryId) , aiExecutor);
        return assistantMessages;


//        return null;
//        return null;
    }


    void saveChatMessageByUser(ChatMessageByUser chatMessageByUser , String request , String response , String memoryId){
        try {
            System.out.println("任务执行");
            if (StrUtil.isBlank(chatMessageByUser.getMemoryId()) == false) {
                chatMessageByUser.setMemoryId(memoryId);
                chatMessageByUserRepository.save(chatMessageByUser);
            }
            if (chatMessageByUser != null) {
                SingleMessages userMessages = new SingleMessages();
                userMessages.setType(MessageType.USER.getType());
                userMessages.setContent(request);
                userMessages.setCreateTime(LocalDateTime.now());


                //------------------------------------------------

                Query query_user = Query.query(Criteria.where("memoryId").is(memoryId));
                Update update_user = new Update();
                update_user.push("messages").each(userMessages);
                mongoTemplate.updateFirst(query_user, update_user, "chat_messages_by_user");


                //-----------------------------------------------


                Query query_title = Query.query(Criteria.where("memoryId").is(memoryId));
                query_title.fields().include("title").exclude("_id");
                String title = mongoTemplate.findOne(query_title, ChatMessageByUser.class, "chat_messages_by_user").getTitle();
                SingleMessages assistantMessages = new ChatMessagesVO();
                assistantMessages.setType(MessageType.ASSISTANT.getType());
                assistantMessages.setContent(response);
                assistantMessages.setCreateTime(LocalDateTime.now());
                update_user.push("messages").each(assistantMessages);
                mongoTemplate.updateFirst(query_user, update_user, "chat_messages_by_user");
                System.out.println("聊天记录保存成功");
            } else {
                System.out.println("聊天记录保存失败");
                throw new GlobalException("聊天接口失败（MongoDB）");
                /*
                 * 这里后续需要写一个返回失败的接口*/
            }
        }catch (Exception e){

            e.printStackTrace();
        }
    }
}
