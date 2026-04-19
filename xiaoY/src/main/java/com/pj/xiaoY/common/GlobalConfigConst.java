package com.pj.xiaoY.common;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app")
public class GlobalConfigConst {
    /**
     * 是否开启路由鉴权
     */
    private Boolean authentication = true;

    /**
     * 是否启用 Swagger
     */
    private Boolean swaggerEnabled = false;

    public Boolean getAuthentication() {
        return authentication;
    }

    public void setAuthentication(Boolean authentication) {
        this.authentication = authentication;
    }

    public Boolean getSwaggerEnabled() {
        return swaggerEnabled;
    }

    public void setSwaggerEnabled(Boolean swaggerEnabled) {
        this.swaggerEnabled = swaggerEnabled;
    }
}
