package com.pj.xiaoY.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pj.xiaoY.entity.Dish;
import com.pj.xiaoY.service.DishService;
import com.pj.xiaoY.common.Result;



/**
 * 食堂菜品信息表
 *
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-02-03 11:09:42
 */
@RestController
@RequestMapping("xiaoY/dish")
public class DishController {
    @Autowired
    private DishService dishService;

    /**
     * 列表
     */
    @GetMapping("/list")
    public Result list(@RequestParam(name = "pageNum",defaultValue = "1") int pageNum, @RequestParam(name = "pageSize" , defaultValue = "10")int pageSize){
        List<Dish> page = dishService.queryPage(pageNum , pageSize);

        return Result.ok(page , page.size());
    }


    /**
     * 信息
     */
    @GetMapping("/{id}")
    public Result info(@PathVariable("id") Long id){
		Dish dish = dishService.getById(id);

        return Result.ok(dish);
    }

    /**
     * 保存
     */
    @PostMapping("/save")
    public Result save(@RequestBody Dish dish){
		return dishService.Mysave(dish);

    }

    /**
     * 修改
     */
    @PutMapping("/update")
    public Result update(@RequestBody Dish dish){
		dishService.updateById(dish);

        return Result.ok();
    }

    /**
     * 删除
     */
    @DeleteMapping("/delete")
    public Result delete(@RequestBody Long[] ids){
		dishService.removeByIds(Arrays.asList(ids));

        return Result.ok();
    }

}
