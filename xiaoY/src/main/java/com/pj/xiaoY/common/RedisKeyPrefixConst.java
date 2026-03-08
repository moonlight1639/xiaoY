package com.pj.xiaoY.common;

public class RedisKeyPrefixConst {
    public static final String PREFIX_LOGIN_USER_TOKEN = "xiaoY:login:user:token:"; // 登录用户 token 前缀
    public static final String PREFIX_CHAT_MESSAGE_TITLE = "xiaoY:chat:message:title:";
    // 私有构造器：禁止实例化
    private RedisKeyPrefixConst() {}
}
