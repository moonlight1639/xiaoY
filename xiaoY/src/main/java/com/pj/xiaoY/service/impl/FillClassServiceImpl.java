package com.pj.xiaoY.service.impl;

import com.github.xiaoymin.knife4j.core.util.StrUtil;
import com.pj.xiaoY.assistant.XiaoY;
import com.pj.xiaoY.common.exception.GlobalException;
import com.pj.xiaoY.service.FillClassService;
import com.pj.xiaoY.utils.SpringResourceReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ClassUtils;
//import org.springframework.util.ClassUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
@Service
public class FillClassServiceImpl implements FillClassService {
    @Autowired
    private XiaoY xiaoY;
    @Autowired
    private SpringResourceReader springResourceReader;
    @Autowired
    private ObjectMapper objectMapper;
    @Override
    public Object fill(String userContext , String userClassType , String userClassVo) {
        if(StrUtil.isBlank(userContext)){
            throw new GlobalException("用户输入不能为空");
        }
        String packageName = "com.pj.xiaoY.entity";
        String userClass = "";
        try {
            Class<?> clazz = Class.forName(packageName + "." + userClassVo);
            System.out.println(clazz);
            userClass = springResourceReader.readResourceFile("class_description/" + userClassType + ".txt");
            String fillJson = xiaoY.fill(userClass, userContext);
            System.out.println(fillJson);
            Object object = objectMapper.readValue(fillJson, clazz);
            return object;
        }catch (Exception e){
            throw new GlobalException("用户读取类型失败");
        }



    }
}
