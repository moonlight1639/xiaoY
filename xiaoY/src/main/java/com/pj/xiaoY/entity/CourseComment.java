package com.pj.xiaoY.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 课程评论信息表
 * 
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-02-03 11:09:42
 */
@Data
@TableName("course_comment")
public class CourseComment implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 评论主键ID（自增唯一）
	 */
	@TableId
	private Integer id;
	/**
	 * 关联课程ID，对应course表的id
	 */
	private Long courseId;
	/**
	 * 评论用户ID
	 */
	private Long userId;
	/**
	 * 评论用户名称
	 */
	private String userName;
	/**
	 * 用户头像URL（可空）
	 */
	private String userAvatar;
	/**
	 * 评论内容（非空）
	 */
	private String content;
	/**
	 * 喜欢数，初始值0
	 */
	private Integer likeNum;
	/**
	 * 不喜欢数，初始值0
	 */
	private Integer dislikeNum;
	/**
	 * 软删除 0-未删除 1-已删除
	 */
	private Integer isDeleted;
	/**
	 * 评论创建时间（自动填充）
	 */
	private Date createTime;
	/**
	 * 更新时间（修改时自动刷新）
	 */
	private Date updateTime;

}
