package com.pj.xiaoY.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pj.xiaoY.entity.Dish;
import com.pj.xiaoY.service.DishService;
import com.pj.xiaoY.common.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;



/**
 * 食堂菜品信息表
 *
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-02-03 11:09:42
 */
@RestController
@RequestMapping("xiaoY/dish")
@Tag(name = "菜品管理", description = "食堂菜品信息表相关接口")
public class DishController {
    @Autowired
    private DishService dishService;

    /**
     * 列表
     */
    @GetMapping("/list")
    @Operation(summary = "分页查询菜品", description = "按页查询菜品列表")
    public Result list(@Parameter(description = "页码") @RequestParam(name = "pageNum",defaultValue = "1") int pageNum, @Parameter(description = "每页条数") @RequestParam(name = "pageSize" , defaultValue = "10")int pageSize){
        List<Dish> page = dishService.queryPage(pageNum , pageSize);

        return Result.ok(page , page.size());
    }


    /**
     * 信息
     */
    @GetMapping("/{id}")
    @Operation(summary = "获取菜品详情", description = "根据 ID 获取菜品信息")
    public Result info(@Parameter(description = "菜品ID") @PathVariable("id") Long id){
		Dish dish = dishService.getById(id);

        return Result.ok(dish);
    }

    /**
     * 保存
     */
    @PostMapping("/save")
    @Operation(summary = "新增菜品", description = "保存一条菜品记录")
    public Result save(@RequestBody Dish dish){
		return dishService.Mysave(dish);

    }

    /**
     * 修改
     */
    @PutMapping("/update")
    @Operation(summary = "更新菜品", description = "根据 ID 更新菜品信息")
    public Result update(@RequestBody Dish dish){
		dishService.updateById(dish);

        return Result.ok();
    }

    /**
     * 删除
     */
    @DeleteMapping("/delete")
    @Operation(summary = "删除菜品", description = "根据 ID 批量删除菜品")
    public Result delete(@RequestBody Long[] ids){
		dishService.removeByIds(Arrays.asList(ids));

        return Result.ok();
    }

}
