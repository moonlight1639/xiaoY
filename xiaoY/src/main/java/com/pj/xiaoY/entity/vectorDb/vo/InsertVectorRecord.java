package com.pj.xiaoY.entity.vectorDb.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * Record 实体类（MongoDB集合：record）
 * 字段：自定义ID、内容、元数据（键值对列表 List<Pair<String, String>>）
 */
@Data
@Document(collection = "record")
public class InsertVectorRecord {

    /**
     * 自定义主键ID（手动赋值，非MongoDB自动生成）
     */
    @Id
    private String id;
    // 关联Namespace的ID，建立关系
    private String namespace;

    /**
     * 内容字段（支持长文本）
     */
    private String content;

    /**
     * 元数据：键值对列表（替代Map，按列表形式存储）
     * 示例：[{key:"courseId", value:"19859"}, {key:"userName", value:"科大小y"}]
     */
    private List<Pair> metadata;

    /**
     * 内部静态类：键值对模型（Pair<String, String>）
     * 适配MongoDB存储，需加无参/全参构造器（Lombok注解实现）
     */
    @Data
    @NoArgsConstructor // 必须：MongoDB序列化/反序列化需要无参构造
    @AllArgsConstructor // 方便快速创建Pair对象
    public static class Pair {
        // 键（如元数据标识：courseId、isVectorDb、createBy）
        private String key;
        // 值（字符串类型，统一存储）
        private String value;
    }

    /**
     * 0 不切割
     * 1 递归切割
     */
    private Integer isSplit;
}