package com.pj.xiaoY.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 课程总结表
 * 
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-02-03 19:41:00
 */
@Data
@TableName("course_summary")
public class CourseSummary implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 主键ID，自增
	 */
	@TableId
	private Integer id;
	/**
	 * 课程ID，关联课程主表主键
	 */
	private Integer courseId;
	/**
	 * 课程总结内容
	 */
	private String content;
	/**
	 * 创建时间，自动填充
	 */
	private Date createTime;
	/**
	 * 修改时间，新增/更新自动刷新
	 */
	private Date updateTime;

}
