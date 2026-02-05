package com.pj.xiaoY.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;
import java.util.Date;
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
	 * 主键ID（自增）
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
	private Date createTime;
	/**
	 * 更新时间（自动更新）
	 */
	private Date updateTime;
	/**
	 * 软删除 0-未删除 1-已删除
	 */
	private Integer isDeleted;

}
