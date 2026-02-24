package com.pj.xiaoY.interceptor;

import com.pj.xiaoY.common.Result;
import com.pj.xiaoY.entity.UserInfo;
import com.pj.xiaoY.utils.UserInfoThreadPoolUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.PrintWriter;

// 认证拦截器
@Component
public class AuthInterceptor implements HandlerInterceptor {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserInfoThreadPoolUtil userInfoThreadPoolUtil;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws Exception {
        // 在这里进行认证逻辑，例如检查请求头中的token
        String token = request.getHeader("Authorization");
        if(token == null){
            returnError(response, Result.fail("请先登录"));
            return false;
        }
        String userInfoJson = stringRedisTemplate.opsForValue().get(token);
        if(userInfoJson == null){
            returnError(response, Result.fail("token无效或已过期，请重新登录"));
            return false;
        }
        userInfoThreadPoolUtil.set(objectMapper.readValue(userInfoJson, UserInfo.class));
        return true; // 认证成功，允许请求继续处理
    }
    @Override
    public void postHandle(HttpServletRequest request,
                           HttpServletResponse response,
                           Object handler,
                           org.springframework.web.servlet.ModelAndView modelAndView) throws Exception {
        // 处理请求后逻辑（可选）
        userInfoThreadPoolUtil.remove();
    }


    private void returnError(HttpServletResponse response, Result result) throws IOException {
        // 设置响应头：JSON格式 + UTF-8编码（避免乱码）
        response.setContentType("application/json;charset=UTF-8");
        // 设置响应状态码（和 Result 里的 code 保持一致）
        response.setStatus(200);
        // 禁用缓存（避免前端缓存错误响应）
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

        // 将 Result 对象序列化为 JSON 字符串
        String json = objectMapper.writeValueAsString(result);

        // 写入响应体
        try (PrintWriter writer = response.getWriter()) {
            writer.write(json);
            writer.flush();
        }
    }
}
/*

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@Component
public class AuthInterceptor implements HandlerInterceptor {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    // 核心：请求处理前拦截并鉴权
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 1. 放行无需鉴权的路由（白名单）
        String requestUri = request.getRequestURI();
        if (isWhiteList(requestUri)) {
            return true;
        }

        // 2. 获取 Token（请求头：Authorization: Bearer <token>）
        String token = request.getHeader("Authorization");
        if (StringUtils.isBlank(token) || !token.startsWith("Bearer ")) {
            returnError(response, 401, "请先登录");
            return false;
        }
        token = token.substring(7); // 去掉 Bearer 前缀

        // 3. 验证 Token 有效性
        try {
            if (jwtTokenUtil.isTokenExpired(token)) {
                returnError(response, 401, "Token 已过期，请重新登录");
                return false;
            }
        } catch (Exception e) {
            returnError(response, 401, "Token 无效");
            return false;
        }

        // 4. 校验权限（核心：路由匹配权限）
        List<String> userPermissions = jwtTokenUtil.getPermissionsFromToken(token);
        if (!hasPermission(requestUri, userPermissions)) {
            returnError(response, 403, "权限不足，无法访问");
            return false;
        }

        // 5. 鉴权通过，放行
        return true;
    }

    // 路由白名单（无需鉴权的接口）
    private boolean isWhiteList(String uri) {
        return uri.startsWith("/api/auth/login") // 登录接口
                || uri.startsWith("/api/auth/register") // 注册接口
                || uri.contains("/swagger") // 接口文档（可选）
                || uri.contains("/doc"); // 接口文档（可选）
    }

    // 权限校验规则（可根据业务自定义）
    private boolean hasPermission(String uri, List<String> userPermissions) {
        // 规则1：管理员（admin）拥有所有权限
        if (userPermissions.contains("ROLE_ADMIN")) {
            return true;
        }
        // 规则2：普通用户（user）仅能访问 /api/user/** 路由
        if (userPermissions.contains("ROLE_USER") && uri.startsWith("/api/user/")) {
            return true;
        }
        // 其他路由无权限
        return false;
    }

    // 自定义错误响应（返回 JSON）
    private void returnError(HttpServletResponse response, int code, String msg) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(code);
        PrintWriter writer = response.getWriter();
        writer.write("{\"code\":" + code + ",\"msg\":\"" + msg + "\",\"data\":null}");
        writer.flush();
        writer.close();
    }
}

 */