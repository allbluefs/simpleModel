package com.allblue.model.sys.service.impl;

import com.allblue.model.sys.dao.UserRoleDao;
import com.allblue.model.sys.entity.UserRoleEntity;
import com.allblue.model.sys.service.UserRoleService;
import com.allblue.model.utils.PageUtils;
import com.allblue.model.utils.Query;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service("userRoleService")
public class UserRoleServiceImpl extends ServiceImpl<UserRoleDao, UserRoleEntity> implements UserRoleService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Page<UserRoleEntity> page = this.selectPage(
                new Query<UserRoleEntity>(params).getPage(),
                new EntityWrapper<UserRoleEntity>()
        );

        return new PageUtils(page);
    }

    @Override
    public List<Long> queryRoleIdList(Long userId) {

        return baseMapper.queryRoleIdList(userId);
    }

    @Override
    public UserRoleEntity selectByUserId(Long userId) {
        return baseMapper.selectByUserId(userId);
    }

}
