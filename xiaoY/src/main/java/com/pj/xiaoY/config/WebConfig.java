package com.pj.xiaoY.config;

import com.pj.xiaoY.common.GlobalConfigConst;
import com.pj.xiaoY.interceptor.AuthInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
//                .allowedOrigins("http://localhost:5173" , "http://localhost:8092")
                .allowedOriginPatterns("*")
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @Autowired
    private AuthInterceptor authInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        if(GlobalConfigConst.isAuthentication) {
            registry.addInterceptor(authInterceptor)
                    .addPathPatterns("/xiaoY/chatmessagebyuser/**" , "/xiaoY/coursecomment/commit-comment") // 需要认证的路径
                    .excludePathPatterns("/xiaoY/user/login", "/xiaoY/user/register"); // 排除白名单（可选，和拦截器内白名单重复也没关系，双重保障）
        }
    }
}
