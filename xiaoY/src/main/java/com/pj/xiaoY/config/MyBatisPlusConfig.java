package com.pj.xiaoY.config;

import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.autoconfigure.ConfigurationCustomizer;
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import com.pj.xiaoY.interceptor.AvatarPathMybatisInterceptor;
import com.pj.xiaoY.properties.MinioProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MyBatisPlusConfig {
    @Bean
    public AvatarPathMybatisInterceptor avatarPathMybatisInterceptor(MinioProperties minioProperties) {
        return new AvatarPathMybatisInterceptor(minioProperties);
    }

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        // 添加分页插件（指定数据库类型，如 MySQL）
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        return interceptor;
    }

    @Bean
    public ConfigurationCustomizer avatarPathInterceptorCustomizer(AvatarPathMybatisInterceptor avatarPathMybatisInterceptor) {
        return configuration -> configuration.addInterceptor(avatarPathMybatisInterceptor);
    }
}
