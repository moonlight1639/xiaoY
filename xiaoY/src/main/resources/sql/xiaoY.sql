DROP TABLE IF EXISTS `user`;
CREATE TABLE `user_info` (
                             `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID（自增）',
                             `nickname` varchar(64) NOT NULL COMMENT '用户昵称（显示用）',
                             `phone` varchar(20) DEFAULT NULL COMMENT '手机号（唯一，可选）',
                             `email` varchar(128) DEFAULT NULL COMMENT '邮箱（唯一，可选，用于找回密码）',
                             `gender` tinyint DEFAULT '0' COMMENT '性别 0-未知 1-男 2-女',
                             `avatar` varchar(255) DEFAULT NULL COMMENT '用户头像（URL地址）',
                             `user_type` tinyint NOT NULL DEFAULT '0' COMMENT '用户类型 0-普通用户 1-管理员 2-运营人员',
                             `user_status` tinyint NOT NULL DEFAULT '1' COMMENT '账号状态 0-禁用 1-正常 2-锁定',
                             `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（自动填充）',
                             `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（自动更新）',
                             `is_deleted` tinyint NOT NULL DEFAULT '0' COMMENT '软删除 0-未删除 1-已删除',
                             PRIMARY KEY (`id`),
                             UNIQUE KEY `uk_phone` (`phone`),
                             UNIQUE KEY `uk_email` (`email`),
                             KEY `idx_create_time` (`create_time`),
                             KEY `idx_user_type` (`user_type`),
                             KEY `idx_user_status` (`user_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='用户信息主表';


DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
                         `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户唯一ID（主键）',
                         `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名（登录/展示用，唯一）',
                         `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码（密文存储，如BCrypt/SHA256加密）',
                         `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（注册时间）',
                         `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（自动刷新）',
                         `userinfo_id` bigint NOT NULL COMMENT '关联用户信息表ID',
                         PRIMARY KEY (`id`) USING BTREE,
                         UNIQUE INDEX `uk_username`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2017523356005318658 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户核心表（存储登录基础信息）' ROW_FORMAT = Dynamic;

DROP TABLE IF EXISTS `course`;
-- 课程表
-- 课程表（含软删除）
CREATE TABLE `course` (
                          `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '课程主键ID（自增唯一）',
                          `course_name` VARCHAR(128) NOT NULL COMMENT '课程名称（非空）',
                          `teacher` VARCHAR(64) DEFAULT NULL COMMENT '授课老师（可空）',
                          `description` TEXT DEFAULT NULL COMMENT '课程描述（可空）',
                          `read_count` INT NOT NULL DEFAULT 0 COMMENT '阅读量，初始值0',
                          `like_count` INT NOT NULL DEFAULT 0 COMMENT '点赞量，初始值0',
                          `comment_count` INT NOT NULL DEFAULT 0 COMMENT '评论量，初始值0',
                          `collect_count` INT NOT NULL DEFAULT 0 COMMENT '收藏量，初始值0',
                          `is_deleted` TINYINT NOT NULL DEFAULT 0 COMMENT '软删除 0-未删除 1-已删除',
                          `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（自动填充）',
                          `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（修改时自动刷新）',
                          PRIMARY KEY (`id`) USING BTREE,
                          KEY `idx_course_name` (`course_name`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '课程信息表';

-- 课程评论表（关联course表，存储单条课程评论）
DROP TABLE IF EXISTS `course_comment`;
-- 课程评论表（含软删除，关联course表）
CREATE TABLE `course_comment` (
                                  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '评论主键ID（自增唯一）',
                                  `course_id` BIGINT NOT NULL COMMENT '关联课程ID，对应course表的id',
                                  `user_id` BIGINT NOT NULL COMMENT '评论用户ID',
                                  `user_name` VARCHAR(64) NOT NULL COMMENT '评论用户名称',
                                  `user_avatar` VARCHAR(255) DEFAULT NULL COMMENT '用户头像URL（可空）',
                                  `content` VARCHAR(512) NOT NULL COMMENT '评论内容（非空）',
                                  `like_num` INT NOT NULL DEFAULT 0 COMMENT '喜欢数，初始值0',
                                  `dislike_num` INT NOT NULL DEFAULT 0 COMMENT '不喜欢数，初始值0',
                                  `is_deleted` TINYINT NOT NULL DEFAULT 0 COMMENT '软删除 0-未删除 1-已删除',
                                  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '评论创建时间（自动填充）',
                                  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（修改时自动刷新）',
                                  PRIMARY KEY (`id`) USING BTREE,
                                  KEY `idx_course_id` (`course_id`) USING BTREE,
                                  KEY `idx_user_id` (`user_id`) USING BTREE,
                                  KEY `idx_create_time` (`create_time`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '课程评论信息表';

-- 食堂地点表（表名：canteen_location）
DROP TABLE IF EXISTS `canteen_location`;
-- 食堂地点表（含软删除）
CREATE TABLE `canteen_location` (
                                    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '食堂地点主键ID（自增唯一）',
                                    `name` VARCHAR(64) NOT NULL COMMENT '食堂名称（非空）',
                                    `is_deleted` TINYINT NOT NULL DEFAULT 0 COMMENT '软删除 0-未删除 1-已删除',
                                    PRIMARY KEY (`id`) USING BTREE,
                                    UNIQUE KEY `uk_name` (`name`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '食堂地点信息表';


DROP TABLE IF EXISTS `dish`;
-- 菜品信息表（含软删除+状态+分类，关联canteen_location食堂地点表）
CREATE TABLE `dish` (
                        `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '菜品主键ID（自增唯一）',
                        `dish_name` VARCHAR(128) NOT NULL COMMENT '菜名（非空，如：番茄炒蛋、红烧肉）',
                        `description` VARCHAR(512) DEFAULT NULL COMMENT '菜品描述（可空，如：酸甜可口、肥瘦相间）',
                        `price` DECIMAL(8,2) DEFAULT NULL COMMENT '菜品价格（单位：元，保留2位小数）',
                        `category` VARCHAR(32) DEFAULT NULL COMMENT '菜品分类（如：荤菜、素菜、汤品、主食、凉菜、小吃）',
                        `location_id` BIGINT NOT NULL COMMENT '关联食堂地点ID，对应canteen_location表的id',
                        `location_name` VARCHAR(64) NOT NULL COMMENT '食堂地点名称，对应canteen_location表的name',
                        `status` TINYINT NOT NULL DEFAULT 1 COMMENT '菜品状态 1-在售 2-下架 3-售罄',
                        `is_deleted` TINYINT NOT NULL DEFAULT 0 COMMENT '软删除 0-未删除 1-已删除',
                        `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（自动填充）',
                        `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（修改时自动刷新）',
                        PRIMARY KEY (`id`) USING BTREE,
                        KEY `idx_location_id` (`location_id`) USING BTREE, -- 核心索引：按食堂查菜品
                        KEY `idx_dish_name` (`dish_name`) USING BTREE,     -- 辅助索引：按菜名模糊查询
                        KEY `idx_location_status` (`location_id`, `status`) USING BTREE -- 联合索引：按食堂+状态查菜品（高频）
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '食堂菜品信息表';



