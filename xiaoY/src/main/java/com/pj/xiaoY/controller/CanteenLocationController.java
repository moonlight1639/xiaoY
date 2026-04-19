package com.pj.xiaoY.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pj.xiaoY.entity.CanteenLocation;
import com.pj.xiaoY.service.CanteenLocationService;
import com.pj.xiaoY.common.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;



/**
 * 食堂地点信息表
 *
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-02-03 11:09:42
 */
@RestController
@RequestMapping("xiaoY/canteenlocation")
@Tag(name = "食堂地点管理", description = "食堂地点信息表相关接口")
public class CanteenLocationController {
    @Autowired
    private CanteenLocationService canteenLocationService;

    /**
     * 列表
     */
    @GetMapping("/dishlist")
    @Operation(summary = "食堂地点菜品列表", description = "查询食堂地点关联的菜品列表")
    public Result dishList(){
        return canteenLocationService.queryDishList();

    }

    @GetMapping("/list")
    @Operation(summary = "分页查询食堂地点", description = "按页查询食堂地点信息")
    public Result list(@Parameter(description = "页码") @RequestParam(name = "pageNum",defaultValue = "1") int pageNum, @Parameter(description = "每页条数") @RequestParam(name = "pageSize" , defaultValue = "10")int pageSize){
        List<CanteenLocation> page = canteenLocationService.queryPage(pageNum , pageSize);

        return Result.ok(page , page.size());
    }


    /**
     * 信息
     */
    @GetMapping("/{id}")
    @Operation(summary = "查询单个食堂地点", description = "根据 ID 获取食堂地点详情")
    public Result info(@Parameter(description = "食堂地点ID") @PathVariable("id") Long id){
		CanteenLocation canteenLocation = canteenLocationService.getById(id);

        return Result.ok(canteenLocation);
    }

    /**
     * 保存
     */
    @PostMapping("/save")
    @Operation(summary = "新增食堂地点", description = "保存一个食堂地点")
    public Result save(@RequestBody CanteenLocation canteenLocation){
		canteenLocationService.save(canteenLocation);

        return Result.ok();
    }

    /**
     * 修改
     */
    @PutMapping("/update")
    @Operation(summary = "更新食堂地点", description = "根据 ID 更新食堂地点信息")
    public Result update(@RequestBody CanteenLocation canteenLocation){
		canteenLocationService.updateById(canteenLocation);

        return Result.ok();
    }

    /**
     * 删除
     */
    @DeleteMapping("/delete")
    @Operation(summary = "删除食堂地点", description = "根据 ID 批量删除食堂地点")
    public Result delete(@RequestBody Long[] ids){
		canteenLocationService.removeByIds(Arrays.asList(ids));

        return Result.ok();
    }

}
