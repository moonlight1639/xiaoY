package com.pj.xiaoY.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pj.xiaoY.entity.UserInfo;
import com.pj.xiaoY.service.UserInfoService;
import com.pj.xiaoY.common.Result;



/**
 * 用户信息主表
 *
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-01-31 21:09:55
 */
@RestController
@RequestMapping("xiaoY/userinfo")
public class UserInfoController {
    @Autowired
    private UserInfoService userInfoService;

    /**
     * 列表
     */
    @GetMapping("/list")
    public Result list(@RequestParam(name = "pageNum",defaultValue = "1") int pageNum, @RequestParam(name = "pageSize" , defaultValue = "10")int pageSize){
        List<UserInfo> page = userInfoService.queryPage(pageNum , pageSize);

        return Result.ok(page , page.size());
    }


    /**
     * 信息
     */
    @GetMapping("/{id}")
    public Result info(@PathVariable("id") Long id){
		UserInfo userInfo = userInfoService.getById(id);

        return Result.ok(userInfo);
    }

    /**
     * 保存
     */
    @PostMapping("/save")
    public Result save(@RequestBody UserInfo userInfo){
		userInfoService.save(userInfo);

        return Result.ok();
    }

    /**
     * 修改
     */
    @PutMapping("/update")
    public Result update(@RequestBody UserInfo userInfo){
		userInfoService.updateById(userInfo);

        return Result.ok();
    }

    /**
     * 删除
     */
    @DeleteMapping("/delete")
    public Result delete(@RequestBody Long[] ids){
		userInfoService.removeByIds(Arrays.asList(ids));

        return Result.ok();
    }

}
