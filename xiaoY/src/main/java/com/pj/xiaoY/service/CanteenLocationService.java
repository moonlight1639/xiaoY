package com.pj.xiaoY.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.pj.xiaoY.common.Result;
import com.pj.xiaoY.entity.CanteenLocation;

import java.util.List;

/**
 * 食堂地点信息表
 *
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-02-03 11:09:42
 */
public interface CanteenLocationService extends IService<CanteenLocation> {

    List<CanteenLocation> queryPage(int pageNum, int pageSize);

    Result queryDishList();
}

