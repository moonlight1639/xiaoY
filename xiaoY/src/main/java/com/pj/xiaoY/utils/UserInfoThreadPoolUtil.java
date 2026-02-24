package com.pj.xiaoY.utils;

import com.pj.xiaoY.entity.UserInfo;
import org.springframework.stereotype.Component;

@Component
public class UserInfoThreadPoolUtil {
    private static final ThreadLocal<UserInfo> USER_HOLDER = new ThreadLocal<>();
    public static void set(UserInfo userinfo) {
        USER_HOLDER.set(userinfo);
    }

    public static UserInfo get() {
        return USER_HOLDER.get();
    }

    public static void remove() {
        USER_HOLDER.remove();
    }
}
