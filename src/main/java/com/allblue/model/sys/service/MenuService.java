package com.allblue.model.sys.service;

import com.allblue.model.sys.entity.MenuEntity;
import com.baomidou.mybatisplus.service.IService;

import java.util.List;
import java.util.Map;

/**
 * 菜单管理
 */
public interface MenuService extends IService<MenuEntity> {


    List<MenuEntity> getUserMenuTree();


}

