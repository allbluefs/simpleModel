package com.allblue.sys.service.impl;

import com.allblue.sys.dao.MenuDao;
import com.allblue.sys.entity.MenuEntity;
import com.allblue.sys.service.MenuService;
import com.allblue.sys.service.UserService;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service("menuService")
public class MenuServiceImpl extends ServiceImpl<MenuDao, MenuEntity> implements MenuService {

    //    @Autowired
//    private UserMenuService userMenuService;
    @Autowired
    private UserService userService;

    @Override
    public List<MenuEntity> getUserMenuTree(Long userId) {
        List<MenuEntity> list = new ArrayList<>();
        //系统管理员，拥有最高权限
        if (userId == 1) {
            list = this.selectList(new EntityWrapper<MenuEntity>().orderBy("order_num"));
        } else {
            //用户菜单列表
            List<Long> menuIdList = userService.queryAllMenuId(userId);
            list = this.selectList(new EntityWrapper<MenuEntity>().in("menu_id", menuIdList).orderBy("order_num"));
        }
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

    @Override
    public List<MenuEntity> queryListParentId(Long parentId) {
        return baseMapper.queryListParentId(parentId);
    }


}
