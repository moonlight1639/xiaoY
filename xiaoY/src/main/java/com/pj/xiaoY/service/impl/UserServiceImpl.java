package com.pj.xiaoY.service.impl;

import com.github.xiaoymin.knife4j.core.util.StrUtil;
import com.pj.xiaoY.common.Result;
import com.pj.xiaoY.entity.UserInfo;
import com.pj.xiaoY.mapper.UserInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

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

    @Autowired
    private UserInfoMapper userInfoMapper;
    @Override
    public Result register(User user){
        if(StrUtil.isBlank(user.getUsername()) == true){
            return Result.fail("用户名不能为空");
        }
        if(StrUtil.isBlank(user.getPassword()) == true){
            return Result.fail("密码不能为空");
        }
        User dbUser = query().eq("username",user.getUsername()).one();
        if(dbUser != null) {
            return Result.fail("用户已存在");
        }

        UserInfo userInfo = new UserInfo();
        userInfo.setNickname("ustc_" + UUID.randomUUID().toString());
        userInfoMapper.insert(userInfo);
        user.setUserinfoId(userInfo.getId());
        userMapper.insert(user);
        return Result.ok();
    }

    @Override
    public Result login(User user) {
        if(StrUtil.isBlank(user.getUsername()) == true){
            return Result.fail("用户名不能为空");
        }
        if(StrUtil.isBlank(user.getPassword()) == true){
            return Result.fail("密码不能为空");
        }
        User dbUser = query().eq("username",user.getUsername()).one();
        if(dbUser == null) {
            return Result.fail("用户不存在");
        }
        if(!dbUser.getPassword().equals(user.getPassword())){
            return Result.fail("密码错误");
        }
        UserInfo userInfo = userInfoMapper.selectById(dbUser.getUserinfoId());
        if(userInfo == null){
            return Result.fail("系统内部错误");
        }
        return Result.ok(userInfo);
    }

    @Override
    public List<User> queryPage(int pageNum, int pageSize) {
        Page<User> page = new Page<>(pageNum, pageSize);
        IPage<User> result = userMapper.selectPage(page, null);

        return result.getRecords();
    }

}