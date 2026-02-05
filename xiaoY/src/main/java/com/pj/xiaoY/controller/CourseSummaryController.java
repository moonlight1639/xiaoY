package com.pj.xiaoY.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pj.xiaoY.entity.CourseSummary;
import com.pj.xiaoY.service.CourseSummaryService;
import com.pj.xiaoY.common.Result;



/**
 * 课程总结表
 *
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-02-03 19:41:00
 */
@RestController
@RequestMapping("xiaoY/coursesummary")
public class CourseSummaryController {
    @Autowired
    private CourseSummaryService courseSummaryService;

    /**
     * 列表
     */
    @GetMapping("/list")
    public Result list(@RequestParam(name = "pageNum",defaultValue = "1") int pageNum, @RequestParam(name = "pageSize" , defaultValue = "10")int pageSize){
        List<CourseSummary> page = courseSummaryService.queryPage(pageNum , pageSize);

        return Result.ok(page , page.size());
    }


    /**
     * 信息
     */
    @GetMapping("/{id}")
    public Result info(@PathVariable("id") Integer id){
		CourseSummary courseSummary = courseSummaryService.getById(id);

        return Result.ok(courseSummary);
    }

    /**
     * 保存
     */
    @PostMapping("/save")
    public Result save(@RequestBody CourseSummary courseSummary){
		courseSummaryService.save(courseSummary);

        return Result.ok();
    }

    /**
     * 修改
     */
    @PutMapping("/update")
    public Result update(@RequestBody CourseSummary courseSummary){
		courseSummaryService.updateById(courseSummary);

        return Result.ok();
    }

    /**
     * 删除
     */
    @DeleteMapping("/delete")
    public Result delete(@RequestBody Integer[] ids){
		courseSummaryService.removeByIds(Arrays.asList(ids));

        return Result.ok();
    }

}
