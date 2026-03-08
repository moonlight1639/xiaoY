package com.pj.xiaoY.service.impl;

import com.baomidou.mybatisplus.core.metadata.OrderItem;
import com.baomidou.mybatisplus.extension.conditions.query.QueryChainWrapper;
import com.pj.xiaoY.common.Result;
import com.pj.xiaoY.entity.UserInfo;
import com.pj.xiaoY.service.UserInfoService;
import com.pj.xiaoY.utils.UserInfoThreadPoolUtil;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.apache.commons.lang3.StringUtils;
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

    @Autowired
    private UserInfoService userInfoService;

    @Autowired
    private UserInfoThreadPoolUtil userInfoThreadPoolUtil;

    @Override
    public List<CourseComment> queryPage(int pageNum, int pageSize) {
        Page<CourseComment> page = new Page<>(pageNum, pageSize);
        page.addOrder(OrderItem.desc("createTime"));
//        IPage<CourseComment> result = courseCommentMapper.selectPage(page, null);
        IPage<CourseComment> result = courseCommentMapper.queryPage(page);
        List<CourseComment> comments = result.getRecords();

        comments.forEach(item -> {
            Integer userId = (Integer) item.getUserId();
            UserInfo userInfo = userInfoService.getById(userId);
            item.setUserName(userInfo.getNickname());
            item.setUserAvatar(userInfo.getAvatar());
        });
        return comments;
    }

    @Override
    public Result getByCourseId(Long id) {
        QueryChainWrapper<CourseComment> courseCommentLists = query().eq("course_id", id).eq("is_deleted", 0);
        List<CourseComment> list = courseCommentLists.list();
        return Result.ok(list , list.size());
    }

    @Override
    public void commitComment(CourseComment courseComment) {
        if (StringUtils.isBlank(courseComment.getContent()) == true){
            throw  new RuntimeException("评论席内容不能为空");
        }
        if(courseComment.getCourseId() == null){
            throw  new RuntimeException("课程id不能为空");
        }
        if(courseComment.getUserId() == null) {
            if(userInfoThreadPoolUtil.get() == null){
                throw new RuntimeException("用户未登录");
            }
            courseComment.setUserId(userInfoThreadPoolUtil.get().getId());
        }
        courseComment.setIsDeleted(0);
        UserInfo userInfo = userInfoService.getById(courseComment.getUserId());
        if(userInfo == null){
            throw new RuntimeException("用户不存在");
        }
        if(userInfo.getNickname() == null){
            throw new RuntimeException("用户昵称不能为空");
        }
        courseComment.setUserName(userInfo.getNickname());
        courseComment.setUserAvatar(userInfo.getAvatar());
        courseCommentMapper.insert(courseComment);
    }

}