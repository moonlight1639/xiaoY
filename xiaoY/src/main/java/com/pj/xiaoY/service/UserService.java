package com.pj.xiaoY.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.pj.xiaoY.entity.User;

import java.util.List;
import java.util.Map;

/**
 * 用户核心表（存储登录基础信息）
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2026-01-30 22:46:58
 */
public interface UserService extends IService<User> {


    List<User> queryPage(int pageNum, int pageSize);
}

