package com.pj.xiaoY.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.pj.xiaoY.common.Result;
import com.pj.xiaoY.entity.Dish;
import com.pj.xiaoY.entity.LocationVO;
import com.pj.xiaoY.mapper.DishMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.pj.xiaoY.mapper.CanteenLocationMapper;
import com.pj.xiaoY.entity.CanteenLocation;
import com.pj.xiaoY.service.CanteenLocationService;


@Service("canteenLocationService")
public class CanteenLocationServiceImpl extends ServiceImpl<CanteenLocationMapper, CanteenLocation> implements CanteenLocationService {

    @Autowired
    private  CanteenLocationMapper canteenLocationMapper;
    @Autowired
    private DishMapper dishMapper;

    @Override
    public List<CanteenLocation> queryPage(int pageNum, int pageSize) {
        Page<CanteenLocation> page = new Page<>(pageNum, pageSize);
        IPage<CanteenLocation> result = canteenLocationMapper.selectPage(page, null);

        return result.getRecords();
    }

    @Override
    public Result queryDishList() {
        List<CanteenLocation> list = canteenLocationMapper.selectList(null);
        List<LocationVO> locationVOList = new ArrayList<>();
        for(CanteenLocation canteenLocation:list){
            LocationVO locationVO = new LocationVO();
            locationVO.setId(canteenLocation.getId());
            locationVO.setName(canteenLocation.getName());

            Integer locationId = canteenLocation.getId();
            LambdaQueryWrapper<Dish> queryWrapper = new LambdaQueryWrapper<>();
            queryWrapper.eq(Dish::getLocationId,locationId);
            List<Dish> dishes = dishMapper.selectList(queryWrapper);
            locationVO.setDishList(dishes);
            locationVOList.add(locationVO);
        }
        return Result.ok(locationVOList , locationVOList.size());
    }

}