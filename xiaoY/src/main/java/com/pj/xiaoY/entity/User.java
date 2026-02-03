package com.pj.xiaoY.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 用户核心表（存储登录基础信息）
 * 
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-01-31 21:09:55
 */
@Data
@TableName("user")
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 用户唯一ID（主键）
	 */
	@TableId
	private Long id;
	/**
	 * 用户名（登录/展示用，唯一）
	 */
	private String username;
	/**
	 * 密码（密文存储，如BCrypt/SHA256加密）
	 */
	private String password;
	/**
	 * 创建时间（注册时间）
	 */
	private Date createTime;
	/**
	 * 更新时间（自动刷新）
	 */
	private Date updateTime;
	/**
	 * 关联用户信息表ID
	 */
	private Long userinfoId;

}
