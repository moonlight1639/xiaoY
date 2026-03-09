package com.pj.xiaoY.controller;

import com.pj.xiaoY.common.Result;
import com.pj.xiaoY.entity.ChatForm;
import com.pj.xiaoY.entity.SingleMessages;
import com.pj.xiaoY.entity.vo.ChatMessagesList;
import com.pj.xiaoY.entity.vo.ChatMessagesTitle;
import com.pj.xiaoY.entity.vo.ChatMessagesVO;
import com.pj.xiaoY.service.ChatMessageByUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("xiaoY/chatmessagebyuser")
public class ChatMessageByUserController {

    @Autowired
    ChatMessageByUserService chatMessageByUserService;

    @GetMapping("/{memoryId}")
    public Result getByMomeyId(@PathVariable("memoryId") String memoryId) {
        System.out.println("memoryId: " + memoryId);
        return Result.ok(chatMessageByUserService.getByMemoryId(memoryId));
    }


    @GetMapping("/list")
    public Result getList() {
//        System.out.println("memoryId: " + memoryId);
        List<ChatMessagesTitle> titleList = chatMessageByUserService.getList();
        return Result.ok(titleList , titleList.size());
    }

    @GetMapping("/getmessages/{memoryId}")
    public Result getMessages(@PathVariable("memoryId") String memoryId) {
//        System.out.println("memoryId: " + memoryId);
        ChatMessagesList messages = chatMessageByUserService.getMessages(memoryId);
        return Result.ok(messages);
    }

    @PostMapping("/xiaoY_chat")
    public Result xiaoY_chat(@RequestBody ChatForm chatform) {
//        System.out.println("memoryId: " + memoryId);
//        ChatMessagesList messages = chatMessageByUserService.getMessages(memoryId);
        ChatMessagesVO singleMessages = chatMessageByUserService.xiaoY_chat(chatform);
        return Result.ok(singleMessages);
    }

    @GetMapping("/streaming-chat-test")
    public Flux<String> streamingChatTest(@RequestParam String userMessage){
        return chatMessageByUserService.streamingChatTest(userMessage);
    }

    @PostMapping("/streaming-chat")
    public Flux<String> streamingChat(@RequestBody ChatForm chatform){
        return chatMessageByUserService.streamingChat(chatform);
    }

    @PostMapping("/get-new-memoryid")
    public Result getNewMemoryId(@RequestBody ChatForm chatform) {
        ChatMessagesVO newMemoryId = chatMessageByUserService.getNewMemoryId(chatform);
        return Result.ok(newMemoryId);
    }
}
