package com.pj.xiaoY.controller;

import com.pj.xiaoY.common.Result;
import com.pj.xiaoY.service.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/xiaoY")
@Tag(name = "文件上传", description = "文件上传相关接口")
public class UploadController {
    @Autowired
    private UploadService uploadService;

    @PostMapping("/upload")
    @Operation(summary = "上传文件", description = "上传文件到指定路径")
    public Result upload(@Parameter(description = "上传文件") @RequestParam("file") MultipartFile file , @Parameter(description = "目标路径") @RequestParam("path") String path) {
        if(file.isEmpty()){
            return Result.fail("文件不能为空");
        }
        String url = uploadService.uploadFile(file , path);
        return Result.ok(url);
    }
}
