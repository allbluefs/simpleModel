package com.allblue.model.sys.controller;

import com.allblue.model.sys.entity.MenuEntity;
import com.allblue.model.sys.service.MenuService;
import com.allblue.model.utils.R;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;


/**
 * 菜单管理
 */
@RestController
@RequestMapping("sys/menu")
public class MenuController{

    @Autowired
    private MenuService menuService;

    @RequestMapping("/nav")
    public R nav() {
        List<MenuEntity> menuList = menuService.getUserMenuTree();
        return R.ok().put("menuList", menuList);
    }


}
