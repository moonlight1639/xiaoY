package com.pj.xiaoY.service.impl;

import com.pj.xiaoY.utils.MinioUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.pj.xiaoY.mapper.UserInfoMapper;
import com.pj.xiaoY.entity.UserInfo;
import com.pj.xiaoY.service.UserInfoService;
import org.springframework.web.multipart.MultipartFile;


@Service("userInfoService")
public class UserInfoServiceImpl extends ServiceImpl<UserInfoMapper, UserInfo> implements UserInfoService {

    @Autowired
    private  UserInfoMapper userInfoMapper;

    @Autowired
    private MinioUtil minioUtil;

    @Override
    public List<UserInfo> queryPage(int pageNum, int pageSize) {
        Page<UserInfo> page = new Page<>(pageNum, pageSize);
        IPage<UserInfo> result = userInfoMapper.selectPage(page, null);

        return result.getRecords();
    }

    @Override
    public void uploadAvatar(MultipartFile file) {
        String url =  minioUtil.uploadFile(file , "avatar/");
        // 这里可以将 url 存储到数据库中，关联到用户信息表

    }

}