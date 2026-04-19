package com.pj.xiaoY.controller;

import com.pj.xiaoY.common.Result;
import com.pj.xiaoY.service.FillClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/xiaoY/fill")
@Tag(name = "填充类接口", description = "根据用户上下文生成填充结果")
public class FillClassController {
    @Autowired
    private FillClassService fillClassService;

    @GetMapping("/fillclass")
    @Operation(summary = "填充班级信息", description = "根据用户上下文、类型和班级信息生成填充结果")
    public Result fill(@Parameter(description = "用户上下文") @RequestParam("userContext") String userContext,
                       @Parameter(description = "用户班级类型") @RequestParam("userClass") String userClassType,
                       @Parameter(description = "用户班级内容") @RequestParam("userClassVo") String userClassVo
                       ) {
        return Result.ok(fillClassService.fill(userContext , userClassType , userClassVo));
    }
}
