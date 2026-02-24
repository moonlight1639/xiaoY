package com.pj.xiaoY.utils;

import com.pj.xiaoY.properties.MinioProperties;
import io.minio.*;
import io.minio.http.Method;
import io.minio.messages.DeleteObject;
import io.minio.messages.Item;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class MinioUtil {

    private final MinioClient minioClient;
    private final MinioProperties minioProperties;

    /**
     * 上传文件
     */
    public String uploadFile(MultipartFile file) {
        return uploadFile(file, minioProperties.getFilePrefix());
    }

    /**
     * 上传到指定目录
     */
    public String uploadFile(MultipartFile file, String directory) {
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.isEmpty()) {
            throw new IllegalArgumentException("文件名不能为空");
        }

        // 生成唯一文件名
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String uuid = UUID.randomUUID().toString().replace("-", "");
        String fileName = directory + uuid + extension;

        try {
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(minioProperties.getBucketName())
                            .object(fileName)
                            .stream(file.getInputStream(), file.getSize(), -1)
                            .contentType(file.getContentType())
                            .build()
            );
            return getPublicUrl(fileName);
//            return getFileUrl(fileName);//私有签名
        } catch (Exception e) {
            throw new RuntimeException("文件上传失败: " + e.getMessage(), e);
        }
    }

    /**
     * 获取文件访问URL
     */
    public String getFileUrl(String fileName) {
        try {
            return minioClient.getPresignedObjectUrl(
                    GetPresignedObjectUrlArgs.builder()
                            .bucket(minioProperties.getBucketName())
                            .object(fileName)
                            .method(Method.GET)
                            .expiry(minioProperties.getExpireSeconds())
                            .build()
            );
        } catch (Exception e) {
            throw new RuntimeException("获取文件URL失败: " + e.getMessage(), e);
        }
    }

    /**
     * 获取公开访问URL
     */
    public String getPublicUrl(String fileName) {
        return minioProperties.getUrl() + "/" + minioProperties.getBucketName() + "/" + fileName;
    }

    /**
     * 获取上传签名URL
     */
    public String getUploadUrl(String fileName, String contentType) {
        try {
            return minioClient.getPresignedObjectUrl(
                    GetPresignedObjectUrlArgs.builder()
                            .bucket(minioProperties.getBucketName())
                            .object(fileName)
                            .method(Method.PUT)
                            .expiry(minioProperties.getExpireSeconds())
//                            .contentType(contentType)
                            .build()
            );
        } catch (Exception e) {
            throw new RuntimeException("获取上传URL失败: " + e.getMessage(), e);
        }
    }

    /**
     * 删除文件
     */
    public void deleteFile(String fileName) {
        try {
            minioClient.removeObject(
                    RemoveObjectArgs.builder()
                            .bucket(minioProperties.getBucketName())
                            .object(fileName)
                            .build()
            );
        } catch (Exception e) {
            throw new RuntimeException("删除文件失败: " + e.getMessage(), e);
        }
    }

    /**
     * 批量删除
     */
    public void deleteFiles(List<String> fileNames) {
        List<DeleteObject> objects = new ArrayList<>();
        for (String fileName : fileNames) {
            objects.add(new DeleteObject(fileName));
        }
        try {
            minioClient.removeObjects(
                    RemoveObjectsArgs.builder()
                            .bucket(minioProperties.getBucketName())
                            .objects(objects)
                            .build()
            );
        } catch (Exception e) {
            throw new RuntimeException("批量删除失败: " + e.getMessage(), e);
        }
    }

    /**
     * 下载文件到本地
     */
    public void downloadFile(String fileName, String localPath) {
        try (InputStream inputStream = minioClient.getObject(
                GetObjectArgs.builder()
                        .bucket(minioProperties.getBucketName())
                        .object(fileName)
                        .build());
             FileOutputStream outputStream = new FileOutputStream(localPath)) {
            byte[] buffer = new byte[4096];
            int len;
            while ((len = inputStream.read(buffer)) > 0) {
                outputStream.write(buffer, 0, len);
            }
        } catch (Exception e) {
            throw new RuntimeException("文件下载失败: " + e.getMessage(), e);
        }
    }

    /**
     * 获取文件流
     */
    public InputStream getFileInputStream(String fileName) {
        try {
            return minioClient.getObject(
                    GetObjectArgs.builder()
                            .bucket(minioProperties.getBucketName())
                            .object(fileName)
                            .build()
            );
        } catch (Exception e) {
            throw new RuntimeException("获取文件流失败: " + e.getMessage(), e);
        }
    }

    /**
     * 判断文件是否存在
     */
    public boolean fileExists(String fileName) {
        try {
            minioClient.statObject(
                    StatObjectArgs.builder()
                            .bucket(minioProperties.getBucketName())
                            .object(fileName)
                            .build()
            );
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * 获取文件列表
     */
    public List<String> listFiles(String prefix) {
        List<String> fileNames = new ArrayList<>();
        try {
            Iterable<Result<Item>> results = minioClient.listObjects(
                    ListObjectsArgs.builder()
                            .bucket(minioProperties.getBucketName())
                            .prefix(prefix)
                            .recursive(true)
                            .build()
            );
            for (Result<Item> result : results) {
                fileNames.add(result.get().objectName());
            }
        } catch (Exception e) {
            throw new RuntimeException("获取文件列表失败: " + e.getMessage(), e);
        }
        return fileNames;
    }
}
