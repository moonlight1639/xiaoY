package com.pj.xiaoY.entity.vo;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.pj.xiaoY.entity.Dish;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@TableName("location_vo")
public class LocationVO implements Serializable {
    private static final long serialVersionUID = 1L;
    @TableId
    private Integer id;
    /**
     * 食堂名称（非空）
     */
    private String name;

    private List<Dish> dishList;
}
