package com.pj.xiaoY.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 课程信息表
 * 
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-02-03 11:09:42
 */
@Data
@TableName("course")
public class Course implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 课程主键ID（自增唯一）
	 */
	@TableId
	private Integer id;
	/**
	 * 课程名称（非空）
	 */
	private String courseName;
	/**
	 * 授课老师（可空）
	 */
	private String teacher;
	/**
	 * 课程描述（可空）
	 */
	private String description;

	private String avatar;
	/**
	 * 阅读量，初始值0
	 */
	private Integer readCount;
	/**
	 * 点赞量，初始值0
	 */
	private Integer likeCount;
	/**
	 * 评论量，初始值0
	 */
	private Integer commentCount;
	/**
	 * 收藏量，初始值0
	 */
	private Integer collectCount;
	/**
	 * 软删除 0-未删除 1-已删除
	 */
	private Integer isDeleted;
	/**
	 * 创建时间（自动填充）
	 */
	private Date createTime;
	/**
	 * 更新时间（修改时自动刷新）
	 */
	private Date updateTime;

}
