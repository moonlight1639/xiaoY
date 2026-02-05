package com.pj.xiaoY.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.pj.xiaoY.mapper.CourseSummaryMapper;
import com.pj.xiaoY.entity.CourseSummary;
import com.pj.xiaoY.service.CourseSummaryService;


@Service("courseSummaryService")
public class CourseSummaryServiceImpl extends ServiceImpl<CourseSummaryMapper, CourseSummary> implements CourseSummaryService {

    @Autowired
    private  CourseSummaryMapper courseSummaryMapper;


    @Override
    public List<CourseSummary> queryPage(int pageNum, int pageSize) {
        Page<CourseSummary> page = new Page<>(pageNum, pageSize);
        IPage<CourseSummary> result = courseSummaryMapper.selectPage(page, null);

        return result.getRecords();
    }

}