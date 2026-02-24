package com.pj.xiaoY.service.impl;

import com.pj.xiaoY.service.UploadService;
import com.pj.xiaoY.utils.MinioUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UploadServiceImpl implements UploadService {
    @Autowired
    private MinioUtil minioUtil;

    @Override
    public String uploadFile(MultipartFile file, String path) {
        return minioUtil.uploadFile(file, path);
    }
}
