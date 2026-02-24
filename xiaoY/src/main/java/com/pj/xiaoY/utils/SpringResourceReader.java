package com.pj.xiaoY.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

@Component
public class SpringResourceReader {
    // 注入 Spring 资源加载器
    @Qualifier("webApplicationContext")
    @Autowired
    private ResourceLoader resourceLoader;

    public String readResourceFile(String path) throws Exception {
        // 读取 resource 下的 system_prompt.txt
        Resource resource = resourceLoader.getResource("classpath:" + path);
        // 读取内容为字符串
        return Files.readString(resource.getFile().toPath(), StandardCharsets.UTF_8);
    }
}