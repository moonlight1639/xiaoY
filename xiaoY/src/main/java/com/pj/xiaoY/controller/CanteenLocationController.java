package com.pj.xiaoY.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pj.xiaoY.entity.CanteenLocation;
import com.pj.xiaoY.service.CanteenLocationService;
import com.pj.xiaoY.common.Result;



/**
 * 食堂地点信息表
 *
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-02-03 11:09:42
 */
@RestController
@RequestMapping("xiaoY/canteenlocation")
public class CanteenLocationController {
    @Autowired
    private CanteenLocationService canteenLocationService;

    /**
     * 列表
     */
    @GetMapping("/dishlist")
    public Result dishList(){
        return canteenLocationService.queryDishList();

    }

    @GetMapping("/list")
    public Result list(@RequestParam(name = "pageNum",defaultValue = "1") int pageNum, @RequestParam(name = "pageSize" , defaultValue = "10")int pageSize){
        List<CanteenLocation> page = canteenLocationService.queryPage(pageNum , pageSize);

        return Result.ok(page , page.size());
    }


    /**
     * 信息
     */
    @GetMapping("/{id}")
    public Result info(@PathVariable("id") Long id){
		CanteenLocation canteenLocation = canteenLocationService.getById(id);

        return Result.ok(canteenLocation);
    }

    /**
     * 保存
     */
    @PostMapping("/save")
    public Result save(@RequestBody CanteenLocation canteenLocation){
		canteenLocationService.save(canteenLocation);

        return Result.ok();
    }

    /**
     * 修改
     */
    @PutMapping("/update")
    public Result update(@RequestBody CanteenLocation canteenLocation){
		canteenLocationService.updateById(canteenLocation);

        return Result.ok();
    }

    /**
     * 删除
     */
    @DeleteMapping("/delete")
    public Result delete(@RequestBody Long[] ids){
		canteenLocationService.removeByIds(Arrays.asList(ids));

        return Result.ok();
    }

}
