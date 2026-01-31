package com.pj.xiaoY.controller;

import com.pj.xiaoY.assistant.XiaoY;
import com.pj.xiaoY.entity.ChatForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/xiaoy")
public class XiaoYController {

    @Autowired
    private XiaoY xiaoY;

    @PostMapping("/chat")
    public String chat(@RequestBody ChatForm chatForm){
        System.out.println(chatForm.getMessage());
        return xiaoY.chat(chatForm.getMemoryId(),chatForm.getMessage());
    }
}
