package com.pj.xiaoY.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pj.xiaoY.entity.User;
import com.pj.xiaoY.service.UserService;
import com.pj.xiaoY.common.Result;


/**
 * 用户核心表（存储登录基础信息）
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2026-01-30 22:46:58
 */
@RestController
@RequestMapping("xiaoY/user")
public class UserController {
    @Autowired
    private UserService userService;

    /**
     * 列表
     */
    @GetMapping("/list")
    public Result list(@RequestParam(name = "pageNum",defaultValue = "1") int pageNum, @RequestParam(name = "pageSize" , defaultValue = "10")int pageSize){
        List<User> page = userService.queryPage(pageNum , pageSize);

        return Result.ok(page , page.size());
    }


    /**
     * 信息
     */
    @GetMapping("/{id}")
//    @RequiresPermissions("xiaoY:user:info")
    public Result info(@PathVariable("id") Long id){
		User user = userService.getById(id);

        return Result.ok(user);
    }

    /**
     * 保存
     */
    @PostMapping("/save")
//    @RequiresPermissions("xiaoY:user:save")
    public Result save(@RequestBody User user){
		userService.save(user);

        return Result.ok();
    }

    /**
     * 修改
     */
    @PutMapping("/update")
    public Result update(@RequestBody User user){
		userService.updateById(user);

        return Result.ok();
    }

    /**
     * 删除
     */
    @DeleteMapping("/delete")
    public Result delete(@RequestBody Long[] ids){
		userService.removeByIds(Arrays.asList(ids));

        return Result.ok();
    }

}
