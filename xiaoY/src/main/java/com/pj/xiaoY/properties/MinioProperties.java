package com.pj.xiaoY.properties;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

/**
 * MinIO 配置属性类
 */
@Data
@Configuration
@ConfigurationProperties(prefix = "minio")
public class MinioProperties {
    /**
     * MinIO服务地址（如：http://127.0.0.1:9000）
     */
    private String url;

    /**
     * 访问密钥
     */
    private String accessKey;

    /**
     * 秘钥
     */
    private String secretKey;

    /**
     * 默认存储桶
     */
    private String bucketName;
    /*
    * 默认文件目录
    * */
    private String filePrefix = "files/";

    /**
     * 默认链接有效期（秒），默认7天
     */
    private Integer expireSeconds  = 60 * 60 * 24 * 7;
}
