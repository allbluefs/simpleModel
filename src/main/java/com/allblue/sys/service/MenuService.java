package com.allblue.sys.service;

import com.allblue.sys.entity.MenuEntity;
import com.baomidou.mybatisplus.service.IService;

import java.util.List;

/**
 * 菜单管理
 */
public interface MenuService extends IService<MenuEntity> {


    List<MenuEntity> getUserMenuTree(Long userId);
    /**
     * 根据父菜单，查询子菜单
     * @param parentId 父菜单ID
     */
    List<MenuEntity> queryListParentId(Long parentId);

}

