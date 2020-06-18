package com.allblue.model.sys.service.impl;

import com.allblue.model.sys.dao.MenuDao;
import com.allblue.model.sys.entity.MenuEntity;
import com.allblue.model.sys.entity.UserEntity;
import com.allblue.model.sys.entity.UserMenuEntity;
import com.allblue.model.sys.service.MenuService;
import com.allblue.model.sys.service.UserMenuService;
import com.allblue.model.utils.ContextHolderUtils;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service("menuService")
public class MenuServiceImpl extends ServiceImpl<MenuDao, MenuEntity> implements MenuService {

    @Autowired
    private UserMenuService userMenuService;

    @Override
    public List<MenuEntity> getUserMenuTree() {
        UserEntity user = ContextHolderUtils.getUser();
        List<UserMenuEntity> userMenuList = userMenuService.selectList(new EntityWrapper<UserMenuEntity>()
                .eq("user_id", user.getId()));
        EntityWrapper<MenuEntity> ew = new EntityWrapper<>();
        List<MenuEntity> list=new ArrayList<>();
        if (CollectionUtils.isNotEmpty(userMenuList)) {
            List<Long> menuIds = userMenuList.stream().map(UserMenuEntity::getMenuId).collect(Collectors.toList());
            ew.in("menu_id",menuIds);
            ew.orderBy("order_num");
            list = this.selectList(ew);
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
