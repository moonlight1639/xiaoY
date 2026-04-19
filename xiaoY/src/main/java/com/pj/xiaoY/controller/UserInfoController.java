package com.pj.xiaoY.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pj.xiaoY.entity.UserInfo;
import com.pj.xiaoY.service.UserInfoService;
import com.pj.xiaoY.common.Result;
import org.springframework.web.multipart.MultipartFile;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;


/**
 * 用户信息主表
 *
 * @author moonlight1639
 * @email sunlightcs@gmail.com
 * @date 2026-01-31 21:09:55
 */
@RestController
@RequestMapping("xiaoY/userinfo")
@Tag(name = "用户信息管理", description = "用户信息主表相关接口")
public class UserInfoController {
    @Autowired
    private UserInfoService userInfoService;

    /**
     * 列表
     */
    @GetMapping("/list")
    @Operation(summary = "分页查询用户信息", description = "按页查询用户信息列表")
    public Result list(@Parameter(description = "页码") @RequestParam(name = "pageNum",defaultValue = "1") int pageNum, @Parameter(description = "每页条数") @RequestParam(name = "pageSize" , defaultValue = "10")int pageSize){
        List<UserInfo> page = userInfoService.queryPage(pageNum , pageSize);

        return Result.ok(page , page.size());
    }


/*    @GetMapping("/total")
    public Result list(){
        int to

        return Result.ok(page , page.size());
    }  */
    /**
     * 信息
     */
    @GetMapping("/{id}")
    @Operation(summary = "获取用户信息详情", description = "根据 ID 获取用户信息")
    public Result info(@Parameter(description = "用户信息ID") @PathVariable("id") Long id){
		UserInfo userInfo = userInfoService.getById(id);

        return Result.ok(userInfo);
    }

    /**
     * 保存
     */
    @PostMapping("/save")
    @Operation(summary = "新增用户信息", description = "保存一条用户信息记录")
    public Result save(@RequestBody UserInfo userInfo){
		userInfoService.save(userInfo);

        return Result.ok();
    }

    /**
     * 修改
     */
    @PutMapping("/update")
    @Operation(summary = "更新用户信息", description = "根据 ID 更新用户信息")
    public Result update(@RequestBody UserInfo userInfo){
        userInfoService.updateById(userInfo);

        return Result.ok();
    }

    /**
     * 删除
     */
    @DeleteMapping("/delete")
    @Operation(summary = "删除用户信息", description = "根据 ID 批量删除用户信息")
    public Result delete(@RequestBody Long[] ids){
		userInfoService.removeByIds(Arrays.asList(ids));

        return Result.ok();
    }

    @PostMapping("/uploadavatar")
    @Operation(summary = "上传头像", description = "上传用户头像文件")
    public Result uploadAvatar(@Parameter(description = "头像文件") @RequestParam("file") MultipartFile file) {
        if(file.isEmpty()){
            return Result.fail("文件不能为空");
        }
        userInfoService.uploadAvatar(file);
        return Result.ok();
    }
}
