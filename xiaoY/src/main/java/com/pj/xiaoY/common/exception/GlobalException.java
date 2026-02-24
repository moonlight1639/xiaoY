package com.pj.xiaoY.common.exception;

public class GlobalException extends RuntimeException {
    // 异常码
    private Integer code;

    // 构造方法
    public GlobalException(Integer code, String message) {
        super(message);
        this.code = code;
    }

    public GlobalException(String message) {
        // 默认业务异常码400
        this(400, message);
    }

    // getter
    public Integer getCode() {
        return code;
    }
}