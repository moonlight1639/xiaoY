package com.pj.xiaoY.controller;

import com.github.xiaoymin.knife4j.core.util.StrUtil;
import com.pj.xiaoY.common.Result;
import com.pj.xiaoY.service.UploadService;
import com.pj.xiaoY.utils.PathValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/xiaoY")
public class UploadController {
    @Autowired
    private UploadService uploadService;

    @PostMapping("/upload")
    public Result upload(@RequestParam("file") MultipartFile file , @RequestParam("path") String path) {
//        if(PathValidator.isLegalPath(path) == false){
//            return Result.fail("文件路径不合法");
//        }
        if(file.isEmpty()){
            return Result.fail("文件不能为空");
        }
        String url = uploadService.uploadFile(file , path);
        return Result.ok(url);
    }
}
