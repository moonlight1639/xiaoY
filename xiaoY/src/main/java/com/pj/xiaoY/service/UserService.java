package com.pj.xiaoY.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.pj.xiaoY.common.Result;
import com.pj.xiaoY.entity.User;

import java.util.List;

/**
 * 用户核心表（存储登录基础信息）
 *
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-01-31 21:09:55
 */
public interface UserService extends IService<User> {

    List<User> queryPage(int pageNum, int pageSize);

    Result register(User user);

    Result login(User user);
}

