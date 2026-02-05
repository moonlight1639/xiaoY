package com.pj.xiaoY;

import com.pj.xiaoY.entity.*;
import com.pj.xiaoY.utils.JavaToTsGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class GeneratorTest {

    @Test
    void test() {
        JavaToTsGenerator.writeToProjectDir(Dish.class);
    }

}
