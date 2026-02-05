package com.pj.xiaoY.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.pj.xiaoY.entity.CourseSummary;

import java.util.List;

/**
 * 课程总结表
 *
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-02-03 19:41:00
 */
public interface CourseSummaryService extends IService<CourseSummary> {

    List<CourseSummary> queryPage(int pageNum, int pageSize);
}

