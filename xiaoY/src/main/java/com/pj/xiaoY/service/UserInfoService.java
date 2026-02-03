package com.pj.xiaoY.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.pj.xiaoY.entity.UserInfo;

import java.util.List;

/**
 * 用户信息主表
 *
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-01-31 21:09:55
 */
public interface UserInfoService extends IService<UserInfo> {

    List<UserInfo> queryPage(int pageNum, int pageSize);
}

