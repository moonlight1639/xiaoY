package com.pj.xiaoY.config;

import com.google.common.util.concurrent.ThreadFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

@Configuration
public class ThreadPoolConfig {

    @Bean
    public ExecutorService aiExecutor() {

        return new ThreadPoolExecutor(
                8,                       // 核心线程数
                16,                      // 最大线程数
                60,
                TimeUnit.SECONDS,
                new LinkedBlockingQueue<>(1000),
                new ThreadFactoryBuilder().setNameFormat("ai-thread-%d").build(),
                new ThreadPoolExecutor.CallerRunsPolicy()
        );
    }
}
