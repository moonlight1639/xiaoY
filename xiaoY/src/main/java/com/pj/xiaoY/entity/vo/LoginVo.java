package com.pj.xiaoY.entity.vo;

import com.pj.xiaoY.entity.UserInfo;
import lombok.Data;

@Data
public class LoginVo {
    UserInfo userInfo;
    String token;
}
