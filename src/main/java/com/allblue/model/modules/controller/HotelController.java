package com.allblue.model.modules.controller;


import com.allblue.model.modules.entity.Hotel;
import com.allblue.model.modules.service.IHotelService;
import com.allblue.model.utils.PageUtils;
import com.allblue.model.utils.Query;
import com.allblue.model.utils.R;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author fs
 * @since 2020-06-11
 */
@Controller
@RequestMapping("/hotel")
public class HotelController {
    @Autowired
    private IHotelService hotelService;
    @RequestMapping("/list")
    @ResponseBody
    public R list(@RequestParam Map<String, Object> params){
        Page<Hotel> page = hotelService.selectPage(new Query<Hotel>(params).getPage(), new EntityWrapper<Hotel>());
        PageUtils pageUtils = new PageUtils(page);
        return R.ok().put("page",pageUtils);
    }

}

