package com.pj.xiaoY.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 食堂地点信息表
 * 
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-02-03 11:09:42
 */
@Data
@TableName("canteen_location")
public class CanteenLocation implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 食堂地点主键ID（自增唯一）
	 */
	@TableId
	private Integer id;
	/**
	 * 食堂名称（非空）
	 */
	private String name;
	/**
	 * 软删除 0-未删除 1-已删除
	 */
	private Integer isDeleted;

}
