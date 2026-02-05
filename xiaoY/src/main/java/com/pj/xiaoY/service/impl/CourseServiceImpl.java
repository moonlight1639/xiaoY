package com.pj.xiaoY.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.pj.xiaoY.mapper.CourseMapper;
import com.pj.xiaoY.entity.Course;
import com.pj.xiaoY.service.CourseService;


@Service("courseService")
public class CourseServiceImpl extends ServiceImpl<CourseMapper, Course> implements CourseService {

    @Autowired
    private  CourseMapper courseMapper;


    @Override
    public List<Course> queryPage(int pageNum, int pageSize) {
        Page<Course> page = new Page<>(pageNum, pageSize);
        IPage<Course> result = courseMapper.selectPage(page, null);

        return result.getRecords();
    }

}