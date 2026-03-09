package com.pj.xiaoY.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.pj.xiaoY.properties.MinioProperties;
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

		/*
		* 课程内容*/
	private String content;

	/*
	 * 课程头像*/
	private String avatar;

	/*图片要做以下操作*/
	public void setAvatar(String avatar) {
		if(avatar==null){
			this.avatar = null;
		}
		if(avatar.startsWith(MinioProperties.MINIO_BASE_URL)){
			this.avatar = avatar.substring(MinioProperties.MINIO_BASE_URL.length());
			return;
		}
		this.avatar = avatar;
	}
	public String getAvatar() {
		if(this.avatar==null){
			return null;
		}
		if(this.avatar.startsWith(MinioProperties.MINIO_BASE_URL) == false){
			return MinioProperties.MINIO_BASE_URL + this.avatar;

		}
		return this.avatar;
	}

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
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date createTime;
	/**
	 * 更新时间（修改时自动刷新）
	 */
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date updateTime;

}
