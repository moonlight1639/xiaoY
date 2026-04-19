package com.pj.xiaoY.interceptor;

import com.pj.xiaoY.entity.Course;
import com.pj.xiaoY.entity.CourseComment;
import com.pj.xiaoY.entity.UserInfo;
import com.pj.xiaoY.properties.MinioProperties;
import org.apache.ibatis.cache.CacheKey;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.*;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Properties;

@Intercepts({
        @Signature(type = Executor.class, method = "update", args = {MappedStatement.class, Object.class}),
    @Signature(type = Executor.class, method = "query", args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class}),
    @Signature(type = Executor.class, method = "query", args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class, CacheKey.class, BoundSql.class})
})
public class AvatarPathMybatisInterceptor implements Interceptor {

    private final MinioProperties minioProperties;

    public AvatarPathMybatisInterceptor(MinioProperties minioProperties) {
        this.minioProperties = minioProperties;
    }

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        Object[] args = invocation.getArgs();
        String method = invocation.getMethod().getName();

        if ("update".equals(method) && args.length > 1) {
            normalizeForWrite(args[1]);
            return invocation.proceed();
        }

        if ("query".equals(method)) {
            Object result = invocation.proceed();
            enrichForRead(result);
            return result;
        }

        return invocation.proceed();
    }

    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }

    @Override
    public void setProperties(Properties properties) {
    }

    private void normalizeForWrite(Object obj) {
        if (obj == null) {
            return;
        }
        if (obj instanceof Map<?, ?> map) {
            for (Object value : map.values()) {
                normalizeForWrite(value);
            }
            return;
        }
        if (obj instanceof Collection<?> collection) {
            for (Object item : collection) {
                normalizeForWrite(item);
            }
            return;
        }

        if (obj instanceof UserInfo userInfo) {
            userInfo.setAvatar(toRelative(userInfo.getAvatar()));
            return;
        }
        if (obj instanceof Course course) {
            course.setAvatar(toRelative(course.getAvatar()));
            return;
        }
        if (obj instanceof CourseComment courseComment) {
            courseComment.setUserAvatar(toRelative(courseComment.getUserAvatar()));
        }
    }

    private void enrichForRead(Object obj) {
        if (obj == null) {
            return;
        }
        if (obj instanceof List<?> list) {
            for (Object item : list) {
                enrichForRead(item);
            }
            return;
        }
        if (obj instanceof UserInfo userInfo) {
            userInfo.setAvatar(toAbsolute(userInfo.getAvatar()));
            return;
        }
        if (obj instanceof Course course) {
            course.setAvatar(toAbsolute(course.getAvatar()));
            return;
        }
        if (obj instanceof CourseComment courseComment) {
            courseComment.setUserAvatar(toAbsolute(courseComment.getUserAvatar()));
        }
    }

    private String toRelative(String avatar) {
        if (avatar == null || avatar.isBlank()) {
            return avatar;
        }
        String baseUrl = buildBaseUrl();
        if (avatar.startsWith(baseUrl)) {
            return avatar.substring(baseUrl.length());
        }
        return avatar;
    }

    private String toAbsolute(String avatar) {
        if (avatar == null || avatar.isBlank()) {
            return avatar;
        }
        if (avatar.startsWith("http://") || avatar.startsWith("https://")) {
            return avatar;
        }
        return buildBaseUrl() + avatar;
    }

    private String buildBaseUrl() {
        String url = Objects.requireNonNullElse(minioProperties.getUrl(), "").trim();
        String bucket = Objects.requireNonNullElse(minioProperties.getBucketName(), "").trim();

        if (url.endsWith("/")) {
            url = url.substring(0, url.length() - 1);
        }
        if (bucket.startsWith("/")) {
            bucket = bucket.substring(1);
        }
        if (bucket.endsWith("/")) {
            bucket = bucket.substring(0, bucket.length() - 1);
        }

        if (bucket.isEmpty()) {
            return url + "/";
        }
        return url + "/" + bucket + "/";
    }
}