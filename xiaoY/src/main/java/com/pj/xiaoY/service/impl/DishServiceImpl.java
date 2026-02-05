package com.pj.xiaoY.service.impl;

import com.pj.xiaoY.common.Result;
import com.pj.xiaoY.entity.CanteenLocation;
import com.pj.xiaoY.mapper.CanteenLocationMapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.pj.xiaoY.mapper.DishMapper;
import com.pj.xiaoY.entity.Dish;
import com.pj.xiaoY.service.DishService;


@Service("dishService")
public class DishServiceImpl extends ServiceImpl<DishMapper, Dish> implements DishService {

    @Autowired
    private  DishMapper dishMapper;
    @Autowired
    private CanteenLocationMapper canteenLocationMapper;

    @Override
    public List<Dish> queryPage(int pageNum, int pageSize) {
        Page<Dish> page = new Page<>(pageNum, pageSize);
        IPage<Dish> result = dishMapper.selectPage(page, null);

        return result.getRecords();
    }

    @Override
    public Result Mysave(Dish dish) {
        if(StringUtils.isBlank(dish.getDishName()) == true){
            return Result.fail("菜品名为空");
        }
        if(dish.getLocationId() == null){
            return Result.fail("食堂位置id为空");
        }
        CanteenLocation canteenLocation = canteenLocationMapper.selectById(dish.getLocationId());
        if(canteenLocation == null){
            return Result.fail("食堂位置不存在");
        }
        dish.setLocationName(canteenLocation.getName());
        dishMapper.insert(dish);
        return Result.ok();
    }

}