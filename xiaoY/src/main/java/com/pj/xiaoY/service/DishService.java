package com.pj.xiaoY.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.pj.xiaoY.common.Result;
import com.pj.xiaoY.entity.Dish;

import java.util.List;

/**
 * 食堂菜品信息表
 *
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-02-03 11:09:42
 */
public interface DishService extends IService<Dish> {

    List<Dish> queryPage(int pageNum, int pageSize);

    Result Mysave(Dish dish);
}

