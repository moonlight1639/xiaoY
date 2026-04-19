package com.pj.xiaoY.controller;

import com.pj.xiaoY.assistant.XiaoY;
import com.pj.xiaoY.entity.ChatForm;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/xiaoY")
@Tag(name = "小Y对话", description = "聊天与对话接口")
public class XiaoYController {

    @Autowired
    private XiaoY xiaoY;

    @PostMapping("/chat")
    @Operation(summary = "普通聊天", description = "基于 memoryId 和内容进行聊天回复")
    public String chat(@RequestBody ChatForm chatForm){
        System.out.println(chatForm.getContent());
        return xiaoY.chat(chatForm.getMemoryId(),chatForm.getContent());
    }


}
