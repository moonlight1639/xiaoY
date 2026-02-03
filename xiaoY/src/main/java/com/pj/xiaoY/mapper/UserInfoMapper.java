package com.pj.xiaoY.mapper;

import com.pj.xiaoY.entity.UserInfo;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * 用户信息主表
 * 
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-01-31 21:09:55
 */
@Mapper
public interface UserInfoMapper extends BaseMapper<UserInfo> {
	
}
