package com.pj.xiaoY.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.pj.xiaoY.common.Result;
import com.pj.xiaoY.entity.CourseComment;
import com.pj.xiaoY.entity.vo.CourseCommentVo;

import java.util.List;

/**
 * 课程评论信息表
 *
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-02-03 11:09:42
 */
public interface CourseCommentService extends IService<CourseComment> {

    List<CourseCommentVo> queryPage(int pageNum, int pageSize);

    Result getByCourseId(Long id);

    void commitComment(CourseComment courseComment);
}

