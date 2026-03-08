package com.pj.xiaoY.interceptor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pj.xiaoY.common.Result;
import com.pj.xiaoY.entity.UserInfo;
import com.pj.xiaoY.utils.UserInfoThreadPoolUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;
import java.io.PrintWriter;

@Component
public class UserInfoInterceptor implements HandlerInterceptor {
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
        if(token != null){
            String userInfoJson = stringRedisTemplate.opsForValue().get(token);
            if(userInfoJson != null){
                userInfoThreadPoolUtil.set(objectMapper.readValue(userInfoJson, UserInfo.class));
            }

        }

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


}
