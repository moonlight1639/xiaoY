package com.pj.xiaoY.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pj.xiaoY.entity.CourseSummary;
import com.pj.xiaoY.service.CourseSummaryService;
import com.pj.xiaoY.common.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;



/**
 * 课程总结表
 *
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-02-03 19:41:00
 */
@RestController
@RequestMapping("xiaoY/coursesummary")
@Tag(name = "课程总结管理", description = "课程总结表相关接口")
public class CourseSummaryController {
    @Autowired
    private CourseSummaryService courseSummaryService;

    /**
     * 列表
     */
    @GetMapping("/list")
    @Operation(summary = "分页查询课程总结", description = "按页查询课程总结列表")
    public Result list(@Parameter(description = "页码") @RequestParam(name = "pageNum",defaultValue = "1") int pageNum, @Parameter(description = "每页条数") @RequestParam(name = "pageSize" , defaultValue = "10")int pageSize){
        List<CourseSummary> page = courseSummaryService.queryPage(pageNum , pageSize);

        return Result.ok(page , page.size());
    }


    /**
     * 信息
     */
    @GetMapping("/{id}")
    @Operation(summary = "获取课程总结详情", description = "根据 ID 获取课程总结信息")
    public Result info(@Parameter(description = "课程总结ID") @PathVariable("id") Integer id){
		CourseSummary courseSummary = courseSummaryService.getById(id);

        return Result.ok(courseSummary);
    }

    /**
     * 保存
     */
    @PostMapping("/save")
    @Operation(summary = "新增课程总结", description = "保存一条课程总结记录")
    public Result save(@RequestBody CourseSummary courseSummary){
		courseSummaryService.save(courseSummary);

        return Result.ok();
    }

    /**
     * 修改
     */
    @PutMapping("/update")
    @Operation(summary = "更新课程总结", description = "根据 ID 更新课程总结信息")
    public Result update(@RequestBody CourseSummary courseSummary){
		courseSummaryService.updateById(courseSummary);

        return Result.ok();
    }

    /**
     * 删除
     */
    @DeleteMapping("/delete")
    @Operation(summary = "删除课程总结", description = "根据 ID 批量删除课程总结")
    public Result delete(@RequestBody Integer[] ids){
		courseSummaryService.removeByIds(Arrays.asList(ids));

        return Result.ok();
    }

}
