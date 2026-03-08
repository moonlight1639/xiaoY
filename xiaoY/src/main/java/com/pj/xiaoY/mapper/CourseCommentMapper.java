package com.pj.xiaoY.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.pj.xiaoY.entity.CourseComment;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 课程评论信息表
 * 
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-02-03 11:09:42
 */
@Mapper
public interface CourseCommentMapper extends BaseMapper<CourseComment> {

    IPage<CourseComment> queryPage(Page<CourseComment> page);
}
