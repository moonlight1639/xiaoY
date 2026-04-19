package com.pj.xiaoY.controller;

import java.util.Arrays;
import java.util.List;

import com.pj.xiaoY.entity.vo.CourseCommentVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pj.xiaoY.entity.CourseComment;
import com.pj.xiaoY.service.CourseCommentService;
import com.pj.xiaoY.common.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;



/**
 * 课程评论信息表
 *
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-02-03 11:09:42
 */
@RestController
@RequestMapping("xiaoY/coursecomment")
@Tag(name = "课程评论管理", description = "课程评论信息表相关接口")
public class CourseCommentController {
    @Autowired
    private CourseCommentService courseCommentService;

    /**
     * 列表
     */
    @GetMapping("/list")
    @Operation(summary = "分页查询课程评论", description = "按页查询课程评论列表")
    public Result list(@Parameter(description = "页码") @RequestParam(name = "pageNum",defaultValue = "1") int pageNum, @Parameter(description = "每页条数") @RequestParam(name = "pageSize" , defaultValue = "10")int pageSize){
        List<CourseCommentVo> page = courseCommentService.queryPage(pageNum , pageSize);

        return Result.ok(page , page.size());
    }


    /**
     * 信息
     */
    @GetMapping("/{id}")
    @Operation(summary = "获取课程评论详情", description = "根据课程 ID 获取评论信息")
    public Result info(@Parameter(description = "课程ID") @PathVariable("id") Long id){
//		CourseComment courseComment = courseCommentService.getById(id);

        return courseCommentService.getByCourseId(id);
    }

    /**
     * 保存
     */
    @PostMapping("/save")
    @Operation(summary = "新增课程评论", description = "保存课程评论")
    public Result save(@RequestBody CourseComment courseComment){
		courseCommentService.save(courseComment);

        return Result.ok();
    }

    @PostMapping("/commit-comment")
    @Operation(summary = "提交课程评论", description = "提交一条课程评论并触发后续逻辑")
    public Result commitComment(@RequestBody CourseComment courseComment){
        courseCommentService.commitComment(courseComment);

        return Result.ok();
    }
    /**
     * 修改
     */
    @PutMapping("/update")
    @Operation(summary = "更新课程评论", description = "根据 ID 更新课程评论")
    public Result update(@RequestBody CourseComment courseComment){
		courseCommentService.updateById(courseComment);

        return Result.ok();
    }

    /**
     * 删除
     */
    @DeleteMapping("/delete")
    @Operation(summary = "删除课程评论", description = "根据 ID 批量删除课程评论")
    public Result delete(@RequestBody Long[] ids){
		courseCommentService.removeByIds(Arrays.asList(ids));

        return Result.ok();
    }

}
