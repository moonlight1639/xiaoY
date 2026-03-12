package com.pj.xiaoY.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.pj.xiaoY.properties.MinioProperties;
import lombok.Data;

/**
 * 用户信息主表
 * 
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-01-31 21:09:55
 */
@Data
@TableName("user_info")
public class UserInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 主键ID（自增）不用填
	 */
	@TableId
	private Integer id;
	/**
	 * 用户昵称（显示用）
	 */
	private String nickname;
	/**
	 * 手机号（唯一，可选）
	 */
	private String phone;
	/**
	 * 邮箱（唯一，可选，用于找回密码）
	 */
	private String email;
	/**
	 * 性别 0-未知 1-男 2-女
	 */
	private Integer gender;
	/**
	 * 用户头像（URL地址）
	 */
	private String avatar;
	public void setAvatar(String _avatar) {
		if(_avatar==null){
			this.avatar = null;
			return;
		}
		System.out.println(MinioProperties.MINIO_BASE_URL + "1");
		if(_avatar.startsWith(MinioProperties.MINIO_BASE_URL)){
			this.avatar = _avatar.substring(MinioProperties.MINIO_BASE_URL.length());
			return;
		}
		this.avatar = _avatar;
	}
	public String getAvatar() {
		if(avatar==null){
			return null;
		}
		if(avatar.startsWith(MinioProperties.MINIO_BASE_URL) == false){
			return MinioProperties.MINIO_BASE_URL + avatar;

		}
		return avatar;
	}
	/**
	 * 用户类型 0-普通用户 1-管理员 2-运营人员
	 */
	private Integer userType;
	/**
	 * 账号状态 0-禁用 1-正常 2-锁定
	 */
	private Integer userStatus;
	/**
	 * 创建时间（自动填充）
	 */
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date createTime;
	/**
	 * 更新时间（自动更新）
	 */
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date updateTime;
	/**
	 * 软删除 0-未删除 1-已删除
	 */
	@TableLogic(
			value = "0",    // 未删除值
			delval = "1"    // 已删除值
	)
	private Integer isDeleted;

}
