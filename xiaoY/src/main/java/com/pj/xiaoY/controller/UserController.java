package com.pj.xiaoY.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pj.xiaoY.entity.User;
import com.pj.xiaoY.service.UserService;
import com.pj.xiaoY.common.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;



/**
 * 用户核心表（存储登录基础信息）
 *
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-01-31 21:09:55
 */
@RestController
@RequestMapping("xiaoY/user")
@Tag(name = "用户管理", description = "用户核心表相关接口")
public class UserController {
    @Autowired
    private UserService userService;

    /**
     * 列表
     */
    @GetMapping("/list")
    @Operation(summary = "分页查询用户", description = "按页查询用户列表")
    public Result list(@Parameter(description = "页码") @RequestParam(name = "pageNum",defaultValue = "1") int pageNum, @Parameter(description = "每页条数") @RequestParam(name = "pageSize" , defaultValue = "10")int pageSize){
        List<User> page = userService.queryPage(pageNum , pageSize);

        return Result.ok(page , page.size());
    }

    @PostMapping("/register")
    @Operation(summary = "用户注册", description = "注册新用户")
    public Result register(@RequestBody User user){
        return userService.register(user);
    }

    @PostMapping("/login")
    @Operation(summary = "用户登录", description = "用户登录接口")
    public Result login(@RequestBody User user){
        return userService.login(user);
    }
    /**
     * 信息
     */
    @GetMapping("/{id}")
    @Operation(summary = "获取用户详情", description = "根据 ID 获取用户信息")
    public Result info(@Parameter(description = "用户ID") @PathVariable("id") Long id){
		User user = userService.getById(id);

        return Result.ok(user);
    }

    /**
     * 保存
     */
    @PostMapping("/save")
    @Operation(summary = "新增用户", description = "保存一条用户记录")
    public Result save(@RequestBody User user){
		userService.save(user);

        return Result.ok();
    }

    /**
     * 修改
     */
    @PutMapping("/update")
    @Operation(summary = "更新用户", description = "根据 ID 更新用户信息")
    public Result update(@RequestBody User user){
		userService.updateById(user);

        return Result.ok();
    }

    /**
     * 删除
     */
    @DeleteMapping("/delete")
    @Operation(summary = "删除用户", description = "根据 ID 批量删除用户")
    public Result delete(@RequestBody Long[] ids){
		userService.removeByIds(Arrays.asList(ids));

        return Result.ok();
    }

}
