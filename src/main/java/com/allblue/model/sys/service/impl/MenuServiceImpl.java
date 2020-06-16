package com.allblue.model.sys.service.impl;

import com.allblue.model.sys.dao.MenuDao;
import com.allblue.model.sys.entity.MenuEntity;
import com.allblue.model.sys.service.MenuService;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Service("menuService")
public class MenuServiceImpl extends ServiceImpl<MenuDao, MenuEntity> implements MenuService {


    @Override
    public List<MenuEntity> getUserMenuTree() {
        List<MenuEntity> list = new ArrayList<>();
        list = this.selectList(new EntityWrapper<MenuEntity>().orderBy("order_num"));
        return getChildList(0L, list);
    }

    private List<MenuEntity> getChildList(Long parentId, List<MenuEntity> list) {
        List<MenuEntity> children = new ArrayList<>();
        for (MenuEntity menu : list) {
            if (menu.getParentId().equals(parentId)) {
                menu.setChildren(getChildList(menu.getMenuId(), list));
                children.add(menu);
            }
        }
        return children;
    }


    private List<MenuEntity> getChildMenus(Long parnetId, List<MenuEntity> menuList) {
        List<MenuEntity> childs = new ArrayList<>();
        for (MenuEntity menu : menuList) {
            if (menu.getParentId().equals(parnetId)) {
                menu.setChildren(getChildMenus(menu.getMenuId(), menuList));
                childs.add(menu);
            }
        }
        return childs;
    }



}
