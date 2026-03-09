package com.pj.xiaoY.controller;

import com.pj.xiaoY.assistant.XiaoY;
import com.pj.xiaoY.assistant.xiaoYStreaming;
import com.pj.xiaoY.entity.ChatForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/xiaoY")
public class XiaoYController {

    @Autowired
    private XiaoY xiaoY;

    @Autowired
    private xiaoYStreaming xiaoYStreaming;
    @PostMapping("/chat")
    public String chat(@RequestBody ChatForm chatForm){
        System.out.println(chatForm.getContent());
        return xiaoY.chat(chatForm.getMemoryId(),chatForm.getContent());
    }


}
