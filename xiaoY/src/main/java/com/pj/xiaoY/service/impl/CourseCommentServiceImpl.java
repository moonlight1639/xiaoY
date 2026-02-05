package com.pj.xiaoY.service.impl;

import com.baomidou.mybatisplus.extension.conditions.query.QueryChainWrapper;
import com.pj.xiaoY.common.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.pj.xiaoY.mapper.CourseCommentMapper;
import com.pj.xiaoY.entity.CourseComment;
import com.pj.xiaoY.service.CourseCommentService;


@Service("courseCommentService")
public class CourseCommentServiceImpl extends ServiceImpl<CourseCommentMapper, CourseComment> implements CourseCommentService {

    @Autowired
    private  CourseCommentMapper courseCommentMapper;


    @Override
    public List<CourseComment> queryPage(int pageNum, int pageSize) {
        Page<CourseComment> page = new Page<>(pageNum, pageSize);
        IPage<CourseComment> result = courseCommentMapper.selectPage(page, null);

        return result.getRecords();
    }

    @Override
    public Result getByCourseId(Long id) {
        QueryChainWrapper<CourseComment> courseCommentLists = query().eq("course_id", id).eq("is_deleted", 0);
        List<CourseComment> list = courseCommentLists.list();
        return Result.ok(list , list.size());
    }

}