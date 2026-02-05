package com.pj.xiaoY.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pj.xiaoY.entity.Course;
import com.pj.xiaoY.service.CourseService;
import com.pj.xiaoY.common.Result;



/**
 * 课程信息表
 *
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-02-03 11:09:42
 */
@RestController
@RequestMapping("xiaoY/course")
public class CourseController {
    @Autowired
    private CourseService courseService;

    /**
     * 列表
     */
    @GetMapping("/list")
    public Result list(@RequestParam(name = "pageNum",defaultValue = "1") int pageNum, @RequestParam(name = "pageSize" , defaultValue = "30")int pageSize){
        List<Course> page = courseService.queryPage(pageNum , pageSize);

        return Result.ok(page , page.size());
    }


    /**
     * 信息
     */
    @GetMapping("/{id}")
    public Result info(@PathVariable("id") Long id){
		Course course = courseService.getById(id);

        return Result.ok(course);
    }

    /**
     * 保存
     */
    @PostMapping("/save")
    public Result save(@RequestBody Course course){
		courseService.save(course);

        return Result.ok();
    }

    /**
     * 修改
     */
    @PutMapping("/update")
    public Result update(@RequestBody Course course){
		courseService.updateById(course);

        return Result.ok();
    }

    /**
     * 删除
     */
    @DeleteMapping("/delete")
    public Result delete(@RequestBody Long[] ids){
		courseService.removeByIds(Arrays.asList(ids));

        return Result.ok();
    }

}
