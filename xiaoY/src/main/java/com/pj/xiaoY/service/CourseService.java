package com.pj.xiaoY.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.pj.xiaoY.entity.Course;

import java.util.List;

/**
 * 课程信息表
 *
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-02-03 11:09:42
 */
public interface CourseService extends IService<Course> {

    List<Course> queryPage(int pageNum, int pageSize);
}

