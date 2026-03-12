package com.pj.xiaoY.entity.vectorDb;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;
import java.util.Date;

/**
 * MongoDB 实体类（对应集合：可自定义集合名，默认类名小写）
 * 包含字段：id、namespace、键值对Map、description、recordCount、创建时间、修改时间
 */
@Data // Lombok 注解，自动生成get/set/toString等方法
@Document(collection = "namespace") // 指定MongoDB集合名（可自定义，如改为你的业务名）
public class Namespace {

    /**
     * MongoDB主键（自动生成ObjectId，无需手动赋值）
     */
    @Id
    private String id;

    /**
     * 命名空间（如业务模块标识）
     */
    private String name;

    /**
     * 描述信息
     */
    private String description;

    /**
     * 记录数量
     */
    private Integer recordCount;

    /**
     * 创建时间（MongoDB自动填充，无需手动设置）
     */
    @CreatedDate
    private Date createTime;

    /**
     * 修改时间（MongoDB自动填充，更新时自动更新）
     */
    @LastModifiedDate
    private Date updateTime;
}
