package com.pj.xiaoY.mapper;

import com.pj.xiaoY.entity.Dish;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * 食堂菜品信息表
 * 
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-02-03 11:09:42
 */
@Mapper
public interface DishMapper extends BaseMapper<Dish> {
	
}
