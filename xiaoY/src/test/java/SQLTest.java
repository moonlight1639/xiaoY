// package com.pj.xiaoY;

import com.pj.xiaoY.entity.Course;
import com.pj.xiaoY.mapper.CourseMapper;
import com.pj.xiaoY.service.CourseService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class SQLTest {
    @Autowired
    private CourseService courseService;

    @Test
    public void sqlTest() {
        List<Course> list = courseService.list();

        for (Course course : list) {
            System.out.println( "\"" + course.getCourseName() + "\":" + course.getId() + ",");
        }
    }
}
