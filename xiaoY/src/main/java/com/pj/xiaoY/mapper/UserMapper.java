package com.pj.xiaoY.mapper;

import com.pj.xiaoY.entity.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * 用户核心表（存储登录基础信息）
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2026-01-30 22:46:58
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {
	
}
