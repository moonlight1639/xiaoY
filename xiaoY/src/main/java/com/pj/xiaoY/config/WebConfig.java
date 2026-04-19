package com.pj.xiaoY.config;

import com.pj.xiaoY.common.GlobalConfigConst;
import com.pj.xiaoY.interceptor.AuthInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**")
//                .allowedOrigins("http://localhost:5173" , "http://localhost:8092")
                .allowedOriginPatterns("*")
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @Autowired
    private AuthInterceptor authInterceptor;

    @Autowired
    private GlobalConfigConst globalConfigConst;

    @Override
    public void addInterceptors(@NonNull InterceptorRegistry registry) {
        if (Boolean.TRUE.equals(globalConfigConst.getAuthentication())) {
            registry.addInterceptor(authInterceptor)
                    .addPathPatterns("/**")
                    .excludePathPatterns(
                            "/xiaoY/user/login",
                            "/xiaoY/user/register",
                            "/swagger-ui.html",
                            "/swagger-ui/**",
                            "/v3/api-docs/**",
                            "/doc.html",
                            "/webjars/**",
                            "/favicon.ico",
                            "/error"
                    );
        }
    }
}
