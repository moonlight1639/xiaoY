package com.pj.xiaoY.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.AsyncTaskExecutor;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor; // 注意这个包路径
import org.springframework.web.servlet.config.annotation.AsyncSupportConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.concurrent.ThreadPoolExecutor;

/**
 * 修正类型不匹配：返回 AsyncTaskExecutor 而非 Executor
 */
@Configuration
public class WebMvcAsyncConfig implements WebMvcConfigurer {

    /**
     * 配置Spring MVC异步请求执行器（核心：参数类型匹配）
     */
    @Override
    public void configureAsyncSupport(AsyncSupportConfigurer configurer) {
        // 现在传入的是 AsyncTaskExecutor 类型，类型匹配
        configurer.setTaskExecutor(mvcAsyncTaskExecutor());
        configurer.setDefaultTimeout(60 * 1000); // 60秒超时
    }

    /**
     * 关键：返回值声明为 AsyncTaskExecutor（而非 Executor）
     */
    @Bean("mvcAsyncTaskExecutor")
    public AsyncTaskExecutor mvcAsyncTaskExecutor() { // 修正此处返回类型
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();

        // 核心参数配置（保持不变）
        int corePoolSize = Runtime.getRuntime().availableProcessors() * 2;
        executor.setCorePoolSize(corePoolSize);
        executor.setMaxPoolSize(corePoolSize * 2);
        executor.setQueueCapacity(2000);
        executor.setKeepAliveSeconds(30);
        executor.setThreadNamePrefix("mvc-async-");

        // 拒绝策略
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());

        // 初始化线程池
        executor.initialize();

        return executor; // ThreadPoolTaskExecutor 实现了 AsyncTaskExecutor
    }
}