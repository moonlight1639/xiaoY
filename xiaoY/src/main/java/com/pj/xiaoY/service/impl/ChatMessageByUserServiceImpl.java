package com.pj.xiaoY.service.impl;

import com.github.xiaoymin.knife4j.core.util.StrUtil;
import com.pj.xiaoY.assistant.XiaoY;
import com.pj.xiaoY.assistant.xiaoYStreaming;
import com.pj.xiaoY.common.RedisKeyPrefixConst;
import com.pj.xiaoY.common.exception.GlobalException;
import com.pj.xiaoY.entity.ChatForm;
import com.pj.xiaoY.entity.ChatMessageByUser;
import com.pj.xiaoY.entity.ChatMessages;
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
import org.springframework.data.mongodb.core.aggregation.AggregationUpdate;
import org.springframework.data.mongodb.core.aggregation.ArrayOperators;
import org.springframework.data.mongodb.core.aggregation.StringOperators;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;
import org.springframework.data.mongodb.core.aggregation.ArithmeticOperators;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class ChatMessageByUserServiceImpl implements ChatMessageByUserService {


    @Autowired
    private xiaoYStreaming xiaoYStreaming;
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
//            System.out.println("任务执行");
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
//                System.out.println("聊天记录保存成功");
            } else {
//                System.out.println("聊天记录保存失败");
                throw new GlobalException("聊天接口失败（MongoDB）");
                /*
                 * 这里后续需要写一个返回失败的接口*/
            }
        }catch (Exception e){

            e.printStackTrace();
        }
    }

    public void  saveStreamingAssistant(String memoryId , String response) {
        Query query = Query.query(Criteria.where("memoryId").is(memoryId));
        query.fields()
                .include("messages")   // 只要messages
                .exclude("_id");
        ChatMessageByUser Message =
                mongoTemplate.findOne(query, ChatMessageByUser.class);
        // 2. 更新操作：定位最后一条Message，追加content
        String oldContent = Message.getMessages().get(Message.getMessages().size() - 1).getContent();
        Message.getMessages().get(Message.getMessages().size() - 1).setContent(oldContent + response);
        Update update = new Update().set("messages", Message.getMessages());

        mongoTemplate.updateFirst(
                Query.query(Criteria.where("memoryId").is(memoryId)),
                update,
                ChatMessageByUser.class
        );
    }

    public Mono<Void> saveToDb(String chunk, String conversationId) {
//        System.out.println("正在保存到DB: " + chunk);
        // 模拟异步 DB 操作
        return Mono.fromRunnable(() -> {
            saveStreamingAssistant(conversationId , chunk);
        }).then();
    }


    @Override
    public Flux<String> streamingChat(ChatForm chatform) {
        if(chatform == null){
            throw new GlobalException("请求参数全空");
        }
        if(chatform.getMemoryId() == null){
            throw new GlobalException("请求参数缺少 memoryId");
        }
        if(chatform.getContent() == null){
            throw new GlobalException("请求参数缺少 content");
        }
        Query query_user = Query.query(Criteria.where("memoryId").is(chatform.getMemoryId()));

        Update update_user = new Update();
        SingleMessages userMessages = new SingleMessages();
        userMessages.setType(MessageType.USER.getType());
        userMessages.setContent(chatform.getContent());
        userMessages.setCreateTime(LocalDateTime.now());
        update_user.push("messages").each(userMessages);
        mongoTemplate.updateFirst(query_user, update_user, "chat_messages_by_user");

        SingleMessages assistantMessages = new SingleMessages();
        assistantMessages.setType(MessageType.ASSISTANT.getType());
        assistantMessages.setContent("");
        assistantMessages.setCreateTime(LocalDateTime.now());
        Update update_assitant = new Update();
        update_assitant.push("messages").each(assistantMessages);
        Query query_assistant = Query.query(Criteria.where("memoryId").is(chatform.getMemoryId()));
        mongoTemplate.updateFirst(query_assistant, update_assitant, "chat_messages_by_user");
//        mongoTemplate.updateFirst(query_user, update_user, "chat_messages_by_user");
        return xiaoYStreaming.test("你好呀")
                .flatMap(chunk ->
                        saveToDb(chunk, chatform.getMemoryId())
                                .thenReturn(chunk) // 保存完成后，把原始数据放回流中，继续传给前端
                                .onErrorResume(e -> {
                                    // 如果保存失败，不要中断给前端的流，记录错误后继续返回原数据
                                    System.err.println("DB 保存失败: " + e.getMessage());
                                    return Mono.just(chunk);
                                })
                                .subscribeOn(Schedulers.boundedElastic()) // 确保 DB 操作不在 IO 线程池阻塞
                );
    }

    @Override
    public ChatMessagesVO getNewMemoryId(ChatForm chatform) {
        if(chatform.getContent() == null){
            throw new GlobalException("不要传空的内容哦！");
        }
        ChatMessageByUser chatMessageByUser = new ChatMessageByUser();
        String newMemoryId = UUID.randomUUID().toString();
        chatMessageByUser.setMemoryId(newMemoryId);
        chatMessageByUser.setUserId(UserInfoThreadPoolUtil.get().getId());
        String new_title = chatform.getContent().substring(0 , Math.min(10 , chatform.getContent().length()));
        chatMessageByUser.setTitle(new_title);
        chatMessageByUser.setCreateTime(LocalDateTime.now());
        chatMessageByUser.setMessages(new ArrayList<SingleMessages>());
        stringRedisTemplate.opsForValue().set(RedisKeyPrefixConst.PREFIX_CHAT_MESSAGE_TITLE + newMemoryId, new_title , 1, TimeUnit.HOURS);
        chatMessageByUserRepository.save(chatMessageByUser);
        ChatMessagesVO ans = new ChatMessagesVO();
        ans.setMemoryId(newMemoryId);
        ans.setTitle(new_title);
        ans.setCreateTime(chatMessageByUser.getCreateTime());
        ans.setType(MessageType.USER.getType());
        return ans;
    }




    @Override
    public Flux<String> streamingChatTest(String userMessage) {
//        return xiaoYStreaming.test(userMessage);
        return xiaoYStreaming.test("你好呀")
                .flatMap(chunk ->
                        saveToDb(chunk, "conversationId")
                                .thenReturn(chunk) // 保存完成后，把原始数据放回流中，继续传给前端
                                .onErrorResume(e -> {
                                    // 如果保存失败，不要中断给前端的流，记录错误后继续返回原数据
                                    System.err.println("DB 保存失败: " + e.getMessage());
                                    return Mono.just(chunk);
                                })
                                .subscribeOn(Schedulers.boundedElastic()) // 确保 DB 操作不在 IO 线程池阻塞
                );
    }
}
