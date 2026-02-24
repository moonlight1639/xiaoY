package com.pj.xiaoY.controller;

import com.pj.xiaoY.common.Result;
import com.pj.xiaoY.service.FillClassService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/xiaoY/fill")
public class FillClassController {
    @Autowired
    private FillClassService fillClassService;

    @GetMapping("/fillclass")
    public Result fill(@RequestParam(value = "userContext" , required = true) String userContext,
                       @RequestParam(value = "userClass" , required = true) String userClassType,
                       @RequestParam(value = "userClassVo" , required = true) String userClassVo
                       ) {
        return Result.ok(fillClassService.fill(userContext , userClassType , userClassVo));
    }
}
