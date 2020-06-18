package com.allblue.model.sys.service.impl;

import com.allblue.model.sys.dao.UserMenuDao;
import com.allblue.model.sys.entity.UserMenuEntity;
import com.allblue.model.sys.service.UserMenuService;
import com.allblue.model.utils.PageUtils;
import com.allblue.model.utils.Query;
import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;


@Service("sysUserMenuService")
public class UserMenuServiceImpl extends ServiceImpl<UserMenuDao, UserMenuEntity> implements UserMenuService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Page<UserMenuEntity> page = this.selectPage(
                new Query<UserMenuEntity>(params).getPage(),
                new EntityWrapper<UserMenuEntity>()
        );

        return new PageUtils(page);
    }

}
