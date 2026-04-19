package com.pj.xiaoY.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pj.xiaoY.entity.Course;
import com.pj.xiaoY.service.CourseService;
import com.pj.xiaoY.common.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;



/**
 * 课程信息表
 *
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-02-03 11:09:42
 */
@RestController
@RequestMapping("xiaoY/course")
@Tag(name = "课程管理", description = "课程信息表相关接口")
public class CourseController {
    @Autowired
    private CourseService courseService;

    /**
     * 列表
     */
    @GetMapping("/list")
    @Operation(summary = "分页查询课程", description = "按页查询课程列表")
    public Result list(@Parameter(description = "页码") @RequestParam(name = "pageNum",defaultValue = "1") int pageNum, @Parameter(description = "每页条数") @RequestParam(name = "pageSize" , defaultValue = "100")int pageSize){
        List<Course> page = courseService.queryPage(pageNum , pageSize);

        return Result.ok(page , page.size());
    }


    /**
     * 信息
     */
    @GetMapping("/{id}")
    @Operation(summary = "获取课程详情", description = "根据 ID 获取课程信息")
    public Result info(@Parameter(description = "课程ID") @PathVariable("id") Long id){
		Course course = courseService.getById(id);

        return Result.ok(course);
    }

    /**
     * 保存
     */
    @PostMapping("/save")
    @Operation(summary = "新增课程", description = "保存一条课程记录")
    public Result save(@RequestBody Course course){
		courseService.save(course);

        return Result.ok();
    }

    /**
     * 修改
     */
    @PutMapping("/update")
    @Operation(summary = "更新课程", description = "根据 ID 更新课程信息")
    public Result update(@RequestBody Course course){
		courseService.updateById(course);

        return Result.ok();
    }

    /**
     * 删除
     */
    @DeleteMapping("/delete")
    @Operation(summary = "删除课程", description = "根据 ID 批量删除课程")
    public Result delete(@RequestBody Long[] ids){
		courseService.removeByIds(Arrays.asList(ids));

        return Result.ok();
    }

}
