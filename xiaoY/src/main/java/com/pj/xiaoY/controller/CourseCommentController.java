package com.pj.xiaoY.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pj.xiaoY.entity.CourseComment;
import com.pj.xiaoY.service.CourseCommentService;
import com.pj.xiaoY.common.Result;



/**
 * 课程评论信息表
 *
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-02-03 11:09:42
 */
@RestController
@RequestMapping("xiaoY/coursecomment")
public class CourseCommentController {
    @Autowired
    private CourseCommentService courseCommentService;

    /**
     * 列表
     */
    @GetMapping("/list")
    public Result list(@RequestParam(name = "pageNum",defaultValue = "1") int pageNum, @RequestParam(name = "pageSize" , defaultValue = "10")int pageSize){
        List<CourseComment> page = courseCommentService.queryPage(pageNum , pageSize);

        return Result.ok(page , page.size());
    }


    /**
     * 信息
     */
    @GetMapping("/{id}")
    public Result info(@PathVariable("id") Long id){
//		CourseComment courseComment = courseCommentService.getById(id);

        return courseCommentService.getByCourseId(id);
    }

    /**
     * 保存
     */
    @PostMapping("/save")
    public Result save(@RequestBody CourseComment courseComment){
		courseCommentService.save(courseComment);

        return Result.ok();
    }

    /**
     * 修改
     */
    @PutMapping("/update")
    public Result update(@RequestBody CourseComment courseComment){
		courseCommentService.updateById(courseComment);

        return Result.ok();
    }

    /**
     * 删除
     */
    @DeleteMapping("/delete")
    public Result delete(@RequestBody Long[] ids){
		courseCommentService.removeByIds(Arrays.asList(ids));

        return Result.ok();
    }

}
