package com.pj.xiaoY;

import com.pj.xiaoY.entity.User;
import com.pj.xiaoY.entity.UserInfo;
import com.pj.xiaoY.utils.JavaToTsGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class GeneratorTest {

    @Test
    void test() {
        JavaToTsGenerator.writeToProjectDir(UserInfo.class);
    }

}
