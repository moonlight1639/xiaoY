package com.pj.xiaoY.controller;

import com.pj.xiaoY.common.Result;
import com.pj.xiaoY.entity.ChatForm;
import com.pj.xiaoY.entity.vo.ChatMessagesList;
import com.pj.xiaoY.entity.vo.ChatMessagesTitle;
import com.pj.xiaoY.entity.vo.ChatMessagesVO;
import com.pj.xiaoY.service.ChatMessageByUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.List;

@RestController
@RequestMapping("xiaoY/chatmessagebyuser")
@Tag(name = "用户聊天消息", description = "聊天历史、流式聊天与会话管理接口")
public class ChatMessageByUserController {

    @Autowired
    ChatMessageByUserService chatMessageByUserService;

    @GetMapping("/{memoryId}")
    @Operation(summary = "按 memoryId 查询消息", description = "根据 memoryId 获取聊天消息")
    public Result getByMomeyId(@Parameter(description = "memoryId") @PathVariable("memoryId") String memoryId) {
        System.out.println("memoryId: " + memoryId);
        return Result.ok(chatMessageByUserService.getByMemoryId(memoryId));
    }

    @GetMapping("/list")
    @Operation(summary = "获取会话列表", description = "查询聊天会话标题列表")
    public Result getList() {
        List<ChatMessagesTitle> titleList = chatMessageByUserService.getList();
        return Result.ok(titleList , titleList.size());
    }

    @GetMapping("/getmessages/{memoryId}")
    @Operation(summary = "获取会话消息", description = "根据 memoryId 获取会话消息详情")
    public Result getMessages(@Parameter(description = "memoryId") @PathVariable("memoryId") String memoryId) {
        ChatMessagesList messages = chatMessageByUserService.getMessages(memoryId);
        return Result.ok(messages);
    }

    @PostMapping("/xiaoY_chat")
    @Operation(summary = "发送聊天消息", description = "普通聊天接口")
    public Result xiaoY_chat(@RequestBody ChatForm chatform) {
        ChatMessagesVO singleMessages = chatMessageByUserService.xiaoY_chat(chatform);
        return Result.ok(singleMessages);
    }

    @GetMapping("/streaming-chat-test")
    @Operation(summary = "流式聊天测试", description = "按文本参数进行流式响应测试")
    public Flux<String> streamingChatTest(@Parameter(description = "用户消息") @RequestParam String userMessage){
        return chatMessageByUserService.streamingChatTest(userMessage);
    }

    @PostMapping("/streaming-chat")
    @Operation(summary = "流式聊天", description = "按 ChatForm 进行流式返回")
    public Flux<String> streamingChat(@RequestBody ChatForm chatform){
        return chatMessageByUserService.streamingChat(chatform);
    }

    @PostMapping("/get-new-memoryid")
    @Operation(summary = "获取新的 memoryId", description = "根据聊天参数生成新的 memoryId")
    public Result getNewMemoryId(@RequestBody ChatForm chatform) {
        ChatMessagesVO newMemoryId = chatMessageByUserService.getNewMemoryId(chatform);
        return Result.ok(newMemoryId);
    }
}
