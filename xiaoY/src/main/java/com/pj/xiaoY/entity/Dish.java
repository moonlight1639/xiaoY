package com.pj.xiaoY.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.math.BigDecimal;
import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 食堂菜品信息表
 * 
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-02-03 11:09:42
 */
@Data
@TableName("dish")
public class Dish implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 菜品主键ID（自增唯一）
	 */
	@TableId
	private Integer id;
	/**
	 * 菜名（非空，如：番茄炒蛋、红烧肉）
	 */
	private String dishName;
	/**
	 * 菜品描述（可空，如：酸甜可口、肥瘦相间）
	 */
	private String description;
	/**
	 * 菜品价格（单位：元，保留2位小数）
	 */
	private BigDecimal price;
	/**
	 * 菜品分类（如：荤菜、素菜、汤品、主食、凉菜、小吃）
	 */
	private String category;
	/**
	 * 关联食堂地点ID，对应canteen_location表的id
	 */
	private Long locationId;
	/**
	 * 食堂地点名称，对应canteen_location表的name
	 */
	private String locationName;
	/**
	 * 菜品状态 1-在售 2-下架 3-售罄
	 */
	private Integer status;
	/**
	 * 软删除 0-未删除 1-已删除
	 */
	private Integer isDeleted;

	private Integer likeCount;
	/**
	 * 创建时间（自动填充）
	 */
	private Date createTime;
	/**
	 * 更新时间（修改时自动刷新）
	 */
	private Date updateTime;

}
