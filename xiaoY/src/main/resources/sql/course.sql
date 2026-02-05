/*
 Navicat Premium Data Transfer

 Source Server         : 虚拟机docker
 Source Server Type    : MySQL
 Source Server Version : 80030 (8.0.30)
 Source Host           : 192.168.88.130:3306
 Source Schema         : xiaoY

 Target Server Type    : MySQL
 Target Server Version : 80030 (8.0.30)
 File Encoding         : 65001

 Date: 03/02/2026 16:12:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '课程主键ID（自增唯一）',
  `course_name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '课程名称（非空）',
  `teacher` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '授课老师（可空）',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '课程描述（可空）',
  `read_count` int NOT NULL DEFAULT 0 COMMENT '阅读量，初始值0',
  `like_count` int NOT NULL DEFAULT 0 COMMENT '点赞量，初始值0',
  `comment_count` int NOT NULL DEFAULT 0 COMMENT '评论量，初始值0',
  `collect_count` int NOT NULL DEFAULT 0 COMMENT '收藏量，初始值0',
  `is_deleted` tinyint NOT NULL DEFAULT 0 COMMENT '软删除 0-未删除 1-已删除',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（自动填充）',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（修改时自动刷新）',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_course_name`(`course_name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2018525116839018518 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '课程信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES ( '数据挖掘', '李雪琴', '这个课非常非常的好', 0, 0, 0, 0, 0, '2026-02-03 03:21:03', '2026-02-03 03:21:03');
INSERT INTO `course` VALUES ( '高等数学（一）', '林教授', '工科公共必修课，讲解极限、导数、微分、积分及微分方程，为专业课程奠定数学基础', 0, 0, 0, 0, 0, '2026-02-03 03:34:15', '2026-02-03 03:34:15');
INSERT INTO `course` VALUES ( '高等数学（二）', '林教授', '工科公共必修课，续讲多元函数微积分、曲线曲面积分、无穷级数，强化工程数学思维', 0, 0, 0, 0, 0, '2026-02-03 03:34:15', '2026-02-03 03:34:15');
INSERT INTO `course` VALUES ( '线性代数', '郭教授', '全校公共基础课，讲解矩阵、行列式、向量空间、特征值，培养线性运算与建模能力', 0, 0, 0, 0, 0, '2026-02-03 03:34:15', '2026-02-03 03:34:15');
INSERT INTO `course` VALUES ( '概率论与数理统计', '何教授', '全校公共基础课，讲解随机变量、分布函数、参数估计、假设检验，掌握统计分析方法', 0, 0, 0, 0, 0, '2026-02-03 03:34:15', '2026-02-03 03:34:15');
INSERT INTO `course` VALUES ( '大学物理（一）', '黄教授', '工科公共必修课，讲解力学、热学、波动学，结合实验理解经典物理规律', 0, 0, 0, 0, 0, '2026-02-03 03:34:15', '2026-02-03 03:34:15');
INSERT INTO `course` VALUES ( '大学物理（二）', '黄教授', '工科公共必修课，讲解电磁学、光学、近代物理，建立工程物理知识体系', 0, 0, 0, 0, 0, '2026-02-03 03:34:15', '2026-02-03 03:34:15');
INSERT INTO `course` VALUES ( '大学英语（一）', '杨教授', '全校公共必修课，强化听说读写能力，积累大学核心词汇与基础语法', 0, 0, 0, 0, 0, '2026-02-03 03:34:15', '2026-02-03 03:34:15');
INSERT INTO `course` VALUES ( '大学英语（二）', '杨教授', '全校公共必修课，提升篇章阅读与写作能力，适配四六级考试要求', 0, 0, 0, 0, 0, '2026-02-03 03:34:15', '2026-02-03 03:34:15');
INSERT INTO `course` VALUES ( '大学计算机基础', '吴教授', '全校公共必修课，讲解计算机基础操作、Office办公软件、简单编程思维', 0, 0, 0, 0, 0, '2026-02-03 03:34:15', '2026-02-03 03:34:15');
INSERT INTO `course` VALUES ( '思想道德与法治', '刘教授', '全校公共必修课，讲解道德规范与法律常识，培养正确的世界观与法治观念', 0, 0, 0, 0, 0, '2026-02-03 03:34:15', '2026-02-03 03:34:15');
INSERT INTO `course` VALUES ( '毛泽东思想和中国特色社会主义理论体系概论', '陈教授', '全校公共必修课，讲解中国特色社会主义理论发展与实践应用', 0, 0, 0, 0, 0, '2026-02-03 03:34:15', '2026-02-03 03:34:15');
INSERT INTO `course` VALUES ( '形势与政策', '张教授', '全校公共必修课，分析国内外时事政治与发展形势，培养时政分析能力', 0, 0, 0, 0, 0, '2026-02-03 03:34:15', '2026-02-03 03:34:15');
INSERT INTO `course` VALUES ( '数据结构与算法分析', '周教授', '计算机专业必修课，讲解线性表、树、图、排序查找，培养算法设计与编程能力', 0, 0, 0, 0, 0, '2026-02-03 03:34:15', '2026-02-03 03:34:15');
INSERT INTO `course` VALUES ( '计算机组成原理', '郑教授', '计算机专业必修课，讲解硬件体系、指令系统、存储架构，理解软硬件交互机制', 0, 0, 0, 0, 0, '2026-02-03 03:34:15', '2026-02-03 03:34:15');
INSERT INTO `course` VALUES ('操作系统原理', '王教授', '计算机专业必修课，讲解进程、内存、文件管理，分析Linux/Windows内核核心', 0, 0, 0, 0, 0, '2026-02-03 03:34:15', '2026-02-03 03:34:15');
INSERT INTO `course` VALUES ( '计算机网络', '马教授', '计算机专业必修课，讲解TCP/IP协议栈、路由交换、网络安全，结合抓包实战', 0, 0, 0, 0, 0, '2026-02-03 03:34:15', '2026-02-03 03:34:15');
INSERT INTO `course` VALUES ( 'C语言程序设计', '孙教授', '计算机专业入门课，讲解C语言语法、指针、结构体，培养底层编程思维', 0, 0, 0, 0, 0, '2026-02-03 03:34:15', '2026-02-03 03:34:15');
INSERT INTO `course` VALUES ( 'Java面向对象程序设计', '朱教授', '计算机专业必修课，讲解面向对象、集合框架、IO流，掌握高级编程语言', 0, 0, 0, 0, 0, '2026-02-03 03:34:15', '2026-02-03 03:34:15');
INSERT INTO `course` VALUES ( '数据库原理及应用', '方教授', '计算机专业必修课，讲解关系型数据库、SQL语句、数据库设计与优化', 0, 0, 0, 0, 0, '2026-02-03 03:34:15', '2026-02-03 03:34:15');
INSERT INTO `course` VALUES ( '机器学习', '罗教授', '计算机研究生核心课，讲解监督/无监督学习、经典算法，基于Python实现模型开发', 0, 0, 0, 0, 0, '2026-02-03 03:34:15', '2026-02-03 03:34:15');

SET FOREIGN_KEY_CHECKS = 1;
