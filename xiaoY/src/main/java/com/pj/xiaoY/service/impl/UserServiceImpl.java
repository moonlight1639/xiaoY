package com.pj.xiaoY.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.pj.xiaoY.mapper.UserMapper;
import com.pj.xiaoY.entity.User;
import com.pj.xiaoY.service.UserService;


@Service("userService")
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
    @Autowired
    private  UserMapper userMapper;

    @Override
    public List<User> queryPage(int pageNum, int pageSize) {
        Page<User> page = new Page<>(pageNum, pageSize);
        IPage<User> result = userMapper.selectPage(page, null);

        return result.getRecords();
    }

}