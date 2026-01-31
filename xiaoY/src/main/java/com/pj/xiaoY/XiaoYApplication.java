package com.pj.xiaoY;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("com.pj.xiaoY.mapper")
@SpringBootApplication(
//    exclude = DataSourceAutoConfiguration.class
)
public class XiaoYApplication {
    public static  void  main(String[] args){
        SpringApplication.run(XiaoYApplication.class, args);
    }
}
