package com.allblue.sys.controller;

import com.allblue.sys.entity.MenuEntity;
import com.allblue.sys.entity.UserEntity;
import com.allblue.sys.service.MenuService;
import com.allblue.utils.ContextHolderUtils;
import com.allblue.utils.R;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
        UserEntity user = ContextHolderUtils.getUser();
        List<MenuEntity> menuList = menuService.getUserMenuTree(user.getUserId());
        return R.ok().put("menuList", menuList);
    }

    /**
     * 所有菜单列表
     */
    @RequestMapping("/list")
    public List<MenuEntity> list(@RequestParam Map<String, Object> params){
        List<MenuEntity> menuEntities = menuService.selectList(null);
        for (MenuEntity menuEntity : menuEntities) {
            MenuEntity parentEntity = menuService.selectById(menuEntity.getParentId());
            if (parentEntity != null) {
                menuEntity.setParentName(parentEntity.getName());
            }
        }
        return menuEntities;
    }
    /**
     * 所有菜单列表
     */
    @RequestMapping("/select")
    public R select(){
        List<MenuEntity> menuEntities = menuService.selectList(null);
        //添加顶级菜单
        MenuEntity root = new MenuEntity();
        root.setMenuId(0L);
        root.setName("一级菜单");
        root.setParentId(-1L);
        root.setOpen(true);
        menuEntities.add(root);
        return R.ok().put("menus", menuEntities);
    }
    /**
     * 信息
     */
    @RequestMapping("/info/{menuId}")
    public R info(@PathVariable("menuId") Long menuId){
        MenuEntity menu = menuService.selectById(menuId);
        return R.ok().put("menu", menu);
    }
    /**
     * 保存
     */
    @RequestMapping("/save")
    public R save(@RequestBody MenuEntity menu){
        verifyForm(menu);
        menuService.insert(menu);
        return R.ok();
    }
    /**
     * 修改
     */
    @RequestMapping("/update")
    public R update(@RequestBody MenuEntity menu){
        verifyForm(menu);
        menuService.updateAllColumnById(menu);
        return R.ok();
    }
    /**
     * 删除
     */
    @RequestMapping("/delete")
    public R delete(@RequestBody Long menuId){
//        if(menuId <= 43){
//            return R.error("系统菜单，不能删除");
//        }
        //判断是否有子菜单或按钮
        List<MenuEntity> menuList = menuService.queryListParentId(menuId);
        if(menuList.size() > 0){
            return R.error("请先删除子菜单或按钮");
        }

        menuService.deleteById(menuId);

        return R.ok();
    }
    /**
     * 验证参数是否正确
     */
    private void verifyForm(MenuEntity menu){
        if(StringUtils.isBlank(menu.getName())){
            throw new RuntimeException("菜单名称不能为空");
        }

        if(menu.getParentId() == null){
            throw new RuntimeException("上级菜单不能为空");
        }

        //菜单
        if(menu.getType() == 1){
            if(StringUtils.isBlank(menu.getUrl())){
                throw new RuntimeException("菜单URL不能为空");
            }
        }

        //上级菜单类型
        int parentType = 0;
        if(menu.getParentId() != 0){
            MenuEntity parentMenu = menuService.selectById(menu.getParentId());
            parentType = parentMenu.getType();
        }

        //目录、菜单
        if(menu.getType() == 0 ||
                menu.getType() == 1){
            if(parentType != 0){
                throw new RuntimeException("上级菜单只能为目录类型");
            }
            return ;
        }

        //按钮
        if(menu.getType() == 2){
            if(parentType != 1){
                throw new RuntimeException("上级菜单只能为菜单类型");
            }
            return ;
        }
    }
}
